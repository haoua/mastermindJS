define(['params'], function (params) {

    return {
      shootColor : function () {
        var n = Math.floor(Math.random() * params.colors.length);
        var color = params.colors[n];

        // Prevent color from being twice in game
        if (params.game.indexOf(color) != -1) {
          shootColor();
        }else{
          params.game.push(color);

          return color;
        }
      }
    }
});