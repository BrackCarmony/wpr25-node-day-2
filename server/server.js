const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const movieCtrl = require('./controllers/movieCtrl');

app.use(bodyParser.json());

function logUrl(req, res, next){
  console.log(req.url);
  next();
}

app.get('/api/movies', movieCtrl.read)
app.post('/api/movies', movieCtrl.create, movieCtrl.saveDb)
app.put('/api/movies/:id', movieCtrl.update, movieCtrl.saveDb)
app.delete('/api/movies/:id', movieCtrl.delete, movieCtrl.saveDb )
app.patch('/api/movies/vote/:id',movieCtrl.vote, movieCtrl.saveDb)

app.listen(3000, ()=>{
  console.log("Listening on port 3000");
})
