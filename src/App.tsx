import React, { ChangeEvent, useState } from 'react';

import './styles/index.scss';
import Icon from './components/Icon';
import Button from './components/Button';
import Alert from './components/Alert';
import { MenuItem, SubMenu, Menu } from './components/Menu';
import Transition from './components/Transition';
import Input from './components/Input';
import AutoComplete from './components/AutoComplete/autoComplete';

function App() {
  const [show, setShow] = useState(true);
  const [testValue, setTestValue] = useState<string | undefined>(undefined);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTestValue(e.currentTarget.value);
    console.log(e);
  };

  const handleSearch = (value: string) => {
    console.log('value :>> ', value);
  };

  const handleFetch = (val: string) =>
    ['apple', 'banana', 'origin', 'cat'].filter(item => item.includes(val));

  return (
    <div className="App" style={{ paddingLeft: '10px' }}>
      <header className="App-header">
        <Icon icon="arrows-alt" className="test-ok" size="6x" theme="warning" />
        <br />
        <Alert
          message="message"
          type="default"
          afterClose={() => console.log('test-afterClose')}
        ></Alert>
        <br />
        <Button size="lg" onClick={() => setShow(!show)}>
          toggle
        </Button>
        <br />
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
          icon="search-plus"
          placeholder="basic usage"
          value={testValue}
          onChange={handleChange}
          onSearch={handleSearch}
        />
        {testValue}
        <br />
        <AutoComplete fetchItem={handleFetch} />
      </header>
    </div>
  );
}

export default App;
