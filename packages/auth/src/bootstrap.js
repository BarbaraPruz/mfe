import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App'

// default history only for dev of marketing app in isolation
const mount = (el, { defaultHistory, initialPath, onNavigate, onSignIn }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) { // onNavigate just relevant for container environments
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App history={history} onSignIn={onSignIn} />,
        el
    );

    // returned object allows for later comms between container and marketing
    return {
        onParentNavigate: ({pathname:nextPathname}) => {
            const { pathname } = history.location
            if (pathname !== nextPathname) {
                history.push(nextPathname)
            }
        }
    }
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');
    if (devRoot) {
        mount(devRoot, {defaultHistory: createBrowserHistory()})
    }
}
// instead of function mount, marketing can export a react component

export {mount};