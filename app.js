const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//Connect to mongodb
const MONGO_URI = 'mongodb+srv://Victor:Buckyoz@nodeexpressprojects.nbnlu.mongodb.net/create-blog?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI)
.then((result)=> app.listen(5000))
.catch((err)=>console.log(err))
//Register view engines
app.set('view engine','ejs');

//middleware and static files(images, css)
app.use(express.static('public'))

app.use(morgan('tiny'))  
app.get('/',(req,res)=>{
    const blogs = [
      {title: 'Victor finds eggs', snippet: 'Lorem ipsum dolor sit amet, consectetur'},
      {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet, consectetur'},
    {title: 'How to defeat browser', snippet: 'Lorem ipsum dolor sit amet, consectetur'}
    ]
  res.render('index', {title: 'Home',blogs});
})
app.get('/about',(req,res)=>{
  res.render('about', {title: 'About'});
})

app.get('/blogs/create',(req,res)=>{
  res.render('create', {title: 'Create a new blog'})
})

app.use((req,res)=>{
  res.status(404).render('404', {title: 404})
})









