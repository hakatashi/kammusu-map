const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const qs = require('querystring');
const fetch = require('fetch-retry');
const cheerio = require('cheerio');

(async () => {
	for (const year of [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]) {
		for (const i of Array(5000).keys()) {
			try {
				console.log(`Getting page ${i + 1} (year: ${year})`);

				await new Promise((resolve) => {
					setTimeout(resolve, 10 * 1000);
				});

				const res = await fetch(`https://www.pixiv.net/search.php?${qs.encode({
					word: 'アイドルマスター',
					s_mode: 's_tag',
					order: 'date',
					scd: `${year}-01-01`,
					ecd: `${year}-12-31`,
					p: i + 1,
				})}`, {
					headers: {
						cookie: `PHPSESSID=${process.env.PHPSESSID}`,
					},
					retries: 5,
					retryDelay: 1000,
				});
				const html = await res.text();
				const $ = cheerio.load(html);
				const json = $('#js-mount-point-search-result-list').attr('data-items');

				if (json === '[]') {
					break;
				}

				const data = JSON.parse(json);
				console.log('R-18:', data.filter(({tags}) => tags.includes('R-18')).length);

				await promisify(fs.writeFile)(path.join(__dirname, 'data', `${year}-${i.toString().padStart(4, '0')}.json`), json);
			} catch (error) {
				console.error('error:', error);
			}
		}
	}
})();
