import * as actionTypes from './actionTypes'

export const updateSubTot = (newSubTot: number) => {
  return {
    type: actionTypes.UPDATE_SUBTOTAL,
    payload: newSubTot
  }
}
