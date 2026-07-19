const API_KEY = "AIzaSyBy9XjdL4cNR1YEjwp6AQSL8lAqT1gY8EA";
const CHANNEL_ID = "UCY8IWCZZeJ_6aizut-Y4oCg";
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const UPLOADS_PLAYLIST_ID = "UUY8IWCZZeJ_6aizut-Y4oCg";

export interface YouTubeStats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  title: string;
  customUrl: string;
  avatarUrl: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  duration?: string;
  durationSeconds?: number;
  viewCount?: string;
  likeCount?: string;
  isLive?: boolean;
  isUpcoming?: boolean;
  scheduledStartTime?: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoCount: number;
}

/**
 * Helper to parse ISO 8601 duration to seconds
 * Example: "PT1M15S" -> 75
 */
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Formats statistics counts (e.g. 1200000 -> "1.2M")
 */
export function formatCount(countStr: string | undefined): string {
  if (!countStr) return "0";
  const num = parseInt(countStr, 10);
  if (isNaN(num)) return countStr;
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

/**
 * Fetch channel stats and details
 * Cache: 12 hours (43200 seconds)
 */
export async function getChannelStats(customChannelId?: string): Promise<YouTubeStats> {
  try {
    const channelId = customChannelId || CHANNEL_ID;
    const url = `${BASE_URL}/channels?part=statistics,snippet&id=${channelId}&key=${API_KEY}`;
    const res = await fetch(url, {
      next: { revalidate: 43200 },
    });
    
    if (!res.ok) throw new Error(`YouTube API returned ${res.status}`);
    const data = await res.json();
    const item = data.items?.[0];
    
    if (!item) throw new Error("Channel not found");
    
    return {
      subscriberCount: formatCount(item.statistics?.subscriberCount),
      viewCount: formatCount(item.statistics?.viewCount),
      videoCount: formatCount(item.statistics?.videoCount),
      title: item.snippet?.title || "Aakar IAS",
      customUrl: item.snippet?.customUrl || "@aakarias",
      avatarUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || "",
    };
  } catch (err) {
    console.error("Error fetching YouTube channel stats:", err);
    return {
      subscriberCount: "1.2M",
      viewCount: "45M+",
      videoCount: "5.8K",
      title: "Aakar IAS",
      customUrl: "@aakar-ias",
      avatarUrl: "",
    };
  }
}

/**
 * Fetch active and upcoming live sessions
 * Cache: 1 hour (3600 seconds)
 */
export async function getLiveSessions(): Promise<YouTubeVideo[]> {
  try {
    // 1. Fetch active live streams
    const liveUrl = `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}&maxResults=5`;
    const liveRes = await fetch(liveUrl, {
      next: { revalidate: 3600 },
    });
    const liveData = await liveRes.ok ? await liveRes.json() : { items: [] };

    // 2. Fetch upcoming scheduled live streams
    const upcomingUrl = `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=upcoming&key=${API_KEY}&maxResults=5`;
    const upcomingRes = await fetch(upcomingUrl, {
      next: { revalidate: 3600 },
    });
    const upcomingData = await upcomingRes.ok ? await upcomingRes.json() : { items: [] };

    const videos: YouTubeVideo[] = [];

    // Map live videos
    if (liveData.items) {
      for (const item of liveData.items) {
        videos.push({
          id: item.id?.videoId,
          title: item.snippet?.title || "",
          description: item.snippet?.description || "",
          publishedAt: item.snippet?.publishedAt || "",
          thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || "",
          isLive: true,
        });
      }
    }

    // Map upcoming videos
    if (upcomingData.items) {
      // To get scheduled start time, we need to request video details
      const videoIds = upcomingData.items.map((i: any) => i.id?.videoId).filter(Boolean);
      let detailsMap: Record<string, string> = {};
      
      if (videoIds.length > 0) {
        const detailsUrl = `${BASE_URL}/videos?part=liveStreamingDetails&id=${videoIds.join(",")}&key=${API_KEY}`;
        const detailsRes = await fetch(detailsUrl, { next: { revalidate: 3600 } });
        if (detailsRes.ok) {
          const detailsData = await detailsRes.json();
          detailsData.items?.forEach((v: any) => {
            if (v.liveStreamingDetails?.scheduledStartTime) {
              detailsMap[v.id] = v.liveStreamingDetails.scheduledStartTime;
            }
          });
        }
      }

      for (const item of upcomingData.items) {
        const vId = item.id?.videoId;
        if (!vId) continue;
        videos.push({
          id: vId,
          title: item.snippet?.title || "",
          description: item.snippet?.description || "",
          publishedAt: item.snippet?.publishedAt || "",
          thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || "",
          isUpcoming: true,
          scheduledStartTime: detailsMap[vId] || "",
        });
      }
    }

    return videos;
  } catch (err) {
    console.error("Error fetching YouTube live sessions:", err);
    return [];
  }
}

function getUploadsPlaylistId(channelId: string): string {
  if (channelId.startsWith("UC")) {
    return "UU" + channelId.substring(2);
  }
  return channelId;
}

export async function getLatestVideos(maxResults = 10, customChannelId?: string): Promise<YouTubeVideo[]> {
  try {
    const channelId = customChannelId || CHANNEL_ID;
    const playlistId = getUploadsPlaylistId(channelId);
    const url = `${BASE_URL}/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`;
    const res = await fetch(url, {
      next: { revalidate: 7200 },
    });
    
    if (!res.ok) throw new Error(`YouTube API returned ${res.status}`);
    const data = await res.json();
    
    return (data.items || []).map((item: any) => ({
      id: item.contentDetails?.videoId || item.snippet?.resourceId?.videoId,
      title: item.snippet?.title || "",
      description: item.snippet?.description || "",
      publishedAt: item.snippet?.publishedAt || "",
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || "",
    }));
  } catch (err) {
    console.error("Error fetching latest YouTube videos:", err);
    return [];
  }
}

/**
 * Fetch playlists of the channel
 * Cache: 6 hours (21600 seconds)
 */
export async function getPlaylists(): Promise<YouTubePlaylist[]> {
  try {
    const url = `${BASE_URL}/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=50&key=${API_KEY}`;
    const res = await fetch(url, {
      next: { revalidate: 21600 },
    });
    
    if (!res.ok) throw new Error(`YouTube API returned ${res.status}`);
    const data = await res.json();
    
    return (data.items || []).map((item: any) => ({
      id: item.id,
      title: item.snippet?.title || "",
      description: item.snippet?.description || "",
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || "",
      videoCount: item.contentDetails?.itemCount || 0,
    }));
  } catch (err) {
    console.error("Error fetching YouTube playlists:", err);
    return [];
  }
}

/**
 * Fetch videos within a specific playlist
 * Cache: 4 hours (14400 seconds)
 */
export async function getPlaylistVideos(playlistId: string, maxResults = 12): Promise<YouTubeVideo[]> {
  try {
    const url = `${BASE_URL}/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`;
    const res = await fetch(url, {
      next: { revalidate: 14400 },
    });
    
    if (!res.ok) throw new Error(`YouTube API returned ${res.status}`);
    const data = await res.json();
    
    return (data.items || []).map((item: any) => ({
      id: item.contentDetails?.videoId || item.snippet?.resourceId?.videoId,
      title: item.snippet?.title || "",
      description: item.snippet?.description || "",
      publishedAt: item.snippet?.publishedAt || "",
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || "",
    }));
  } catch (err) {
    console.error(`Error fetching YouTube playlist ${playlistId} videos:`, err);
    return [];
  }
}

/**
 * Fetch latest shorts (by checking uploads and querying video durations)
 * Cache: 4 hours (14400 seconds)
 */
export async function getLatestShorts(maxResults = 10): Promise<YouTubeVideo[]> {
  try {
    // 1. Fetch latest 40 videos from uploads
    const playlistUrl = `${BASE_URL}/playlistItems?part=contentDetails,snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=40&key=${API_KEY}`;
    const playlistRes = await fetch(playlistUrl, {
      next: { revalidate: 14400 },
    });
    
    if (!playlistRes.ok) throw new Error("Failed to fetch uploads playlist");
    const playlistData = await playlistRes.json();
    const items = playlistData.items || [];
    
    const videoIds = items.map((item: any) => item.contentDetails?.videoId).filter(Boolean);
    if (videoIds.length === 0) return [];
    
    // 2. Fetch contentDetails (duration) for these videos
    const videosUrl = `${BASE_URL}/videos?part=contentDetails,snippet,statistics&id=${videoIds.join(",")}&key=${API_KEY}`;
    const videosRes = await fetch(videosUrl, {
      next: { revalidate: 14400 },
    });
    
    if (!videosRes.ok) throw new Error("Failed to fetch video details");
    const videosData = await videosRes.json();
    const details = videosData.items || [];
    
    const shorts: YouTubeVideo[] = [];
    
    for (const v of details) {
      const durationStr = v.contentDetails?.duration || "";
      const seconds = parseDuration(durationStr);
      
      // YouTube Shorts are <= 60 seconds. Also check if title or description contains "#short"
      const title = v.snippet?.title || "";
      const desc = v.snippet?.description || "";
      const isShortText = title.toLowerCase().includes("#short") || desc.toLowerCase().includes("#short");
      
      if (seconds > 0 && (seconds <= 60 || isShortText)) {
        shorts.push({
          id: v.id,
          title,
          description: desc,
          publishedAt: v.snippet?.publishedAt || "",
          thumbnail: v.snippet?.thumbnails?.high?.url || v.snippet?.thumbnails?.medium?.url || "",
          durationSeconds: seconds,
          viewCount: formatCount(v.statistics?.viewCount),
        });
        
        if (shorts.length >= maxResults) break;
      }
    }
    
    return shorts;
  } catch (err) {
    console.error("Error fetching latest YouTube Shorts:", err);
    return [];
  }
}

const POPULAR_VIDEO_IDS = ["BMGfjzaTi7Y", "-f6Qhp7F_88", "7WsdUDIJg6E"];

const FALLBACK_POPULAR_VIDEOS: YouTubeVideo[] = [
  {
    id: "BMGfjzaTi7Y",
    title: "प्राचीन भारतीय इतिहास | पाषाणकाल - 01 | Stone Age Complete Class | MPPSC | UPSC | By Atharv Sir",
    description: "पाषाणकाल Complete Lecture | Lower, Middle & Upper Paleolithic Age | MPPSC UPSC History",
    publishedAt: "2023-06-11T14:17:20Z",
    thumbnail: "https://i.ytimg.com/vi/BMGfjzaTi7Y/hqdefault.jpg"
  },
  {
    id: "-f6Qhp7F_88",
    title: "Prashant Uikey || RANK 20 || MPPSC 2020 || Mock Interview || Aakar IAS",
    description: "Prashant Uikey || RANK 20 || MPPSC 2020 || Mock Interview || Aakar IAS",
    publishedAt: "2023-06-11T14:17:20Z",
    thumbnail: "https://i.ytimg.com/vi/-f6Qhp7F_88/hqdefault.jpg"
  },
  {
    id: "7WsdUDIJg6E",
    title: "Ethics (Socrates Philosophy : 01) - Ashwini Kumar Mudgil (Aakar IAS, Indore)",
    description: "Ethics (Socrates Philosophy : 01) - Ashwini Kumar Mudgil (Aakar IAS, Indore)",
    publishedAt: "2020-12-05T14:09:31Z",
    thumbnail: "https://i.ytimg.com/vi/7WsdUDIJg6E/hqdefault.jpg"
  }
];

/**
 * Fetch popular videos of the channel (specifically our 3 all-time popular videos)
 * Cache: 12 hours (43200 seconds)
 */
export async function getPopularVideos(maxResults = 3, customChannelId?: string): Promise<YouTubeVideo[]> {
  try {
    // Fetch specifically the three all-time popular videos by ID (uses 1 quota point)
    const url = `${BASE_URL}/videos?part=snippet,statistics&id=${POPULAR_VIDEO_IDS.join(",")}&key=${API_KEY}`;
    const res = await fetch(url, {
      next: { revalidate: 43200 },
    });
    
    if (!res.ok) throw new Error(`YouTube API returned ${res.status}`);
    const data = await res.json();
    const items = data.items || [];
    
    if (items.length === 0) return FALLBACK_POPULAR_VIDEOS.slice(0, maxResults);

    // Map and maintain the original order of POPULAR_VIDEO_IDS
    const mapped = items.map((item: any) => ({
      id: item.id,
      title: item.snippet?.title || "",
      description: item.snippet?.description || "",
      publishedAt: item.snippet?.publishedAt || "",
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || "",
    }));

    const sorted = POPULAR_VIDEO_IDS.map(id => mapped.find((v: any) => v.id === id)).filter(Boolean) as YouTubeVideo[];
    return sorted.slice(0, maxResults);
  } catch (err) {
    console.error("Error fetching popular YouTube videos, using premium fallback list:", err);
    return FALLBACK_POPULAR_VIDEOS.slice(0, maxResults);
  }
}
