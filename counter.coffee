unorm = require 'unorm'
CSON = require 'CSON'

fs = require 'fs'
path = require 'path'

kammusues = CSON.load 'kammusu.cson'
aliases = CSON.load 'aliases.cson'
exclusions = CSON.load 'exclusions.cson'

Array::shuffle = ->
	i = @length
	while i
		j = Math.floor Math.random() * i
		t = @[--i]
		@[i] = @[j]
		@[j] = t
	return this

for alias, dest of aliases
	dest = [dest] if typeof dest is 'string'

for kammusu in kammusues
	aliases[kammusu] = [kammusu]

newAliases = {}

names = Object.keys aliases
names = names.map (name) ->
	newName = unorm.nfkc name
	newAliases[newName] = aliases[name]
	return newName
names.sort (a, b) -> b.length - a.length

aliases = newAliases

data = {}
total = {}
for from in kammusues
	data[from] = {}
	total[from] = 0
	for to in kammusues
		data[from][to] = 0

files = fs.readdirSync 'data'
for file in files
	file = path.join 'data', file
	console.log "Reading #{file}..."
	illusts = JSON.parse fs.readFileSync file
	for illust in illusts
		break if new Date(illust.create_date) < new Date('2014/04/01')

		characters = []
		texts = [
			illust.title
			illust.tag01
			illust.tag02
			illust.tag03
			illust.tag04
			illust.tag05
			illust.tag06
			illust.tag07
			illust.tag08
			illust.tag09
			illust.tag10
		]

		for text in texts
			text = unorm.nfkc text
			for exclusion in exclusions
				text = text.replace exclusion, ''
			while text.length > 0
				matched = false
				for name in names
					if text[0...name.length] is name
						matched = true
						characters = characters.concat aliases[name]
						text = text[name.length...]
						break
				if not matched
					text = text[1...]

		# Unique
		characters = characters.filter (character, index, self) -> self.indexOf(character) is index

		if characters.length >= 2
			for character in characters
				total[character]++

		for kammusuFrom, index in characters
			for kammusuTo in characters[0...index]
				data[kammusuFrom][kammusuTo] += 1 / (characters.length - 1)
				data[kammusuTo][kammusuFrom] += 1 / (characters.length - 1)

fs.writeFileSync 'relationship.json', JSON.stringify data
fs.writeFileSync 'total.json', JSON.stringify total
