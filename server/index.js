import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
dotenv.config();

app.use(express.urlencoded({ limit: "30mb",  extended: true }));
app.use(express.json({ limit: "30mb",  extended: true }));

app.use('/posts', postRoutes);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hello, this is memories API');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running at port ${PORT}`)))
    .catch((err) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false); //errros won't show up in the console