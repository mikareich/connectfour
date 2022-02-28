import Game from "../Game"
import Player from "../../Player"
import Board from "../Board"
import { defaultConfiguration, testConfiguration } from "../../configuration"
import isWon from "../utils/isWon"

describe("Game initialisation", () => {
  test("Game configuration applies on board configuration", () => {
    Game.CONFIGURATION = {
      ...Game.CONFIGURATION,
      cols: 9,
      rows: 3,
    }

    const game = new Game([])

    expect(game.board.numberOfCols).toBe(9)
    expect(game.board.numberOfRows).toBe(3)
  })

  test("Game configuration applies on player configuration", () => {
    Game.CONFIGURATION = {
      ...Game.CONFIGURATION,
      cols: 12,
      rows: 14,
    }

    const game = new Game([
      new Player("Player 1", "X"),
      new Player("Player 2", "O"),
    ])

    expect(Player.CONFIGURATION.cols).toBe(12)
    expect(Player.CONFIGURATION.rows).toBe(14)
  })
  test("Players are initalized", () => {
    const player1 = new Player("Bot 1", "X")
    const player2 = new Player("Bot 2", "O")

    const game = new Game([player1, player2])

    expect(game.players.length).toBe(2)
  })
})

describe("Game logics", () => {
  test("Turn is executed", () => {
    Game.CONFIGURATION = testConfiguration

    const player1 = new Player("Bot 1", "X")
    const player2 = new Player("Bot 2", "O")

    player1.turn = Player.randomTurn
    player2.turn = Player.randomTurn

    const game = new Game([player1, player2])
    game.start()
  })
})
