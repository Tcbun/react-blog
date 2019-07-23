import React from 'react';
import './index.scss';

function Articles() {
    return (
        <ul className="articlesList">
            <li>
                <h3>标题</h3>
                <p>文章内容</p>
                <div className="articleTools">
                    <div className="evaluation">
                        <div className="agree">
                            赞同10K
                        </div>
                        <div className="disagree">
                            反对3K
                        </div>
                        <div className="comments">
                            300条评价
                        </div>
                        <div className="share">
                            分享
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <h3>标题</h3>
                <p>文章内容</p>
                <div className="articleTools">
                    <div className="evaluation">
                        <div className="agree">
                            赞同10K
                        </div>
                        <div className="disagree">
                            反对3K
                        </div>
                        <div className="comments">
                            300条评价
                        </div>
                        <div className="share">
                            分享
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default Articles;