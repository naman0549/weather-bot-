# 🌦️ WhatsApp Weather Bot

A simple and beginner-friendly WhatsApp chatbot built using Node.js that provides **real-time weather information** directly inside WhatsApp chats.

Built with:

* Node.js
* whatsapp-web.js
* OpenWeatherMap API
* Puppeteer
* Axios

---

## 🚀 Features

✅ Get live weather for any city
✅ WhatsApp command-based bot
✅ QR code login system
✅ Error handling for invalid cities
✅ Simple single-file architecture (`index.js`)
✅ Beginner-friendly project structure

---

## 📸 Bot Screenshot

> Replace this image with your actual bot screenshot after uploading it.

```md
![Bot Screenshot](screenshot.png)
```

Example:

User sends:

```bash
!weather Delhi
```

Bot replies:

```bash
🌍 City: Delhi, IN
🌡 Temperature: 31°C
🤔 Feels Like: 32°C
💧 Humidity: 45%
☁ Condition: haze
```

---

## 📂 Project Structure

```bash
whatsapp-weather-bot/
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── screenshot.png
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/whatsapp-weather-bot.git
cd whatsapp-weather-bot
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Install Required Packages

```bash
npm install whatsapp-web.js qrcode-terminal axios
```

---

## 🔑 Setup OpenWeatherMap API

Get a free API key from:

[OpenWeatherMap](https://openweathermap.org/api?utm_source=chatgpt.com)

Then replace this in `index.js`:

```js
const API_KEY = "YOUR_API_KEY";
```

---

## ▶️ Run the Bot

```bash
node index.js
```

A QR code will appear in the terminal.

Open:

* WhatsApp
* Settings
* Linked Devices
* Link a Device

Scan the QR code.

---

## 💬 Available Commands

| Command           | Description            |
| ----------------- | ---------------------- |
| `!weather <city>` | Get live weather       |
| `!menu`           | Show available options |
| `!ready`          | Check if bot is online |

---

## 🧠 Technologies Used

* JavaScript
* Node.js
* whatsapp-web.js
* Puppeteer
* Axios
* OpenWeatherMap API

---

## 🛠️ Future Improvements

* 5-day weather forecast
* GPS weather support
* Cloud deployment
* Multi-language support
* Wind speed & UV index

---

## 📌 Limitations

* Requires WhatsApp linked device
* PC/server must stay online
* Free API has request limits
* Session can expire sometimes

---

## 📖 Learning Concepts

This project demonstrates:

* REST API integration
* Async/Await
* Event-driven programming
* WhatsApp automation
* Error handling
* Node.js basics

---

## ⭐ Author

Made by **Naman**

If you like this project, give it a ⭐ on GitHub.
