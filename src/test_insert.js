global.WebSocket = class {};

const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function run() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing credentials");
    return;
  }

  const supabase = createClient(url, key);
  console.log("Inserting test message into contact_messages...");
  
  const { data, error } = await supabase.from("contact_messages").insert({
    name: "Deep Test after migrations",
    email: "admin@aakarias.com",
    phone: "8103807614",
    subject: "mppsc integration test",
    message: "This is a successful test after applying migrations.",
    locale: "en",
    user_agent: "test-script",
    status: "new",
  });

  if (error) {
    console.error("SUPABASE ERROR:", error);
  } else {
    console.log("SUCCESS! Test message inserted successfully.");
  }
}

run();
