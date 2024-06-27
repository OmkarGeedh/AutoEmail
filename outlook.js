const { PublicClientApplication } = require('@azure/msal-node');

const config = {
  auth: {
    // clientId: YOUR_CLIENT_ID,
    // authority: YOUR_AUTHORITY_URL,
    // clientSecret: YOUR_CLIENT_SECRET,
  },
};

const pca = new PublicClientApplication(config);

const authUrl = pca.getAuthCodeUrl({
  scopes: ['Mail.Read', 'Mail.Send'],
  redirectUri: YOUR_REDIRECT_URI,
});

// Once you have the code from the user
const tokenResponse = await pca.acquireTokenByCode({
  code,
  scopes: ['Mail.Read', 'Mail.Send'],
  redirectUri: YOUR_REDIRECT_URI,
});

const accessToken = tokenResponse.accessToken;
