import React from 'react';
import logo from './logo.svg';
import './styles/index.scss';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button size={ButtonSize.Default} btnType={ButtonType.Primary}>
          primary-default
        </Button>
        <br />
        <Button size={ButtonSize.Large} btnType={ButtonType.Warning}>
          Warning-large
        </Button>
        <br />
        <Button size={ButtonSize.Small} btnType={ButtonType.Danger}>
          Danger-small
        </Button>
        <br />
        <Button disabled size={ButtonSize.Default} btnType={ButtonType.Primary}>
          primary-disabled
        </Button>
        <br />
        <Button
          size={ButtonSize.Default}
          btnType={ButtonType.Link}
          href="www.baidu.com"
        >
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
        >
          link-small
        </Button>
        <br />
        <Button
          size={ButtonSize.Small}
          btnType={ButtonType.Link}
          href="www.baidu.com"
          disabled
        >
          link-disabled
        </Button>
      </header>
    </div>
  );
}

export default App;
