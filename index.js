var request = require("request");
var cheerio = require('cheerio');

request("http://www.worldometers.info/coronavirus", function(err, res, body){
	if (err) console.log("Erro: "+err);
	
	var $ = cheerio.load(body);
	const country = 'Brazil';
	
	rows = $("table#main_table_countries_today tbody tr");
    rows.each((i, elem) => {
        const row = [];
        $(elem).children("td").each((i, elem) => {
			
            //console.log($(elem).text())
            row.push($(elem).text().trim().replace(/,/g, ""))
			
        });
		
		//console.log(row[0])
		
        if (country.indexOf(row[0]) > -1) {
			var confirmed = row[1];
			var deaths = row[3];
			var recovered = row[5];
			var critical = row[7];
			console.log('Casos de Corona Virus (Covid-19) no Brasil:');
			console.log(`\nCasos confirmados: ${confirmed}\nCasos críticos: ${critical}\nMortes: ${deaths}\nRecuperados: ${recovered}`);
            
        }
	});
})