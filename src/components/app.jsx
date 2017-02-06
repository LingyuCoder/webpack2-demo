import React from 'react';
import './app.less';
export default class App extends React.Component {
  static displayName = 'app'
  static propTypes = {
    /**
     * content of element
     */
    content: React.PropTypes.string
  }
  static defaultProps = {
    content: 'Hello world'
  }
  constructor() {
    super();
  }
  render() {
    return <div>{this.props.content}</div>;
  }
}
