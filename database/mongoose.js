const mongoose = require('mongoose');

async function main() {
        // await mongoose.connect('mongodb://localhost:27017/todo');
        await mongoose.connect('mongodb+srv://Ahmed:mody2022@cluster0.bjhxv.mongodb.net/Mylo-Do?retryWrites=true&w=majority');
        console.log("connected to database successfully");
}

main().catch(err => console.log(err));
