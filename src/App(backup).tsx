import React from 'react'
import TopHalf from './TopHalf/TopHalf'
import Modal from './Modal/Modal'

interface State {
  subtotal: number
  tip: number
  tax: number
  total: number
  displayModal: boolean
  saveDate: number | string | Date
  hasChange: boolean
}

class App extends React.Component<{}, State> {
  state = {
    subtotal: 0,
    tip: 0,
    tax: 0,
    total: 0,
    displayModal: false,
    saveDate: 0,
    hasChange: false,
  }

  useSavedDataCloseModal = ():void => {
    let LS: string | null = localStorage.getItem('divviweb')
    if (typeof LS === 'string') {
      let newState = JSON.parse(LS)
      localStorage.removeItem('divviweb')
      this.setState({
        ...newState,
        displayModal: false,
      })
    }
  }

  toggleModal = ():void => {
    const { displayModal } = this.state
    let bool: boolean
    if (displayModal) {
      localStorage.removeItem('divviweb')
      bool = false
    } else {
      bool = true
    }

    this.setState({
      displayModal: bool,
    })
  }

  checkLocalStorage = (): boolean => {
    let LS: string | null = localStorage.getItem('divviweb')
    if (typeof LS === 'string') {
      let unix: number = JSON.parse(LS).date
      let date: Date = new Date(unix)
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

      this.setState({ saveDate })
      return true
    } else return false
  }

  componentDidMount = () => {
    if (!!this.checkLocalStorage()) {
      this.toggleModal()
    }

    window.onbeforeunload = () => {
      if (!!this.state.hasChange) {
        let unixTime = new Date().getTime()
        let saveData = { ...this.state, date: unixTime }
        localStorage.setItem('divviweb', JSON.stringify(saveData))
      }
    }
  }

  render() {
    const { displayModal, saveDate } = this.state
    return (
      <div className='root'>
        {displayModal && (
          <Modal
            yes={this.useSavedDataCloseModal}
            no={this.toggleModal}
            msg={`Use unfinished session from ${saveDate}?`}
          />
        )}
        <TopHalf />
      </div>
    )
  }
}

export default App
