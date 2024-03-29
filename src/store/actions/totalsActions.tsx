import * as actionTypes from './actionTypes'
import { TotalState } from '../reducers/totalsReducer'

export const updateSubTotal = (subtotal: string, total: string) => {
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

export const updateTax = (tax: string, total: string) => {
  return {
    type: actionTypes.UPDATE_TAX,
    payload: { tax, total },
  }
}

export const updateTip = (tip: string, total: string) => {
  return {
    type: actionTypes.UPDATE_TIP,
    payload: { tip, total },
  }
}

export const useLocalStorageTotals = (lsData: TotalState) => {
  return {
    type: actionTypes.TOTALS_USE_LOCALSTORAGE,
    payload: lsData,
  }
}
