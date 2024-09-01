import React, {useEffect, useState} from "react";
import axios from "axios";
import {GLOBAL_URL} from "../App";
import {useSelector} from "react-redux";

function Comments(props) {

    const [comments, setComments] = useState([]);
    const [formIsValid, setFormIsValid] = useState(false);
    const [, setCommentIsValid] = useState(undefined);
    const [newComment, setNewComment] = useState('');
    const [commentBool, setCommentBool] = useState(false);
    const [editing, setEditing] = useState(false);
    const [commentID, setCommentID] = useState('');
    const [commentCount, setCount] = useState(0);

    const user = useSelector((state) => state.user.username);

    const OPTIONS = {
        timeZone: 'AET',
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    };

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(newComment.length <= 400 && newComment.length > 0);
        }, 100);

        return () => {
            clearTimeout(identifier)
        };

    }, [newComment]);

    useEffect(() => {
        axios.get(`${GLOBAL_URL}/sites/${props.site_id}/site_comments/`, {withCredentials: true}).then(response => {
            setComments(response.data);
        });
    }, [props.site_id, setComments]);

    const handleCommentChange = async (event) => {
        if (event.target.id === 'edit') {
            setCommentBool(true);
            setEditing(true);
            setCommentID(event.target.name);
        }
        setNewComment(event.target.value);
        setCount(event.target.value.length);
    };

    const handleValidateComment = () => {
        setCommentIsValid(newComment.length < 150 && newComment.length > 0);
    };

    const handleComment = () => {
        setCommentBool(!commentBool);
        if (commentBool) {
            setNewComment('');
            setCount(0);
        }
    };

    const submitComment = async (event) => {
        event.preventDefault();
        if (newComment.length > 150) {
            alert('Comment is too long');
        } else {
            if (editing) {
                await axios.put(`${GLOBAL_URL}/sites/${props.site_id}/site_comments/${commentID}`,
                    {comment: newComment}, {withCredentials: true}).then(response => {
                    updateComments(setComments, parseInt(commentID), response.data, comments);
                });
                setCommentID('');
                setEditing(false);
            } else {
                await axios.post(`${GLOBAL_URL}/sites/${props.site_id}/site_comments`,
                    {comment: newComment}, {withCredentials: true}).then(response => {
                    setComments(prevState => {
                        return [...prevState, response.data];
                    });
                });
            }
            handleComment();
        }
    };

    const deleteComments = async (event) => {
        await axios.delete(`${GLOBAL_URL}/sites/${props.site_id}/site_comments/${event.target.name}`,
            {withCredentials: true}).then(() => {
                deleteComment(setComments, parseInt(event.target.name));
            }
        );
    };

    return (
        <div className="comment">
            <b>Comments</b>
            {!!commentBool ?
                <form id='commentForm' onSubmit={submitComment} method={'post'}>
                    <textarea className="form-control" onChange={handleCommentChange} onBlur={handleValidateComment}
                              value={newComment}/>
                    <figcaption className='figure-caption'>Maximum 150 characters</figcaption>
                    <figcaption className='figure-caption'>{commentCount}/150 Characters</figcaption>
                    <button className={'btn btn-primary deleteButton'} type={'submit'}
                            disabled={!formIsValid}>Submit
                    </button>
                    <button className={'btn btn-primary deleteButton'} onClick={handleComment}>Back</button>
                </form>
                :
                <React.Fragment>
                    <ul id={'commentForm'}>
                        {comments.map((comment, index) => (
                            <li id='comment' key={index}>
                                {comment.comment}
                                <hr/>
                                By: {comment.created_by}<br/>
                                Created At: {new Date(comment.created_at).toLocaleString('en-AU', OPTIONS)}<br/>
                                Updated At: {new Date(comment.updated_at).toLocaleString('en-AU', OPTIONS)}
                                {comment.created_by === user && (
                                    <div id={'comment-buttons'}>
                                        <button className={"btn btn-primary deleteButton"}
                                                value={comment.comment} onClick={handleCommentChange}
                                                id={'edit'} name={comment.id}>Edit
                                        </button>
                                        <button className={"btn btn-primary deleteButton"}
                                                onClick={deleteComments}
                                                id={'delete'} name={comment.id}>Delete
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button className={'btn btn-primary deleteButton'}
                            onClick={handleComment}>Add Comment
                    </button>
                </React.Fragment>
            }
        </div>
    )
}

const updateComments = (setComments, commentID, newData, comments, newArray = []) => {
    for (let item of comments) {
        if (item.id === commentID) {
            newArray.push(newData);
        } else {
            newArray.push(item);
        }
    }
    setComments(newArray);
}

const deleteComment = (setComments, commentID) => {
    setComments(prevState => {
        for (const item of prevState) {
            if (item.id === commentID) {
                return prevState = prevState.filter(i => i.id !== commentID)
            }
        }
    });
}

export default Comments;