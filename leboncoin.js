var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var json = require('./leboncoin.json');

	url = 'https://www.leboncoin.fr/ventes_immobilieres/1091024163.htm?ca=12_s';
	request(url, function(error, response, html){
		if(!error){
			console.log("OK");
			var $ = cheerio.load(html);

			json.title = $('#adview > section > header > h1').text().trim();

			json.author = $('#adview > aside > div > div.box-grey-light.mbs.align-center > p').text().trim();

			json.properties.price = $('#adview > section > section > section.properties.lineNegative > div:nth-child(5) > h2 > span.value').text().trim();
			tmp = json.properties.price.replace(/\D/g, "");
			json.properties.price = parseInt(tmp);

			json.properties.city = $('#adview > section > section > section.properties.lineNegative > div:nth-child(6) > h2 > span.value').text().trim();

			json.properties.type = $('#adview > section > section > section.properties.lineNegative > div:nth-child(7) > h2 > span.value').text().trim();

			json.properties.rooms = $('#adview > section > section > section.properties.lineNegative > div:nth-child(8) > h2 > span.value').text().trim();

			json.properties.surfaceArea = $('#adview > section > section > section.properties.lineNegative > div:nth-child(9) > h2 > span.value').text().trim();
			tmp = json.properties.surfaceArea.split(" ");
			json.properties.surfaceArea = parseInt(tmp[0]);

			json.properties.GES = $('#adview > section > section > section.properties.lineNegative > div:nth-child(10) > h2 > span.value').text().trim();

			json.properties.energyClass = $('#adview > section > section > section.properties.lineNegative > div:nth-child(11) > h2 > span.value').text().trim();

		} else {
			console.log("Error" + error);
		}
		fs.writeFile('result_leboncoin.json', JSON.stringify(json, null, 4), function(err){ 
		})
	})

exports = module.exports;
