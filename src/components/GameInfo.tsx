import { useState } from "react";
import { formatBall } from "../game/ballNotation";
import type { BingoPattern, GameMode } from "../game/types";
import { ControlPanel } from "./ControlPanel";
import { DisplayPanel } from "./DisplayPanel";
import { PatternDisplay } from "./PatternDisplay";

interface GameInfoProps {
  drawOrder: number[];
  pattern: BingoPattern;
  mode: GameMode;
  onDraw: () => void;
  onUndo: () => void;
  onReset: (newPattern: BingoPattern) => void;
}

export function GameInfo({ drawOrder, pattern, mode, onDraw, onUndo, onReset }: GameInfoProps) {
  const currentNumber = drawOrder.at(-1)
  const [newPattern, setNewPattern] = useState<BingoPattern>(pattern);
  return (
   <>
        <div className="flex-1 flex flex-col items-center justify-center border-r-4 border-white">
          <span className="text-xl uppercase tracking-widest text-gray-400">Current Number</span>
          <span className="text-[25svh] font-bold leading-none">
            {currentNumber !== undefined ? formatBall(currentNumber) : '-'}
          </span>
        </div>
        <div className="flex-1 flex flex-col border-r-4 border-white">
          <div className="flex-1 border-b-4 border-white">
            {mode === 'control' ? (
              <ControlPanel
                onDraw={onDraw}
                onUndo={onUndo}
                onReset={onReset}
                onNameChange={name => setNewPattern({ ...newPattern, name })}
                newPattern={newPattern}
              />
            ) : (
              <DisplayPanel currPattern={pattern} />
            )}
          </div>
          <div className="flex-1 flex">
            {[0, 1, 2].map((offset, i) => {
              const num = drawOrder.at(-(offset + 2))
              return (
                <div
                  key={offset}
                  className={`flex-1 flex items-center justify-center ${i < 2 ? 'border-r-4 border-white' : ''}`}
                >
                  <span className="text-[8svh] font-bold">
                    {num !== undefined ? formatBall(num) : ''}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex-1">
          <PatternDisplay currPattern={pattern} newPattern={newPattern} setNewPattern={setNewPattern} mode={mode} />
        </div>
   </>
  )
}
