import React, { Component } from 'react'
import Input from '../components/Input'
import TextBubble from '../components/TextBubble'
// import { number } from "prop-types";

interface State {
  total: number
  paid: number
}

class TopHalf extends Component<{}, State> {
  state = {
    total: 0,
    paid: 0,
  }

  selectInput = () => {}

  componentDidMount = () => {}

  render() {
    return (
      <div className='top-half'>
        <div className='segment'>
          <h3>Sub-total</h3>
          <Input />
        </div>
        <div className='segment'>
          <h3>Tip</h3>
          <Input />
        </div>
        <div className='segment'>
          <h3>Tax</h3>
          <Input />
        </div>
        <div className='segment'>
          <h3>Total</h3>
          <Input />
        </div>

        <div className='segment'>
          <h3>Paid</h3>
          <Input enable={false} />
        </div>
      </div>
    )
  }
}

export default TopHalf
