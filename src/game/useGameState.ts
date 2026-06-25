import { useEffect, useRef, useState } from 'react'
import type { BingoPattern, GameMode, GameState } from './types'

const BINGO_POOL = Array.from({ length: 75 }, (_, i) => i + 1)
const CHANNEL_NAME = 'bingus-game-state'

const INITIAL_PATTERN: BingoPattern = {
  name: 'Standard',
  pattern: [
    [false, false, false, false, true],
    [false, false, false, true, false],
    [false, false, true, false, false],
    [false, true, false, false, false],
    [true, false, false, false, false],
  ],
}

const INITIAL_STATE: GameState = {
  drawnNumbers: new Set(),
  drawOrder: [],
  pattern: INITIAL_PATTERN,
}

interface SerializedGameState {
  drawnNumbers: number[]
  drawOrder: number[]
  pattern: BingoPattern
}

type ChannelMessage =
  | { type: 'state'; payload: SerializedGameState }
  | { type: 'request-state' }

function serialize(state: GameState): SerializedGameState {
  return {
    drawnNumbers: [...state.drawnNumbers],
    drawOrder: state.drawOrder,
    pattern: state.pattern,
  }
}

function deserialize(data: SerializedGameState): GameState {
  return {
    drawnNumbers: new Set(data.drawnNumbers),
    drawOrder: data.drawOrder,
    pattern: data.pattern,
  }
}

export interface GameStateWithMethods {
  state: GameState;
  draw: (num?: number) => void;
  undo: (num?: number) => void;
  reset: (newPattern?: BingoPattern) => void;
}

export function useGameState(mode: GameMode): GameStateWithMethods {
  const [state, setState] = useState<GameState>(INITIAL_STATE)
  const channelRef = useRef<BroadcastChannel | null>(null)
  const modeRef = useRef(mode)
  const stateRef = useRef(state)
  const fromChannelRef = useRef(false)

  useEffect(() => { modeRef.current = mode }, [mode])
  useEffect(() => { stateRef.current = state }, [state])

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME)
    channelRef.current = channel

    channel.onmessage = (event: MessageEvent<ChannelMessage>) => {
      const msg = event.data
      if (msg.type === 'request-state') {
        if (modeRef.current === 'control') {
          channel.postMessage({ type: 'state', payload: serialize(stateRef.current) })
        }
      } else if (msg.type === 'state') {
        fromChannelRef.current = true
        setState(deserialize(msg.payload))
      }
    }

    channel.postMessage({ type: 'request-state' })

    return () => {
      channel.close()
      channelRef.current = null
    }
  }, [])

  // Broadcast local state changes; skip if the change came from the channel
  // to avoid control windows bouncing updates back and forth indefinitely.
  useEffect(() => {
    if (mode !== 'control') return
    if (fromChannelRef.current) {
      fromChannelRef.current = false
      return
    }
    channelRef.current?.postMessage({ type: 'state', payload: serialize(state) })
  }, [state, mode])

  function reset(newPattern?: BingoPattern) {
    setState(prev => ({
      drawnNumbers: new Set(),
      drawOrder: [],
      pattern: newPattern ?? prev.pattern,
    }))
  }

  function draw(num?: number) {
    setState(prev => {
      const target = num ?? (() => {
        const remaining = BINGO_POOL.filter(n => !prev.drawnNumbers.has(n))
        if (remaining.length === 0) return null
        return remaining[Math.floor(Math.random() * remaining.length)]
      })()

      if (target === null || prev.drawnNumbers.has(target)) return prev

      return {
        ...prev,
        drawnNumbers: new Set([...prev.drawnNumbers, target]),
        drawOrder: [...prev.drawOrder, target],
      }
    })
  }

  function undo(num?: number) {
    setState(prev => {
      const target = num ?? prev.drawOrder.at(-1)
      if (target === undefined || !prev.drawnNumbers.has(target)) return prev

      const drawnNumbers = new Set(prev.drawnNumbers)
      drawnNumbers.delete(target)

      return {
        ...prev,
        drawnNumbers,
        drawOrder: prev.drawOrder.filter(n => n !== target),
      }
    })
  }

  return { state, draw, undo, reset }
}
