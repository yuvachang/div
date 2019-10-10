import React, { useState, useEffect } from 'react'
import TopHalf from './TopHalf/TopHalf'
import Modal from './Modal/Modal'

interface Totals {
  subtotal: number
  tip: number
  tax: number
  total: number
}

const initialState = {
  subtotal: 0,
  tip: 0,
  tax: 0,
  total: 0,
}

const unixTimeToDate = (unixtime: number): string => {
  let date: Date = new Date(unixtime)
  const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  let days: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const day: string = days[date.getDay()]
  let d: string = `${date.getDate()}`
  if (d.length === 1) {
    d = d.padStart(2, '0')
  }
  const m: string = months[date.getMonth()]
  const y: string = `${date.getFullYear()}`
  let saveDate = `${day} ${m} ${d} ${y}`

  return saveDate
}

const App: React.FunctionComponent<{}> = () => {
  const [totals, setTotals] = useState(initialState)
  const [LSDate, setDate] = useState<number | string>('date not found')
  const [hasData, setHasData] = useState<boolean>(false)
  const [displayModal, setModal] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const useLocalStorageData = () => {
    let LS: string | null = localStorage.getItem('divviweb')
    if (typeof LS === 'string') {
      let newState = JSON.parse(LS)
      delete newState.date

      let numOfKeysLS = Object.keys(newState).length
      let numOfKeysState = Object.keys(totals).length

      if (numOfKeysLS !== numOfKeysState) {
        setError('Data corrupt')
        return
      }
      setTotals({
        ...totals,
        ...newState,
      })

      closeModal()
    }
  }

  const closeModal = () => {
    localStorage.removeItem('divviweb')
    setDate('date not found')
    setModal(false)
  }

  // onMount
  useEffect(() => {
    let LS: string | null = localStorage.getItem('divviweb')
    if (typeof LS === 'string') {
      let unix: number = JSON.parse(LS).date
      let localStorageDate = unixTimeToDate(unix)
      setDate(localStorageDate)
      setModal(true)
    }
    console.log(localStorage.getItem('divviweb'))
  }, [])

  //onUnmount
  window.onbeforeunload = () => {
    if (!!hasData) {
      let unixTime = new Date().getTime()
      let saveData = { ...totals, date: unixTime }
      localStorage.setItem('divviweb', JSON.stringify(saveData))
    }
  }

  return (
    <div className='root'>
      {displayModal && (
        <Modal
          yes={useLocalStorageData}
          no={closeModal}
          msg={`Use unfinished session from ${LSDate}?`}
        />
      )}
      {error && <h1>{error}</h1>}

      <TopHalf totals={totals as Totals} setTotals={setTotals} />
    </div>
  )
}

export default App
