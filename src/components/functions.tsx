import { TotalState } from '../store/reducers/totalsReducer'

export const unixTimeToDate = (unixtime: number): string => {
  let date: Date = new Date(unixtime)
  const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  let days: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const day: string = days[date.getDay()]
  let d: string = `${date.getDate()}`
  if (d.length === 1) {
    d = d.padStart(2, '0')
  }
  const m: string = months[date.getMonth()]
  const y: string = `${date.getFullYear()}`
  let saveDate = `${day} ${m} ${d} ${y}`

  return saveDate
}

export const roundUSD = (num: number): number => {
  return +(Math.round(+num * 100) / 100).toFixed(2)
}

export const roundPercent = (num: number): number => {
  return +(Math.round(+num * 10) / 10).toFixed(1)
}

export const filterInput = (input: string): string => {
  const filteredInput = input
    .split('')
    .filter(char => !'abcdefghijklmnopqrstuvwxyz'.includes(char.toLowerCase()))
    .filter(char => '$%0123456789.'.includes(char))
    .join('')

  return filteredInput
}

export const calculateTotal = (stateTotals: TotalState): string => {
  let { tip, tax, subtotal } = stateTotals
  let ntip = (Number(tip) / 100) * Number(subtotal)
  let ntax = (Number(tax) / 100) * Number(subtotal)
  let ntotal = ntip + ntax + Number(subtotal)
  if (ntotal > 0) {
    return ntotal.toFixed(2)
  } else return '0'
}

// export const calculateTotal = (stateTotals: InitialState): number => {
//   let { tip, tax, subtotal } = stateTotals
//   let ntip = (+tip.slice(0, -1) / 100) * +subtotal.slice(1)
//   let ntax = (+tax.slice(0, -1) / 100) * +subtotal.slice(1)
//   let ntotal = ntip + ntax + +subtotal.slice(1)
//   return ntotal
// }
