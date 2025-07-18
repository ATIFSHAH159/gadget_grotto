import mongoose from 'mongoose';

const Productstructure = new mongoose.Schema({
    category: String,
    name: String,
    price: Number,
    discription: String,
    pic: {type: String},
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    costPrice: { type: Number, default: 0 },
    sellingPrice: { type: Number },
});

const Productstructuremodel = mongoose.model("ProductData", Productstructure);
export default Productstructuremodel;