const express = require('express');
const app = express();
app.set('view engine','ejs');

app.get('/',(req,res)=>{
  res.render('index');
})
app.get('/about',(req,res)=>{
  res.render('about');
})

app.use((req,res)=>{
  res.status(404).sendFile('./views/404.html',{root: __dirname})
})









app.listen(5000)