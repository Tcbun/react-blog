import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function Headerc() {
    return (
        <div className="flexLayout headercStyle nav_active">
            <Link to="/">
                博客首页
            </Link>
        </div>
    )
}

export default Headerc;
