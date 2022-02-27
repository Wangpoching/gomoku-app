import styled from '@emotion/styled/macro'
import { useRef, useCallback } from 'react'

const InfoContainer = styled.div`
  width: 560px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 290px;
  }
`
const StatusBar = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  > div + div {
    margin-left: 20px
  }
  @media screen and (max-width: 768px) {
    > div + div {
      margin-left: 10px
    }
  }
`
const Title = styled.div`
  font-weight: bold;
  font-size: 50px;
  @media screen and (max-width: 768px) {
    font-size: 36px
  }
`

const Mode = styled.div`
  text-align: left;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    font-size: 12px
  }
`

const Status = styled.div`
  text-align: left;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    font-size: 12px
  }
`

const Round = styled.div`
  text-align: left;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    font-size: 12px
  }
`

const ToolBar = styled.div`
  text-align: center;
  div + div {
    margin-top: 10px
  }
`

const History = styled.div`
  text-align: right;
  width: 300px;
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    width: 150px;
  }
`

const Input = styled.input`
  border: none;
  border-bottom: 2px solid black;
  line-height: 20px;
  display: inline;
  width: 100px;
  height: 20px;
  padding: 2px;
  :focus {
    outline: none;  
  }
  @media screen and (max-width: 768px) {
    width: 50px;
    height: 10px
  }
`
export default function Info({ state, setState }) {
  const inputDiv = useRef(null)
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      const step = Number(inputDiv.current.value)
      inputDiv.current.value = ''
      inputDiv.current.blur()

      // 檢查要返回的歷史
      if (step < 0 || step >= state.history.length - 1) return

      const history = JSON.parse(JSON.stringify(state)).history.slice(0, step + 1)
      const winCountTab = JSON.parse(JSON.stringify(state)).winCountTab.slice(0, step + 1)

      setState({
        history,
        stepNumber: step,
        winCombinationTab: state.winCombinationTab,
        winCountTab,
        blackIsNext: step % 2 ? false : true,
        mode: state.mode,
        winner: null
      })
    }
  }, [state, setState])

  let status
  const { winner, mode, stepNumber } = state
  if (winner) {
    status = 'Winner: ' + (winner === 'B' ? 'Black' : 'White')
  } else {
    status = 'Next player: ' + (state.blackIsNext ? 'Black' : 'White')
  }
  const selectedMode = mode[0] ? `Mode: ${mode[0]}` : 'Mode: not chosen'
  const round = `Round: ${stepNumber}`

  return (
    <InfoContainer>
      <Title>Gomoku</Title> 
      <StatusBar>
        <div>
          <Round>{round}</Round>
          <Mode>{selectedMode}</Mode>
          <Status>{status}</Status>
        </div>
        <ToolBar>
          <History>
            <label htmlFor="history">Back to history: </label>
            <Input id="history" ref={inputDiv} onKeyDown={handleKeyDown}></Input>
          </History>
        </ToolBar>
      </StatusBar>
    </InfoContainer>
  )
}

