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
const methodOverride = require('method-override')

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected successfully to: ${mongoose.connection.name}`);
});
  
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
  
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

//setup complete ⬆️⬆️⬆️⬆️⬆️
  
  
  
app.get('/', async(req,res) =>{
  res.render('home.ejs')

})
  
app.get('/bookings/new', async (req,res) => {
    res.render('new.ejs')
})

app.get('/bookings', async(req,res) =>{
  let allReservations = await Photography.find()
  console.log('All Reservations:', allReservations)

  res.render('index.ejs', {
    allReservations: allReservations
    
  })

})

app.get('/bookings/:bookingId', async(req,res) =>{
  let singleBooking = await Photography.findById(req.params.bookingId)

  res.render('show.ejs', {
    singleBooking: singleBooking
    
  })

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
    res.redirect(`/bookings/`)

})

app.delete('/bookings/:bookingId', async (req,res)=>{
  await Photography.findByIdAndDelete(req.params.bookingId)
   res.redirect('/bookings')
})



app.get('/bookings/:bookingId/edit', async(req,res)=>{
    let foundBooking = await Photography.findById(req.params.bookingId)
    res.render('edit.ejs', {
        foundBooking: foundBooking
    })
})

app.get('bookings/:bookingId', async(req,res)=>{
  await Photography.findById(req.params.bookingId)
})

app.put('/bookings/:bookingId/', async (req, res)=>{
     const bookingsData = {}
    bookingsData.name = req.body.name
    bookingsData.email = req.body.email
    bookingsData.phone = req.body.phone
    bookingsData.reservationDate = req.body.reservationDate
    bookingsData.reservationPackage = req.body.reservationPackage




    console.log('REQ BODY ------>', req.body)
    await Fruit.findByIdAndUpdate(req.params.bookingId, bookingsData, {new: true})

    res.redirect(`/bookings/${req.params.bookingId}`)

})



  
//listing to port 3000 ⬇️⬇️⬇️⬇️⬇️
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
