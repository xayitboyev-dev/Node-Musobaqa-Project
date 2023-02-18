const mongoose = require("mongoose");

module.exports = async (url) => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(url);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log(error);
        process.exit();
    };
};