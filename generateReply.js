async function generateReply(emailBody) {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Write a professional reply to this email: "${emailBody}"`,
      max_tokens: 150,
    });
  
    return response.data.choices[0].text.trim();
  }
  