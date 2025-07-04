const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require('node-cron');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/post-service')
  .then(() => {
    app.listen(4001, () => console.log(' Post Service running on port 4001'));
  });

const backupDir = path.join(__dirname, 'backups');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

app.get('/backup', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `backup-${timestamp}`);

  // Ensure backup folder exists
  fs.mkdirSync(backupPath, { recursive: true });

  // Use double quotes around the Windows path
  const cmd = `mongodump --uri="mongodb://localhost:27017/post-service" --out="${backupPath}"`;
  // console.log('cmd:', cmd);

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('Backup error:', stderr || err.message);
      return res.status(500).send(stderr || err.message);
    }

    console.log('Backup completed at:', backupPath);
    res.send(`Backup created at: ${backupPath}`);
  });
});


app.get('/restore-backup', (req, res) => {
const backupFolder = 'backup-2025-05-16T13-56-00-036Z'; // Replace with actual
const restorePath = path.join(__dirname, 'backups', backupFolder, 'post-service');

const cmd = `mongorestore --uri="mongodb://localhost:27017/post-service" "${restorePath}"`;

exec(cmd, (err, stdout, stderr) => {
  if (err) {
    console.error('Restore error:', stderr || err.message);
    res.send({Restore_error:stderr || err.message});
    return;
  }

  console.log('Restore completed successfully.');
   res.send(`Restore completed successfully.`);
});
});


app.use('/', postRoutes);


cron.schedule('32 15 * * *', () => { 
  console.log("Starting backup...");
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `backup-${timestamp}`);

  // Ensure backup folder exists
  fs.mkdirSync(backupPath, { recursive: true });

  // Use double quotes around the Windows path
  const cmd = `mongodump --uri="mongodb://localhost:27017/post-service" --out="${backupPath}"`;
  // console.log('cmd:', cmd);

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('Backup error:', stderr || err.message);
      return res.status(500).send(stderr || err.message);
    }

    console.log('Backup completed at:', backupPath);
    // res.send(`Backup created at: ${backupPath}`);
  });

});
