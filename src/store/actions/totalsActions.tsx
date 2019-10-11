import * as actionTypes from './actionTypes'

export const updateSubTotal = (subtotal:number) => {
  // console.log(newSubTot)
  // let subtotal: number = +newSubTot.slice(1)

  return {
    type: actionTypes.UPDATE_SUBTOTAL,
    payload: subtotal,
  }
}

export const updateTotal = (total: number) => {
  // let total: number = +newTot.slice(1)

  return {
    type: actionTypes.UPDATE_TOTAL,
    payload: total,
  }
}

export const updateTax = (tax: number) => {
  // let tax: number = +newTax.slice(0, -1)

  return {
    type: actionTypes.UPDATE_TAX,
    payload: tax,
  }
}

export const updateTip = (tip: number) => {
  // let tip: number = +newTip.slice(0, -1)

  return {
    type: actionTypes.UPDATE_TIP,
    payload: tip,
  }
}

export const useLocalStorageData = (lsData: object) => {
  return {
    type: actionTypes.USE_LS,
    payload: lsData,
  }
}
