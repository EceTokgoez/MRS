const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConfig = require('./utils/dbConfig.js');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const shelfRoutes = require('./routes/shelfRoutes');


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;

//bağlantılar
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(errorHandler);
app.use('/uploads', express.static('uploads'));


//routes
app.use('/api/v1/auths', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/movies', movieRoutes);
app.use("/api/v1/shelves", shelfRoutes);



app.listen(PORT,'0.0.0.0', ()=>{
    dbConfig();
    console.log(`Server listening on http://192.168.0.110:${PORT}`);

})
