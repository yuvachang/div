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
import { UserState } from './store/reducers/usersReducer'
import { TotalState } from './store/reducers/totalsReducer'
import { useLocalStorageUsers } from './store/actions/usersActions'

type Props = LinkDispatchProps & LinkStateProps

const App: React.FunctionComponent<Props> = props => {
  const [lsDate, setLsDate] = useState<string>('date not found')
  const [formHasData, setFormHasData] = useState<boolean>(false)
  const [displayModal, setModal] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [lsData, setLsData] = useState<string>('no data')

  const setJSONdata = (): void => {
    if (lsData !== 'no data') {
      const LS = JSON.parse(lsData)
      const newTotals: TotalState = LS.totals
      const newUsers: UserState = LS.users

      // Check integrity of LSDATA
      const totalsKeys = Object.keys(newTotals).length
      const ptotalsKeys = Object.keys(props.totals).length
      const initialsLength = newUsers.initials.length
      const usersLength = Object.keys(newUsers.users).length
      if (totalsKeys !== ptotalsKeys || initialsLength !== usersLength) {
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

      let unixTime: number = JSON.parse(LS).date
      setLsDate(unixTimeToDate(unixTime))

      setModal(true)
    }
  }, [])

  const exportDataToFile = async () => {
    const json = makeJSONfile()
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = await URL.createObjectURL(blob)
    link.download = 'backup.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const makeJSONfile = () => {
    let saveData = {
      totals: { ...props.totals },
      users: { ...props.users },
      date: new Date().getTime(),
    }
    let json = JSON.stringify(saveData)
    return json
  }

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files![0]

    const readFile = new FileReader()
    readFile.onload = (e: ProgressEvent<FileReader>) => {
      var contents: any = (e.target as FileReader).result
      let unixTime: number = JSON.parse(contents).date
      setLsDate(unixTimeToDate(unixTime))
      setLsData(contents)
      setModal(true)
    }
    readFile.readAsText(file)
  }

  //onUnmount
  window.onbeforeunload = () => {
    if (!!formHasData || !!Object.keys(props.users.users).length) {
      localStorage.setItem('divviweb', makeJSONfile())
    }
  }

  return (
    <div className='app'>
      {displayModal && (
        <Modal yes={setJSONdata} no={closeModal} msg={`Use session from ${lsDate}?`} />
      )}
      {error && <h1>{error}</h1>}
      <div className='app-card'>
        <div className='app-title'>Divvi</div>
        <TopHalf formHasData={formHasData} setFormHasData={(tf: boolean) => setFormHasData(tf)} />

        <BottomHalf />
        {formHasData && <div style={{ width: '100%', borderBottom: '1px solid #666666' }} />}
        {formHasData && (
          <div className='small-text hover' onClick={exportDataToFile}>
            Export data to file
          </div>
        )}

        <input
          type='file'
          id='uploadfile'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => importData(e)}
        />
        <label htmlFor='uploadfile' className='small-text hover' style={{ paddingTop: '0px' }}>
          Upload saved data
        </label>
      </div>
    </div>
  )
}

interface LinkDispatchProps {
  useLocalStorageTotals: (lsdata: TotalState) => void
  useLocalStorageUsers: (lsData: UserState) => void
}

interface LinkStateProps {
  totals: TotalState
  users: UserState
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  totals: state.totals,
  users: state.users,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  useLocalStorageTotals: bindActionCreators(useLocalStorageTotals, dispatch),
  useLocalStorageUsers: bindActionCreators(useLocalStorageUsers, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(App)
