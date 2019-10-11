import * as actionTypes from './actionTypes'

export const updateSubTotal = (subtotal: number, total: number) => {
  return {
    type: actionTypes.UPDATE_SUBTOTAL,
    payload: { subtotal, total },
  }
}

export const clearTipTax = () => {
  return {
    type: actionTypes.CLEAR_TIPTAX,
  }
}

export const updateTax = (tax: number, total: number) => {
  return {
    type: actionTypes.UPDATE_TAX,
    payload: { tax, total },
  }
}

export const updateTip = (tip: number, total: number) => {
  return {
    type: actionTypes.UPDATE_TIP,
    payload: { tip, total },
  }
}

export const useLocalStorageData = (lsData: object) => {
  return {
    type: actionTypes.USE_LS,
    payload: lsData,
  }
}
