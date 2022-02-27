import { useState, useCallback } from 'react'
import styled from '@emotion/styled/macro'
import Board from '../Board'
import Info from '../Info'
import { generateWinCombinationTab, generateWinCountTab } from '../../utils'

const GameContainer = styled.div`
  text-align: center;
  box-sizing: border-box;
  padding: 12px;
  height: 100%
`

const Popup = styled.div`
  display: ${props => props.$showPopup? 'flex;' : 'none;'};
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  background-color: white;
  width: 300px;
  height: 50px;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  border: 1px solid grey;
  padding: 10px;
  box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, 0.8);
  button + button {
    margin-left: 15px
  }
`
const OrderPicker = styled.div`
  button + button {
    margin-left: 15px
  }
`

const OrderButton = styled.button`
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
`

const ModePicker = styled.div`
  margin-top: 20px;
  button + button {
    margin-left: 15px
  }
`

const RestartButton = styled.button`
  width: 120px;
  height: 30px;
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
`

const AIButton = styled.button`
  width: 120px;
  height: 30px;
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
`

export default function GomokuApp() {
  let [showPopup, setShowPopup] = useState(false)
  const [state, setState] = useState({
    history: [{
      squares: Array(27).fill(null).map(() => new Array(27).fill(null))
    }],
    winCombinationTab: generateWinCombinationTab(),
    winCountTab: [{
      winCount: generateWinCountTab()
    }],
    stepNumber: 0,
    blackIsNext: true,
    mode: [null],
    winner: null
  })
  const handleSelectMode = useCallback((e) => {
    if (e.target.classList.contains('normal')) {
      setState({
        history: [{
          squares: Array(27).fill(null).map(() => new Array(27).fill(null))
        }],
        winCombinationTab: generateWinCombinationTab(),
        winCountTab: [{
          winCount: generateWinCountTab()
        }],
        stepNumber: 0,
        blackIsNext: true,
        mode: ['normal'],
        winner: null
      })
    } else {
      setShowPopup(true)
    }
  }, [])
  const handleSelectOrder = useCallback((e) => {
    setState({
      history: [{
        squares: Array(27).fill(null).map(() => new Array(27).fill(null))
      }],
      winCombinationTab: generateWinCombinationTab(),
      winCountTab: [{
        winCount: generateWinCountTab()
      }],
      stepNumber: 0,
      blackIsNext: true,
      mode: ['AI', e.target.classList.contains('black')],
      winner: null
    })
    setShowPopup(false)
  }, [])
  return (
    <GameContainer>
      <Popup $showPopup={showPopup}>
        <div>請選擇你要先手或者後手</div>
        <OrderPicker>
          <OrderButton onClick={handleSelectOrder} className={'black'}>先手</OrderButton>
          <OrderButton onClick={handleSelectOrder} className={'white'}>後手</OrderButton>
        </OrderPicker>
      </Popup>
      <Info state={state} setState={setState}/>
      <Board state={state} setState={setState}/>
      <ModePicker>
        <RestartButton onClick={handleSelectMode} className={'normal'}>開始玩家對戰</RestartButton>
        <AIButton onClick={handleSelectMode} className={'AI'}>開始與電腦對弈</AIButton>
      </ModePicker>
    </GameContainer>
  )
}