import React from 'react'
import TopHalf from './TopHalf/TopHalf'
import Modal from './Modal/Modal'

interface State {
  subtotal: number
  tip: number
  tax: number
  total: number
  displayModal: boolean
}

class App extends React.Component<{}, State> {
  state = {
    subtotal: 0,
    tip: 0,
    tax: 0,
    total: 0,
    paid: 0,
    displayModal: false
  }

  componentDidMount = () => {
    let LS: string | null = localStorage.getItem('divviweb')
    if (typeof LS === 'string') {
      let newState = JSON.parse(LS)
      // console.log(newState)
      this.setState({
        ...newState,
      })
    }

    window.onbeforeunload = () => {
      let today = new Date().getTime()
      let saveData = { ...this.state, date: today }
      localStorage.setItem('divviweb', JSON.stringify(saveData))
    }
  }

  render() {
    const {displayModal} = this.state
    return (
      <div className='root'>
        {displayModal && <Modal />}
        <TopHalf />
      </div>
    )
  }
}

export default App
