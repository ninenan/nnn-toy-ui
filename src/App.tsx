import React from 'react';

import './styles/index.scss';
import Icon from './components/Icon';
import Alert from './components/Alert';
import Menu from './components/Menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="closed-captioning" className="test-ok" size="6x" />
        <Alert
          message="message"
          type="default"
          afterClose={() => console.log('test-afterClose')}
        />
        <Menu
          defaultIndex="0"
          onSelect={index => console.log(index)}
          defaultOpenSubMenus={['2']}
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
      </header>
    </div>
  );
}

export default App;
