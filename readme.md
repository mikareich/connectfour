# Connect Four

A simple game engine for the game _"Connect four"_. The engine is very flexible and easy to extend, with the aim of programming virutelle players particularly simple.

## Initialization

To play _"Connect four"_, players must first be created and added. It is important that the players already have the method `turn` defined. To start the game, you just have to call the start method.

**Example:**

```js
const player1 = new Player("Player 1", "X")
const player2 = new Player("Player 2", "O")

player1.turn = ... // turn algorythm
player2.turn = ... // turn algorythm

const game = new Game([player1, player2])
game.start() // start the game
```

## Turn Algorythm

Each player's turn method is called by the game when it is the player's turn. The value returned represents the column in which the player wants to place his stone/symbol. If the column is already full, the player's method is called again. In the turn method itself, the game is passed as a parameter.

**Example:**

```js
player1.turn = (game) => {
  const randomCol = Math.floor(Math.random() * game.board.numberOfCols) // selects a random column
  return randomCol
}

// or...
player1.turn = Player.randomTurn
```

## Configure the game

To configure the game, you have to change the static property of the game class. It is important that this is done before the game initialization!

**Example:**

```js
// Configure the game
Game.CONFIGURATION = {
  ...Game.CONFIGURATION,
  rows: 4,
  cols: 10,
}

const game = new Game([player1, player2])
```
