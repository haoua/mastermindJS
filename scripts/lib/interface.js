define(['params', 'display'], function (params, display) {

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

	  display.displayResult(res);
	} // shuffleResult();


	return {
	  add : function (color) {
	    // If user already set 4 colors
	    if (params.proposition.length != 4) {
	    	var pos = params.proposition.length+1;

	    	document.getElementById(params.nbProposition+"_"+pos).setAttribute("class", "button_colors "+params.colors[color]);

	    	params.proposition.push(params.colors[color]);

	    	// 4 colors are set, submit button appears
	    	if (params.proposition.length == 4) {
	    		var submitButton = document.createElement("div");
	    		var submitButtonContent = "<button>Soumettre</button>";

	    		submitButton.setAttribute("id", "submit");
	    		submitButton.setAttribute("onclick", "(function() { require('interface').submit() })()");

	    		submitButton.innerHTML = submitButtonContent;

	    		document.getElementById("user_interface").appendChild(submitButton);
	    	}

	    	if (params.proposition.length == 1){
	    		var cancelButton = document.createElement("div");
	    		var cancelButtonContent = "<button>Remettre à zéro</button>";

	    		cancelButton.setAttribute("id", "cancel");
	    		cancelButton.setAttribute("onclick", "(function() { require('interface').cancel() })()");

	    		cancelButton.innerHTML = cancelButtonContent;

	    		document.getElementById("user_interface").appendChild(cancelButton);
	    	}
	    }
	  },
		submit : function () {
		  	var res = [];
		  	for (var i = 0; i < params.proposition.length; i++) {					
		  		// Place is right, color is right
		  		if (params.proposition[i] == params.game[i]) {
		  			res.push(1);
		  		// Place is wrong, color is right, just somewhere else
		  		}else if(params.game.indexOf(params.proposition[i]) >= 0){
		  			res.push(2);
		  		// Color is not right for this game
		  		}else{
		  			res.push(0);
		  		}
		  	}

		  	if (params.level != 1) {
		  		shuffleResult(res);
		  	}else{
		  		display.displayResult(res);					
		  	}


		  	params.nbProposition++;
		  	params.proposition = [];

		  	// If proposition is submited, no need for Cancel Button
		  	var cancelSubmit = document.getElementById("cancel");
		  	cancelSubmit.outerHTML = "";
		  	delete cancelSubmit;
		},
		cancel : function() {
			// User clicked on cancel button
			for (var i = 4; i >= 1; i--) {

				// Fix nb for array
				propositionCell = i-1;

				// if something is set in proposition array, remove class of color
				if (params.proposition[propositionCell] != "") {
					var cell = document.getElementById(params.nbProposition+'_'+i);
					cell.classList.remove(params.proposition[propositionCell]);
				}
			}


			// array is now empty
			params.proposition = [];

			// Once proposition is cancel, remove cancel button
			var cancelSubmit = document.getElementById("cancel");
			cancelSubmit.outerHTML = "";
			delete cancelSubmit;
		}
	}
});