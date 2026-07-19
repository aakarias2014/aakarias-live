import fs from "fs";
import path from "path";

const logPath = path.resolve(
  "/Users/aakariastech/.gemini/antigravity-ide/brain/f3368bc5-9762-4cc4-a6af-e2c9e58d3968/.system_generated/logs/transcript.jsonl"
);

if (!fs.existsSync(logPath)) {
  console.error("Log file not found!");
  process.exit(1);
}

const lines = fs.readFileSync(logPath, "utf-8").split("\n");

console.log("=== Extracting Browser Console Logs & Tool Responses ===");

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    // Find subagent invocation or tool responses
    if (obj.tool_calls) {
      for (const tc of obj.tool_calls) {
        if (tc.name === "browser_subagent") {
          console.log(`\n🤖 Spawning browser subagent with task: ${tc.arguments?.TaskName}`);
        }
      }
    }
    
    // Look for tool response containing console logs
    if (obj.type === "TOOL_RESPONSE" || obj.type === "PLANNER_RESPONSE") {
      const content = obj.content || "";
      if (content.includes("console") || content.includes("error") || content.includes("logs")) {
        // Just print lines containing console logs
        const cleanContent = content.substring(0, 1000);
        console.log(`\n[Log Preview]:`, cleanContent);
      }
    }
  } catch (err) {
    // Ignore invalid JSON
  }
}
