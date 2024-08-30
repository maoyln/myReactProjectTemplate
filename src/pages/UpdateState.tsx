import React from 'react';
// 测试更新state是否刷新页面
/**
 * setState 是 React 中最常用的命令，通常情况下，执行 setState 会触发 render。
 * 但是这里有个点值得关注，执行 setState 的时候不一定会重新渲染。当 setState 传入 null 时，并不会触发 render。
 * 这个与函数组件的useState有所不同;参考对比组件<UpdateState2 />
 */
export default class UpdateState extends React.Component {
  state = {
    a: 1
  };

  render() {
    console.log("render");
    return (
      <React.Fragment>
        <p>{this.state.a}</p>
        <button
          onClick={() => {
            this.setState({ a: 1 }); // 这里并没有改变 a 的值.但是也做了更新
          }}
        >
          Click me
        </button>
        <button onClick={() => this.setState(null)}>setState null</button> 
        <button onClick={() => this.setState({a: this.state.a + 1 })}>a+1</button>
        <button onClick={() => this.setState({a: null })}>a = null</button>
      </React.Fragment>
    );
  }
}