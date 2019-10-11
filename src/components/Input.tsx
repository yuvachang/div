import React, { Component, SetStateAction, Dispatch, useState } from 'react'
import { useInputUSD } from './useInput'
import { TotalState } from '../store/reducers/totalsReducer'

interface Props {
  val: string | undefined
  name: string
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
  updateStore: (type: string) => void
}

const Input: React.FunctionComponent<Props> = props => {
  const [valChanged, setValChanged] = useState<boolean>(false)

  const characterChecker = (e: React.KeyboardEvent<HTMLInputElement>) => {

    // exclude: 0-37,40-48,57-97,105-110,110-190
    // include: 37-40,48 - 57,97 - 105,110,190(num, numpad, arrows, period, decimal)
    let target = e.target as HTMLInputElement
    let kc = e.keyCode
    let inputValue = target.value

    if (kc === 190 || kc === 110) { 
      if (inputValue.includes('.')) {
        //if number already has decimal, do nothing
        e.preventDefault()
        return
      }
    }
    if (
      //symbol or nonletter
      kc != 8 &&
      kc != 46 &&
      (kc < 37 ||
        (kc > 40 && kc < 48) ||
        (kc > 57 && kc < 97) ||
        (kc > 105 && kc < 110) ||
        (kc > 110 && kc < 190) ||
        kc > 190)
    ) {
      e.preventDefault()
      if (kc === 13) {
        target.blur()
      }
    }
  }

  return (
    <input
      type='text'
      name={props.name}
      onChange={props.onChange}
      value={props.val}
      onBlur={() => props.updateStore(props.name)}
      onKeyDown={characterChecker}
      // onKeyPress={characterChecker}
    />
  )
}

// Input.defaultProps = {
//   enable: true
// }

export default Input
