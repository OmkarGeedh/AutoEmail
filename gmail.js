const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
    2184254044-cgqqte29i1ohko21ncdkrcedv8krv6og.apps.googleusercontent.com,
    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,
//   YOUR_REDIRECT_URL
);

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// Generate a URL for obtaining user consent
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'],
});


const { tokens } = await oauth2Client.getToken(code);
oauth2Client.setCredentials(tokens);
