CSON = require 'CSON'
fs = require 'fs'

relationship = require './relationship.json'
total = require './total.json'
kammusues = CSON.load './kammusu.cson'

for from, relation of relationship
	for to of relation
		relation[to] /= Math.min(total[to], total[from]) * 2

kammusues = kammusues.filter (kammusu) -> total[kammusu] > 20

nodes = []
links = []

for kammusu, index in kammusues
	nodes.push
		name: kammusu
		index: index

for from, fromIndex in kammusues
	for to, toIndex in kammusues[...fromIndex]
		links.push
			source: fromIndex
			target: toIndex
			value: relationship[from][to]

fs.writeFileSync 'graph.json', JSON.stringify nodes: nodes, links: links
