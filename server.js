const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
  
const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const Fruit = require("./models/photography.js");
const Photography = require("./models/photography.js");

const app = express();
  
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected successfully to: ${mongoose.connection.name}`);
});
  
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
  
app.use(express.urlencoded({ extended: false }));
//setup complete ⬆️⬆️⬆️⬆️⬆️
  
  
  
app.get('/', async(req,res) =>{
  res.render('home.ejs')
})
  
app.get('/photography/new', async (req,res) => {
    res.render('new.ejs')
})

// POST --> Create a new photography booking in the DB
app.post('/photography', async (req, res)=>{
    const photographyData = {}
    photographyData.name = req.body.name
    photographyData.email = req.body.email
    photographyData.phone = req.body.phone
    photographyData.reservationDate = req.body.reservationDate
    photographyData.reservationPackage = req.body.reservationPackage
    
    

    let bookedSession = await Photography.create(photographyData)
    res.redirect('/')
})



  
//listing to port 3000 ⬇️⬇️⬇️⬇️⬇️
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
