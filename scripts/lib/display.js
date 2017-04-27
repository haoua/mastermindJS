define(['params'], function (params) {

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

  function displayAnswer() {
    // When result is display, remove submit button 
    var buttonSubmit = document.getElementById("give_up_box");
    buttonSubmit.outerHTML = "";
    delete buttonSubmit;


    document.getElementById("a_1").innerHTML = "";
    document.getElementById("a_1").classList.add(params.game[0]);
    document.getElementById("a_1").classList.remove('hidden');

    document.getElementById("a_2").innerHTML = "";
    document.getElementById("a_2").classList.add(params.game[1]);
    document.getElementById("a_2").classList.remove('hidden');

    document.getElementById("a_3").innerHTML = "";
    document.getElementById("a_3").classList.add(params.game[2]);
    document.getElementById("a_3").classList.remove('hidden');

    document.getElementById("a_4").innerHTML = "";
    document.getElementById("a_4").classList.add(params.game[3]);
    document.getElementById("a_4").classList.remove('hidden');
  }



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

      if (rightElement == 4) {
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
    },
    giveUp : function() {
      // alert("Vous voulez vraiment abandonner ?");
      if (confirm('Êtes-vous sûr de vouloir abandonner ?')) {
        displayLoose();
      }
    }
  }
});