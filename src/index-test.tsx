// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './styles/index.scss';
// import App from './App';
// // import reportWebVitals from './reportWebVitals';
//
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// components
export { default as Button } from './components/Button';
export { default as Menu } from './components/Menu';
export { default as Icon } from './components/Icon';
export { default as Alert } from './components/Alert';
export { default as AutoComplete } from './components/AutoComplete';
export { default as Upload } from './components/Upload';
export { default as Input } from './components/Input';
export { default as Progress } from './components/Progress';

// types
export type { IInputProps } from './components/Input';
export type { IUploadFile } from './components/Upload';
export type { IProgressProps } from './components/Progress';
export type { IAlertProps } from './components/Alert';
export type {
  DataSourceType,
  IAutoCompleteProps
} from './components/AutoComplete';
export type { IButtonProps } from './components/Button';
export type { IIconProps } from './components/Icon';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
