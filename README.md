# Sentiment Measuring App
> Choose whatever topic you want and see what twitter-sphere thinks about it right now!

## Table of contents
* [General info](#general-info)
* [Live demo](#live-demo)
* [Setup](#setup)
* [Features](#features)
* [Inspiration](#inspiration)
* [Legal](#legal)


## General info
It's a Node.js app, powered by Express and Pug as a template engine.\
A big part of it is of course Twitter API and a Sentiment module from https://github.com/thisandagain/sentiment .

## Live demo
Demo is availeable on Glitch! \
https://righteous-thin-spark.glitch.me


## Setup
To use Twitter API you need to obtain a set of keys by registering your Twitter developer account.\
You need Node.js and a package manager, I use NPM.\
Clone this repo to your desktop and run `npm install` in it's root directory to install all the dependencies.\
Input you consumer_key, consumer_secret and access_token_key, access_token_secret.\
After that run `node server.js`.\
Then you'll be able to access the app in your browser at localhost:3000


## Features
* Analyzig live feed from Twitter!
* Emoji reactions for given sentiment!
* Check any topic!

## Inspiration
Inspired by a great overview: https://node-bloggers.gitbooks.io/nodejs-and-twitter-s-stream-api/content/

## Legal
Work under the standard MIT license.
