import React from 'react';

import './styles/index.scss';
// import Button, { ButtonSize, ButtonType } from './components/Button';
import Icon from './components/Icon';
import Alert from './components/Alert';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="closed-captioning" className="test-ok" size="6x" />
        <Alert
          message="message"
          type="default"
          afterClose={() => alert(222)}
          closeText="test"
        />
      </header>
    </div>
  );
}

export default App;
