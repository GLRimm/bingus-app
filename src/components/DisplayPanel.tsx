import type { BingoPattern } from '../game/types'

interface DisplayPanelProps {
  currPattern: BingoPattern
}

export function DisplayPanel({ currPattern }: DisplayPanelProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-around px-4 py-2">
      <span className="text-lg font-bold">{currPattern.name}</span>
      <span className="text-xl font-bold">
        <span>🌴 </span>
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(to right, #ff0000, #ff4000, #ff8000, #ffbf00, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)' }}
        >Bingo Night at Cameo Woods</span>
        <span> 🌴</span>
      </span>
      <span className="text-xl uppercase tracking-widest text-gray-400">Previous Numbers</span>
    </div>
  )
}
