import React, { useState } from 'react';

import './styles/index.scss';
import Icon from './components/Icon';
import Button from './components/Button';
import Alert from './components/Alert';
import { MenuItem, SubMenu, Menu } from './components/Menu';
import Transition from './components/Transition';

function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="arrow-down" className="test-ok" size="6x" theme="warning" />
        <Alert
          message="message"
          type="default"
          afterClose={() => console.log('test-afterClose')}
        />
        <Button size="lg" onClick={() => setShow(!show)}>
          toggle
        </Button>
        <Menu
          defaultIndex="0"
          onSelect={index => console.log(index)}
          defaultOpenSubMenus={['2']}
          mode="horizontal"
        >
          <MenuItem>test001</MenuItem>
          <MenuItem disabled>test002</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown01</MenuItem>
            <MenuItem>dropdown02</MenuItem>
          </SubMenu>
          <MenuItem>test004</MenuItem>
          <SubMenu title="dropdown-04">
            <MenuItem>dropdown0401</MenuItem>
            <MenuItem>dropdown0402</MenuItem>
          </SubMenu>
        </Menu>
        <Transition
          in={show}
          animation="zoom-in-left"
          timeout={300}
          unmountOnExit
        >
          <div>
            <p>文案111</p>
            <p>文案111</p>
            <p>文案111</p>
            <p>文案111</p>
            <p>文案111</p>
            <p>文案111</p>
          </div>
        </Transition>
        <Transition
          in={show}
          animation="zoom-in-bottom"
          timeout={300}
          unmountOnExit
          wrapper
        >
          <Button size="lg" onClick={() => setShow(!show)}>
            toggle
          </Button>
        </Transition>
      </header>
    </div>
  );
}

export default App;
