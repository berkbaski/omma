const customRound = val => (val % 1 > 0.5 ? Math.ceil(val) : Math.floor(val))
const sumWeights = items => items.reduce((prev, cur) => prev + cur.value, 0)
const orderBySumWeight = items => items.sort((a, b) => (a.total < b.total ? 1 : -1))
const formatPlaylistItems = (items, sumOfWeights, generateCount) =>
  items.map(item => ({
    ...item,
    total: customRound((item.value / sumOfWeights) * generateCount),
    rate: customRound((item.value / sumOfWeights) * generateCount),
    ratePercent: (customRound((item.value / sumOfWeights) * generateCount) / generateCount) * 100,
  }))
const checkError = items => {
  let result = true
  let lastExecutedItem = ''

  items.forEach(item => {
    if (lastExecutedItem == item) {
      result = false
    }
    lastExecutedItem = item
  })

  return result
}

const execPlaylistProcess = (playlistItems, generateCount) => {
  const sumOfWeight = sumWeights(playlistItems)
  const formattedPlaylistItems = orderBySumWeight(formatPlaylistItems(playlistItems, sumOfWeight, generateCount))

  const resultArray = []
  let processArray = formattedPlaylistItems
  let lastExecutedItem = null

  for (let i = 0; i < generateCount; i += 1) {
    processArray = orderBySumWeight(processArray)

    let selected = null
    let j = 0

    do {
      if (processArray[j].total > 0) {
        selected = processArray[j]
      } else if (j > 0) {
        selected = processArray[j - 1]
        break
      }
      j += 1
    } while (selected == lastExecutedItem)

    lastExecutedItem = selected
    resultArray.push(selected.label)
    selected.total -= 1
  }

  const status = checkError(resultArray)
  return { status, playlistDetails: formattedPlaylistItems, resultArray }
}

export default execPlaylistProcess
