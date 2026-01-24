# LSPD Roster System

A modern, web-based roster system for the **Los Santos Police Department**, designed for FiveM communities.

The roster:
- Pulls live data from Google Forms & Google Sheets
- Displays members in a clean MDT-style interface
- Supports both **embedded (MDT/iframe)** and **standalone web** views
- Requires **no backend server** (static hosting only)

---

## ✨ Features

- Live roster synced from Google Sheets
- Search by name, badge, callsign, rank, unit
- Filters for rank, unit, and status
- Profile modal with photo, bio, certifications, and notes
- Auto-generated Member IDs and Badge Numbers
- Web View and Embedded View modes
- Optional Demo Mode badge
- GitHub Pages compatible

---

## 🖥️ View Modes

| Mode | Use Case |
|----|----|
| **Embed View** | In-game MDT / iframe |
| **Web View** | Public or internal roster website |

Modes are controlled using HTML attributes — no code edits required.

---

## 🚀 Quick Start

1. Open the **Roster Submission Form**
2. Submit member information
3. Manage entries in the Google Sheet
4. View updates instantly in the roster UI

➡️ See `/docs/Detailed-Setup.md` for full setup instructions.

---

## 📄 Documentation

- **Detailed Setup:** `/docs/Detailed-Setup.md`
- **General User Guide:** `/docs/General-User-Guide.md`
- **Admin User Guide:** `/docs/Admin-User-Guide.md`

---

## 🔒 Permissions

- Anyone with the form link can submit
- Only admins should have access to the Google Sheet
- Roster display is read-only

---

## 🧩 Tech Stack

- HTML + Vanilla JavaScript
- Google Forms
- Google Sheets
- Google Apps Script
- GitHub Pages (optional)

---

## 🛠️ Support

This system is designed to be low-maintenance.  
If data looks incorrect, always check the Google Sheet first.