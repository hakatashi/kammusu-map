CSON = require 'CSON'

kammusu = CSON.load 'kammusu.cson'
aliases = CSON.load 'aliases.cson'

for alias, names of aliases
	if typeof names is 'string'
		names = [names]

	for name in names
		if name not in kammusu
			throw new Error "#{name} is not kammusu"
