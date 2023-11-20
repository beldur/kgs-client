import type { KGSScore } from '@/lib/api/types'

export interface ScoreProps {
  score: KGSScore
}

export const SCORE_TO_STRING: Record<KGSScore, string> = {
  'W+RESIGN': 'W+Res',
  'B+RESIGN': 'B+Res',
  UNKNOWN: 'Unknown',
  UNFINISHED: 'Unfinished',
  NO_RESULT: 'No Result',
  'B+FORFEIT': 'B+Forf',
  'W+FORFEIT': 'W+Forf',
  'B+TIME': 'B+Time',
  'W+TIME': 'W+Time',
}

const GameEntryScore = ({ score }: ScoreProps) => {
  const isString = typeof score === 'string'

  if (isString) return <>{SCORE_TO_STRING[score]}</>

  if (score > 0) return <>B+{score}</>
  if (score < 0) return <>W+{Math.abs(score)}</>

  return <>Draw</>
}

export default GameEntryScore
