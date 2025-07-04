
// GENERAL IDEA OF SQS (communication between services)

// // Using Amazon SQS to communicate between services
// npm install aws-sdk






// // sends message to SQS
// const AWS = require('aws-sdk');
// AWS.config.update({ region: 'us-east-1' });

// const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

// const params = {
//   QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789012/user-signup',
//   MessageBody: JSON.stringify({ userId: 123, email: 'test@example.com' })
// };

// sqs.sendMessage(params, (err, data) => {
//   if (err) console.error(err);
//   else console.log("Message sent", data.MessageId);
// });






// //  receives message from SQS
// const params = {
//   QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789012/user-signup',
//   MaxNumberOfMessages: 1,
//   WaitTimeSeconds: 10
// };

// sqs.receiveMessage(params, (err, data) => {
//   if (err) console.error(err);
//   else {
//     const msg = JSON.parse(data.Messages[0].Body);
//     console.log("New signup:", msg.userId);
//     // Process message here
//   }
// });