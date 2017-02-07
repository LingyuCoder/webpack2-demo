import './index.less';
import React from 'react';

export default class Vote extends React.Component {
  static displayName = 'Vote'
  static propTypes = {
    /**
     * content of element
     */
    content: React.PropTypes.string
  }
  static defaultProps = {
    content: 'This is vote'
  }
  constructor() {
    super();
  }
  render() {
    return <div>{this.props.content}</div>;
  }
}
