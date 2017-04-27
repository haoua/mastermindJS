define(['params'], function (params) {
	return {
	  add : function (color) {
	    // If user already set 4 colors
	    if (params.proposition.length != 4) {
	    	var pos = params.proposition.length+1;

	    	// document.getElementById(nbProposition+"_"+pos).innerHTML = colors[color];

	    	document.getElementById(params.nbProposition+"_"+pos).setAttribute("class", "button_colors "+params.colors[color]);

	    	params.proposition.push(params.colors[color]);

	    	// 4 colors are set, submit button appears
	    	if (params.proposition.length == 4) {
	    		var submitButton = document.createElement("div");
	    		var submitButtonContent = "<button>Soumettre</button>";

	    		submitButton.setAttribute("id", "submit");
	    		submitButton.setAttribute("onclick", "(function() { require('interface').submit() })()");

	    		submitButton.innerHTML = submitButtonContent;

	    		document.getElementById("button").appendChild(submitButton);
	    	}

	    	if (params.proposition.length == 1){
	    		var cancelButton = document.createElement("div");
	    		var cancelButtonContent = "<button>Annuler</button>";

	    		cancelButton.setAttribute("id", "cancel");
	    		cancelButton.setAttribute("onclick", "cancel()");

	    		cancelButton.innerHTML = cancelButtonContent;

	    		document.getElementById("button").appendChild(cancelButton);
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
	  		displayResult(res);					
	  	}


	  	params.nbProposition++;
	  	params.proposition = [];

	  	// If proposition is submited, no need for Cancel Button
	  	var cancelSubmit = document.getElementById("cancel");
	  	cancelSubmit.outerHTML = "";
	  	delete cancelSubmit;
	  }
	}
});