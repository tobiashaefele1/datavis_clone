import * as ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import {store} from './components/Store';
import {Provider} from 'react-redux';

ReactDOM.render(<Provider store={store}><App /></Provider>,
    document.getElementById('container'));
