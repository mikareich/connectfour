import { defaultConfiguration, testConfiguration } from "../../configuration"
import Board from "../Board"

Board.CONFIGURATION = testConfiguration

test("Board generates correct matrix", () => {
  const board = new Board()

  expect(board.matrix).toEqual([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ])
})

describe("Util functions", () => {
  test("Matrix get filled correctly", () => {
    const board = new Board([
      ["", "", ""],
      ["", "", ""],
      ["X", "", ""],
    ])

    expect(board.matrix).toEqual([
      ["", "", ""],
      ["", "", ""],
      ["X", "", ""],
    ])
  })

  test("`isColFree` indicates corretly whether column is filled", () => {
    const board = new Board([
      ["O", "", ""],
      ["X", "O", ""],
      ["X", "O", ""],
    ])

    expect(board.isColFree(1)).toBe(true)
    expect(board.isColFree(0)).toBe(false)
  })

  test("`isFull` indicates corretly whether board is full", () => {
    const board = new Board([
      ["O", "X", "X"],
      ["X", "O", "O"],
      ["X", "O", "X"],
    ])

    expect(board.isFull()).toBe(true)
  })
})
