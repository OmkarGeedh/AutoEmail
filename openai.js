const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: sk-proj-CGXFpscWHiuEtILhfQXcT3BlbkFJmwDBL1Qhx6EmE0ziBedh,
});

const openai = new OpenAIApi(configuration);

async function getEmailContext(emailBody) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Analyze the context of this email: "${emailBody}"`,
    max_tokens: 150,
  });

  return response.data.choices[0].text.trim();
}
