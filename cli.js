#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./src');

const cli = meow(`
	Usage
	  $ gitlog

	Options
		--name  Your name

	Examples
	  $ gitlog --name=Jane
	  Hello, Jane
`);

render(React.createElement(ui, cli.flags));
