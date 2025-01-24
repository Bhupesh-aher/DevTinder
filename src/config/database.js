const mongoose = require('mongoose')



const connectDB = async () => {
     await mongoose.connect("mongodb+srv://NamsteDevS1:YCvvqEOilLftfHDB@namstenodejs.idl3x.mongodb.net/devTinder");
}

module.exports = connectDB;
 // minesters