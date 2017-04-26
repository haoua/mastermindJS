define(function () {
  
  function shootColor() {
  	var n = Math.floor(Math.random() * colors.length);
  	var color = colors[n];

  	// Prevent color from being twice in game
  	if (game.indexOf(color) != -1) {
  		shootColor();
  	}else{
  		game.push(color);

  		return color;
  	}
  }

  return {
    color: color
  }
});