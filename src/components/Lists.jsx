import React, { useState, useEffect } from 'react';
import '../styles/lists.css';
import Reading_list from './Reading_list.jsx';

//Coral, Peach, Sand, Mint, Sage, Fog, Storm, Dusk, Clay
// const colors = ['#77172e', '#692b18', '#7c4a03', '#274d3b', '#0e615d', '#246377', '#284255', '#472e5b', '#6c3a4f', '#4b443a']
export default function Lists() {
    const [lists, setLists] = useState([]);
    const [newList, setNewList] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // // Load data from chrome.storage when the component mounts
    // useEffect(() => {
    //     chrome.storage.sync.get('readingLists', (result) => {
    //         if (result.readingLists) {
    //             setLists(result.readingLists);
    //         }
    //     });
    // }, []);

    // // Save data to chrome.storage whenever the lists state changes
    // useEffect(() => {
    //     chrome.storage.sync.set({ readingLists: lists });
    // }, [lists]);

    const addNewList = () => {
        if (newList.trim() !== '') {
            setLists([...lists, newList]);
            setNewList('');
            setIsModalOpen(false); // Close the modal after adding
        }
    };

    const deleteList = (index) => {
        const updatedLists = lists.filter((_, i) => i !== index);
        setLists(updatedLists);
    };

    return (
        <>
            <div id="list-background">
                {lists.map((list, index) => (
                    // <div key={index} className="list-item">
                    //     {list}
                    // </div>
                    <Reading_list 
                        key={index} 
                        name={list} 
                        onDelete={() => deleteList(index)}
                    />
                ))}
            </div>
            <button id="button" onClick={() => setIsModalOpen(true)}> + New Readr. List </button>

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
                        <button onClick={() => setIsModalOpen(false)}> Cancel </button>
                    </div>
                </div>
            )}
        </>
    );
}
