import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory(); // history is copy of browser history

    useEffect(() => {
        const { onParentNavigate} = mount(ref.current, {
            // : renames the destructured prop
            onNavigate: ({pathname:nextPathname}) => {
                const { pathname } = history.location;
                if (pathname !== nextPathname) {
                    history.push(nextPathname)                    
                }
            },
            initialPath: history.location.pathname
        });

        history.listen(onParentNavigate)
    }, []);

    return <div ref={ref}></div>
}