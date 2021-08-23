import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName, createStyles } from '@material-ui/core/styles';

import Progress from './components/Progress';
import Header from './components/Header';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

export default ()  => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const onSignIn = () => setIsSignedIn(true);
    const onSignOut = () => setIsSignedIn(false);
    
    return (            
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={onSignOut} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                 <AuthLazy onSignIn={onSignIn} />
                            </Route>
                            <Route path="/" component={MarketingLazy} />
                        </Switch>                        
                    </Suspense>

                </div>        
            </StylesProvider>
        </BrowserRouter>
    )
}