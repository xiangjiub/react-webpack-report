import React from 'react';
import ReactDOM from 'react-dom';
import style  from './index.less';
// import App from './App'
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

const ele = document.querySelector('#root')
const newEle = document.createElement("div")
newEle.className = style.ele
newEle.innerHTML = '测试css module'
ele.appendChild(newEle)