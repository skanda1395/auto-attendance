const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const job = require("./login");
const CronJob = require('cron').CronJob;
require('dotenv').config();
let subscription;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

webpush.setVapidDetails('mailto:skanda1395@gmail.com', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);


app.get("/", (req, res) => {
  res.sendFile(process.cwd() + '/index.html');
});

app.get("/client.js", (req, res) => {
  res.sendFile(process.cwd() + '/client.js');
});

app.get("/service.js", (req, res) => {
  res.sendFile(process.cwd() + '/service.js');
});

//subscribe route
app.post('/subscribe', (req, res)=>{
  subscription = req.body;
  console.log(subscription);
  res.status(201).json({})
  const payload = JSON.stringify({title: 'Subscribed!' });

  webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
});

function test() {
  const payload = JSON.stringify({title: '1 min notification' });
  webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
}

app.listen(port, ()=>{
  console.log(`server started on ${port}`);
  const job = new CronJob("* * * * *", test, null, false, "Asia/Kolkata");
  job.start();
});