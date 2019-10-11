import * as actions from '../actions/actionTypes'

export interface TotalState {
  subtotal: number
  tip: number
  tax: number
  total: number
}

const initialState = {
  subtotal: 0,
  tip: 0,
  tax: 0,
  total: 0,
}

const totalsReducer = (state: TotalState = initialState, { type, payload }: actions.ActionType) => {
  switch (type) {
    case actions.UPDATE_SUBTOTAL:
      return {
        ...state,
        subtotal: payload,
      }
    case actions.UPDATE_TOTAL:
      return {
        ...state,
        total: payload,
      }
    case actions.UPDATE_TIP:
      return {
        ...state,
        tip: payload,
      }
    case actions.UPDATE_TAX:
      return {
        ...state,
        tax: payload,
      }
    case actions.USE_LS:
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}

export default totalsReducer
