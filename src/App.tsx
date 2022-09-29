import React from 'react';
import logo from './logo.svg';
import './styles/index.scss';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button autoFocus>button</Button>
        <br />
        <Button btnType={ButtonType.Primary} autoFocus>
          primary-default
        </Button>
        <br />
        <Button
          size={ButtonSize.Large}
          btnType={ButtonType.Warning}
          onClick={() => alert(111)}
        >
          Warning-large
        </Button>
        <br />
        <Button size={ButtonSize.Small} btnType={ButtonType.Danger}>
          Danger-small
        </Button>
        <br />
        <Button disabled btnType={ButtonType.Primary}>
          primary-disabled
        </Button>
        <br />
        <Button btnType={ButtonType.Link} href="www.baidu.com">
          link-default
        </Button>
        <br />
        <Button
          size={ButtonSize.Large}
          btnType={ButtonType.Link}
          href="www.baidu.com"
        >
          link-large
        </Button>
        <br />
        <Button
          size={ButtonSize.Small}
          btnType={ButtonType.Link}
          href="www.baidu.com"
          target="_blank"
        >
          link-small
        </Button>
        <br />
        <Button
          size={ButtonSize.Small}
          btnType={ButtonType.Link}
          href="www.baidu.com"
          onClick={() => alert(333)}
          disabled
        >
          link-disabled
        </Button>
      </header>
    </div>
  );
}

export default App;
