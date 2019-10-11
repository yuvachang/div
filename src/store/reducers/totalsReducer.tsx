import * as actions from '../actions/actionTypes'

export interface TotalState {
  subtotal: number
  tip: number
  tax: number
  total: number
  useLS: boolean
}

const initialState = {
  subtotal: 0,
  tip: 0,
  tax: 0,
  total: 0,
  useLS: false,
}

const totalsReducer = (state: TotalState = initialState, { type, payload }: actions.ActionType) => {
  switch (type) {
    case actions.UPDATE_SUBTOTAL:
      return {
        ...state,
        subtotal: payload.subtotal,
        total: payload.total,
      }
    case actions.UPDATE_TIP:
      return {
        ...state,
        tip: payload.tip,
        total: payload.total,
      }
    case actions.UPDATE_TAX:
      return {
        ...state,
        tax: payload.tax,
        total: payload.total,
      }
    case actions.CLEAR_TIPTAX:
      return {
        ...state,
        tip: 0,
        tax: 0,
        total: state.subtotal,
      }
    case actions.USE_LS:
      return {
        ...state,
        ...payload,
        useLS: true,
      }
    default:
      return state
  }
}

export default totalsReducer
