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

export const capitalizeWords = (str: string) => {
  let words = str.split(' ').filter(char => !!char.length)
  if (!!words.length) {
    return words.map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
  } else return ''
}

export const getInitials = (str: string) => {
  let words = str.split(' ').filter(char => !!char.length)
  if (!!words.length) {
    if (words.length === 1) {
      return words[0][0].toUpperCase()
    } else {
      return words[0][0].toUpperCase().concat(words[words.length - 1][0].toUpperCase())
    }
  } else return ''
}

export const nameFormat = (name: string): string => {
  let newName: any = name.trim().split(' ')
  if (newName[0].length > 10) {
    newName[0] = newName[0].slice(0, 10) + '(...)'
  }
  newName = newName[0] + ' ' + getInitials(newName.join(' ')).slice(1)
  return newName
}
