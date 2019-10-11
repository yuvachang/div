import React, { useState, useEffect } from 'react'
import Input from '../Input'
import { connect } from 'react-redux'
import {
  updateSubTotal,
  updateTip,
  updateTax,
  updateTotal,
} from '../../store/actions/totalsActions'
import { bindActionCreators, Dispatch } from 'redux'
import { ReduxState } from '../../store'

type Props = LinkDispatchProps & ReduxState

interface InitialState {
  total: string
  subtotal: string
  tax: string
  tip: string
}

const TopHalf: React.FunctionComponent<Props> = props => {
  const [totals, setTotals] = useState<InitialState>({ total: '', subtotal: '', tip: '', tax: '' })
  const [collapsed, setCollapsed] = useState<boolean>(true)

  const updateStore = (field: string) => {
    const roundUSD = (num: number): number => {
      return +(Math.round(+num * 100) / 100).toFixed(2)
    }
    const roundPercent = (num: number): number => {
      return Math.round(+num * 10) / 10
    }

    let fieldValue: number = +(totals as any)[field].split(new RegExp('\\$|\\%')).join('')

    let newTotals = { ...totals }
    switch (field) {
      case 'total':
      case 'subtotal':
        fieldValue = roundUSD(fieldValue)
        newTotals[field] = '$' + fieldValue.toFixed(2)
        setTotals({ ...newTotals })
        break
      case 'tip':
      case 'tax':
        fieldValue = roundPercent(fieldValue)
        newTotals[field] = '$' + fieldValue
        setTotals({ ...newTotals })
        break
    }

    //Don't dispatch redux action if value didn't change.
    if (fieldValue === (props.totals as any)[field]) return

    switch (field) {
      case 'total':
        props.updateTotal(fieldValue)
        break
      case 'subtotal':
        props.updateSubTotal(fieldValue)
        break
      case 'tip':
        props.updateTip(fieldValue)
        break
      case 'tax':
        props.updateTax(fieldValue)
        break
    }
  }

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement
    const input = target.value
    const filteredInput = input
      .split('')
      .filter(char => !'abcdefghijklmnopqrstuvwxyz'.includes(char.toLowerCase()))
      .filter(char => '$%0123456789.'.includes(char))
      .join('')

    setTotals({
      ...totals,
      [target.name]: filteredInput,
    })
  }

  //onMount
  useEffect(() => {
    if (props.totals) {
      let stringTotals: any = { ...props.totals }
      stringTotals.subtotal = '$' + stringTotals.subtotal.toFixed(2)
      stringTotals.total = '$' + stringTotals.total.toFixed(2)
      stringTotals.tax = Number(stringTotals.tax) + '%'
      stringTotals.tip = Number(stringTotals.tip) + '%'
      setTotals(stringTotals)
    }
  }, [])

  return (
    <div className='top-half'>
      <div>
        <div className='segment'>
          <p>Total</p>
          <Input
            name='total'
            onChange={handleChange}
            val={totals ? totals.total : undefined}
            updateStore={updateStore}
          />
        </div>
      </div>

      <div className='menu-bar' onClick={() => setCollapsed(!collapsed)}>
        <div className='tiny'>{collapsed ? 'more options' : 'less options'}</div>
      </div>

      <div className={`total-details${collapsed ? ' collapsed' : ''}`}>
        <div className='segment'>
          <p>Sub-total</p>
          <Input
            name='subtotal'
            onChange={e => handleChange(e)}
            val={totals ? totals.subtotal : undefined}
            updateStore={updateStore}
          />
        </div>
        <div className='segment'>
          <p>Tip</p>
          <Input
            name='tip'
            onChange={handleChange}
            val={totals ? totals.tip : undefined}
            updateStore={updateStore}
          />
        </div>
        <div className='segment'>
          <p>Tax</p>
          <Input
            name='tax'
            onChange={handleChange}
            val={totals ? totals.tax : undefined}
            updateStore={updateStore}
          />
        </div>
      </div>

      <div className='segment'>
        <p>Amount Paid : $3.33</p>
        {/* <Input enable={false} /> */}
      </div>
    </div>
  )
}

interface LinkDispatchProps {
  updateSubTotal: (subtotal: number) => void
  updateTip: (tip: number) => void
  updateTax: (tax: number) => void
  updateTotal: (total: number) => void
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  totals: state.totals,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  updateSubTotal: bindActionCreators(updateSubTotal, dispatch),
  updateTip: bindActionCreators(updateTip, dispatch),
  updateTax: bindActionCreators(updateTax, dispatch),
  updateTotal: bindActionCreators(updateTotal, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(TopHalf)

// export default TopHalf
