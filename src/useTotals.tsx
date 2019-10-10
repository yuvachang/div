import React, { useState } from 'react'

export const useTotals = () => {
  const [totals, setTotals] = useState()

  const handleChange = (e: React.SyntheticEvent) => {
    setTotals({
      ...totals,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    })
  }

  return [totals, handleChange]
}
