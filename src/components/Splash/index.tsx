import React from 'react';
import Loading from '../Loading';
import Logo from '../Logo';
import './Splash.scss';

export const Splash: React.FC = () => {
    return (
        <div className='splash'>
            <Logo width={163} />
            <h1 className='title'>Real Time Chat</h1>
            <div className='loading'>
                <Loading />
            </div>
        </div>
    )
}

export default Splash;
