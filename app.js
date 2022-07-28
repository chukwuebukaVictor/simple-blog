const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

const app = express();

//Connect to mongodb
const MONGO_URI = 'mongodb+srv://Victor:Buka@nodeexpressprojects.nbnlu.mongodb.net/create-blog?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI)
.then((result)=> app.listen(5000))
.catch((err)=>console.log(err))
//Register view engines
app.set('view engine','ejs');

//middleware and static files(images, css)
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

// routes 
app.get('/',(req,res)=>{
  res.redirect('/blogs')
})

app.get('/about',(req,res)=>{
    res.render('about', {title: 'About'});
})

//blog routes
app.use('/blogs',blogRoutes)



app.use((req,res)=>{
  res.status(404).render('404', {title: 404})
})









