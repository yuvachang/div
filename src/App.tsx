import React, { useState, useEffect } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from './store'

//import components
import TopHalf from './components/TopHalf/TopHalf'
import Modal from './components/Modal/Modal'

//import actionCreators
import { useLocalStorageData } from './store/actions/totalsActions'

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

type Props = LinkDispatchProps & ReduxState

const App: React.FunctionComponent<Props> = props => {
  const [lsDate, setLsDate] = useState<string>('date not found')
  const [formHasData, setFormHasData] = useState<boolean>(false)
  const [displayModal, setModal] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const [lsData, setLsData] = useState<string>('no data')

  const useLocalStorageData = (): void => {
    if (lsData !== 'no data') {
      let newTotals = JSON.parse(lsData)
      delete newTotals.date

      let numOfKeysLS = Object.keys(newTotals).length
      let numOfKeysState = Object.keys(props.totals).length
      if (numOfKeysLS !== numOfKeysState) {
        setError('Data corrupt')
        return
      } else {
        props.useLocalStorage(newTotals)
        closeModal()
      }
    }
  }

  const closeModal = () => {
    localStorage.removeItem('divviweb')
    setLsDate('date not found')
    setModal(false)
  }

  // onMount
  useEffect(() => {
    let LS: string | null = localStorage.getItem('divviweb')
    if (typeof LS === 'string') {
      setLsData(LS)

      let unix: number = JSON.parse(LS).date
      setLsDate(unixTimeToDate(unix))

      setModal(true)
    }
    // console.log(localStorage.getItem('divviweb'))
  }, [])

  //onUnmount
  window.onbeforeunload = () => {
    if (!!formHasData) {
      let unixTime = new Date().getTime()
      let saveData = { ...props.totals, date: unixTime }
      localStorage.setItem('divviweb', JSON.stringify(saveData))
    }
  }

  return (
    <div className='root'>
      {displayModal && (
        <Modal
          yes={useLocalStorageData}
          no={closeModal}
          msg={`Use unfinished session from ${lsDate}?`}
        />
      )}
      {error && <h1>{error}</h1>}

      <TopHalf />
    </div>
  )
}

interface LinkDispatchProps {
  useLocalStorage: (lsdata: object) => void
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  totals: state.totals,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  useLocalStorage: bindActionCreators(useLocalStorageData, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(App)
