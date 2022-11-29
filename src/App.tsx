import React, { ChangeEvent, useState } from 'react';

import Alert from './components/Alert';
import AutoComplete from './components/AutoComplete';
import type { DataSourceType } from './components/AutoComplete/autoComplete';
import Button from './components/Button';
import Icon from './components/Icon';
import Input from './components/Input';
import { Menu, MenuItem, SubMenu } from './components/Menu';
import Transition from './components/Transition';
import type { UploadFile } from './components/Upload';
import Upload from './components/Upload';
import './styles/index.scss';

const fileListMock: UploadFile[] = [
  { uid: '1', size: 1233, name: 'hello.js', status: 'loading', percent: 30 },
  { uid: '2', size: 1234, name: 'hello.md', status: 'success', percent: 100 },
  { uid: '3', size: 1235, name: 'error.md', status: 'fail', percent: 0 }
];

function App() {
  const [show, setShow] = useState(true);
  const [testValue, setTestValue] = useState<string | undefined>('testvlaue');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTestValue(e.currentTarget.value);
  };

  const handleSearch = (value: string) => {
    console.log('value :>> ', value);
  };

  const handleFetchAsync = async (word: string) => {
    return fetch(
      `http://dict.iciba.com/dictionary/word/suggestion?word=${word}&nums=5&ck=709a0db45332167b0e2ce1868b84773e&timestamp=1666015650621&client=6&uid=123123&key=1000006&is_need_mean=1&signature=cbd5ba78bb9c11875d035a1a3b15ab76`
    )
      .then(res => res.json())
      .then(({ message }) => {
        return message.map((item: any) => ({
          ...item,
          value: item.key
        }));
      });
  };

  const renderOptions = (
    item: DataSourceType<{ value: string; paraphrase: string; key: string }>
  ) => {
    return (
      <div>
        key:{item.key}, id: {item.paraphrase}
      </div>
    );
  };

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
        <AutoComplete
          fetchOptions={handleFetchAsync}
          renderOptions={renderOptions}
        />
        <div>test content</div>
        <Upload
          action="https://jsonplaceholder.typicode.com/posts/"
          defaultUploadFileList={fileListMock}
        />
      </header>
    </div>
  );
}

export default App;
