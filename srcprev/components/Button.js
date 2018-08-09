import React, {Component} from 'react'
import styled, { css } from 'styled-components'


export default class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  btn = (props) => {
    styled.button`
      border-radius: 3px;
      padding: 0.25em 1em;
      margin: 0 1em;
      background: transparent;
      color: palevioletred;
      border: 2px solid palevioletred;
    
        ${props => props.primary && css`
          background: palevioletred;
          color: white;
        `}
      `}
  render() {
    const b = this.btn(props)
    return(
      <div>{b}</div>
    )
  }
}