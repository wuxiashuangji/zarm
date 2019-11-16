import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './components/App';
import Table from './pages/TablePage';

// ReactDOM.render((
//   <HashRouter>
//     <App />
//   </HashRouter>
// ), document.getElementById('app'));
ReactDOM.render((
  <Table />
), document.getElementById('app'));
