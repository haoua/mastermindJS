# mastermindJS

A **Mastermind** game made in pure Javascript.

The aim is to guess the color combination that the computer makes. There’s 3 different level.

## Function

- Using RequireJS to load the splitted scripts
- Using JSON to load the load text

## Debug by beta Tester

- *'Bouton soumettre qui aime bien de temps en temps se dédoubler. Pourquoi je ne sais pas.'* Unable to recreate the bug

- *'Une petite liste de règle pour les personnes n'ayant jamais jouer(Moi notamment). Un peu de mal pour différencier l'aide => du au fait que peut-être je n'ai jamais jouer au jeu.'* Added more detailed rules w/ the JSON files

- *'C'est dommage de ne pas pouvoir modifier son choix une fois que tu as cliquer 4 fois.'* Button reset is set as soon as a player clicker on a color

- *'Tu ne peux pas changer de difficulté en milieux de partie sous peine de ne pas pouvoir choisir les pions maximum correspondant à la grille de difficulté. Ex : Tu choisis la diff difficile , tu choisis 2 pions, tu switch en facile. Et bien tu n'a le droit de choisir que 2 pions. Le changement de difficulté devrait reset le nombre de pions cliquable, je pense que ce serait plus pratique.'* Function to prevent player to change level during a game, adding a giving up button.

## Future dev
- Adding a timed mod
- The debug button is still here even after win or loose

## Problematics
- Setting up requireJS was a bit complicated
- Not enough time cause I changed my project in the middle of the week
- Last git commit didn't work (because of an other git proccess running but I can't find it), so I had to force the file in the master branch (so no merge).