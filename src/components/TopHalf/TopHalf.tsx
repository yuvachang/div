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

type Props = LinkDispatchProps & ReduxState & OwnProps

export interface InitialState {
  total: string
  subtotal: string
  tax: string
  tip: string
}

interface OwnProps {
  setFormHasData: (tf: boolean) => void
  formHasData: boolean
}

const TopHalf: React.FunctionComponent<Props> = props => {
  const [totals, setTotals] = useState<InitialState>({
    total: '$0.00',
    subtotal: '$0.00',
    tip: '0%',
    tax: '0%',
  })
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [includeTipTax, setIncludeTipTax] = useState<boolean>(false)

  const updateStore = (field: string) => {
    //Strip $ and %
    let fieldValue: number = +(totals as any)[field].split(new RegExp('\\$|\\%')).join('')
    let newTotals = { ...totals }
    //Format number and add $/%
    switch (field) {
      case 'subtotal':
        fieldValue = roundUSD(fieldValue)
        newTotals[field] = '$' + fieldValue.toFixed(2)
        break
      case 'tip':
      case 'tax':
        fieldValue = roundPercent(fieldValue)
        newTotals[field] = fieldValue + '%'
        break
    }
    //Compare rounded value to store.value.
    //Set formatted string and return if numValue unchanged.
    if (fieldValue === (props.totals as any)[field]) {
      setTotals({ ...newTotals })
      return
    } else {
      const newTotal = calculateTotal(newTotals)
      newTotals.total = '$' + newTotal.toFixed(2)

      const totalAndSubtotalEqual = '$' + newTotal.toFixed(2) === newTotals.subtotal
      if (!totalAndSubtotalEqual && !includeTipTax) {
        setIncludeTipTax(true)
      } else if (totalAndSubtotalEqual && !!includeTipTax) {
        setIncludeTipTax(false)
      }

      setTotals({ ...newTotals })
      //Update Redux Store
      switch (field) {
        case 'subtotal':
          props.updateSubTotal(fieldValue, newTotal)
          break
        case 'tip':
          props.updateTip(fieldValue, newTotal)
          break
        case 'tax':
          props.updateTax(fieldValue, newTotal)
          break
      }
      if (!props.formHasData) {
        props.setFormHasData(true)
      }
    }
  }

  const clearTipTax = (): void => {
    let tip, tax
    tip = tax = '0%'
    let subtotal = totals.subtotal
    let newTotals = { ...totals, tip, tax, total: subtotal }
    setTotals({ ...totals, ...newTotals })
    setIncludeTipTax(false)
    props.clearTipTax()
  }

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement
    const filteredInput = filterInput(target.value)
    setTotals({
      ...totals,
      [target.name]: filteredInput,
    })
  }

  //onMount
  useEffect(() => {
    if (props.totals.useLS) {
      console.log('state=store')
      let stringTotals: any = { ...props.totals }
      stringTotals.subtotal = '$' + stringTotals.subtotal.toFixed(2)
      stringTotals.total = '$' + stringTotals.total.toFixed(2)
      stringTotals.tax = Number(stringTotals.tax) + '%'
      stringTotals.tip = Number(stringTotals.tip) + '%'
      if (props.totals.total !== props.totals.subtotal) {
        setIncludeTipTax(true)
      }
      setTotals(stringTotals)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.totals.useLS])

  return (
    <div className='top-half'>
      <div>
        <div className='segment'>
          <p>{collapsed ? 'T' : 'Sub-t'}otal</p>
          {collapsed && includeTipTax ? (
            <Input
              name='total'
              onChange={handleChange}
              val={totals ? totals.total : undefined}
              updateStore={updateStore}
              disabled={true}
            />
          ) : (
            <Input
              name='subtotal'
              onChange={e => handleChange(e)}
              val={totals ? totals.subtotal : undefined}
              updateStore={updateStore}
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
        className={`total-details${collapsed ? ' collapsed' : ''}`}
        style={!collapsed && includeTipTax ? { height: '134px' } : {}}>
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

        {includeTipTax && (
          <div className='menu-bar' style={{ backgroundColor: 'transparent' }}>
            <div
              className='menu-bar'
              style={{ width: '50%', height: '14px' }}
              onClick={clearTipTax}>
              <div className='tiny' style={{ fontSize: '9px' }}>
                {'clear amounts'}
              </div>
            </div>
          </div>
        )}

        <div className='segment'>
          <p className='greytext'>Total</p>
          <Input
            name='total'
            onChange={handleChange}
            val={totals ? totals.total : undefined}
            updateStore={updateStore}
            disabled={true}
          />
        </div>
      </div>

      <div className='segment'>
        <p className='greytext'>Amount Paid</p>
        <Input name='paid' val={'$3.33'} updateStore={() => {}} disabled={true} />
      </div>
    </div>
  )
}

interface LinkDispatchProps {
  updateSubTotal: (subtotal: number, newTotal: number) => void
  updateTip: (tip: number, newTotal: number) => void
  updateTax: (tax: number, newTotal: number) => void
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
