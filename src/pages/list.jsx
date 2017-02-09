import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

import { AppContainer } from 'react-hot-loader';

import App from '../components/list/index';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('main')
  );
};

render(App);

if (module.hot) module.hot.accept('../components/list/index', () => render(App));
