import { useEffect, useCallback } from 'react'
import { calculateWinPoint, findWinner } from '../../utils'
import styled from '@emotion/styled/macro'


const BoardContainer = styled.div`
  width: 560px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 290px;
  }
`

const boardMargin = 20
const heightRatio = 1
const cellAmount = 18
const crossAmount = cellAmount + 1

export default function Board({ setState, state }) {
  const init = () => {

    const board = document.getElementById("board")
    board.width = parseInt(window.getComputedStyle(board).width, 0) * 2
    board.height = board.width * heightRatio
    const boardWidth = board.width
    const boardHeight = board.height
    const cellWidth = (boardWidth - 2 *  boardMargin) / cellAmount

    if (board.getContext) {
      const context = board.getContext("2d")
      context.clearRect(0, 0, boardWidth, boardHeight)

      //畫棋盤
      context.beginPath()
      for(let i = 0; i < crossAmount; i++){
        context.moveTo(cellWidth * i + boardMargin, boardMargin)
        context.lineTo(cellWidth * i + boardMargin, boardWidth - boardMargin)
      }
      for(let j = 0; j < crossAmount; j++){
        context.moveTo(boardMargin, cellWidth * j + boardMargin)
        context.lineTo(boardWidth - boardMargin, cellWidth * j + boardMargin)
      }
      context.stroke()

      //畫棋子
      const { history } = state
      const current = history[history.length - 1]
      const squares = current.squares

      squares.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          if (col === 'B') {
            context.beginPath();
            context.arc(cellWidth * (colIndex - 4) + boardMargin, cellWidth * (rowIndex - 4) + boardMargin, cellWidth / 3, 0, Math.PI * 2)
            context.fillStyle = 'black'
            context.fill()
          }
          if (col === 'W') {
            context.beginPath();
            context.arc(cellWidth * (colIndex - 4) + boardMargin, cellWidth * (rowIndex - 4) + boardMargin, cellWidth / 3, 0, Math.PI * 2)
            context.fillStyle = 'white'
            context.fill()
          }
        })
      })
    }
  }


  function debounce(func, delay=100) {
    let timer = null
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func()
      }, delay)
    }
  }

  // 每次螢幕大小變化要重畫棋局
  window.addEventListener('resize',
  debounce(init))

  const handleClick = useCallback((e) => {
    const { mode, blackIsNext, winCombinationTab } = state
    const board = document.getElementById("board")
    const boardWidth = board.width
    const cellWidth = ( boardWidth - 2 * boardMargin ) / cellAmount

    // 檢查是否已經分出勝負或尚未選擇模式
    if (state.winner || !mode[0]) return

    // 以棋盤的 (0,0) 位置為原點計算點擊的 x, y 的座標 
    let x = (e.pageX - board.offsetLeft) * 2 - boardMargin
    let y = (e.pageY - board.offsetTop) * 2 - boardMargin

    // 偏移太多的點擊忽略
    const offsetX = x % cellWidth
    const offsetY = y % cellWidth
    if ((offsetX) > (cellWidth / 3) && (offsetX) <  (cellWidth - cellWidth / 3)) {
       return
    }
    if ((offsetY) > (cellWidth / 3) && (offsetY) <  (cellWidth - cellWidth / 3)) {
       return
    }


    // 微調到棋盤的十字上
    x = offsetX <= (cellWidth / 3) ? x - offsetX : x + (cellWidth - offsetX)
    y = offsetY <= (cellWidth / 3) ? y - offsetY : y + (cellWidth - offsetY)

    // 深拷貝並在狀態上添加棋子
    const history = JSON.parse(JSON.stringify(state)).history
    const current = history[state.stepNumber]
    const squares = JSON.parse(JSON.stringify(current.squares))
    const xIndex = x / cellWidth + 4
    const yIndex = y / cellWidth + 4

    // 檢查是否已經有落子
    if (state.history[state.stepNumber].squares[yIndex][xIndex]) return
    squares[yIndex][xIndex] = blackIsNext ? 'B' : 'W'

    // 找出落子位置的獲勝組合
    const winCombinations = winCombinationTab[y / cellWidth][x / cellWidth].reduce((pre, cur, index) => {
    if (cur) {
      pre.push(index)
    }
    return pre
    }, [])

    // 深拷貝並修改 WinCountTable
    const historyWinCountTab = JSON.parse(JSON.stringify(state)).winCountTab
    const currentWinCountTab = historyWinCountTab[state.stepNumber]
    const winCount = JSON.parse(JSON.stringify(currentWinCountTab.winCount))
    winCombinations.forEach((ele) => {
      // 玩家的獲勝組合棋子數目 + 1，電腦的設為 7
      winCount[0][ele]++
      winCount[1][ele] = 7
    })

    // 判定勝負
    const winner = findWinner(squares, [yIndex, xIndex], blackIsNext ? 'B' : 'W')

    setState({
      history: history.concat([{
        squares,
      }]),
      winCombinationTab,
      winCountTab: historyWinCountTab.concat([{
        winCount,
      }]),
      stepNumber: history.length,
      blackIsNext: !blackIsNext,
      mode,
      winner: winner? winner : null
    })
  }, [state, setState])

  useEffect(() => {
    init()

    // 計算棋格獲勝分數
    const { mode, blackIsNext, winCombinationTab } = state
    if (mode[0] === 'AI' && blackIsNext!==mode[1] && !state.winner) {
      const history = JSON.parse(JSON.stringify(state)).history
      const current = history[state.stepNumber]
      const squares = JSON.parse(JSON.stringify(current.squares))

      const historyWinCountTab = JSON.parse(JSON.stringify(state)).winCountTab
      const currentWinCountTab = historyWinCountTab[state.stepNumber]
      const winCount = JSON.parse(JSON.stringify(currentWinCountTab.winCount))

      const playerMaxPoint = {
        rowIndex: 0,
        colIndex: 0,
        point: 0
      }
      const computerMaxPoint = {
        rowIndex: 0,
        colIndex: 0,
        point: 0
      }
      const slicedSquares = JSON.parse(JSON.stringify(squares))
        .map((ele) => ele.filter((ele, index) => index > 3 && index < crossAmount + 4))
        .filter((ele, index) => index > 3 && index < crossAmount + 4)

      slicedSquares.forEach((row, rowIndex) => {
        row.forEach((ele, colIndex) => {
          let playerCurrentPoint = ele ? 0 : calculateWinPoint(rowIndex, colIndex, winCombinationTab, winCount[0])
          if (playerCurrentPoint > playerMaxPoint.point) {
            playerMaxPoint.rowIndex = rowIndex
            playerMaxPoint.colIndex = colIndex
            playerMaxPoint.point = playerCurrentPoint
          }
          let computerCurrentPoint = ele ? 0 : calculateWinPoint(rowIndex, colIndex, winCombinationTab, winCount[1])
          if (computerCurrentPoint > computerMaxPoint.point) {
            computerMaxPoint.rowIndex = rowIndex
            computerMaxPoint.colIndex = colIndex
            computerMaxPoint.point = computerCurrentPoint
          }
        })
      })

      const rowIndex = computerMaxPoint.point >= playerMaxPoint.point ? computerMaxPoint.rowIndex : playerMaxPoint.rowIndex
      const colIndex = computerMaxPoint.point >= playerMaxPoint.point ? computerMaxPoint.colIndex : playerMaxPoint.colIndex
      squares[rowIndex + 4][colIndex + 4] = blackIsNext ? 'B' : 'W'
      const winner = findWinner(squares, [rowIndex + 4, colIndex + 4], state.blackIsNext ? 'B' : 'W')

      // 找出落子位置的獲勝組合
      const winCombinations = winCombinationTab[rowIndex][colIndex].reduce((pre, cur, index) => {
      if (cur) {
        pre.push(index)
      }
      return pre
      }, [])

      // 修改 WinTable
      winCombinations.forEach((ele) => {
        winCount[0][ele] = 7
        winCount[1][ele]++
      })

      setState({
        history: history.concat([{
          squares
        }]),
        winCombinationTab,
        winCountTab: historyWinCountTab.concat([{
          winCount,
        }]),
        stepNumber: history.length,
        blackIsNext: !blackIsNext,
        mode,
        winner
      })
    }
  })

  return (
    <BoardContainer>
      <canvas
        id="board" 
        onClick={handleClick}
      />
    </BoardContainer>
  )
}

