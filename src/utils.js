export function generateWinCombinationTab() {
  const Ctab =  Array(19).fill(false).map(() => new Array(19).fill(false).map(() =>　new Array(1020).fill(false)))
  let win = 0
  // 橫的獲勝組合
  for (let i = 0; i < 19; i++) {
    let w = 0
    while (w + 4 < 19) {
      for (let j = w; j < w + 5; j++) {
        Ctab[i][j][Math.floor(win/5)] = true
        win++
      }
      w++
    }
  }
  // 直的獲勝組合
  for (let i = 0; i < 19; i++) {
    let w = 0
    while (w + 4 < 19) {
      for (let j = w; j < w + 5; j++) {
        Ctab[j][i][Math.floor(win/5)] = true
        win++
      }
      w++
    }
  }
  // 正對角的獲勝組合
  for (let i = 0; i < 19 - 4; i++) {
    let w = 0
    while (w + 4 < 19) {
      let index = 0
      for (let j = w; j < w + 5; j++) {
        Ctab[i + index][j][Math.floor(win/5)] = true
        index++
        win++
      }
      w++
    }
  }
  // 反對角的獲勝組合
  for (let i = 4; i < 19; i++) {
    let w = 0
    while (w + 4 < 19) {
      let index = 0
      for (let j = w; j < w + 5; j++) {
        Ctab[i - index][j][Math.floor(win/5)] = true
        index++
        win++
      }
      w++
    }
  }
  return Ctab
}

export function generateWinCountTab() {
  return Array(2).fill(0).map(() => Array(1020).fill(0))
}

export function calculateWinPoint(rowIndex, colIndex, winCombinationTab, winCountTab) {
  const winCombinations = winCombinationTab[rowIndex][colIndex].reduce((pre, cur, index) => {
    if (cur) {
      pre.push(index)
    }
    return pre
  }, [])
  const selected = []
  for (let ele of winCombinations) {
    selected.push(winCountTab[ele])
  }
  const result = selected.reduce((pre, cur) => {
    switch (true) {
      case (cur === 0):
        pre += 1
        break;
      case (cur === 1):
        pre += 5
        break;
      case (cur === 2):
        pre += 20
        break;
      case (cur === 3):
        pre += 50
        break;
      case (cur === 4):
        pre += 100
        break;
      case (cur >= 7):
        break;
      default:
        break;
    }
    return pre
  }, 0)
  return result
}

export function findWinner(current, position, identity) {
    const horizontal = current[position[0]].slice(position[1] - 4, position[1] + 5)

    const vertical = current.reduce((pre, cur, index) => {
      if (index > position[0] + 4 || index < position[0] - 4) return pre
      return pre.concat([cur[position[1]]])
    }, [])

    const diagonalNegative = current.reduce((pre, cur, index) => {
      if (index > position[0] + 4 || index < position[0] - 4) return pre
      return pre.concat([cur[position[1] + position[0] - index]])
    }, [])

    const diagonalPositive = current.reduce((pre, cur, index) => {
      if (index > position[0] + 4 || index < position[0] - 4) return pre
      return pre.concat([cur[position[1] - position[0] + index]])
    }, [])

    const isContinuous = (arr, target, len) => {
      let check = 0
      for (const ele of arr) {
        if (ele === target) {
          check += 1
        } else {
          check = 0
        }
        if (check === len) break
      } 
      return (check === len) 
    }

    if (isContinuous(vertical, identity, 5) || isContinuous(horizontal, identity, 5) || isContinuous(diagonalNegative, identity, 5) || isContinuous(diagonalPositive, identity, 5)) return identity
    return null
  }