import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './app';

ReactGA.initialize('UA-47208480-12');
ReactGA.pageview(window.location.pathname);

ReactDOM.render(<App />, document.querySelector('#root'));
