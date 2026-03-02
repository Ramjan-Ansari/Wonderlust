require("dotenv").config({ path: "../../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../listing.js");



let MONGO_URL = process.env.MONGODB_URL;
async function main() {
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{console.log("connected to DB")}).catch((err)=>{console.log(err)});

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner: "69a5241f70955866e3f12b48"}));
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
}

initDB();

