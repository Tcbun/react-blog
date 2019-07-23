import React from 'react';
import './index.scss';
import Greeting from './components/greeting';
import Articles from './components/articles';

function Home() {
    return (
        <div className="wrap">
            <div className="user">
                <Greeting />
            </div>
            <div className="articles">
                <Articles />
            </div>
        </div>
    )
}

export default Home;