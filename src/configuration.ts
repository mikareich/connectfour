export interface Configuration {
  /** Number of cols of the board */
  cols: number

  /** Number of rows of the board */
  rows: number

  /** Number of symbols to win */
  numberOfSymbolsToWin: number

  /** Maximal number of players in game */
  maxPlayers: number

  /** Symbols to use */
  symbols: string[]

  /** Placeholder symbol */
  placeholder: string
}

export const defaultConfiguration: Configuration = {
  cols: 7,
  rows: 6,
  numberOfSymbolsToWin: 4,
  maxPlayers: 2,
  symbols: ["X", "O"],
  placeholder: "",
}

export const testConfiguration: Configuration = {
  ...defaultConfiguration,
  cols: 3,
  rows: 3,
}
