const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const data = require("./data.js");



let mongoose_url = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(mongoose_url);
}
main().then(()=>{console.log("connected to DB")}).catch((err)=>{console.log(err)});

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner: "68289c7e00c1144042899238"}));
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
}

initDB();

