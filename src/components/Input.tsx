import React, { Component } from 'react'
import { useInputUSD } from './useInput'

interface Props {
  type?: string
  enable?: boolean
}

const Input: React.FunctionComponent<Props> = props => {
  let [amount, setAmount] = useInputUSD('0')

  return (
    <input
      type='text'
      value={amount as string}
      onChange={setAmount}
      disabled={!props.enable}
      className={props.enable ? '' : 'no-hover'}
      // onFocus={() => this.toggleEdit('on')}
      // onFocus={(e: React.FocusEvent<HTMLInputElement>): void => this.handleFocus(e)}
      // onBlur={() => this.toggleEdit('off')}
    />
  )
}

Input.defaultProps = {
  enable: true
}

export default Input
