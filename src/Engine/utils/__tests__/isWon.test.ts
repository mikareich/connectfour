import { testConfiguration } from "../../../configuration"
import Board from "../../Board"
import isWon from "../isWon"

test("`isWon` function returns correct position or false", () => {
  Board.CONFIGURATION = {
    ...testConfiguration,
    cols: 3,
    rows: 3,
    numberOfSymbolsToWin: 3,
  }

  const board = new Board([
    ["X", "X", "X"],
    ["O", "X", "O"],
    ["X", "O", "X"],
  ])

  expect(isWon(board)).toEqual([
    { symbol: "X", unitIndex: 0, unitType: "row", index: 0 },
    { symbol: "X", unitIndex: 2, unitType: "risingDiagonal", index: 0 },
    { symbol: "X", unitIndex: 2, unitType: "fallingDiagonal", index: 0 },
  ])
})
