import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Play, Plus, Radio, Tv, Library, Podcast, Compass, Eye, ChevronLeft, ChevronRight, ExternalLink, X, Calendar, Clock } from "lucide-react";

import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/content/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getContentRepository } from "@/lib/content/content-repository";
import { ArticleAdRotator } from "@/components/article/article-ad-rotator";
import {
  getChannelStats,
  getLiveSessions,
  getLatestVideos,
  getPlaylists,
  getPlaylistVideos,
  getLatestShorts,
} from "@/lib/services/youtube";

export const metadata: Metadata = buildMetadata({
  title: "आकार IAS मीडिया सेंटर – सिविल सेवा परीक्षा हेतु फ्री वीडियो क्लासेस",
  description: "UPSC एवं MPPSC की तैयारी के लिए फ्री वीडियो लेक्चर्स, लाइव क्लासेस, पॉडकास्ट और डेली शार्ट ट्रिक्स।",
  path: "/media-center",
  keywords: ["Free IAS Classes", "MPPSC Free Video lectures", "Aakar IAS YouTube", "DNA News Analysis", "UPSC Strategy Video"],
});

interface Props {
  searchParams: Promise<{
    tab?: string;
    playlistId?: string;
    v?: string;
  }>;
}

export default async function MediaCenterPage({ searchParams }: Props) {
  const { tab = "home", playlistId, v: activeVideoId } = await searchParams;

  const repo = await getContentRepository();
  const ads = await repo.listAds("hi");

  // 1. Fetch channel stats (used in stats cards)
  const statsData = await getChannelStats();

  const stats = [
    { title: "कुल चैनल्स (Total Channels)", val: "5", icon: <Tv className="h-6 w-6 text-primary" /> },
    { title: "कुल वीडियोस (Total Videos)", val: statsData.videoCount, icon: <Play className="h-6 w-6 text-primary" /> },
    { title: "सब्सक्राइबर्स (Subscribers)", val: statsData.subscriberCount, icon: <ExternalLink className="h-6 w-6 text-primary" /> },
    { title: "कुल व्यूज (Total Views)", val: statsData.viewCount, icon: <Eye className="h-6 w-6 text-primary" /> },
  ];

  // 2. Fetch specific data depending on active tab or needs
  let liveSessions = await getLiveSessions();
  let playlists = await getPlaylists();
  let latestVideos = await getLatestVideos(6);
  let shorts = await getLatestShorts(6);

  // Group playlists for Podcasts
  const podcastPlaylists = playlists.filter(
    (p) =>
      p.title.toLowerCase().includes("podcast") ||
      p.title.toLowerCase().includes("talk") ||
      p.title.toLowerCase().includes("simplified") ||
      p.title.toLowerCase().includes("dialogue") ||
      p.title.toLowerCase().includes("interview")
  );

  // Load playlist videos if playlistId is selected
  let selectedPlaylistVideos = playlistId ? await getPlaylistVideos(playlistId, 24) : [];
  const selectedPlaylistName = playlistId ? playlists.find(p => p.id === playlistId)?.title || "प्लेलिस्ट वीडियोस" : "";

  // Trending / Featured Video (Latest video from uploads)
  const featuredVideo = latestVideos[0] || {
    id: "dQw4w9WgXcQ",
    title: "भारतीय संविधान: एक परिचय",
    description: "Explore the intricate depths of the Indian Constitution with our premium masterclass series.",
    thumbnail: "https://lh3.googleusercontent.com/aida/AP1WRLvl6H8XLv5vW3X0Sdui8P-snwa_tP_lLLFTjA-pULfWbIhuuyU6BfAMu-W5UIvWPkhbGM6B-r7piziYsh7CxKbnB1QTdaeRQLO4jEVeZb3m66mcuSF4ZLymA1xdfjB4F_L5I8bK6CpfDKpv1WZwIsPjKCgVxXSUwZxhvFAi2HXddkdQ-0Hp351AN6iQIx1_QyHPfVLfUJ2l2veQIS3jLzmdgEBsSy5fQ3AXiYPSCM_GSFLogv6fDbSEcGo",
  };

  return (
    <>
      <section className="border-b border-border bg-muted/20 py-4">
        <Container size="wide">
          <Breadcrumb items={[{ name: "फ्री क्लासेज", href: "/media-center" }]} />
        </Container>
      </section>

      <section className="bg-background py-10">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Navigation (Desktop) */}
            <aside className="lg:col-span-3 space-y-6 hidden lg:block">
              <div className="bg-card border border-border p-4 rounded-2xl space-y-1 shadow-soft">
                <p className="text-xs font-bold text-muted-foreground uppercase px-3 mb-2 tracking-wider">नेविगेशन</p>
                <Link
                  href="/media-center?tab=home"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                    tab === "home" ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Compass className="h-5 w-5" /> मुख्य पृष्ठ (Home)
                </Link>
                <Link
                  href="/media-center?tab=live"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                    tab === "live" ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Radio className="h-5 w-5" /> लाइव क्लासेस (Live)
                </Link>
                <Link
                  href="/media-center?tab=playlists"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                    tab === "playlists" ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Library className="h-5 w-5" /> प्लेलिस्ट्स (Playlists)
                </Link>
                <Link
                  href="/media-center?tab=podcasts"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                    tab === "podcasts" ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Podcast className="h-5 w-5" /> पॉडकास्ट (Podcasts)
                </Link>
              </div>

              <div className="bg-primary/5 border border-primary/10 p-5 rounded-2xl text-center space-y-4">
                <h4 className="font-bold text-foreground">प्रीमियम सदस्यता लें</h4>
                <p className="text-xs text-muted-foreground">असीमित प्रीमियम कोर्सेज एवं व्यक्तिगत मेंटरशिप प्राप्त करें।</p>
                <Link href="/online-courses">
                  <Button className="w-full rounded-xl">Go Premium</Button>
                </Link>
              </div>

              {ads && ads.length > 0 && (
                <ArticleAdRotator ads={ads} locale="hi" />
              )}
            </aside>

            {/* Main Content Area */}
            <main className="lg:col-span-9 space-y-12">
              
              {/* Mobile Quick Links Navigation */}
              <div className="block lg:hidden">
                <div className="flex gap-2 overflow-x-auto py-1 no-scrollbar text-xs font-bold border-b border-border pb-3 mb-6">
                  <Link
                    href="/media-center?tab=home"
                    className={cn(
                      "px-4 py-2 rounded-full border transition-colors flex-shrink-0",
                      tab === "home" ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border/50 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    मुख्य पृष्ठ
                  </Link>
                  <Link
                    href="/media-center?tab=live"
                    className={cn(
                      "px-4 py-2 rounded-full border transition-colors flex-shrink-0",
                      tab === "live" ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border/50 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    लाइव
                  </Link>
                  <Link
                    href="/media-center?tab=playlists"
                    className={cn(
                      "px-4 py-2 rounded-full border transition-colors flex-shrink-0",
                      tab === "playlists" ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border/50 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    प्लेलिस्ट्स
                  </Link>
                  <Link
                    href="/media-center?tab=podcasts"
                    className={cn(
                      "px-4 py-2 rounded-full border transition-colors flex-shrink-0",
                      tab === "podcasts" ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border/50 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    पॉडकास्ट
                  </Link>
                </div>
              </div>

              {/* ────────────────── 1. HOME TAB ────────────────── */}
              {tab === "home" && (
                <>
                  {/* Hero Banner card */}
                  <div className="bg-secondary rounded-3xl overflow-hidden flex flex-col md:flex-row relative shadow-lg">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_var(--primary)_0%,_transparent_60%)] opacity-30 pointer-events-none" />
                    <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center space-y-4 relative z-10 text-white">
                      <span className="inline-block bg-primary/25 border border-primary/45 text-white text-[10px] font-bold px-3 py-0.5 rounded-full w-fit tracking-wider">
                        LATEST VIDEO
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight line-clamp-2">
                        {featuredVideo.title}
                      </h1>
                      <p className="text-xs sm:text-sm text-white/75 leading-relaxed line-clamp-3">
                        {featuredVideo.description}
                      </p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Link href={`/media-center?tab=home&v=${featuredVideo.id}`}>
                          <Button className="bg-primary text-white hover:bg-primary/90 px-6 py-5 rounded-xl font-bold flex items-center gap-2">
                            <Play className="h-4 w-4 fill-current" /> अभी देखें (Watch Now)
                          </Button>
                        </Link>
                        <a href="https://t.me/aakariasofficial" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white px-6 py-5 rounded-xl font-bold">
                            Telegram Join
                          </Button>
                        </a>
                      </div>
                    </div>
                    <div className="flex-1 relative min-h-[200px] md:min-h-full aspect-[16/9] md:aspect-auto">
                      <Image
                        src={featuredVideo.thumbnail}
                        alt="Trending Video Thumbnail"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Stats Cards Section */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                      <div key={i} className="bg-card border border-border p-5 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all group flex flex-col justify-between">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                          {s.icon}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium mb-0.5">{s.title}</p>
                          <p className="text-2xl font-extrabold text-foreground">{s.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Upcoming Live Sessions */}
                  {liveSessions.length > 0 && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <div>
                          <h2 className="text-xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                            लाइव एवं आगामी कक्षाएं
                          </h2>
                          <p className="text-xs text-muted-foreground mt-1">हमारे यूट्यूब चैनल पर सीधे जुड़ें</p>
                        </div>
                        <Link href="/media-center?tab=live" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                          सभी देखें <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {liveSessions.slice(0, 2).map((live) => (
                          <Link key={live.id} href={`/media-center?tab=home&v=${live.id}`}>
                            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all flex flex-col group cursor-pointer relative aspect-video justify-end h-full">
                              <div className="absolute inset-0">
                                <Image src={live.thumbnail} alt={live.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                              </div>
                              
                              <div className={cn(
                                "absolute top-4 left-4 px-3 py-1 rounded-full text-white text-[10px] font-bold flex items-center gap-1.5 shadow-md",
                                live.isLive ? "bg-red-600 animate-pulse" : "bg-blue-600"
                              )}>
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                {live.isLive ? "LIVE NOW" : "UPCOMING CLASS"}
                              </div>

                              <div className="relative z-10 p-5 text-white space-y-2">
                                <h3 className="text-sm sm:text-base font-bold leading-snug line-clamp-2">{live.title}</h3>
                                {live.scheduledStartTime && (
                                  <div className="flex items-center gap-1 text-[10px] text-white/80 pt-1 border-t border-white/10">
                                    <Clock className="h-3 w-3" />
                                    <span>शेड्यूल: {new Date(live.scheduledStartTime).toLocaleString("hi-IN")}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Latest Uploads */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                          YouTube पर नवीनतम वीडियो लेक्चर्स
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">विषयवार तैयारी के लिए सबसे हालिया वीडियो कक्षाएं</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {latestVideos.slice(0, 6).map((video) => (
                        <Link key={video.id} href={`/media-center?tab=home&v=${video.id}`}>
                          <div className="group cursor-pointer space-y-3 bg-card border border-border p-3 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all flex flex-col h-full justify-between">
                            <div className="space-y-3">
                              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/40">
                                <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Play className="h-10 w-10 text-white fill-current" />
                                </div>
                              </div>
                              <h4 className="font-bold text-foreground text-sm line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                {video.title}
                              </h4>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(video.publishedAt).toLocaleDateString("hi-IN")}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Latest Shorts */}
                  {shorts.length > 0 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                          लेटेस्ट यूट्यूब शॉर्ट्स (Quick Revision)
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">शॉर्ट्स के माध्यम से झटपट फैक्ट्स समझें</p>
                      </div>
                      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-3">
                        {shorts.map((short) => (
                          <Link key={short.id} href={`/media-center?tab=home&v=${short.id}`} className="flex-none w-44">
                            <div className="aspect-[9/16] rounded-2xl overflow-hidden relative group cursor-pointer border border-border shadow-soft">
                              <Image src={short.thumbnail} alt={short.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                              <div className="absolute bottom-4 left-4 right-4 text-white">
                                <p className="text-xs font-bold leading-snug line-clamp-2">{short.title}</p>
                                <div className="flex items-center gap-1 mt-1.5 opacity-90 text-[10px]">
                                  <Eye className="h-3 w-3" />
                                  <span>{short.viewCount} व्यूज</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* ────────────────── 2. LIVE TAB ────────────────── */}
              {tab === "live" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                      लाइव एवं शेड्यूल कक्षाएं
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">यूट्यूब लाइव कक्षाओं की सूची</p>
                  </div>

                  {liveSessions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {liveSessions.map((live) => (
                        <Link key={live.id} href={`/media-center?tab=live&v=${live.id}`}>
                          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all flex flex-col group cursor-pointer relative aspect-video justify-end">
                            <div className="absolute inset-0">
                              <Image src={live.thumbnail} alt={live.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            </div>
                            
                            <div className={cn(
                              "absolute top-4 left-4 px-3 py-1 rounded-full text-white text-[10px] font-bold flex items-center gap-1.5 shadow-md",
                              live.isLive ? "bg-red-600 animate-pulse" : "bg-blue-600"
                            )}>
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              {live.isLive ? "LIVE NOW" : "UPCOMING CLASS"}
                            </div>

                            <div className="relative z-10 p-5 text-white space-y-2">
                              <h3 className="text-base sm:text-lg font-bold leading-snug line-clamp-2">{live.title}</h3>
                              {live.scheduledStartTime && (
                                <div className="flex items-center gap-1 text-xs text-white/80 pt-1 border-t border-white/10">
                                  <Clock className="h-4 w-4" />
                                  <span>प्रारंभ समय: {new Date(live.scheduledStartTime).toLocaleString("hi-IN")}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl space-y-3">
                      <Radio className="h-12 w-12 text-muted-foreground mx-auto" />
                      <h4 className="font-bold text-foreground">कोई लाइव सत्र सक्रिय नहीं है</h4>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">इस समय कोई लाइव क्लास निर्धारित नहीं है। नए शेड्यूल के लिए हमारे टेलीग्राम से जुड़ें।</p>
                    </div>
                  )}
                </div>
              )}

              {/* ────────────────── 3. PLAYLISTS TAB ────────────────── */}
              {tab === "playlists" && (
                <div className="space-y-8">
                  {playlistId ? (
                    // Browse items of a specific playlist
                    <div className="space-y-6">
                      <div className="flex items-center gap-2">
                        <Link href="/media-center?tab=playlists" className="flex items-center gap-1 text-xs text-primary font-bold hover:underline">
                          <ChevronLeft className="h-4 w-4" /> प्लेलिस्ट सूची में वापस जाएं
                        </Link>
                      </div>

                      <div>
                        <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                          {selectedPlaylistName}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">यूट्यूब वीडियो लेक्चर्स</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {selectedPlaylistVideos.map((video) => (
                          <Link key={video.id} href={`/media-center?tab=playlists&playlistId=${playlistId}&v=${video.id}`}>
                            <div className="group cursor-pointer space-y-3 bg-card border border-border p-3 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all flex flex-col h-full justify-between">
                              <div className="space-y-3">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/40">
                                  <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="h-10 w-10 text-white fill-current" />
                                  </div>
                                </div>
                                <h4 className="font-bold text-foreground text-sm line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                  {video.title}
                                </h4>
                              </div>
                              <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(video.publishedAt).toLocaleDateString("hi-IN")}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Render List of Playlists
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                          प्लेलिस्ट सूची
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">सभी विषयवार वीडियो कोर्सेज</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {playlists.map((playlist) => (
                          <Link key={playlist.id} href={`/media-center?tab=playlists&playlistId=${playlist.id}`}>
                            <div className="group cursor-pointer space-y-3 bg-card border border-border p-4 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all flex flex-col h-full justify-between">
                              <div className="space-y-3">
                                <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/40">
                                  <Image src={playlist.thumbnail} alt={playlist.title} fill className="object-cover" />
                                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
                                    <Play className="h-3 w-3 fill-current" />
                                    <span>{playlist.videoCount} कक्षाएं</span>
                                  </div>
                                </div>
                                <h4 className="font-bold text-foreground text-sm line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                  {playlist.title}
                                </h4>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {playlist.description || "UPSC & MPPSC परीक्षा मार्गदर्शन"}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ────────────────── 4. PODCASTS TAB ────────────────── */}
              {tab === "podcasts" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-extrabold text-foreground border-l-4 border-primary pl-4">
                      पॉडकास्ट सीरीज
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">टॉपर टॉक, रणनीति और मार्गदर्शन श्रृंखला</p>
                  </div>

                  {podcastPlaylists.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {podcastPlaylists.map((playlist) => (
                        <Link key={playlist.id} href={`/media-center?tab=playlists&playlistId=${playlist.id}`}>
                          <div className="group cursor-pointer space-y-3 bg-card border border-border p-4 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all flex flex-col h-full justify-between">
                            <div className="space-y-3">
                              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border/40">
                                <Image src={playlist.thumbnail} alt={playlist.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Play className="h-12 w-12 text-white fill-current" />
                                </div>
                              </div>
                              <h4 className="font-bold text-foreground text-sm line-clamp-1 leading-snug group-hover:text-primary transition-colors">
                                {playlist.title}
                              </h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {playlist.description || "Aakar IAS Podcast series"}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl space-y-3">
                      <Podcast className="h-12 w-12 text-muted-foreground mx-auto" />
                      <h4 className="font-bold text-foreground">पॉडकास्ट अभी उपलब्ध नहीं हैं</h4>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">नई श्रृंखला के प्रकाशन की प्रतीक्षा करें।</p>
                    </div>
                  )}
                </div>
              )}

            </main>
          </div>
        </Container>
      </section>

      {/* ────────────────── YOUTUBE PLAYER MODAL ────────────────── */}
      {activeVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <Link
              href={
                `/media-center?tab=${tab}` +
                (playlistId ? `&playlistId=${playlistId}` : "")
              }
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/85 text-white rounded-full p-2.5 transition-all shadow-lg border border-white/15"
              aria-label="Close Player"
            >
              <X className="h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
