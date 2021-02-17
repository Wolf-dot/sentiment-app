require('dotenv').config();
const express = require("express");
const Sentiment = require("sentiment");
const Pug = require("Pug");
const bodyParser = require("body-parser");
const twitter = require("ntwitter");
const { response } = require('express');


var sentiment = new Sentiment();

var app = express();

var twit = new twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.use(express.static('images'));

let streamParameters = {'track': 'cats'};
let sentiment_avrg = [0,0];

app.get('/', (req,res)=>{
    res.render('index');
})

app.post('/getphrase', (req,res)=>{
    streamParameters = {'track': req.body.phrase};
    twit.verifyCredentials(async (err, data)=>{
        if(err){
            throw err;
        }else{
            console.log("hello, " + data.name + " im in your tweets.");
            streamTwits(streamParameters)
            .then(avrg => res.render('index', {verdict: sentimentMeasurment(avrg)}))
            .catch(err => console.error(err))
            sentiment_avrg = [0,0];
        }
    });
})

var server = app.listen(5050, ()=>{
    console.log("server is running on port 5000");
});

const streamTwits  = (streamParameters)=>{
    return new Promise((resolve,reject)=>{
        twit.stream('statuses/filter', streamParameters, (stream) =>{
            stream.on('data', (data)=>{
                if(data.lang == 'en'){
                    if(sentiment_avrg[1] <= 20){
                        let result = sentiment.analyze(data.text);
                        sentiment_avrg[0] += result.score;
                        sentiment_avrg[1] += 1;
                        console.log(sentiment_avrg[1]);
                    }else{
                        let avrg = (sentiment_avrg[0]/sentiment_avrg[1]);
                        resolve(avrg);
                    }
                }
            });
            stream.on('error', (error)=>{
                if (error.code === 'ETIMEDOUT') {
                    stream.emit('timeout');
                }
                console.log(error);
                console.log(error.code);
                throw error;
            });
            return stream;  
        });
    })
}

function sentimentMeasurment(avrg){
    if(avrg > 0.5){
        return "\u{1F601}"; //smileyface
    }else if(avrg < 0.5){
        return "\u{1F620}"; //angryface
    }else {
        return "\u{1F610}"; //neutralface
    }
}
