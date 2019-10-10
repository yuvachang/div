import React, { Component, SetStateAction, Dispatch } from 'react'
import { useInputUSD } from './useInput'
import { TotalState } from '../store/reducers/totalsReducer'

interface Props {
  val: number | undefined
  name: string
  onChange:(e: React.SyntheticEvent<HTMLInputElement>) =>void
  updateStore: (type: string)=>void
}

const Input: React.FunctionComponent<Props> = props => {
  // let [amount, setAmount] = useInputUSD('0')




  return (
    <input
      type='text'
      name={props.name}
      onChange={props.onChange}
      value={props.val}
      onBlur={()=>props.updateStore(props.name)}

      // value={amount as string}
      // onChange={setAmount}
      // disabled={!props.enable}
      // className={props.enable ? '' : 'no-hover'}
      // onFocus={() => this.toggleEdit('on')}
      // onFocus={(e: React.FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
      // onBlur={() => this.toggleEdit('off')}
    />
  )
}

// Input.defaultProps = {
//   enable: true
// }

export default Input
