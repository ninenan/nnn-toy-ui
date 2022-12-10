import React, { ChangeEvent, useState } from 'react';

import {
  Button,
  Icon,
  Menu,
  Alert,
  AutoComplete,
  Input,
  Upload,
  Progress
} from './test-com';
import Transition from './components/Transition';
import type {
  IUploadFile,
  DataSourceType,
  IProgressProps,
  IAlertProps,
  IButtonProps,
  IInputProps
} from './test-com';
import './styles/index.scss';

const fileListMock: IUploadFile[] = [
  { uid: '1', size: 1233, name: 'hello.js', status: 'loading', percent: 30 },
  { uid: '2', size: 1234, name: 'hello.md', status: 'success', percent: 100 },
  { uid: '3', size: 1235, name: 'error.md', status: 'fail', percent: 0 }
];

const defaultProgressProps: IProgressProps = {
  percnet: 12,
  isShowText: true
};

const defaultAlertProps: IAlertProps = {
  title: '我是 title',
  message: 'message',
  type: 'default',
  afterClose: () => console.log('test-afterClose')
};

const defaultButtonProps: IButtonProps = {
  btnType: 'warning',
  size: 'lg',
  onClick: () => {
    console.log(222);
  }
};

const defaultInputProps: IInputProps = {
  type: 'text',
  style: { width: '300px' },
  className: 'test',
  prefix: 'https://',
  icon: 'search-plus',
  placeholder: 'basic usage'
};

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
        <Progress {...defaultProgressProps}></Progress>
        <Icon icon="arrows-alt" className="test-ok" size="6x" theme="warning" />
        <br />
        <Alert {...defaultAlertProps}></Alert>
        <br />
        <Button size="lg" onClick={() => setShow(!show)}>
          toggle
        </Button>
        <Button {...defaultButtonProps}>toggle002</Button>
        <br />
        <Menu
          defaultIndex="0"
          onSelect={(index: string) => console.log(index)}
          defaultOpenSubMenus={['2']}
          mode="horizontal"
        >
          <Menu.Item>test001</Menu.Item>
          <Menu.Item disabled>test002</Menu.Item>
          <Menu.SubMenu title="dropdown">
            <Menu.Item>dropdown01</Menu.Item>
            <Menu.Item>dropdown02</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item>test004</Menu.Item>
          <Menu.SubMenu title="dropdown-04">
            <Menu.Item>dropdown0401</Menu.Item>
            <Menu.Item>dropdown0402</Menu.Item>
          </Menu.SubMenu>
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
          {...defaultInputProps}
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
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          name="testName"
          data={{
            test: 'tests',
            title: 'title'
          }}
          accept=".jpg"
          multiple
          isDrag
          defaultUploadFileList={fileListMock}
        >
          <Button>upload file</Button>
        </Upload>
      </header>
    </div>
  );
}

export default App;
