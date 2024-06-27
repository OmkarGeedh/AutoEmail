async function sendGmailReply(emailId, replyBody) {
    const raw = `From: me\nTo: recipient@example.com\nSubject: Re: Your Email\n\n${replyBody}`;
  
    const encodedMessage = Buffer.from(raw).toString('base64');
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
  }
  