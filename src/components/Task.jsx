import React, { useState } from 'react';
import { updateTask, deletetask } from '../handleHttp/Api';

const Task = ({ tasktext, setTasks, id }) => {
    const [editable, setEditable] = useState(false);
    const [editableText, setEditableText] = useState(tasktext);

    const handleUpdate = async () => {
        await updateTask(id, editableText, setTasks);
        setEditable(false);
    };

    const handleRemove = async () => {
        await deletetask(id, setTasks);
    };

    const toggleEditable = () => {
        setEditable((prev) => !prev);
    };

    const handleTextChange = (event) => {
        setEditableText(event.target.value);
    };

    return (
        <li className="flex items-center justify-between bg-white p-3 my-2 rounded shadow">
            {editable ? (
                <input
                    className='text-lg'
                    type="text"
                    value={editableText}
                    onChange={handleTextChange}
                    onBlur={handleUpdate}
                    autoFocus
                />
            ) : (
                <span className="flex-1 text-lg" onClick={toggleEditable}>
                    {tasktext}
                </span>
            )}
            {editable ? (
                <button className="text-blue-500 hover:text-blue-700 focus:outline-none" onClick={handleUpdate}>
                    Save
                </button>
            ) : (
                <button className="text-yellow-500 hover:text-yellow-700 focus:outline-none" onClick={toggleEditable}>
                    ✏️ Edit
                </button>
            )}
            {!editable && (
                <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={handleRemove}>
                    🗑 Remove
                </button>
            )}
        </li>
    );
};

export default Task;
