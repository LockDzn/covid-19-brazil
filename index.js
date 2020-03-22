var axios = require("axios");
var cheerio = require('cheerio');

axios.get('http://www.worldometers.info/coronavirus') // Aqui é a página que pegaremos as informações
	.then((response) => {
		if(response.status === 200) {
				
			const country = 'Brazil'; // Aqui será o país que queremos as informações
				
			const html = response.data;
			const $ = cheerio.load(html); // Carregar a página com o cheerio 
				
			rows = $("table#main_table_countries_today tbody tr"); // Selecionando onde estão as informações que queremos
			rows.each((i, elem) => {
				const row = [];
				$(elem).children("td").each((i, elem) => {
					row.push($(elem).text().trim().replace(/,/g, "")) // Pegando os dados selecionados
				});
					
				if (country.indexOf(row[0]) > -1) { // Verificando se nos dados que pegamos tem o páis da const country
					// Se tiver o país nos dados ele vai listar as informações
					var confirmed = row[1]; // Confirmados
					var deaths = row[3]; // Mortes
					var recovered = row[5]; // Recuperados
					var critical = row[7]; // Críticos
						
					console.log('Casos de Corona Virus (Covid-19) no Brasil:');
					console.log(`\nCasos confirmados: ${confirmed}\nCasos críticos: ${critical}\nMortes: ${deaths}\nRecuperados: ${recovered}`);
				}
			})
		}
	}, (error) => console.log(err) );
