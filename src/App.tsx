import React, { useState, useEffect } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from './store'
//import components
import TopHalf from './components/TopHalf/TopHalf'
import Modal from './components/Modal/Modal'
import { unixTimeToDate } from './components/functions'
//import actionCreators
import { useLocalStorageData } from './store/actions/totalsActions'

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
        setFormHasData(true)
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

      <TopHalf formHasData={formHasData} setFormHasData={(tf: boolean) => setFormHasData(tf)} />
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
