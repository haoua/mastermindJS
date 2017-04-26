
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


function init() {
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
		shootColor();
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
} // init()

function add(color){
	// If user already set 4 colors
	if (proposition.length != 4) {
		var pos = proposition.length+1;

		// document.getElementById(nbProposition+"_"+pos).innerHTML = colors[color];

		document.getElementById(nbProposition+"_"+pos).setAttribute("class", "button_colors "+colors[color]);

		proposition.push(colors[color]);

		// 4 colors are set, submit button appears
		if (proposition.length == 4) {
			var submitButton = document.createElement("div");
			var submitButtonContent = "<button>Soumettre</button>";

			submitButton.setAttribute("id", "submit");
			submitButton.setAttribute("onclick", "submit()");

			submitButton.innerHTML = submitButtonContent;

			document.getElementById("button").appendChild(submitButton);
		}

		if (proposition.length == 1){
			var cancelButton = document.createElement("div");
			var cancelButtonContent = "<button>Annuler</button>";

			cancelButton.setAttribute("id", "cancel");
			cancelButton.setAttribute("onclick", "cancel()");

			cancelButton.innerHTML = cancelButtonContent;

			document.getElementById("button").appendChild(cancelButton);
		}
	}
} // add(color)

function submit(){
	var res = [];
	for (var i = 0; i < proposition.length; i++) {					
		// Place is right, color is right
		if (proposition[i] == game[i]) {
			res.push(1);
		// Place is wrong, color is right, just somewhere else
		}else if(game.indexOf(proposition[i]) >= 0){
			res.push(2);
		// Color is not right for this game
		}else{
			res.push(0);
		}
	}

	if (level != 1) {
		shuffleResult(res);
	}else{
		displayResult(res);					
	}


	nbProposition++;
	proposition = [];

	// If proposition is submited, no need for Cancel Button
	var cancelSubmit = document.getElementById("cancel");
	cancelSubmit.outerHTML = "";
	delete cancelSubmit;

} // submit();

function displayResult(result) {
	var resHTML = "";
	var rightElement = 0;
	for (var i = 0; i < result.length; i++) {

		if (result[i] == 1) {
		resHTML = resHTML+"<span class='res_element res_red'></span>";
		rightElement++;
		}else if(result[i] == 2){
		resHTML = resHTML+"<span class='res_element res_white'></span>";
		}else{
		resHTML = resHTML+"<span class='res_element res_null'></span>";
		}

		if (i == 1) {
			resHTML = resHTML+'<br>';
		}
	}


	if (rightElement ==4) {
		displayWin();
	}else{
		if (nbProposition == 10) {
			displayLoose();
		}else{
			var audio = new Audio('sound/error.mp3');
			audio.play();
			var result = document.createElement("div");

			result.innerHTML = resHTML;

			document.getElementById("res_"+nbProposition).appendChild(result);
		}
		
	}

	// When result is display, remove submit button 
	var buttonSubmit = document.getElementById("submit");
	buttonSubmit.outerHTML = "";
	delete buttonSubmit;
} // displayResult(result);

function displayWin() {
	var audio = new Audio('sound/win.wav');
	audio.play();
	alert("you win !");

	displayAnswer();
} //displayWin();

function displayLoose() {
	var audio = new Audio('sound/lose.wav');
	audio.play();
	alert("you loose !");

	displayAnswer();
} //displayWin();

function reset() {
// If a new game is require and a gam was already set
	game = [];
	document.getElementById("game").innerHTML = "";
	document.getElementById("button").innerHTML = "";
	nbProposition = 1;
	if(level != 3){
		var emptyPlace = colors.indexOf("empty");
		if (colors[emptyPlace] == "empty") {
			colors.splice(colors.indexOf("empty"), 1);
		}
	}
} // reset()

function shootColor() {
// Setting Game Color

	var n = Math.floor(Math.random() * colors.length);
	var color = colors[n];

	// Prevent color from being twice in game
	if (game.indexOf(color) != -1) {
		shootColor();
	}else{
		game.push(color);
	}
} // shootColor()


function shuffleResult(res) { // Stackoverflox is my friend
// When level = 2 OR level = 3 > display result in random order

  var resIndex = res.length;

  // While res is not empty
  while (0 !== resIndex) {
    n = Math.floor(Math.random() * resIndex);
    resIndex -= 1;

    // And swap it with the current element.
    var temporaryValue = res[resIndex];
    res[resIndex] = res[n];
    res[n] = temporaryValue;

  }

  displayResult(res);
} // shuffleResult();



function cancel() {
// User clicked on cancel button

	for (var i = 4; i >= 1; i--) {

		// Fix nb for array
		propositionCell = i-1;

		// if something is set in proposition array, remove class of color
		if (proposition[propositionCell] != "") {
			var cell = document.getElementById(nbProposition+'_'+i);
			cell.classList.remove(proposition[propositionCell]);
		}
	}


	// array is now empty
	proposition = [];

	// Once proposition is cancel, remove cancel button
	var cancelSubmit = document.getElementById("cancel");
	cancelSubmit.outerHTML = "";
	delete cancelSubmit;
} // cancel()

function displayAnswer() {
	document.getElementById("a_1").innerHTML = "";
	document.getElementById("a_1").classList.add(game[0]);
	document.getElementById("a_1").classList.remove('hidden');

	document.getElementById("a_2").innerHTML = "";
	document.getElementById("a_2").classList.add(game[1]);
	document.getElementById("a_2").classList.remove('hidden');

	document.getElementById("a_3").innerHTML = "";
	document.getElementById("a_3").classList.add(game[2]);
	document.getElementById("a_3").classList.remove('hidden');

	document.getElementById("a_4").innerHTML = "";
	document.getElementById("a_4").classList.add(game[3]);
	document.getElementById("a_4").classList.remove('hidden');
}