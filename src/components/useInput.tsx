import React, { useState } from 'react'

export const useInputUSD = (val: string): [string, () => void] => {
  const [amount, setAmount] = useState<string>('$0.00')

  const handleChange = () => {
    const input = val as string
    const filteredInput = input
      .split('')
      .filter(char => !'abcdefghijklmnopqrstuvwxyz'.includes(char.toLowerCase()))
      .join('')

    setAmount(filteredInput)
  }

  return [amount, handleChange]
}

export const cleanUpNum = (num: string, setNum: (total: string)=>void) => {
  let total: any = num.slice(1)
  total = Math.round(+total * 100) / 100
  total = '$' + total.toFixed(2)

    setNum(total)
  
}
