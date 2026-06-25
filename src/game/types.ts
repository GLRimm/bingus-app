export interface BingoPattern {
  name: string;
  pattern: boolean[][];
}

export interface GameState {
  /** Numbers that have been drawn — Set for O(1) lookup */
  drawnNumbers: Set<number>
  /** Numbers in the order they were drawn */
  drawOrder: number[]
  /** The pattern required to win this round */
  pattern: BingoPattern
}

export type GameMode = 'control' | 'display' | null;
