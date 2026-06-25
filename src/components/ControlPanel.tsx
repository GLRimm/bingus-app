import type { BingoPattern } from '../game/types'

interface ControlPanelProps {
  onDraw: () => void
  onUndo: () => void
  onReset: (newPattern: BingoPattern) => void
  onNameChange: (name: string) => void
  newPattern: BingoPattern
}

export function ControlPanel({ onDraw, onUndo, onReset, onNameChange, newPattern }: ControlPanelProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-around px-4 py-2">
      <input
        className="w-full bg-transparent border-b-2 border-white text-center text-lg font-bold outline-none placeholder-white/40"
        value={newPattern.name}
        onChange={e => onNameChange(e.target.value)}
        placeholder="Pattern name"
      />
      <div className="flex items-center justify-around w-full">
        <button
          className="px-4 py-2 border-2 border-white rounded font-bold hover:bg-white hover:text-black transition-colors"
          onClick={() => onDraw()}
        >
          Draw Random
        </button>
        <button
          className="px-4 py-2 border-2 border-white rounded font-bold hover:bg-white hover:text-black transition-colors"
          onClick={() => onUndo()}
        >
          Undo Last Draw
        </button>
        <button
          className="px-4 py-2 border-2 border-white rounded font-bold hover:bg-white hover:text-black transition-colors"
          onClick={() => { if (window.confirm('Start a new game? This will clear all drawn numbers.')) onReset(newPattern) }}
        >
          New Game
        </button>
      </div>
    </div>
  )
}
