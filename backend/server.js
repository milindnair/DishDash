import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); //less hackers know about our server

const port = 8080;

//http get request

app.get('/', (req, res) => {
    res.status(201).json("Home Get request");
});

//api routes
app.use('/api', router);

//start server only when have valid connection with db
connect().then(() => {
    try{
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch(err){
        console.log(err);
    }

}).catch((err) => {
    console.log("Invalid database connection");
});
