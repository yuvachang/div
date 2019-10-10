import * as actionTypes from './actionTypes'

export const updateSubTotal = (newSubTot: number) => {
  return {
    type: actionTypes.UPDATE_SUBTOTAL,
    payload: newSubTot
  }
}

export const updateTotal = (newTot: number) => {
  return {
    type: actionTypes.UPDATE_TOTAL,
    payload: newTot
  }
}

export const updateTax = (newTax: number) => {
  return {
    type: actionTypes.UPDATE_TAX,
    payload: newTax
  }
}

export const updateTip = (newTip: number) => {
  return {
    type: actionTypes.UPDATE_TIP,
    payload: newTip
  }
}

export const useLocalStorageData = (lsData: object) => {
  return {
    type: actionTypes.USE_LS,
    payload: lsData
  }
}