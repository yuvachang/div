import React from 'react'

interface Props {
  val: number
  name: string
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => void
  updateStore: (e: React.SyntheticEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const Input: React.FunctionComponent<Props> = props => {
  const characterChecker = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // exclude: 0-37,40-48,57-97,105-110,110-190
    // include: 37-40,48 - 57,97 - 105,110,190(num, numpad, arrows, period, decimal)
    let target = e.target as HTMLInputElement
    let kc = e.keyCode
    let inputValue = target.value

    if (kc === 190 || kc === 110) {
      console.log(inputValue, 'hello')
      if (inputValue.includes('.')) {
        //if number already has decimal, do nothing
        e.preventDefault()
        return
      }
    }
    if (
      kc !== 8 &&
      kc !== 46 &&
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
      className={props.disabled ? 'top no-hover' : 'top'}
      type='number'
      name={props.name}
      onChange={props.onChange}
      value={props.val}
      onBlur={props.updateStore}
      onKeyDown={characterChecker}
      disabled={props.disabled}
    />
  )
}

Input.defaultProps = {
  disabled: false,
  updateStore: () => {},
}

export default Input
