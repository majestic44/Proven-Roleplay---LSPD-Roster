# Detailed Setup Guide

This guide explains how to fully set up the LSPD Roster System from scratch.

---

## 1️⃣ Create the Google Form

Create a Google Form with the following fields:

- MemberId (Short Answer — optional)
- BadgeNumber (Short Answer — optional)
- Callsign
- FirstName
- LastName
- DisplayName
- Rank
- Unit
- Status
- DiscordHandle
- PhotoUrl
- JoinedDate
- Certifications
- Bio
- Notes

✅ Leave **MemberId** and **BadgeNumber** optional.

---

## 2️⃣ Link Form to Google Sheet

- Open the Form
- Click **Responses**
- Click **Link to Spreadsheet**
- Rename the sheet tab to:

# Detailed Setup Guide

This guide explains how to fully set up the LSPD Roster System from scratch.

---

## 1️⃣ Create the Google Form

Create a Google Form with the following fields:

- MemberId (Short Answer — optional)
- BadgeNumber (Short Answer — optional)
- Callsign
- FirstName
- LastName
- DisplayName
- Rank
- Unit
- Status
- DiscordHandle
- PhotoUrl
- JoinedDate
- Certifications
- Bio
- Notes

✅ Leave **MemberId** and **BadgeNumber** optional.

---

## 2️⃣ Link Form to Google Sheet

- Open the Form
- Click **Responses**
- Click **Link to Spreadsheet**
- Rename the sheet tab to:


⚠️ Do not rename column headers after setup.

---

## 3️⃣ Install Google Apps Script

1. In the Sheet, click **Extensions → Apps Script**
2. Paste the provided Apps Script code
3. Save the project



---

## 4️⃣ Set Trigger (Auto-Generate IDs)

1. In Apps Script, open **Triggers**
2. Add Trigger:
   - Function: `onFormSubmit`
   - Event Source: `From spreadsheet`
   - Event Type: `On form submit`

This enables:
- Auto MemberId generation
- Auto BadgeNumber assignment

---

## 5️⃣ Deploy as Web App (JSON Endpoint)

1. Click **Deploy → New Deployment**
2. Type: **Web App**
3. Execute as: **Me**
4. Access: **Anyone**
5. Deploy and copy the URL

📌 This URL is your `DATA_URL` in `roster-modern.js`.

---

## 6️⃣ Configure Frontend

Edit `roster-modern.js`:

```js
const DATA_URL = "PASTE YOUR APPS SCRIPT URL HERE";
