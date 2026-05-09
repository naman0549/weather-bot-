// ============================================================
//  WhatsApp Weather Bot — with Interactive Buttons + Debug
//  Built with: whatsapp-web.js, axios, qrcode-terminal
// ============================================================

const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const axios  = require("axios");

const OPENWEATHER_API_KEY  = "YOUR_OPENWEATHERMAP_API_KEY"; // 🔑 Replace this
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const PRESET_CITIES        = ["Delhi", "Mumbai", "Bangalore", "Chennai"];

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  console.log("\n📱 Scan this QR code with WhatsApp to log in:\n");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("\n✅ WhatsApp Weather Bot with Buttons is online!");
  console.log("📌 Commands:  !menu  |  !ready  |  !weather <city>\n");
  console.log("🐛 Debug mode ON — every message will be logged below\n");
});

// ── Fetch weather ──────────────────────────────
async function getWeather(city) {
  try {
    const url = `${OPENWEATHER_BASE_URL}?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;
    return (
      `🌍 *City:* ${data.name}, ${data.sys.country}\n` +
      `🌡 *Temperature:* ${Math.round(data.main.temp)}°C\n` +
      `🤔 *Feels Like:* ${Math.round(data.main.feels_like)}°C\n` +
      `💧 *Humidity:* ${data.main.humidity}%\n` +
      `☁ *Condition:* ${data.weather[0].description}`
    );
  } catch (error) {
    if (error.response && error.response.status === 404) return null;
    console.error("❌ Weather API error:", error.message);
    return "⚠️ Sorry, something went wrong. Please try again later.";
  }
}

// ── Send city menu (plain text numbered list) ──
async function sendCityMenu(chat) {
  const cityList = PRESET_CITIES.map((c, i) => `${i + 1}️⃣ !weather ${c}`).join("\n");
  await chat.sendMessage(
    `🌤 *Weather Bot — City Menu*\n\n` +
    `👇 Copy & send any command below:\n\n` +
    `${cityList}\n\n` +
    `──────────────────\n` +
    `🔍 Or type: *!weather <any city>*\n` +
    `📍 Example: !weather Jaipur`
  );
}

// ── Listen for ALL message events ─────────────
// message_create catches your own messages too
client.on("message_create", async (message) => {
  const text = message.body.trim();

  // 🐛 DEBUG: Print every single message to terminal
  console.log("📨 New message ──────────────────");
  console.log("   text   :", JSON.stringify(text));
  console.log("   fromMe :", message.fromMe);
  console.log("   from   :", message.from);
  console.log("   to     :", message.to);
  console.log("   type   :", message.type);
  console.log("─────────────────────────────────");

  // ✅ FIX: Process ALL messages including ones you send yourself
  // @lid is WhatsApp's internal ID format for self-chat — different from @c.us
  // So we simply don't skip anything here and let all messages through

  const chat = await message.getChat();

  // ── !menu ──────────────────────────────────
  if (text.toLowerCase() === "!menu") {
    console.log("✅ Matched !menu — sending city menu\n");
    await sendCityMenu(chat);
    return;
  }

  // ── !ready ─────────────────────────────────
  if (text.toLowerCase() === "!ready") {
    console.log("✅ Matched !ready — sending status\n");
    await message.reply(
      "✅ *Bot is online and running!*\n\n" +
      "📋 *Commands:*\n" +
      "• *!menu* — Show city picker\n" +
      "• *!weather <city>* — Get weather\n" +
      "• *!ready* — Check bot status"
    );
    return;
  }

  // ── !weather <city> ────────────────────────
  if (text.toLowerCase().startsWith("!weather")) {
    const city = text.split(/\s+/).slice(1).join(" ");
    if (!city) {
      await message.reply(
        "👋 Please provide a city!\n\n*Usage:* !weather Delhi\nOr send *!menu* to pick a city."
      );
      return;
    }
    console.log("✅ Matched !weather — city:", city, "\n");
    await message.reply(`🔍 Fetching weather for *${city}*...`);
    const weatherReport = await getWeather(city);
    if (weatherReport === null) {
      await message.reply(`❌ City "*${city}*" not found. Check spelling or send *!menu*.`);
      return;
    }
    await message.reply(weatherReport);
    return;
  }

  console.log("⏭️  No command matched — ignoring\n");
});

client.on("auth_failure", (msg) => {
  console.error("❌ Auth failed:", msg);
  console.log("👉 Delete .wwebjs_auth and restart.");
});

client.initialize();
