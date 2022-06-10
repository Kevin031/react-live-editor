import React from 'react'
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import { createRenderer } from './Renderer';
import 'antd/dist/antd.css';

import styled from 'styled-components'
import * as AntdComponents from 'antd';

const AppWrapper = styled.div`
  .editor {}
  .render {}
`

function App() {
  const renderEleRef = React.useRef(null)
  const code = `import { Carousel } from 'antd';
  
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  
  function App () {
    console.log('render')
    const onChange = (currentSlide) => {
      console.log(currentSlide);
    };
  
    return (
      <Carousel afterChange={onChange}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    );
  };
  
  <App />`
  const runCode = () => {
    const renderer = createRenderer(renderEleRef.current, moduleName => {
      if (moduleName === 'antd') {
        return AntdComponents
      }
      if (moduleName === 'react') {
        return React
      }
      return null
    })
    renderer.run(code)
  }
  return (
    <AppWrapper>
      <div className="editor">
        <textarea value={code} />
      </div>
      <div className="render">
        <button onClick={() => runCode()}>run!</button>
        <div ref={el => { renderEleRef.current = el }}></div>
      </div>
    </AppWrapper>
  );
}

export default App;
