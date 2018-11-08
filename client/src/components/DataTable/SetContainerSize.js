import React from 'react';
import detectResize from './DetectElementResize';

class SetContainerSize extends React.Component {
  getInitialState() {
    return {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    this.onResize();
    detectResize.addResizeListener(this.getDOMNode().parentNode, this.onResize);
  }

  componentWillUnmount() {
    detectResize.removeResizeListener(this.getDOMNode().parentNode, this.onResize);
  }

  onResize() {
    const node = this.getDOMNode();

    const borderWidth = node.offsetWidth - node.clientWidth;
    const borderHeight = node.offsetHeight - node.clientHeight;

    const width = node.parentNode.offsetWidth - borderWidth;
    const height = node.parentNode.offsetHeight - borderHeight;

    this.setState({
      width,
      height,
    });
  }
}

export default SetContainerSize;
