export const LETTER_RANGES: Record<string, [number, number]> = {
  B: [1, 15],
  I: [16, 30],
  N: [31, 45],
  G: [46, 60],
  O: [61, 75],
}

export function getColumn(n: number): 'B' | 'I' | 'N' | 'G' | 'O' {
  return (Object.keys(LETTER_RANGES) as Array<'B' | 'I' | 'N' | 'G' | 'O'>).find(letter => {
    const [min, max] = LETTER_RANGES[letter]
    return n >= min && n <= max
  })!
}

export function formatBall(n: number): string {
  return `${getColumn(n)}-${n}`
}

export function parseBall(ball: string): number | null {
  const match = ball.trim().toUpperCase().match(/^([BINGO])(\d+)$/)
  if (!match) return null
  const letter = match[1]
  const num = parseInt(match[2], 10)
  const [min, max] = LETTER_RANGES[letter]
  if (num < min || num > max) return null
  return num
}
