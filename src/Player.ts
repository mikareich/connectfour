import { v4 as uuid } from "uuid"
import { Configuration, defaultConfiguration } from "./configuration"
import Game from "./Engine/Game"
import EventHandler from "./EventHandler"

class Player extends EventHandler<"turn" | "toGameAdded" | "error"> {
  /** Example algorythm of the player */
  static randomTurn(game: Game): number {
    const randomCol = Math.floor(Math.random() * game.board.numberOfCols)
    return randomCol
  }

  /** Game configuration */
  static CONFIGURATION: Configuration = defaultConfiguration

  /** Unique player id */
  public readonly id = uuid()

  /** Player name */
  public readonly name: string

  /** Player symbol */
  public readonly symbol: string

  /**
   * Create new player for _connect-four_ game
   * @param name Player name
   * @param symbol Symbol to use
   */
  constructor(name: string, symbol: string) {
    super()
    this.name = name
    this.symbol = symbol

    if (!Player.CONFIGURATION.symbols.includes(symbol)) {
      this.dispatchEvent("error", new Error("Invalid symbol"))
      throw new Error("Invalid symbol")
    }
  }

  /**
   * Executes turn for certain player
   * @param game Game to execute turn for
   * @returns Col to place symbol
   */
  public turn(game: Game): number {
    this.dispatchEvent("error", new Error("No turn algorythm provided"))
    throw new Error("No turn function implemented")
  }
}

export default Player
