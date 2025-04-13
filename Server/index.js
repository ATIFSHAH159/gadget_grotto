import mongoose from "mongoose";
import cors from 'cors';
import express from 'express';
import bodyParser from "body-parser";
import Products from './Routes/ProductsRoutes.js';

const app = express();

const url="mongodb+srv://mutahaar123:9lZgGxeqLyQHwjOd@cluster0.srjauqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(url)
.then(()=>console.log("connected to database"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded ({extended:true}));
app.use("/Admin/AddProducts",Products);
app.use('/Images',express.static('Images'));
app.use('/', Products);
app.use("/Admin/ViewProducts",Products);




// Start server on port 5000
const Port = 5000
app.listen(Port, () => {
    console.log(`Server is running on port: ${Port}`);
});