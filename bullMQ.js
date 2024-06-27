const { Queue, Worker } = require('bullmq');
const queue = new Queue('email-processing');

// Add job to queue
queue.add('process-email', { emailId, emailBody });

// Process jobs
const worker = new Worker('email-processing', async job => {
  const { emailId, emailBody } = job.data;

  const context = await getEmailContext(emailBody);
  const reply = await generateReply(emailBody);

  if (job.name === 'gmail') {
    await sendGmailReply(emailId, reply);
  } else if (job.name === 'outlook') {
    await sendOutlookReply(accessToken, emailId, reply);
  }
});
