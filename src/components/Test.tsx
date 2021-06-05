// import React, { Component,Fragment } from 'react';

// class Test extends Component {
//     render() {
//         const {age,name} = this.props
//         return (
//             <>
//                 <span>姓名:{name},年龄为{age}</span>
//             </>
//         );
//     }
// }

// export default Test;

import React from 'react'

interface ITestProps {
  name: string
  age: number

}

const Test: React.FC<ITestProps> = ({name, age}) => (
  <div>I am{name}, {age}!!!</div>
)

export default Test