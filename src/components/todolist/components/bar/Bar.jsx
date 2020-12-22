import React from 'react'
import { DefaultAppLabels, FolderLabels, Header, Notification, TasksLitsLabel } from './components'

export function Bar() {
return (
<section class="bar-section bar-section_theme_dark">
    <Header />
    {/* <Notification /> */}
    
    <ul class="bar-section__labels-list">
        <DefaultAppLabels />
        <FolderLabels />
        <TasksLitsLabel />
    </ul>
    <button class="bar-section__add-new-folder-btn">+</button>
</section>
)
}