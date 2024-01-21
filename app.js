import express from 'express';
import router from './router/router.js';
import { connectToDB } from './config/db.js';
import { subscribeEvent } from './controller/AppController.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('App is working');
});
app.use('/api/v1', router);
subscribeEvent();
// setInterval(() => {
// },3000);
app.listen(3000, () => {
    console.log('App is working on port 3000');
});

