import React, { useState, useEffect } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { ReduxState } from '../../store'
import { connect } from 'react-redux'
//import actionCreators
import {
  updateSubTotal,
  updateTip,
  updateTax,
  clearTipTax,
} from '../../store/actions/totalsActions'
//import components
import Input from '../Input'
import { roundPercent, roundUSD, filterInput, calculateTotal } from '../functions'
import { TotalState } from '../../store/reducers/totalsReducer'
import { checkPropTypes } from 'prop-types'

type Props = LinkDispatchProps & ReduxState & OwnProps

interface OwnProps {
  setFormHasData: (tf: boolean) => void
  formHasData: boolean
}

// interface LocalState {
//   subtotal: string
//   tip: string
//   tax: string
//   total: string
// }

// const initialState = {
//   subtotal: '0.00',
//   tip: '0',
//   tax: '0',
//   total: '0.00',
// }

const TopHalf: React.FunctionComponent<Props> = props => {
  const [totals, setTotals] = useState<TotalState>(props.totals)
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [includeTipTax, setIncludeTipTax] = useState<boolean>(false)

  const clearTipTax = (): void => {
    let tip, tax
    tip = tax = 0
    let newTotals = { ...totals, tip, tax, total: totals.subtotal }
    setTotals({ ...totals, ...newTotals })

    setIncludeTipTax(false)

    props.clearTipTax()
  }

  const formatAndTotalOnBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement
    let targetValue: string = target.value
    let targetName: string = target.name

    // Format & round targetValue
    if (targetName === 'subtotal' || targetName === 'total') {
      if (+targetValue > 0) {
        targetValue = roundUSD(+targetValue).toFixed(2)
      } else {
        targetValue = '0'
      }
    } else {
      targetValue = String(roundPercent(+targetValue))
    }

    // Check if targetValue changed from before
    if (+targetValue === (props.totals as any)[targetName]) {
      // If no change,
      // Set formatted string to state only
      setTotals({
        ...totals,
        [targetName]: targetValue,
      })
    } else {
      // If changed,
      // Calc new total
      let newState: any = { ...totals }
      newState[targetName] = targetValue
      const newTotal: string = calculateTotal(newState)
      newState.total = newTotal

      // Check for tip/tax
      const totalAndSubtotalEqual = newTotal === newState.subtotal
      if (!totalAndSubtotalEqual && !includeTipTax) {
        setIncludeTipTax(true)
      } else if (totalAndSubtotalEqual && !!includeTipTax) {
        setIncludeTipTax(false)
      }

      // Set state
      setTotals({ ...newState })

      // Update Redux store
      switch (targetName) {
        case 'subtotal':
          props.updateSubTotal(targetValue, newTotal)
          break
        case 'tip':
          props.updateTip(targetValue, newTotal)
          break
        case 'tax':
          props.updateTax(targetValue, newTotal)
          break
      }

      // Set formHasData
      if (!props.formHasData) {
        props.setFormHasData(true)
      }
    }
  }

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement
    let value: string = target.value

    setTotals({
      ...totals,
      [target.name]: value,
    })
  }

  //onMount
  // useEffect(() => {
  //   let { subtotal, total, tip, tax } = totals

  //   setTotals({
  //     ...totals,
  //     subtotal: (+subtotal).toFixed(2),
  //   })
  // }, [])
  useEffect(() => {
    if (props.totals.useLS) {
      console.log('using LS data')
      if (props.totals.total !== props.totals.subtotal) {
        setIncludeTipTax(true)
      }
      setTotals(props.totals)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.totals.useLS])

  return (
    <div className='top-half'>
      <div>
        <div className='segment'>
          <p>{collapsed ? 'T' : 'Sub-t'}otal</p>
          <div className='symbol greytext'>$</div>
          {collapsed && includeTipTax ? (
            <Input
              name='total'
              onChange={handleChange}
              val={totals ? totals.total : 0}
              updateStore={formatAndTotalOnBlur}
              disabled={true}
            />
          ) : (
            <Input
              name='subtotal'
              onChange={e => handleChange(e)}
              val={totals ? totals.subtotal : 0}
              updateStore={formatAndTotalOnBlur}
            />
          )}
        </div>
      </div>

      <div className='menu-bar' onClick={() => setCollapsed(!collapsed)}>
        <div className='tiny'>
          {!collapsed ? 'hide tips & tax' : includeTipTax ? 'edit amounts' : 'include tips & tax'}
        </div>
      </div>

      <div
        className={`total-details${
          collapsed ? ' collapsed' : includeTipTax ? ' include-clear-button' : ''
        }`}>
        <div className='segment'>
          <p>
            Tip (
            {props.totals.subtotal > 0 && props.totals.tip > 0
              ? `$${((props.totals.tip / 100) * props.totals.subtotal).toFixed(2)}`
              : '$0'}
            )
          </p>
          <Input
            name='tip'
            onChange={handleChange}
            val={totals ? totals.tip : 0}
            updateStore={formatAndTotalOnBlur}
          />
        </div>
        <div className='segment'>
          <p>
            Tax (
            {props.totals.subtotal > 0 && props.totals.tax > 0
              ? `$${((props.totals.tax / 100) * props.totals.subtotal).toFixed(2)}`
              : '$0'}
            )
          </p>
          <Input
            name='tax'
            onChange={handleChange}
            val={totals ? totals.tax : 0}
            updateStore={formatAndTotalOnBlur}
          />
        </div>

        {includeTipTax && (
          <div className='menu-bar' style={{ backgroundColor: 'transparent' }}>
            <div
              className='menu-bar'
              style={{ width: '50%', height: '14px' }}
              onClick={clearTipTax}>
              <div className='tiny'>{'clear amounts'}</div>
            </div>
          </div>
        )}

        <div className='segment'>
          <p className='greytext'>Total</p>
          <Input
            name='total'
            onChange={handleChange}
            val={totals ? totals.total : 0}
            updateStore={formatAndTotalOnBlur}
            disabled={true}
          />
        </div>
      </div>

      <div className='segment'>
        <p className='greytext'>Amount Paid</p>
        <Input name='paid' val={3.33} updateStore={() => {}} disabled={true} />
      </div>
    </div>
  )
}

interface LinkDispatchProps {
  updateSubTotal: (subtotal: string, newTotal: string) => void
  updateTip: (tip: string, newTotal: string) => void
  updateTax: (tax: string, newTotal: string) => void
  clearTipTax: () => void
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  totals: state.totals,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  updateSubTotal: bindActionCreators(updateSubTotal, dispatch),
  updateTip: bindActionCreators(updateTip, dispatch),
  updateTax: bindActionCreators(updateTax, dispatch),
  clearTipTax: bindActionCreators(clearTipTax, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(TopHalf)
