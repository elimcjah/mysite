/**
 * Created by EliMcJah on 4/10/17.
 */
var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

var editor = ace.edit('javascript-editor');
editor.getSession().setMode('ace/mode/jade');
editor.setTheme('ace/theme/monokai');
