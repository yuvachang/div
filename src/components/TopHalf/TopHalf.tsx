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

type Props = LinkDispatchProps & ReduxState & OwnProps

interface OwnProps {
  setFormHasData: (tf: boolean) => void
  formHasData: boolean
}

const TopHalf: React.FunctionComponent<Props> = props => {
  const [totals, setTotals] = useState<TotalState>(props.totals)
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [includeTipTax, setIncludeTipTax] = useState<boolean>(false)

  // const updateStore = (field: string): void => {
  //   //Strip $ and %
  //   let fieldValue: number = (totals as any)[field]
  //   let newTotals = { ...totals }
  //   //Format number and add $/%
  //   switch (field) {
  //     case 'subtotal':
  //       fieldValue = roundUSD(fieldValue)
  //       newTotals[field] = +fieldValue.toFixed(2)
  //       break
  //     case 'tip':
  //     case 'tax':
  //       fieldValue = roundPercent(fieldValue)
  //       newTotals[field] = +fieldValue.toFixed(1)
  //       break
  //   }

  //   //Compare rounded value to store.value
  //   //Set formatted string and return if numValue unchanged
  //   if (fieldValue === (props.totals as any)[field]) {
  //     setTotals({ ...newTotals })
  //     return
  //   } else {
  //     const newTotal = calculateTotal(newTotals)
  //     newTotals.total = newTotal
  //     const totalAndSubtotalEqual = newTotal === newTotals.subtotal

  //     //IncludeTipTax?
  //     if (!totalAndSubtotalEqual && !includeTipTax) {
  //       setIncludeTipTax(true)
  //     } else if (totalAndSubtotalEqual && !!includeTipTax) {
  //       setIncludeTipTax(false)
  //     }

  //     //Set state
  //     setTotals({ ...newTotals })
  //     //Update Redux Store
  //     switch (field) {
  //       case 'subtotal':
  //         props.updateSubTotal(fieldValue, newTotal)
  //         break
  //       case 'tip':
  //         props.updateTip(fieldValue, newTotal)
  //         break
  //       case 'tax':
  //         props.updateTax(fieldValue, newTotal)
  //         break
  //     }

  //     if (!props.formHasData) {
  //       props.setFormHasData(true)
  //     }
  //   }
  // }

  const clearTipTax = (): void => {
    let tip, tax
    tip = tax = 0
    let subtotal = totals.subtotal
    let newTotals = { ...totals, tip, tax, total: subtotal }
    setTotals({ ...totals, ...newTotals })
    setIncludeTipTax(false)
    props.clearTipTax()
  }

  // const updateStore = (e: React.SyntheticEvent<HTMLInputElement>) => {
  //   let target = e.target as HTMLInputElement
  //   let value: string = target.value

  //   if (target.name === 'total' || target.name === 'subtotal') {
  //     value = (+value).toFixed(2)
  //   } else {
  //     value = (+value).toFixed(1)
  //   }

  //   //Compare rounded value to store.value
  //   //Set formatted string and return if numValue unchanged
  //   if ((totals as any)[target.name] === (props.totals as any)[target.name]) {
  //     setTotals({
  //       ...totals,
  //       [target.name]: value,
  //     })
  //     return
  //   } else {
  //     const nTotals: any = { ...totals }
  //     nTotals[target.name] = value
  //     const newTotal = calculateTotal(nTotals).toFixed(2)
  //     nTotals.total = newTotal
  //     const totalAndSubtotalEqual = newTotal === nTotals.subtotal
  //     console.log(nTotals)

  //     //IncludeTipTax?
  //     if (!totalAndSubtotalEqual && !includeTipTax) {
  //       setIncludeTipTax(true)
  //     } else if (totalAndSubtotalEqual && !!includeTipTax) {
  //       setIncludeTipTax(false)
  //     }

  //     // Set state
  //     setTotals({
  //       ...totals,
  //       ...nTotals,
  //     })
  //     //Update Redux Store
  //     switch (target.name) {
  //       case 'subtotal':
  //         props.updateSubTotal(+value, +newTotal)
  //         break
  //       case 'tip':
  //         props.updateTip(+value, +newTotal)
  //         break
  //       case 'tax':
  //         props.updateTax(+value, +newTotal)
  //         break
  //     }

  //     if (!props.formHasData) {
  //       props.setFormHasData(true)
  //     }
  //   }
  // }

  const formatAndTotalOnBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement
    let targetValue: string = target.value
    let targetName: string = target.name

    //format & round targetValue
    if (targetName === 'subtotal' || targetName === 'total') {
      targetValue = roundUSD(+targetValue).toFixed(2)
    } else {
      targetValue = String(roundPercent(+targetValue))
    }

    //check if value changed from before
    if (+targetValue === (props.totals as any)[targetName]) {
      // if no change,
      // set formatted string to state only
      setTotals({
        ...totals,
        [targetName]: targetValue,
      })
    } else {
      // if changed,
      //// calc new total
      let newState: any = { ...totals }
      newState[targetName] = targetValue
      const newTotal: string = calculateTotal(newState).toFixed(2)
      newState.total = newTotal

      //// determine if tip/tax>0
      const totalAndSubtotalEqual = newTotal === newState.subtotal
      if (!totalAndSubtotalEqual && !includeTipTax) {
        setIncludeTipTax(true)
      } else if (totalAndSubtotalEqual && !!includeTipTax) {
        setIncludeTipTax(false)
      }

      //// setSTate and updateStore && set formHasData
      //Set state
      setTotals({ ...newState })
      //Update Redux Store
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
  //   setTotals({
  //     ...totals,
  //     subtotal: +totals.total.toFixed(2),
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
          <p>Tip</p>
          <Input
            name='tip'
            onChange={handleChange}
            val={totals ? totals.tip : 0}
            updateStore={formatAndTotalOnBlur}
          />
        </div>
        <div className='segment'>
          <p>Tax</p>
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
