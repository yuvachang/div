import React from 'react'

interface Props {
  value: number
}

const TextBubble: React.FunctionComponent<Props> = props => {
  return <div className='outline-only'>${props.value.toFixed(2)}</div>
}

export default TextBubble
