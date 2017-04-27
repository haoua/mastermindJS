define(function() {
	return{
		colors : ['red', 'blue', 'green', 'yellow', 'orange', 'violet', 'brown', 'grey'],
		game : [],
		nbProposition : 1,
		proposition : [],
		level : 0,
		nbLevel : 3,
		data : "",
		reset : function () {
	        params.game = [];
			document.getElementById("game").innerHTML = "";
			document.getElementById("button").innerHTML = "";
			params.nbProposition = 1;

			// If not on mod extrem, empty is not needed anymore
			if(params.level != 3){
				var emptyPlace = params.colors.indexOf("empty");
				if (params.colors[emptyPlace] == "empty") {
					params.colors.splice(params.colors.indexOf("empty"), 1);
				}
			}
      }
	}
});
