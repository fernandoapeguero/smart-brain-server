const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'nico',
        password : '2225',
        database : 'smart-brain'
        }
    });

const pg = require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public'],
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


// app.use(express.static(__dirname + './public'));

app.get('/' , (req , res) => {
    res.send(database.users);
    
});

app.post('/signin' , signin.handleSignin(db , bcrypt));

app.post('/register' , (req , res) => {register.handleRegister(req , res , db , bcrypt)});

app.get('/profile/:id' , (req, res) => { profile.handleProfileGet(req, res , db)});

app.put('/image' , (req , res) => { image.handleImagePut(req , res ,db)});

app.post('/imageUrl' , (req , res) => { image.handleApiCall(req , res)});


// Load hash from your password DB.

app.listen(3000 , () => {
    console.log('Runing smodly on port 3000');
});
/*
--> res = this is working
signin -- Post  = succes/fail 
register --> Post = user   
Profile/:userid --> Get = user 
image --> Put -- user 
*/ 