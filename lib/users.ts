export const rankToNumber = (rank?: string) => {
  if (!rank) {
    return 0
  }

  const match = rank.match(/([0-9]+)([dkp])/)

  if (match) {
    const rankNum = parseInt(match[1])
    const isDan = match[2] === 'd'
    const isPro = match[2] === 'p'
    const isKyu = match[2] === 'k'

    if (isKyu) return 30 - rankNum
    if (isDan) return 29 + rankNum
    if (isPro) return 39 + rankNum
  }

  return 0
}
