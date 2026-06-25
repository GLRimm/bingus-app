import { BallGrid } from './BallGrid'
import { GameInfo } from './GameInfo';
import type { GameStateWithMethods } from '../game/useGameState';
import type { GameMode } from '../game/types';

interface BoardProps {
  gameState: GameStateWithMethods
  mode: GameMode
}

export function Board({ gameState, mode }: BoardProps) {

  const { state, draw, undo, reset } = gameState;
  
function handleNumberClick(num: number) {
    if ( mode !== 'control') return;
    if (state.drawnNumbers.has(num)) {
      undo(num)
    } else {
      draw(num)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <BallGrid drawnNumbers={state.drawnNumbers} onNumberClick={handleNumberClick} />
      </div>
      <div className="shrink-0 h-1 bg-white" />
        <div className="flex-1 flex">
          <GameInfo drawOrder={state.drawOrder} pattern={state.pattern} mode={mode} onDraw={draw} onUndo={undo} onReset={reset} />
      </div>
    </div>
  )
}
