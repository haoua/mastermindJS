define(['params'], function (params) {

    return {
      displayResult : function (result) {
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
          if (params.nbProposition == 10) {
            displayLoose();
          }else{
            var audio = new Audio('sound/error.mp3');
            audio.play();
            var result = document.createElement("div");

            result.innerHTML = resHTML;

            document.getElementById("res_"+params.nbProposition).appendChild(result);
          }
          
        }

        // When result is display, remove submit button 
        var buttonSubmit = document.getElementById("submit");
        buttonSubmit.outerHTML = "";
        delete buttonSubmit;
      }
    }
});