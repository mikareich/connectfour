import { Configuration, defaultConfiguration } from "../configuration"
import formatBoard from "./utils/formatBoard"
import isWon, { WonPosition } from "./utils/isWon"

class Board {
  /** Game configuration */
  static CONFIGURATION: Configuration = defaultConfiguration

  /** Number of columns */
  public readonly numberOfCols: number = Board.CONFIGURATION.cols

  /** Number of rows */
  public readonly numberOfRows: number = Board.CONFIGURATION.rows

  /** Board as matrix */
  public readonly matrix: string[][] = Array.from(
    { length: this.numberOfRows },
    () =>
      Array.from(
        { length: this.numberOfCols },
        () => Board.CONFIGURATION.placeholder
      )
  )

  /**
   * Creates a new connectfour board
   * @param matrix Pre-filled matrix
   */
  constructor(matrix?: string[][]) {
    if (matrix) {
      // check if matrix is valid
      if (matrix.length !== this.numberOfRows)
        throw new Error("Invalide number of rows")
      if (matrix[0].length !== this.numberOfCols)
        throw new Error("Invalide number of cols")

      this.matrix = matrix
    }
  }

  /** Columns of the board */
  get cols(): string[][] {
    return formatBoard(this).cols
  }

  /** Rows of the board */
  get rows(): string[][] {
    return formatBoard(this).rows
  }

  /** Rising diagonals of the board */
  get risingDiagonals(): string[][] {
    return formatBoard(this).risingDiagonals
  }

  /** Falling diagonals of the board */
  get fallingDiagonals(): string[][] {
    return formatBoard(this).fallingDiagonals
  }

  /** Indicates whether the column is free
   * @param col Column to check
   */
  isColFree(col: number): boolean {
    return this.matrix[0][col].length === 0
  }

  /** Indicates whether the board is full */
  isFull(): boolean {
    return this.matrix.every((row) => row.every((col) => col.length > 0))
  }

  /** Indicates whether the game is won by a player with a certain symbol */
  isWon(): WonPosition | false {
    return isWon(this).length === 0 ? false : isWon(this)[0]
  }
}

export default Board
