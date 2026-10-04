import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import connectDB from './db/index.js';
import {app} from './app.js'


connectDB()
.then(()=>{
    app.on('error',(err)=>{
        console.log("Error: ",err);
        throw err
    })
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on the port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed: ",err);
})