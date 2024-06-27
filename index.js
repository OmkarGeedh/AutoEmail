require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const port = process.env.PORT || 3000;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// Generate a URL for obtaining user consent
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'],
});

// Route handler for the initial OAuth consent redirect
app.get('/', (req, res) => {
  res.redirect(authUrl);
});

// Route handler for the OAuth callback URL
app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful! You can now use the Gmail API.');
  } catch (error) {
    res.status(500).send('Error retrieving tokens: ' + error.message);
  }
});
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.send('Authentication successful! You can close this tab.');
});

// Route handler to serve a static JavaScript file (assuming it exists)
app.get('/gmail', (req, res) => {
  res.sendFile(path.join(__dirname, 'gmail.js'));
});

app.listen(port, () => {
  console.log(`Example app is running on port ${port}`);
});

