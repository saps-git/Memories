import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();
app.use(cors());

app.use(express.urlencoded({ limit: "30mb",  extended: true }));
app.use(express.json({ limit: "30mb",  extended: true }));

app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

const CONNECTION_URL = 'mongodb+srv://saps:saps123@cluster0.ry3ky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running at port ${PORT}`)))
    .catch((err) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false); //errros won't show up in the console