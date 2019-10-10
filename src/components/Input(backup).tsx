import React, { Component } from 'react'

interface State {
  value: string
  isEdit: boolean
}

interface Props {
  value?: number
  enable: boolean
}

class Input extends Component<Props, State> {
  static defaultProps = {
    value: 0,
    enable: true,
  }

  state = {
    value: '0',
    isEdit: false,
  }

  handleChange = (e: React.SyntheticEvent) => {
    let val = (e.target as HTMLInputElement).value
    console.log(val)

    this.setState({
      value: val,
    })
  }

  handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
    
  }



  componentDidMount = async () => {
    await this.setState({
      value: '$' + this.props.value!.toFixed(2), //!is non-null assertion operator, tells compiler variable can be assumed as non-null/defined
    })
  }

  render() {
    return (
      <input
        type='text'
        value={this.state.value}
        onChange={this.handleChange}
        disabled={!this.props.enable}
        className={this.props.enable ? '' : 'no-hover'}
        // onFocus={() => this.toggleEdit('on')}
        onFocus={(e: React.FocusEvent<HTMLInputElement>): void =>this.handleFocus(e)}
        // onBlur={() => this.toggleEdit('off')}
      />
    )
  }
}

export default Input
