const JsonDB = require('node-json-db');
const db = new JsonDB("myDataBase", true, false);

let movies = db.getData('/movies');

module.exports = {
 read:function(req, res){
   if (req.query){
     var moviesToReturn = movies.map(e=>e);
     if (req.query.title){
       moviesToReturn = moviesToReturn.filter(
         e=>e.title.includes(req.query.title)
       )
     }
     if (req.query.sort){
       let sort = req.query.sort
       moviesToReturn.sort((a,b)=> b[sort] - a[sort])
     }
     if (req.query.novotes){
       moviesToReturn = moviesToReturn.filter(e=>e.votes === 0);
     }
     res.send(moviesToReturn);
   }else{
     res.send(movies);
   }
 },
 create:function(req, res, next){
   if (!req.body.title) return res.status(400).send("Must send a title")
   req.body.id = (movies[movies.length-1] ? movies[movies.length-1].id + 1 : 1);
   req.body.votes = 0;
   movies.push(req.body);
   res.send(movies);
   next();
 },
 update:function(req, res, next){
   let movieToEdit = movies.find((e)=> e.id == req.params.id );
   Object.assign(movieToEdit, req.body);
   res.send(movies);
   next();
 },
 delete:function(req, res, next){
   movies = movies.filter(e=>e.id!=req.params.id);
   res.send(movies);
   next();
 },
 vote:function (req, res, next){
   let movieToEdit = movies.find((e)=> e.id == req.params.id );
   movieToEdit.votes++;
   res.send(movieToEdit);
   next();
 },
 saveDb:function(req, res){
   db.push('/movies', movies);
 }
}
