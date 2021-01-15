import React, { Fragment } from 'react'

export function Notes({onUpdate, text}) {
    const [note, writeNote] = React.useState(text)
    React.useEffect(() => {
        writeNote(text)
    }, [text])

    const writeHandler = e => writeNote(e.target.value)
    const onBlur = () => {
        onUpdate(note)
    }
    return (
        <Fragment>
            <textarea onBlur = {onBlur} onChange = {writeHandler} class="todo-note" value = {note} placeholder="Add note"></textarea>
        </Fragment>
    )
}
