var express = require ('express');
var app =express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "",
  database:'projetbasket'
});

con.connect((err)=>{
	if(err){
		throw err;
	}
	console.log("Mysql connected");
});

app.get('/api/Positions',(req,res)=>{
	let sql = 'SELECT t.* from Position t';
	let query = con.query(sql,(err,results)=>{
		if(err) throw err;
		console.log(results);
		res.json(results);
	});
});


app.get('/api/Players',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin', '*');
	let sql = 'SELECT t.* from Joueurs t';
	let query = con.query(sql,(err,results)=>{
		if(err) throw err;
		console.log(results);
		res.json(results);
	});
});
app.post('/api/Players',(req,res)=>{
	var body =req.body;
	var retourn;
	console.log(body[0]['Team'] );
    if(body[0]['Nom'] !="" && body[0]['Prenom'] !=""+body[0]['Degree'] !="")
	{		
		let sql = 'INSERT INTO Joueurs (Nom,Prenom,Degree) VALUES( "'+body[0]['Nom']+'", "'+body[0]['Prenom']+'",'+body[0]['Degree']+')';
		let query = con.query(sql,(err,results)=>{
			if(err) throw err;
			console.log(results);
			retourn = "Joueurs ajouté";
			
		});
	}
	else
	{
		res.send('informations manquantes');
	}
	
	if(body[0]['Team'] !=null &&body[0]['Position'])
	{
		
		var JoueursID;
		let sql = 'SELECT t.ID from Joueurs t WHERE t.nom = "'+body[0]['Nom']+'" AND Prenom = "'+body[0]['Prenom'] +'" and t.Degree = '+body[0]['Degree'];
		let query = con.query(sql,(err,id)=>{
			if(err) throw err;
			console.log("init");
			console.log(id);
			JoueursID= id[0]['ID'];
			let sqlTeamJoueurs = 'INSERT INTO PosEquipeJoueur (idJoueur,idEquipe,IdPosition) VALUES( '+id[0]['ID']+', '+body[0]['Team']+','+body[0]['Position']+')';
			console.log(sqlTeamJoueurs);
			let queryInsertTeam = con.query(sqlTeamJoueurs,(err,idteam)=>{
				if(err) throw err;
				console.log(idteam);
				retourn = retourn + " lien avec equipe fait";
				
		    });
		});
		console.log("log");
		console.log(JoueursID);
	             
	}
	res.send("");
		
});
app.get('/api/DeleteTeamPlayers/:idPlayer/:idTeam',(req,res)=>{
	let id = req.params.idPlayer; 
	let idTeam = req.params.idTeam;
	console.log(id);
	console.log(idTeam);
	let sql = 'DELETE FROM JoueursEquipe WHERE idJoueur ='+id+' AND idEquipe ='+idTeam;
	console.log(sql);
	let query = con.query(sql,(err,results)=>{
		if(err) throw err;
		console.log(results);
		res.send('Delete réussi');
	});
});
app.get('/api/TeamPlayers/:idTeam',(req,res)=>{
	let id = req.params.idTeam; 
	console.log(id);
	let sql = 'SELECT t.* from JoueursEquipe t where t.idEquipe = '+id;
	let query = con.query(sql,(err,results)=>{
		if(err) throw err;
		console.log(results);
		res.json(results);
	});
});

app.listen('4000',()=>{
	
console.log('running on port 3000....');
	
});



app.get('/api/TeamPlayers/:idTeam',(req,res)=>{
	let id = req.params.idTeam; 
	console.log(id);
	let sql = 'SELECT t.* from JoueursEquipe t where t.idEquipe = '+id;
	let query = con.query(sql,(err,results)=>{
		if(err) throw err;
		console.log(results);
		res.json(results);
	});
});

app.listen('3000',()=>{
	
console.log('running on port 3000....');
	
});

//C:\mongodb\bin\mongod.exe
//nodemon
//C:\mongodb\bin\mongo.exe