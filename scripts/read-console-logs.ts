import fs from "fs";
import path from "path";

const logPath = path.resolve(
  "/Users/aakariastech/.gemini/antigravity-ide/brain/f3368bc5-9762-4cc4-a6af-e2c9e58d3968/.system_generated/logs/transcript_full.jsonl"
);

if (!fs.existsSync(logPath)) {
  console.error("Log file not found!");
  process.exit(1);
}

const lines = fs.readFileSync(logPath, "utf-8").split("\n");

console.log("=== Searching for capture_browser_console_logs results ===");

let foundLogs = false;
for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    // Find the step where capture_browser_console_logs was called
    if (obj.tool_calls) {
      const hasConsoleCall = obj.tool_calls.some((tc: any) => tc.name === "capture_browser_console_logs" || tc.name === "browser_subagent");
      if (hasConsoleCall) {
        console.log(`\nStep Index: ${obj.step_index}`);
        console.log(`Source: ${obj.source}`);
        console.log(`Type: ${obj.type}`);
        console.log(`Tool Calls:`, JSON.stringify(obj.tool_calls, null, 2));
      }
    }

    if (obj.type === "TOOL_RESPONSE" || obj.status === "DONE") {
      // If we see content that looks like browser logs output
      const content = obj.content || "";
      if (content.includes("Console logs for page") || content.includes("[]") || content.includes("severity")) {
        console.log(`\n--- Tool Response Content (step ${obj.step_index}) ---`);
        console.log(content.substring(0, 3000));
        foundLogs = true;
      }
    }
  } catch (err) {
    // Ignore invalid JSON
  }
}

if (!foundLogs) {
  console.log("No console log tool responses found in the transcript.");
}
