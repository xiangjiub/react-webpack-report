import React, { Component } from 'react';
import style from './index.less'
import Test from '@/components/Test'

const App:React.FC<any> = () => {
  return (
    <div className={style.app}>
      <Test name='jack' age={24}/>
    </div>
  )
}

export default App