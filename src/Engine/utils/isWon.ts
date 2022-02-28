import Board from "../Board"

export interface WonPosition {
  /** Symbol that won */
  symbol: string
  /** Unit type of win */
  unitType: "row" | "col" | "risingDiagonal" | "fallingDiagonal"
  /** Index of unit */
  unitIndex: number
  /** Index of symbol in unit */
  index: number
}

/** Indicates whether someone won
 * @param board Board to check
 * @returns Won position or false
 */
function isWon(board: Board): WonPosition[] {
  const checkUnit = (unit: string[], unitIndex: number, unitType: string) => {
    for (
      let index = 0;
      index <= board.numberOfCols - Board.CONFIGURATION.numberOfSymbolsToWin;
      index += 1
    ) {
      const compareSequence = unit.slice(
        index,
        index + Board.CONFIGURATION.numberOfSymbolsToWin
      )

      if (
        compareSequence.length === Board.CONFIGURATION.numberOfSymbolsToWin &&
        Board.CONFIGURATION.symbols.includes(compareSequence[0]) &&
        compareSequence.every((symbol) => symbol === compareSequence[0])
      )
        return {
          symbol: compareSequence[0],
          unitIndex,
          unitType,
          index,
        }
    }

    return null
  }

  const rows = board.rows
    .map((row, rowIndex) => checkUnit(row, rowIndex, "row"))
    .filter((unit) => unit) as WonPosition[]

  const cols = board.cols
    .map((col, colIndex) => checkUnit(col, colIndex, "col"))
    .filter((unit) => unit) as WonPosition[]

  const risingDiagonals = board.risingDiagonals
    .map((risingDiagonal, risingDiagonalIndex) =>
      checkUnit(risingDiagonal, risingDiagonalIndex, "risingDiagonal")
    )
    .filter((unit) => unit) as WonPosition[]

  const fallingDiagonals = board.fallingDiagonals
    .map((fallingDiagonal, fallingDiagonalIndex) =>
      checkUnit(fallingDiagonal, fallingDiagonalIndex, "fallingDiagonal")
    )
    .filter((unit) => unit) as WonPosition[]

  return [...rows, ...cols, ...risingDiagonals, ...fallingDiagonals]
}

export default isWon
