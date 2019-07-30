import React from 'react';
import './index.scss';
import Axios from 'axios';
import { connect } from 'react-redux';
import { message } from 'antd';
import { Input, Button } from 'antd';
const { TextArea } = Input;
class Articles extends React.Component {

    // 点赞
    agree(e, id, type) {
        const { isLogged } = this.props;
        e.stopPropagation();
        if (!isLogged) {
            message.error('请先登录！')
        } else {
            let eleTarget = e.target;
            const replaceEleTarget = eleTarget.innerHTML.replace(/[^\d]/g, '');
            console.log(replaceEleTarget);
            Axios.post('http://localhost:8889/article', {
                id,
                type
            })
                .then(function (res) {
                    // console.log(res);
                    eleTarget.innerHTML = '赞同' + (Number(replaceEleTarget) + 1);
                });
        };
    };

    // 踩
    saliva(e, id, type) {
        const { isLogged } = this.props;
        e.stopPropagation();
        if (!isLogged) {
            message.error('请先登录！')
        } else {
            let eleTarget = e.target;
            const replaceEleTarget = eleTarget.innerHTML.replace(/[^\d]/g, '');
            Axios.post('http://localhost:8889/article', {
                id,
                type
            })
                .then(function (res) {
                    eleTarget.innerHTML = '反对' + (Number(replaceEleTarget) + 1);
                })
        };
    }

    // 评论
    getComment(e, id, type) {
        const { isLogged, changeIsShowComment, isShowComment, resetIsShowComment, getComment } = this.props;
        e.stopPropagation();
        let eleTarget = e.target;
        if (!isLogged) {
            message.error('请先登录！');
        } else {
            if (id === isShowComment) {
                resetIsShowComment();
            } else {
                changeIsShowComment(id);
                Axios.post('http://localhost:8889/article', {
                    id,
                    type
                })
                    .then(function (res) {
                        const commentList = res.data;
                        getComment(commentList);
                        console.log("获得的评论是：", res);
                    })
            }
        }
    }

    // 发布评论
    commentSubmit(e, article_id, type) {
        const { isLogged, textAreaValue, userName, addComment } = this.props;
        e.stopPropagation();
        if (!isLogged) {
            message.error('请先登录！');
        } else {
            const date = new Date();
            const Y = date.getFullYear() + '-';
            const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            const D = date.getDate() + ' ';
            Axios.post("http://localhost:8889/article", {
                article_id,
                comment: textAreaValue,
                asker: userName,
                date: Y + M + D,
                type
            })
                .then(function (res) {
                    console.log("发布评论返回结果：", res);
                    addComment(userName, textAreaValue, Y + M + D);
                })
        }
    }

    // 页面载入加载数据
    componentDidMount() {
        const { changeArticleList } = this.props;
        Axios.get('http://localhost:8889')
            .then(function (res) {
                console.log(res);
                changeArticleList(res.data);
            })
    }

    render() {
        const { articleList, isShowComment, changeInput, commentList } = this.props;
        return (
            <ul className="articlesList">
                {
                    articleList.map((item) => {
                        return (
                            <li key={item.id}>
                                <div className="article_item">
                                    <h3>{item.title}</h3>
                                    <p>{item.content}</p>
                                    <div className="articleTools">
                                        <div className="evaluation">
                                            <div className="agree" onClick={(e) => this.agree(e, item.id, "agree")}>
                                                赞同{item.star}
                                            </div>
                                            <div className="disagree" onClick={(e) => { this.saliva(e, item.id, "saliva") }}>
                                                反对{item.saliva}
                                            </div>
                                            <div className="comments" onClick={(e) => { this.getComment(e, item.id, "getComment") }}>
                                                {item.comment}条评论
                                            </div>
                                            <div className="share">
                                                分享
                                            </div>
                                            <div className="data">
                                                {item.date}
                                            </div>
                                            <div className="author">
                                                作者：{item.author}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="article_comment" style={{ display: item.id === isShowComment ? 'block' : 'none' }}>
                                    <div className="comment_count">{commentList.length}条评论</div>
                                    <ul className="comment_list">
                                        {
                                            commentList.map((commentItem) => (
                                                <li key={commentItem.id}>
                                                    <div>{commentItem.asker}</div>
                                                    <div>{commentItem.comment}</div>
                                                    <div className="comment_time">{commentItem.date}</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="comment_submit">
                                        <TextArea placeholder="您的评论（最多200字）" autosize={{ minRows: 1, maxRows: 6 }} className="comment_text" onChange={(e) => changeInput(e)} />
                                        <Button type="primary" onClick={(e) => { this.commentSubmit(e, item.id, "submitComment") }}>发布</Button>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

const mapState = (state) => {
    return {
        articleList: state.home.articleList,
        isLogged: state.home.isLogged,
        isShowComment: state.home.isShowComment,
        textAreaValue: state.home.textAreaValue,
        userName: state.home.userName,
        commentList: state.home.commentList
    };
};
const mapDispatch = (dispatch) => {
    return {
        // 获取文章列表
        changeArticleList(articleList) {
            const action = {
                type: 'change_articleList',
                payload: {
                    articleList,
                },
            };
            dispatch(action);
        },
        changeIsShowComment(idx) {
            const action = {
                type: 'change_isShowComment',
                payload: {
                    idx
                }
            }
            dispatch(action);
        },
        resetIsShowComment() {
            const action = {
                type: 'reset_isShowComment',
                payload: {
                    idx: 0
                }
            }
            dispatch(action);
        },
        changeInput(e) {
            const action = {
                type: 'change_textAreaValue',
                payload: {
                    value: e.target.value
                }
            }
            dispatch(action);
        },
        getComment(commentList) {
            const action = {
                type: 'get_comment',
                payload: {
                    commentList
                }
            };
            dispatch(action);
        },
        addComment(asker, comment, date) {
            const action = {
                type: "add_comment",
                payload: {
                    push: {
                        asker,
                        comment,
                        date
                    }
                }
            }
            dispatch(action);
        }
    };
};
export default connect(mapState, mapDispatch)(Articles);