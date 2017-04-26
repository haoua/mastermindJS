define(['shootColor'], function (shootColor) {

	var shootColor = require('shootColor');
 
    function initialize() {
        var colors = [
        	'red',
        	'blue',
        	'green',
        	'yellow',
        	'orange',
        	'violet',
        	'brown',
        	'grey'
        ];

        var game = [];

        var nbProposition = 1;
        var proposition = [];

        var level = 0;

        var levelSelect = document.getElementById("level");
        level = levelSelect.options[levelSelect.selectedIndex].value;

        if (game.length > 0) {
        	// if a game config is found, reset settings + display
        	reset();
        }

        // Extreme mode can have a cell empty
        if (level == 3 && colors.indexOf("empty") == -1) {
        	colors.push("empty");
        }



        // REAL INIT ---------------
        for (var i = 4; i >= 1; i--) {
        	shootColor;
        	game.push(shootColor.color);
        }

        console.log(game);

        document.getElementById("a_1").innerHTML = "?";
        document.getElementById("a_1").setAttribute("class", "hidden button_colors");
        document.getElementById("a_2").innerHTML = "?";
        document.getElementById("a_2").setAttribute("class", "hidden button_colors");
        document.getElementById("a_3").innerHTML = "?";
        document.getElementById("a_3").setAttribute("class", "hidden button_colors");
        document.getElementById("a_4").innerHTML = "?";
        document.getElementById("a_4").setAttribute("class", "hidden button_colors");

        for (var i = 10; i >= 1; i--) {
        	var prop = document.createElement("div");
        	var pattern = i+" - <span id='"+i+"_1'></span><span id='"+i+"_2'></span><span id='"+i+"_3'></span><span id='"+i+"_4'></span><span id='res_"+i+"' class='results'></span>";

        	prop.setAttribute("id", "proposition_"+i);

        	prop.innerHTML = pattern;

        	document.getElementById("game").appendChild(prop);
        }

        for (var i = colors.length - 1; i >= 0; i--) {
        	var buttonColors = document.createElement("div");
        	var pattern = colors[i];

        	buttonColors.setAttribute("id", "button_"+i);
        	buttonColors.setAttribute("onclick", "add("+i+")");
        	buttonColors.setAttribute("class", "button_colors "+pattern);

        	if (pattern == "empty") {
        		buttonColors.innerHTML = "vide";
        	}

        
        	document.getElementById("button").appendChild(buttonColors);

        }
    }
 
    return {
        initialize: initialize
    };
 
});