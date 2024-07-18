import React, { useState } from 'react';
import '../styles/lists.css';

export default function Lists() {
    const [lists, setLists] = useState([]);
    const [newList, setNewList] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addNewList = () => {
        if (newList.trim() !== '') {
            setLists([...lists, newList]);
            setNewList('');
            setIsModalOpen(false); // Close the modal after adding
        }
    };

    return (
        <>
            <div id="list-background">
                {lists.map((list, index) => (
                    <div key={index} className="list-item">
                        {list}
                    </div>
                ))}
            </div>
            <button id="button" onClick={() => setIsModalOpen(true)}> + Add new reading list </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Name your Readr list.</h2>
                        <input
                            type="text"
                            value={newList}
                            onChange={(e) => setNewList(e.target.value)}
                            placeholder="New List"
                        />
                        <button onClick={addNewList}> Add</button>
                        <button onClick={() => (
                            setIsModalOpen(false)
                        )}> Quit </button>
                    </div>
                </div>
            )}
        </>
    );
}
