const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

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
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

// routes 
app.get('/',(req,res)=>{
  res.redirect('/blogs')
})

app.get('/about',(req,res)=>{
    res.render('about', {title: 'About'});
})

app.get('/blogs',(req,res)=>{
  Blog.find().sort({createdAt: -1})
  .then((result)=>{
   res.render('index',{title: 'All Blogs', blogs: result}) 
  })
  .catch((err)=>{
    console.log(err)
  })
})

app.post('/blogs',(req,res)=>{
  // console.log(req.body)
	const blog = new Blog(req.body)
	blog.save()
	.then((result)=>{
		res.redirect('/blogs')
	})
	.catch((err)=>{
		console.log(err)
	})
})

app.get('/blogs/create',(req,res)=>{
  res.render('create', {title: 'Create a new blog'})
})


app.get('/blogs/:id',(req,res)=>{
  const id = req.params.id
	// console.log(id);
	Blog.findById(id)
	.then((result)=>{
		res.render('details',{title: 'Blog details',blog: result})
	})
	.catch((err)=>{
		console.log(err);
	})
})

app.delete('/blogs/:id',(req,res)=>{
	const id = req.params.id
	Blog.findByIdAndDelete(id)
	.then(result=>{
		res.json({redirect: '/blogs'})
	})
	.catch((err)=>{
		console.log(err)
	})
})


app.use((req,res)=>{
  res.status(404).render('404', {title: 404})
})









