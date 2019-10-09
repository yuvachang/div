import React, { Component } from 'react'
import Input from '../components/Input'
import TextBubble from '../components/TextBubble'
// import { number } from "prop-types";

interface Props {
  subtotal?: number
  tip?: number
  tax?: number
  total?: number
}

class TopHalf extends Component<Props, {}> {


  selectInput = () => {}

  useSavedData = () => {}



  render() {
    return (
      <div className='top-half'>
        <div className='segment'>
          <h4>Sub-total</h4>
          <Input />
        </div>
        <div className='segment'>
          <h4>Tip</h4>
          <Input />
        </div>
        <div className='segment'>
          <h4>Tax</h4>
          <Input />
        </div>
        <div className='segment'>
          <h4>Total</h4>
          <Input />
        </div>

        <div className='segment'>
          <h4>Amount Paid</h4>
          <Input enable={false} />
        </div>
      </div>
    )
  }
}

export default TopHalf
