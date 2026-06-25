import { useState } from 'react'
import { useGameState } from './game/useGameState'
import { Board } from './components/Board'

type Mode = 'control' | 'display' | null

function App() {
  const [mode, setMode] = useState<Mode>(null)
  const state = useGameState(mode)

  return (
    <div className="flex flex-col h-svh">
      <header className="shrink-0 flex items-center justify-between px-4 py-1 border-b border-white/20 text-sm text-gray-400">
        <span>BINGUS APP by Gabe Rimmon</span>
        <span>MODE: {mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : '—'}</span>
      </header>
      {mode === null ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-16">
          <h1>Bingus</h1>
          <div className="flex gap-4">
            <button
              type="button"
              className="text-lg py-3 px-7 rounded-lg border border-white/30 bg-transparent text-white cursor-pointer transition-colors duration-200 hover:bg-white/8 hover:border-white/60"
              onClick={() => setMode('control')}
            >
              Control Mode
            </button>
            <button
              type="button"
              className="text-lg py-3 px-7 rounded-lg border border-white/30 bg-transparent text-white cursor-pointer transition-colors duration-200 hover:bg-white/8 hover:border-white/60"
              onClick={() => setMode('display')}
            >
              Display Mode
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0">
          <Board gameState={state} mode={mode} />
        </div>
      )}
    </div>
  )
}

export default App
