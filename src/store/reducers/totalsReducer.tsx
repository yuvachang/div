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
    
    case actions.USE_LS:
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export default totalsReducer
