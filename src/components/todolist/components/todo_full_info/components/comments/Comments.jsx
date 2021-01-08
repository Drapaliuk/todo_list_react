import React from 'react'
import { Comment } from '../comment/Comment';

export function Comments({comments, onDelete, onUpdateText}) {
    return (
        <ul class="todo-comments-list">
            {
                comments.map(comment => {
                    return <Comment 
                            key = {comment.key}
                            id = {comment._id}
                            text = {comment.text} 
                            onDelete = {onDelete}
                            onUpdateText = {onUpdateText}
                            />
                } )
            }
            
        </ul>
    )
}