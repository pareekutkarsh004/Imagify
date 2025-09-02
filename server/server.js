import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
const PORT = process.env.PORT || 4000;

const app = express();
await connectDB();
app.use(express.json());
app.use(cors());

app.get('/',(req, res)=>
res.send('API working fine!!')
);

app.listen(PORT, ()=>
console.log(`Server running on PORT ${PORT}`)
);


