import React from 'react';
import { render } from 'react-dom';
import { autorun } from 'mobx';
import { saveFigures, loadFigures } from './util';
import AppState from './AppState';
import App from './App';

const appState = new AppState();
appState.addFigures(loadFigures());

autorun(() => {
  saveFigures(JSON.stringify(appState.preparedFigures));
});

render(
  <App appState={appState} />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
