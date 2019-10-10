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
import { TotalState } from '../../store/reducers/totalsReducer'

type Props = LinkDispatchProps & ReduxState

const TopHalf: React.FunctionComponent<Props> = props => {
  const [totals, setTotals] = useState(props.totals)

  const updateStore = (field: string) => {
    switch (field) {
      case 'total':
        props.updateTotal((totals as TotalState).total)
        break
      case 'subtotal':
        props.updateSubTotal((totals as TotalState).subtotal)
        break
      case 'tip':
        props.updateTip((totals as TotalState).tip)
        break
      case 'tax':
        props.updateTax((totals as TotalState).tax)
        break
    }
  }

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let target = e.target

    setTotals({
      ...totals,
      [(target as HTMLInputElement).name]: (target as HTMLInputElement).value,
    })
  }

  return (
    <div className='top-half'>
      <div className='total-details collapsed'>
        <div className='segment'>
          <h4>Sub-total</h4>
          <Input
            name='subtotal'
            onChange={e => handleChange(e)}
            val={totals ? totals.subtotal : undefined}
            updateStore={updateStore}
          />
        </div>
        <div className='segment'>
          <h4>Tip</h4>
          <Input
            name='tip'
            onChange={handleChange}
            val={totals ? totals.tip : undefined}
            updateStore={updateStore}
          />
        </div>
        <div className='segment'>
          <h4>Tax</h4>
          <Input
            name='tax'
            onChange={handleChange}
            val={totals ? totals.tax : undefined}
            updateStore={updateStore}
          />
        </div>
      </div>

      <div className='segment'>
        <h4>Total</h4>
        <Input
          name='total'
          onChange={handleChange}
          val={totals ? totals.total : undefined}
          updateStore={updateStore}
        />
      </div>

      <div className='segment'>
        <h4>Amount Paid : $3.33</h4>
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
