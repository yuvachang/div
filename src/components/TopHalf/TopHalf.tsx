import React from 'react'
import Input from '../Input'
import {Connect} from 'react-redux'

interface Totals {
  subtotal: number
  tip: number
  tax: number
  total: number
}

interface Props {
  totals?: Totals
  setTotals?: (totals: { subtotal: number; tip: number; tax: number; total: number }) => void
}

const TopHalf: React.FunctionComponent<Props> = props => {





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
        <Input 
        enable={false}
         />
      </div>
    </div>
  )
}

const mapState = state => ({
  totals: state.totals
})

export default Connect(mapState, mapDispatch)(TopHalf)
