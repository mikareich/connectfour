import { Configuration, defaultConfiguration } from "../configuration"
import EventHandler from "../EventHandler"
import Player from "../Player"
import Board from "./Board"

type GameState = "INITIALIZING" | "PLAYING" | "TIE" | "WON"

/** Connect Four instance */
class Game extends EventHandler<"stateChanged" | "newTurn" | "error"> {
  /** Game configuration */
  public static CONFIGURATION: Configuration = defaultConfiguration

  /** Connect four board */
  public readonly board: Board

  /** Players in game */
  public readonly players: Player[]

  /** Winner of the game */
  private _winner: Player | undefined

  /** Winner of the game */
  get winner(): Player | undefined {
    return this._winner
  }

  /** State of the game */
  private _state: GameState = "INITIALIZING"

  /** State of the game */
  get state(): GameState {
    return this._state
  }

  /** Game records */
  private _gameHistory: this[] = []

  /** Game records */
  public get gameHistory() {
    return this._gameHistory
  }

  /** Create new _connect-four_ game
   * @param players - Players in game
   */
  constructor(players: Player[]) {
    super()
    Board.CONFIGURATION = Game.CONFIGURATION
    Player.CONFIGURATION = Game.CONFIGURATION

    this.board = new Board()
    this.players = players
  }

  /** Starts game */
  public start(): void {
    if (this.players.length === 0) throw new Error("No players provided")
    this._state = "PLAYING"
    this.dispatchEvent("stateChanged", this._state)

    this.newTurn()
  }

  /** Current player */
  get currentPlayer(): Player {
    return this.players[this._gameHistory.length % this.players.length]
  }

  /** Executes turn for certain player */
  private newTurn(): void {
    this.dispatchEvent("newTurn", this.currentPlayer, this.board)
    const col = this.currentPlayer.turn(this)

    // check if column is full
    if (!this.board.isColFree(col)) this.currentPlayer.turn(this)

    // apply gravity and add symbol to column
    for (let row = this.board.matrix.length - 1; row >= 0; row -= 1) {
      if (this.board.matrix[row][col] === "") {
        this.board.matrix[row][col] = this.currentPlayer.symbol
        break
      }
    }

    // next player turn
    this._gameHistory = [...this._gameHistory, this]
    if (this.board.isWon()) {
      this._winner = this.currentPlayer
      this._state = "WON"
      this.dispatchEvent("stateChanged", this._state)
      return
    }
    if (this.board.isFull()) {
      this._state = "TIE"
      this.dispatchEvent("stateChanged", this._state)
      return
    }

    this.newTurn()
  }
}

export default Game
