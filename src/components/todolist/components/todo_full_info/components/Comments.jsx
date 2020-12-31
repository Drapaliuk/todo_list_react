import React from 'react'
import { Comment } from './comment/Comment';

export function Comments({comments, onDelete, onUpdateText}) {
    return (
        <ul class="todo-comments-list">
            {
                comments.map(comment => <Comment text = {comment.text} 
                                                 onDelete = {onDelete}
                                                 onUpdateText = {onUpdateText}
                                                 /> )
            }
            
        </ul>
    )
}