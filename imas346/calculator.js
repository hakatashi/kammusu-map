const characterCounter = require('./characters-count.json');
const pairCounter = require('./pair-count.json');

const characters = characterCounter.filter(([name]) => (
	![
		'武内P',
		'我那覇響',
		'萩原雪歩',
		'菊地真',
		'四条貴音',
		'天海春香',
		'水瀬伊織',
		'高槻やよい',
		'双海亜美',
		'双海真美',
		'如月千早',
		'星井美希',
		'三浦あずさ',
		'秋月律子',
		'秋月涼',
		'日高愛',
		'水谷絵理',
	].includes(name)
))

const pairs = pairCounter.filter(([[nameA, nameB]]) => (
	characters.some(([name]) => name === nameA) && characters.some(([name]) => name === nameB)
	&& (nameA !== '道明寺歌鈴' || nameB !== '鷹富士茄子')
	&& (nameA !== '吉岡沙紀' || nameB !== '高橋礼子')
	&& (nameA !== '三船美優' || nameB !== '市原仁奈')
));

const counts = new Map(characterCounter);

if (process.argv.includes('test')) {
	console.log(pairs.map(([pair, [count, pairCount, weighedCount]]) => (
		[
			pair[0],
			pair[1],
			count,
			counts.get(pair[0])[0],
			counts.get(pair[1])[0],
			pairCount,
			counts.get(pair[0])[1],
			counts.get(pair[1])[1],
			weighedCount,
			counts.get(pair[0])[2],
			counts.get(pair[1])[2],
			count / counts.get(pair[0])[0] / counts.get(pair[1])[0] * 1e6 || 0,
			count / (counts.get(pair[0])[0] + counts.get(pair[1])[0] - count) * 1e6 || 0,
			count / (counts.get(pair[0])[0] + counts.get(pair[1])[0]) * 1e6 || 0,
			count / Math.min(counts.get(pair[0])[0], counts.get(pair[1])[0]) * 1e6 || 0,
			pairCount / counts.get(pair[0])[1] / counts.get(pair[1])[1] * 1e6 || 0,
			pairCount / (counts.get(pair[0])[1] + counts.get(pair[1])[1] - pairCount) * 1e6 || 0,
			pairCount / (counts.get(pair[0])[1] + counts.get(pair[1])[1]) * 1e6 || 0,
			pairCount / Math.min(counts.get(pair[0])[1], counts.get(pair[1])[1]) * 1e6 || 0,
			weighedCount / counts.get(pair[0])[2] / counts.get(pair[1])[2] * 1e6 || 0,
			weighedCount / (counts.get(pair[0])[2] + counts.get(pair[1])[2] - weighedCount) * 1e6 || 0,
			weighedCount / (counts.get(pair[0])[2] + counts.get(pair[1])[2]) * 1e6 || 0,
			weighedCount / Math.min(counts.get(pair[0])[2], counts.get(pair[1])[2]) * 1e6 || 0,
		].join(',')
	)).join('\n'));
}

if (process.argv.includes('graph')) {
	console.log(JSON.stringify({
		nodes: characters.map(([character], i) => ({
			name: character,
			index: i,
			count: counts.get(character)[0],
		})),
		links: pairs.map(([pair, [, , weighedCount]]) => ({
			source: characters.findIndex(([character]) => character === pair[0]),
			target: characters.findIndex(([character]) => character === pair[1]),
			value: weighedCount / (counts.get(pair[0])[2] + counts.get(pair[1])[2] - weighedCount) || 0,
		})),
	}, null, '  '));
}
