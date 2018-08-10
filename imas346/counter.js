const db = require('./firebase-export.json');
const byline = require('byline');
const fs = require('fs');
const {promisify} = require('util');
const {escapeRegExp, flatten, uniq} = require('lodash');
const {bigCombination} = require('js-combinatorics');

const names = Object.values(db.__collections__.characters).map(({name}) => name);
const namesRegexp = new RegExp(`(${names.map((name) => escapeRegExp(name)).join('|')})`, 'g');

const couplingNames = flatten(Object.values(db.__collections__.couplings).map(({names}) => names)).filter((name) => name !== '仮');
const couplingNamesMap = new Map(flatten(Object.values(db.__collections__.couplings).map((coupling) => coupling.names.map((name) => [name, coupling]))));
const couplingNamesRegexp = new RegExp(`(${couplingNames.map((name) => escapeRegExp(name)).join('|')})`, 'g');

const pairs = bigCombination(names, 2).toArray();
for (const pair of pairs) {
	pair.sort();
}

const pairsMapMap = new Map(uniq(pairs.map(([A]) => A)).map((key) => (
	[key, new Map(pairs.filter(([A]) => A === key).map((pair) => [pair[1], pair]))]
)));

const characterCounter = new Map(names.map((name) => [
	name,
	[0, 0, 0], // all occurence, occurence by only two pair, weighed occurence
]));
const pairCounter = new Map(pairs.map((pair) => [
	pair,
	[0, 0, 0], // all occurence, occurence by only two pair, weighed occurence
]));

const reader = fs.createReadStream('illusts.txt');
const splitter = byline.createStream();

const getWeigh = (size) => {
	if (size === 1) {
		return 0;
	}

	if (size === 2) {
		return 2;
	}

	return 1 / size;
}

reader.pipe(splitter);
splitter.on('data', async (line) => {
	const data = JSON.parse(line);
	const characters = new Set();

	for (const tag of data.tags) {
		{
			const matches = tag.match(namesRegexp) || [];
			for (const match of matches) {
				characters.add(match);
			}
		}

		{
			const matches = tag.match(couplingNamesRegexp) || [];
			for (const match of matches) {
				const coupling = couplingNamesMap.get(match)
				const character1 = db.__collections__.characters[coupling.character1.value.split('/')[1]];
				const character2 = db.__collections__.characters[coupling.character2.value.split('/')[1]];
				characters.add(character1.name);
				characters.add(character2.name);
			}
		}
	}

	for (const character of characters) {
		const [count, pairCount, weighedCount] = characterCounter.get(character);
		characterCounter.set(character, [
			count + 1,
			pairCount + (characters.size === 2 ? 1 : 0),
			weighedCount + getWeigh(characters.size),
		]);
	}

	if (characters.size >= 2) {
		for (const sortedPair of bigCombination(Array.from(characters), 2).toArray()) {
			sortedPair.sort();
			const pair = pairsMapMap.get(sortedPair[0]).get(sortedPair[1]);
			if (pair === undefined) {
				throw new Error();
			}
			const [count, pairCount, weighedCount] = pairCounter.get(pair);
			pairCounter.set(pair, [
				count + 1,
				pairCount + (characters.size === 2 ? 1 : 0),
				weighedCount + getWeigh(characters.size),
			]);
		}
	}
});

splitter.on('end', async () => {
	await promisify(fs.writeFile)('characters-count.csv', [...characterCounter.entries()].map((count) => count.join(',')).join('\n'));
	await promisify(fs.writeFile)('characters-count.json', JSON.stringify([...characterCounter.entries()]));
	await promisify(fs.writeFile)('pair-count.csv', [...pairCounter.entries()].map((count) => count.join(',')).join('\n'));
	await promisify(fs.writeFile)('pair-count.json', JSON.stringify([...pairCounter.entries()]));
});
