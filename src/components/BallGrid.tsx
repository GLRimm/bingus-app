const ROWS = [
  { letter: 'B', min: 1 },
  { letter: 'I', min: 16 },
  { letter: 'N', min: 31 },
  { letter: 'G', min: 46 },
  { letter: 'O', min: 61 },
]

interface BallGridProps {
  drawnNumbers: Set<number>
  onNumberClick?: (num: number) => void
}

export function BallGrid({ drawnNumbers, onNumberClick }: BallGridProps) {
  return (
    <table className="w-full h-full border-collapse">
      <tbody>
        {ROWS.map(({ letter, min }) => (
          <tr key={letter}>
            <td className="border-4 border-white text-center text-7xl font-bold w-[6.25%]">
              {letter}
            </td>
            {Array.from({ length: 15 }, (_, i) => min + i).map(num => (
              <td
                key={num}
                onClick={onNumberClick ? () => onNumberClick(num) : undefined}
                className={`border-4 border-white text-center text-6xl font-bold w-[6.25%] ${drawnNumbers.has(num) ? 'text-white' : 'text-gray-800'} ${onNumberClick ? 'cursor-pointer' : ''}`}
              >
                {num}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
