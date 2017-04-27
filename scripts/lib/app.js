define(['shootColor', 'params', 'interface'], function (shootColor, params, interface) {  


  function loadJSON(file, callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };

    xobj.send(null);  
  }


  function load() {
    loadJSON("data.json", function(response) {
      // Once the file is loaded
      params.data = JSON.parse(response);
      document.getElementById("regles").innerHTML = "<p>"+params.data.rulesgeneral+"</p>";
      document.getElementById("regles_help").innerHTML = "<p>"+params.data.ruleshelp+"</p>";
      for (var i = 0; i <= params.nbLevel - 1; i++) {
        document.getElementById("regle_by_level").innerHTML = document.getElementById("regle_by_level").innerHTML + 'Pour le niveau <strong>'+params.data.rulesbylevel[i]['level']+'</strong> : '+params.data.rulesbylevel[i]['rule']+'<br>'; 
      }
    });
  }

  load();

  

  return{
    init : function () {
      var levelSelect = document.getElementById("level");
      params.level = levelSelect.options[levelSelect.selectedIndex].value;

      if (params.game.length > 0) {
        // if a game config is found, reset settings + display
        params.reset();
      }

      // Extreme mode can have a cell empty
      if (level == 3 && colors.indexOf("empty") == -1) {
        colors.push("empty");
      }

      // REAL INIT ---------------

      // Time to set the game to guess
      for (var i = 4; i >= 1; i--) {
        var c = shootColor.shootColor();
        if (c == -1) {
          shootColor.shootColor();
        }
      }

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
        var pattern = "<div class='clearfix'><div class='left'><span id='"+i+"_1'></span><span id='"+i+"_2'></span><span id='"+i+"_3'></span><span id='"+i+"_4'></span></div><span id='res_"+i+"' class='results left'></span></div>";

        prop.setAttribute("id", "proposition_"+i);
        prop.setAttribute("class", "proposition_row");

        prop.innerHTML = pattern;

        document.getElementById("game").appendChild(prop);
      }

      for (var i = params.colors.length - 1; i >= 0; i--) {
        var buttonColors = document.createElement("div");
        var pattern = params.colors[i];

        buttonColors.setAttribute("id", "button_"+i);
        buttonColors.setAttribute("onclick", "(function() { require('interface').add("+i+") })()");

        buttonColors.setAttribute("class", "button_colors "+pattern);

        if (pattern == "empty") {
          buttonColors.innerHTML = "vide";
        }


        document.getElementById("button").appendChild(buttonColors);

      }

      var giveUpButton = document.createElement("button");
      var giveUpButtonContent = "Abandonner";

      giveUpButton.setAttribute("id", "give_up");
      giveUpButton.setAttribute("onclick", "(function() { require('display').giveUp() })()");

      giveUpButton.innerHTML = giveUpButtonContent;

      document.getElementById("give_up_box").appendChild(giveUpButton);

      document.getElementById("level").disabled = true;
    }
  }
});