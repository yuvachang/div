import React, { useState, useEffect } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ReduxState } from './store'
//import components
import TopHalf from './components/TopHalf/TopHalf'
import Modal from './components/Modal/Modal'
import { unixTimeToDate } from './components/functions'
//import actionCreators
import { useLocalStorageTotals } from './store/actions/totalsActions'
import BottomHalf from './components/BottomHalf/BottomHalf'
import { UserObject } from './store/reducers/usersReducer'
import { TotalState } from './store/reducers/totalsReducer'
import { useLocalStorageUsers } from './store/actions/usersActions'

type Props = LinkDispatchProps & LinkStateProps

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

      let newUsers = [...newTotals.users]
      delete newTotals.users

      let numOfKeysLS = Object.keys(newTotals).length
      let numOfKeysState = Object.keys(props.totals).length
      if (numOfKeysLS !== numOfKeysState) {
        setError('Data corrupt')
        return
      } else {
        props.useLocalStorageTotals(newTotals)
        props.useLocalStorageUsers(newUsers)
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
    if (!!formHasData || !!props.users.length) {
      let unixTime = new Date().getTime()
      let saveData = { ...props.totals, users: [...props.users], date: unixTime }
      localStorage.setItem('divviweb', JSON.stringify(saveData))
    }
  }

  return (
    <div className='app'>
      {displayModal && (
        <Modal
          yes={useLocalStorageData}
          no={closeModal}
          msg={`Use unfinished session from ${lsDate}?`}
        />
      )}
      {error && <h1>{error}</h1>}
      <div className='app-card'>
        <TopHalf formHasData={formHasData} setFormHasData={(tf: boolean) => setFormHasData(tf)} />

        <BottomHalf />
      </div>
    </div>
  )
}

interface LinkDispatchProps {
  useLocalStorageTotals: (lsdata: object) => void
  useLocalStorageUsers: (lsData: object) => void
}

interface LinkStateProps {
  totals: TotalState
  users: Array<UserObject>
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  totals: state.totals,
  users: state.users.usersArr,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  useLocalStorageTotals: bindActionCreators(useLocalStorageTotals, dispatch),
  useLocalStorageUsers: bindActionCreators(useLocalStorageUsers, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(App)
