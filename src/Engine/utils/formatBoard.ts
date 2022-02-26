import Board from "../Board"

/**
 * Formats a board into rows, columns and diagonals.
 * @param board Board to format
 * @returns Formated units of the board
 */
function formatBoard(board: Board) {
  const rows = board.matrix
  const cols = Array.from({ length: board.numberOfCols }, (_, col) =>
    board.matrix.map((row) => row[col])
  )

  const createDiagonals = (): string[][] =>
    Array.from(
      { length: board.numberOfRows + board.numberOfCols - 1 },
      () => []
    )

  const risingDiagonals = createDiagonals()
  const fallingDiagonals = createDiagonals()

  for (let colIndex = 0; colIndex < board.numberOfCols; colIndex += 1) {
    for (let rowIndex = 0; rowIndex < board.numberOfRows; rowIndex += 1) {
      const cell = board.matrix[rowIndex][colIndex]

      const risingIndex = rowIndex + colIndex
      const fallingIndex = board.numberOfRows - 1 - rowIndex + colIndex

      risingDiagonals[risingIndex].push(cell)
      fallingDiagonals[fallingIndex].push(cell)
    }
  }

  return {
    rows,
    cols,
    risingDiagonals,
    fallingDiagonals,
  }
}

export default formatBoard
