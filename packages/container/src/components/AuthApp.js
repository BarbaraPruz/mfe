import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ( {onSignIn} ) => {
    const ref = useRef(null);
    const history = useHistory(); // history is copy of browser history

    useEffect(() => {
        const { onParentNavigate} = mount(
            ref.current, 
            {                
                initialPath: history.location.pathname,

                // note - the : renames the destructured prop
                onNavigate: ({pathname:nextPathname}) => {
                    const { pathname } = history.location;
                    if (pathname !== nextPathname) {
                        history.push(nextPathname)                    
                    }
                },

                onSignIn: () => onSignIn() 
            }
        );

        history.listen(onParentNavigate)
    }, []);

    return <div ref={ref}></div>
}