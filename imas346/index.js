var width = 1000;
var height = 1000;

var svg = d3.select("body").append("svg")
	.attr("viewBox", '0 0 1000 1000')
	.attr("width", '100%')
	.attr("height", '100%');

for (const [attribute, color] of [['cool', '#3f51b5'], ['cute', '#e91e63'], ['passion', '#ff9800']]) {
	const radialGradient = svg.append("defs")
		.append("radialGradient")
		.attr("id", `${attribute}-gradient`);

	radialGradient.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", "#fff");

	radialGradient.append("stop")
		.attr("offset", "10%")
		.attr("stop-color", "#fff");

	radialGradient.append("stop")
		.attr("offset", "30%")
		.attr("stop-color", d3.color(color).darker(1).toString());

	radialGradient.append("stop")
		.attr("offset", "40%")
		.attr("stop-color", d3.color(color).darker(4).toString());

	radialGradient.append("stop")
		.attr("offset", "70%")
		.attr("stop-color", d3.color(color).darker(8).toString());

	radialGradient.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", "#000");
}

var force = d3.layout.force()
	.gravity(.05)
	.distance(100)
	.charge(-100)
	.size([width, height]);

const attributes = [
	["相川千夏", "cool"],
	["愛野渚", "passion"],
	["相葉夕美", "passion"],
	["相原雪乃", "cute"],
	["赤城みりあ", "passion"],
	["赤西瑛梨華", "cute"],
	["秋月律子", "cool"],
	["秋月涼", "passion"],
	["浅野風香", "cute"],
	["浅利七海", "cool"],
	["アナスタシア", "cool"],
	["安部菜々", "cute"],
	["天海春香", "cute"],
	["綾瀬穂乃香", "cool"],
	["荒木比奈", "cool"],
	["有浦柑奈", "cute"],
	["安斎都", "cute"],
	["イヴ・サンタクロース", "passion"],
	["五十嵐響子", "cute"],
	["池袋晶葉", "cute"],
	["伊集院惠", "cool"],
	["一ノ瀬志希", "cute"],
	["市原仁奈", "passion"],
	["今井加奈", "cute"],
	["井村雪菜", "cute"],
	["上田鈴帆", "passion"],
	["氏家むつみ", "cool"],
	["梅木音葉", "cool"],
	["江上椿", "cute"],
	["衛藤美紗希", "passion"],
	["海老原菜帆", "passion"],
	["及川雫", "passion"],
	["大石泉", "cool"],
	["太田優", "cute"],
	["大槻唯", "passion"],
	["大西由里子", "cute"],
	["大沼くるみ", "cute"],
	["大原みちる", "cute"],
	["岡崎泰葉", "cool"],
	["緒方智絵里", "cute"],
	["奥山沙織", "cute"],
	["乙倉悠貴", "cute"],
	["片桐早苗", "passion"],
	["我那覇響", "cute"],
	["上条春菜", "cool"],
	["神谷奈緒", "cool"],
	["川島瑞樹", "cool"],
	["神崎蘭子", "cool"],
	["菊地真", "cute"],
	["如月千早", "cool"],
	["岸部彩華", "cool"],
	["北川真尋", "passion"],
	["喜多日菜子", "passion"],
	["喜多見柚", "passion"],
	["木場真奈美", "cool"],
	["木村夏樹", "passion"],
	["キャシー・グラハム", "passion"],
	["桐野アヤ", "cool"],
	["桐生つかさ", "cool"],
	["日下部若葉", "cute"],
	["工藤忍", "cute"],
	["クラリス", "cute"],
	["栗原ネネ", "cute"],
	["黒川千秋", "cool"],
	["ケイト", "cool"],
	["古賀小春", "cute"],
	["輿水幸子", "cute"],
	["小関麗奈", "passion"],
	["小早川紗枝", "cute"],
	["小日向美穂", "cute"],
	["小松伊吹", "passion"],
	["小室千奈美", "cool"],
	["西園寺琴歌", "cute"],
	["財前時子", "passion"],
	["斉藤洋子", "passion"],
	["冴島清美", "passion"],
	["榊原里美", "cute"],
	["鷺沢文香", "cool"],
	["佐久間まゆ", "cute"],
	["櫻井桃華", "cute"],
	["佐々木千枝", "cool"],
	["佐城雪美", "cool"],
	["佐藤心", "passion"],
	["沢田麻理菜", "passion"],
	["椎名法子", "cute"],
	["塩見周子", "cool"],
	["四条貴音", "cool"],
	["篠原礼", "cool"],
	["渋谷凛", "cool"],
	["島村卯月", "cute"],
	["首藤葵", "passion"],
	["城ヶ崎美嘉", "passion"],
	["城ヶ崎莉嘉", "passion"],
	["白菊ほたる", "cute"],
	["白坂小梅", "cool"],
	["杉坂海", "passion"],
	["涼宮星花", "cute"],
	["関裕美", "cute"],
	["瀬名詩織", "cool"],
	["仙崎恵磨", "passion"],
	["相馬夏美", "passion"],
	["高垣楓", "cool"],
	["高槻やよい", "cute"],
	["高橋礼子", "cool"],
	["鷹富士茄子", "cool"],
	["高峯のあ", "cool"],
	["高森藍子", "passion"],
	["多田李衣菜", "cool"],
	["橘ありす", "cool"],
	["月宮雅", "cute"],
	["土屋亜子", "passion"],
	["東郷あい", "cool"],
	["道明寺歌鈴", "cute"],
	["十時愛梨", "passion"],
	["トレーナー", "trainer"],
	["長富蓮実", "cute"],
	["中野有香", "cute"],
	["ナターリア", "passion"],
	["並木芽衣子", "passion"],
	["成宮由愛", "cool"],
	["南条光", "passion"],
	["難波笑美", "passion"],
	["西川保奈美", "cool"],
	["西島櫂", "passion"],
	["新田美波", "cool"],
	["二宮飛鳥", "cool"],
	["丹羽仁美", "cute"],
	["野々村そら", "passion"],
	["萩原雪歩", "passion"],
	["服部瞳子", "cool"],
	["浜川愛結奈", "passion"],
	["浜口あやめ", "passion"],
	["早坂美玲", "cute"],
	["速水奏", "cool"],
	["原田美世", "cute"],
	["柊志乃", "cool"],
	["日高愛", "cute"],
	["日野茜", "passion"],
	["姫川友紀", "passion"],
	["兵藤レナ", "cute"],
	["福山舞", "cute"],
	["藤居朋", "cool"],
	["藤本里奈", "cute"],
	["藤原肇", "cool"],
	["双葉杏", "cute"],
	["双海亜美", "passion"],
	["双海真美", "passion"],
	["古澤頼子", "cool"],
	["ベテラントレーナー", "trainer"],
	["ヘレン", "cool"],
	["北条加蓮", "cool"],
	["星井美希", "passion"],
	["星輝子", "passion"],
	["堀裕子", "passion"],
	["本田未央", "passion"],
	["前川みく", "cute"],
	["槙原志保", "passion"],
	["マスタートレーナー", "trainer"],
	["松尾千鶴", "cool"],
	["松永涼", "cool"],
	["松原早耶", "cute"],
	["松本沙理奈", "cool"],
	["松山久美子", "passion"],
	["的場梨沙", "passion"],
	["間中美里", "cute"],
	["真鍋いつき", "passion"],
	["三浦あずさ", "cool"],
	["水木聖來", "cool"],
	["水谷絵理", "cool"],
	["水野翠", "cool"],
	["水本ゆかり", "cute"],
	["水瀬伊織", "passion"],
	["三船美優", "cool"],
	["三村かな子", "cute"],
	["宮本フレデリカ", "cute"],
	["三好紗南", "passion"],
	["向井拓海", "passion"],
	["棟方愛海", "cute"],
	["村上巴", "passion"],
	["村松さくら", "cute"],
	["メアリー・コクラン", "passion"],
	["持田亜里沙", "cute"],
	["望月聖", "cool"],
	["桃井あずき", "cute"],
	["森久保乃々", "cool"],
	["諸星きらり", "passion"],
	["楊菲菲", "cute"],
	["八神マキノ", "cool"],
	["矢口美羽", "passion"],
	["柳清良", "cute"],
	["柳瀬美由紀", "cute"],
	["大和亜季", "cool"],
	["結城晴", "cool"],
	["遊佐こずえ", "cute"],
	["横山千佳", "cute"],
	["吉岡沙紀", "cool"],
	["依田芳乃", "passion"],
	["ライラ", "cool"],
	["龍崎薫", "passion"],
	["ルーキートレーナー", "trainer"],
	["若林智香", "passion"],
	["脇山珠美", "cool"],
	["和久井留美", "cool"],
];

d3.json("graph.json", function (error, json) {
	if (error) throw error;

	json.links = json.links.filter(function (link) {
		return link.value > 0.03;
	});

	force
		.nodes(json.nodes)
		.links(json.links)
		.linkDistance(function (d) {
			return 1 / d.value + 20;
		})
		.linkStrength(function (d) {
			return d.value * 10;
		})
		.start();

	var link = svg.append('g').selectAll(".link")
		.data(json.links)
		.enter().append("line")
		.attr("class", "link")
		.attr('stroke', '#323d46')
		.style('mix-blend-mode', 'screen')
		.style("stroke-width", function (d) {
			return d.value * 20;
		});

	var node = svg.append('g').selectAll(".node")
		.data(json.nodes)
		.enter().append("g")
		.attr("class", "node")
		.call(force.drag);

	node.append("circle")
		.attr("class", "node")
		.attr("r", ({count}) => Math.log(count) * 3 - 6)
		.style("fill", ({name}) => `url(#${(attributes.find(([n]) => n === name) || [null, 'passion'])[1]}-gradient)`)
		.style('mix-blend-mode', 'screen')
		.style('z-index', '10')
		.attr("x", -8)
		.attr("y", -8)
		.attr("width", 16)
		.attr("height", 16)

	var label = svg.append('g').selectAll(".label")
		.data(json.nodes)
		.enter().append("g")
		.attr("class", "label")

	label.append("text")
		.attr("fill", "dimgray")
		.attr("font-size", "10")
		.attr("dx", 8)
		.attr("dy", ".35em")
		.style('mix-blend-mode', 'screen')
		.text(function(d) { return d.name });

	force.on("tick", function() {
		link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		label.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	});

	svg.append('image')
		.attr('href', 'london.svg')
		.attr('x', '-200')
		.attr('y', '-200')
		.attr('width', '1400')
		.attr('height', '1400')
		.style('pointer-events', 'none');

	svg.append('rect')
		.attr('x', '-450')
		.attr('y', '-450')
		.attr('width', '1900')
		.attr('height', '1900')
		.attr('fill', 'none')
		.attr('stroke', 'black')
		.attr('stroke-width', '500')
		.style('pointer-events', 'none');
});
