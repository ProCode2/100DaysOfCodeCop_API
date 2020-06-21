const express = require('express');
const {config, apiKey} = require('./config.js');
const db = require('knex')(config);
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());                                          app.use(cors());

const port = 3000;
app.get("/:apikey", (req, res) => {
	const { apikey } = req.params;
	if(apikey === apiKey){
	db.select('*').from('reports')
	.then(reports => res.json(reports))
	.catch(err => res.status(400).json("Something Went Wrong"));
	}
	else{
		res.json("Access Denied");
	}
	})

app.listen(port, () => {
	console.log('listening at ' + port);
})
