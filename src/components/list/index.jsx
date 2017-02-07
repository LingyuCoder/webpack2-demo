import './index.less';
import React from 'react';
import { List } from 'antd-mobile';
const {
  Item
} = List;

export default class ListPage extends React.Component {
  static displayName = 'ListPage'
  static propTypes = {
    /**
     * content of element
     */
    content: React.PropTypes.string
  }
  static defaultProps = {
    content: 'This is list'
  }
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <List renderHeader={() => '左侧无icon'} className="my-list">
          <Item data-seed="logId">标题文字点击无反馈，文字超长则隐藏，文字超长则隐藏</Item>
          <Item wrap>文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行</Item>
          <Item extra="箭头向右" arrow="horizontal" onClick={() => {}}>标题文字</Item>
          <Item extra="箭头向下" arrow="down" onClick={() => {}}>标题文字</Item>
          <Item extra="箭头向上" arrow="up" onClick={() => {}}>标题文字</Item>
          <Item extra="内容内容" multipleLine align="top" wrap>
            多行标题文字，文字可能比较长、文字可能比较长、直接折行
          </Item>

          <Item extra="内容内容" multipleLine>
            垂直居中对齐
          </Item>
          <Item extra="没有箭头" arrow="empty" className="spe" wrap>
            极个别情况下，单行标题文字可能比较长，文字可能比较长、文字可能比较长、靠近右边会折行
          </Item>

          <Item>
            <select defaultValue="1">
              <option value="1">这是原生 html select</option>
              <option value="2" disabled>不可选</option>
              <option value="3">选项3</option>
            </select>
          </Item>
        </List>
        <div style={{ height: '0.16rem' }} />
        <List renderHeader={() => '左侧带图片'}>
          <Item
            thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
            arrow="horizontal"
            onClick={() => {}}
          >我的钱包</Item>
          <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png">我的花销占比</Item>
        </List>
        <div style={{ height: '0.32rem' }} />
      </div>
    );
  }
}
