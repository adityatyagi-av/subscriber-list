import http from 'http';
import { app } from './app.js';
import { connectDB } from './utils/connectDB.js';

app.listen(8000,()=>{
    console.log("Server is listening on 8000")
    connectDB()
})