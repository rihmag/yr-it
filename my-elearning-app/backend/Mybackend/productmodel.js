const mongoose = require('mongoose');
const {model, Schema} = mongoose;
mongoose.set('strictQuery', false); // Disable strict query mode
const productSchema = new Schema({
  name: {   type: String, required: true},
  price: {  type: Number, required: true},
    description: { type: String, required: true},
    category: { type: String, required: true},
    image: { type: String, required: true},   
})
const Product = model('Product', productSchema); // Create a model from the schema
module.exports = Product; // Export the Product model for use in other files
