import React from 'react';

import './styles/index.scss';
import Button from './components/Button';
import Icon from './components/Icon';
import Alert from './components/Alert';
import Menu from './components/Menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="closed-captioning" className="test-ok" size="6x" />
        <Alert
          message="message"
          type="default"
          afterClose={() => console.log('test-afterClose')}
          customClose={<Button size="sm">close-btn</Button>}
        />
        <Menu defaultIndex={0} onSelect={index => console.log(index)}>
          <MenuItem index={0}>test001</MenuItem>
          <MenuItem index={2}>test002</MenuItem>
          <MenuItem index={3} disabled>
            test003
          </MenuItem>
          <MenuItem index={4}>test004</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
