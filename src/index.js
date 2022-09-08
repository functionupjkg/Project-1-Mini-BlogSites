const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Jyoti273-db:djukOqR9QbI5Itvc@cluster0.nzuylps.mongodb.net/Project1-MiniBlog-db", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route);

app.use(function (req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    return res.status(404).send({status : "404 ", msg : "Path not found"})
    });

// app.get('*', (req, res) =>{
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
    
// })

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


