const mongoose = require('mongoose');

const dbConfig = (async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Database connected sucessfully...\n",
            connect.connection.host,
            connect.connection.name
        ); 

    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
});

module.exports = dbConfig;