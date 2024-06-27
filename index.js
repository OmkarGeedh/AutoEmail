const express = require('express')

const app = express ()

app.get('/auth/google', (req, res) => {
  res.redirect(googleAuthUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  