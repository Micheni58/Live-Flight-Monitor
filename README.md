# ✈️ Live Flight Monitor

## 📖 Project Overview

**Live Flight Monitor** is a web application that displays real-time flight data using the [Aviationstack API](https://aviationstack.com/). It shows up to **50 flight callsigns** in a list, allows users to search for a specific flight by callsign, and displays detailed information such as:

- Callsign
- Origin country
- Longitude
- Latitude
- Altitude
- Flight date
- Flight status

The application features a gradient background and a decorative border image for a polished, modern look.

---

## 🚀 Features

- **Flight List:** Displays up to 50 active flight callsigns in a list .
- **Search:** Search for a flight by callsign to view detailed information in .
- **Clear Functionality:** Resets the search input and results with a clear button.
- **Error Handling:** Gracefully handles API errors (e.g. rate limits) and automatically retries after 60 seconds on HTTP 429 errors.

---

## 📦 Setup Instructions
git clone 
### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (for running a local server)
- **Aviationstack API Key**  
  Sign up for a free account at [aviationstack.com](https://aviationstack.com/) to get your access key (free tier: 100 requests/month)

---
