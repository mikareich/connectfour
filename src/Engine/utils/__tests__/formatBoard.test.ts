import { testConfiguration } from "../../../configuration"
import Board from "../../Board"
import formatBoard from "../formatBoard"

describe("Matrix gets correctly formatted into rows, columns and diagonals", () => {
  Board.CONFIGURATION = testConfiguration
  const board = new Board([
    ["", "", "O"],
    ["X", "O", "O"],
    ["X", "O", "X"],
  ])

  const { rows, cols, risingDiagonals, fallingDiagonals } = formatBoard(board)

  test("Rows are correctly formatted", () => {
    expect(rows).toStrictEqual([
      ["", "", "O"],
      ["X", "O", "O"],
      ["X", "O", "X"],
    ])
  })

  test("Columns are correctly formatted", () => {
    expect(cols).toStrictEqual([
      ["", "X", "X"],
      ["", "O", "O"],
      ["O", "O", "X"],
    ])
  })

  test("Rising diagonals are correctly formatted", () => {
    expect(risingDiagonals).toStrictEqual([
      [""],
      ["X", ""],
      ["X", "O", "O"],
      ["O", "O"],
      ["X"],
    ])
  })

  test("Falling diagonals are correctly formatted", () => {
    expect(fallingDiagonals).toStrictEqual([
      ["X"],
      ["X", "O"],
      ["", "O", "X"],
      ["", "O"],
      ["O"],
    ])
  })
})
