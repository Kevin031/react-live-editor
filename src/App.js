import React from 'react';
import { createRenderer } from './Renderer';
import * as monaco from 'monaco-editor';
import { loader } from '@monaco-editor/react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';
import { Button, Popover } from 'antd';
import { moduleListMap, moduleList } from './moduleList';
import './App.css';
import 'antd/dist/antd.css';

const _logError = (...args) => console.error(...args);
Object.defineProperty(console, 'error', {
  get: () => {
    return (...args) => {
      if (args[0] && args[0].startsWith('Warning:')) {
        return;
      }
      return _logError(...args);
    };
  },
  set: () => {},
});

loader.config({ monaco });

const AppWrapper = styled.div`
  .app-view {
    display: flex;
    flex-direction: column;
    height: 100vh;
    &__header {
      height: 50px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      border-bottom: solid 1px #ddd;
      padding: 0 30px;
      h2 {
        margin-bottom: 0;
      }
    }
    &__footer {
      height: 50px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      border-top: solid 1px #ddd;
      padding: 0 30px;
      justify-content: flex-end;
    }
    &__content {
      display: flex;
      flex: 1;
      align-items: stretch;
    }
    &__editor {
      width: 50%;
      position: relative;
    }
    &__monaco-view {
      height: calc(100vh - 40px - 50px - 50px);
    }
    &__module-list {
      height: 40px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-bottom: solid 1px #ddd;
    }
    &__render {
      width: 50%;
    }
  }
`;

const ModulePopover = styled.div`
  width: 200px;
  .module-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
  }
  .module-name {
  }
  .module-version {
    color: #999;
  }
`;

function App() {
  const renderEleRef = React.useRef(null);
  const editorRef = React.useRef(null);
  const readyRef = React.useRef(false);
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
  
  <App />`;
  const runCode = () => {
    const renderer = createRenderer(renderEleRef.current, moduleName => {
      if (moduleListMap[moduleName]) return moduleListMap[moduleName].module;
      return null;
    });
    const codeValue = editorRef.current.getValue();
    // console.log('code value', codeValue);
    renderer.run(codeValue);
  };
  const handleEditorDidMount = editor => {
    editorRef.current = editor;
    if (!readyRef.current) {
      runCode();
      editorRef.current = true;
    }
  };
  return (
    <AppWrapper>
      <div className="app-view">
        <div className="app-view__header">
          <h2>React在线代码编辑器</h2>
        </div>
        <div className="app-view__content">
          <div className="app-view__editor">
            <div className="app-view__module-list">
              <Popover
                placement="bottomRight"
                content={
                  <ModulePopover>
                    {moduleList.map(item => (
                      <div className="module-item">
                        <span className="module-name">{item.name}</span>
                        <span className="module-version">{item.version}</span>
                      </div>
                    ))}
                  </ModulePopover>
                }
              >
                <Button size="small">查看包依赖</Button>
              </Popover>
            </div>
            <Editor
              className="app-view__monaco-view"
              defaultValue={code}
              defaultLanguage="javascript"
              onMount={handleEditorDidMount}
            />
          </div>
          <div className="app-view__render">
            <div
              ref={el => {
                renderEleRef.current = el;
              }}
            ></div>
          </div>
        </div>
        <div className="app-view__footer">
          <Button type="primary" onClick={() => runCode()}>
            运行
          </Button>
        </div>
      </div>
    </AppWrapper>
  );
}

export default App;
