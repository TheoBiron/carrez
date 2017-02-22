var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var json = require('./meilleursagents.json');
var json2 = require('./leboncoin.json');
var deal = "";

	url = 'https://www.meilleursagents.com/prix-immobilier/#estimates';
	request(url, function(error, response, html){
		if(!error){
			console.log("OK");
			var $ = cheerio.load(html);

			json.city = $('#villes > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a').text().trim();

			json.priceApart = $('#villes > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(2)').text().trim();

			json.priceHouse = $('#villes > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(3)').text().trim();
			tmp = json.priceHouse.replace(/\D/g, "");
			json.priceHouse = parseInt(tmp);

			json.priceLocation = $('#villes > div:nth-child(2) > div > table > tbody > tr:nth-child(1) > td:nth-child(4)').text().trim();

		} else {
			console.log("Error" + error);
		}
		fs.writeFile('result_meilleursagents.json', JSON.stringify(json, null, 4), function(err){ 
		})
	})

	if (json2.properties.price / json2.properties.surfaceArea > json.priceHouse){
		//document.querySelector('.result').innerHTML = "Bad deal !";
		deal = "Bad deal !";
	}
	else{
		//document.querySelector('.result').innerHTML = "Good deal !";
		deal = "Good deal !";
	}
console.log(deal);

exports = module.exports;
