const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./route/routes');
const cors = require('cors');
var multer  = require('multer');
app.use(cors(
  {
    origin: "http://localhost:4200"
  }
 
));
 

app.listen(3000,function check(err)
{
    if(err)
    console.log("error")
    else
    console.log("started")
});
 


mongoose.connect('mongodb://127.0.0.1:27017/gbs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});


app.use(express.json());
app.use(routes);





