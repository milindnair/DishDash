import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();


app.use(express.json({ limit: '10mb' })); // Increase payload size limit to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

app.get('/', (req, res) => {
  res.status(201).json('Home Get request');
});

app.use('/api', router);

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('Invalid database connection');
  });
