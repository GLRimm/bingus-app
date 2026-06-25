import type { BingoPattern, GameMode } from '../game/types'

const COLUMNS = ['B', 'I', 'N', 'G', 'O']

interface PatternDisplayProps {
  currPattern: BingoPattern
  newPattern: BingoPattern
  setNewPattern: (newPattern: BingoPattern) => void
  mode: GameMode
}

export function PatternDisplay({ currPattern, newPattern, setNewPattern, mode }: PatternDisplayProps) {
  const isControl = mode === 'control'

  function toggleCell(rowIdx: number, colIdx: number) {
    const next = newPattern.pattern.map((row, r) =>
      row.map((val, c) => (r === rowIdx && c === colIdx ? !val : val))
    )
    setNewPattern({ ...newPattern, pattern: next })
  }

  return (
    <div className="w-full h-full grid grid-cols-5 grid-rows-[auto_repeat(5,1fr)]">
      {COLUMNS.map(col => (
        <div key={col} className="border-2 border-white flex items-center justify-center text-2xl font-bold">
          {col}
        </div>
      ))}
      {currPattern.pattern.map((row, rowIdx) =>
        row.map((active, colIdx) => {
          const inNew = isControl && newPattern.pattern[rowIdx][colIdx]
          return (
            <div
              key={`${rowIdx}-${colIdx}`}
              className={`border-2 border-white relative flex items-center justify-center${isControl ? ' cursor-pointer hover:bg-white/10' : ''}`}
              onClick={isControl ? () => toggleCell(rowIdx, colIdx) : undefined}
            >
              {active && <div className="w-1/2 aspect-square rounded-full bg-red-500" />}
              {inNew && (
                <div
                  className="absolute w-1/2 aspect-square rounded-full bg-cyan-400 opacity-50"
                  style={{ right: '15%' }}
                />
              )}
            </div>
          )
        })
      )}
    </div>
  )
}
