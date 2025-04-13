import mongoose from 'mongoose';

const Productstructure = new mongoose.Schema({
    category: String,
    name: String,
    price:Number,
    discription: String,
    pic: {type: String}
   
});

const Productstructuremodel = mongoose.model("ProductData", Productstructure);
export default Productstructuremodel;