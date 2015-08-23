var width = 1000;
var height = 1000;

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

var force = d3.layout.force()
	.gravity(.05)
	.distance(100)
	.charge(-100)
	.size([width, height]);

d3.json("graph.json", function (error, json) {
	if (error) throw error;

	json.links = json.links.filter(function (link) {
		return link.value > 0.012;
	});

	force
		.nodes(json.nodes)
		.links(json.links)
		.linkDistance(function (d) {
			return 1 / d.value + 10;
		})
		.linkStrength(function (d) {
			return d.value * 10;
		})
		.start();

	var link = svg.selectAll(".link")
		.data(json.links)
		.enter().append("line")
		.attr("class", "link")
		.style("stroke-width", function (d) {
			return d.value * 80;
		});

	var node = svg.selectAll(".node")
		.data(json.nodes)
		.enter().append("g")
		.attr("class", "node")
		.call(force.drag);

	node.append("circle")
		.attr("class", "node")
		.attr("r", 8)
		.attr("fill", "red")
		.attr("x", -8)
		.attr("y", -8)
		.attr("width", 16)
		.attr("height", 16)

	node.append("text")
		.attr("dx", 8)
		.attr("dy", ".35em")
		.text(function(d) { return d.name });

	force.on("tick", function() {
		link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	});
});
