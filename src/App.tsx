import React, { ChangeEvent, MouseEvent, useState } from 'react';

import './styles/index.scss';
import Icon from './components/Icon';
import Button from './components/Button';
import Alert from './components/Alert';
import { MenuItem, SubMenu, Menu } from './components/Menu';
import Transition from './components/Transition';
import Input from './components/Input';

function App() {
  const [show, setShow] = useState(true);
  const [testValue, setTestValue] = useState<string | undefined>(undefined);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTestValue(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const handleSearch = (value: string) => {
    console.log('value :>> ', value);
  };

  return (
    <div className="App" style={{ paddingLeft: '10px' }}>
      <header className="App-header">
        <Icon icon="arrows-alt" className="test-ok" size="6x" theme="warning" />
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
            <p>test 动画</p>
            <p>test 动画</p>
            <p>test 动画</p>
            <p>test 动画</p>
            <p>test 动画</p>
            <p>test 动画</p>
            <p>test 动画</p>
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
        <br />
        <Input
          type="text"
          style={{ width: '300px' }}
          className="test"
          prefix="https://"
          placeholder="basic usage"
          suffix={<Icon icon={'magnifying-glass'} />}
          value={testValue}
          onChange={handleChange}
          onSearch={handleSearch}
        />
      </header>
    </div>
  );
}

export default App;
