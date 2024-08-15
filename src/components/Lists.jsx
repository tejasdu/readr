import React, { useState, useEffect } from 'react';
import '../styles/lists.css';
import Reading_list from './Reading_list.jsx';

export default function Lists() {
    const [lists, setLists] = useState([]);
    const [newList, setNewList] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        chrome.storage.sync.get('readingLists', (result) => {
            console.log('Loading data:', result.readingLists);
            if (result.readingLists) {
                setLists(result.readingLists);
            } else {
                console.log('No reading lists found in storage');
            }
        });
    }, []);

    const saveListToStorage = (updatedLists) => {
        chrome.storage.sync.set({ readingLists: updatedLists }, () => {
            if (chrome.runtime.lastError) {
                console.error('Error saving data:', chrome.runtime.lastError);
            } else {
                console.log('Data saved successfully:', updatedLists);
            }
        });
    };

    const addNewList = () => {
        if (newList.trim() !== '') {
            const updatedLists = [...lists, newList];
            setLists(updatedLists);
            setNewList('');
            setIsModalOpen(false);
            saveListToStorage(updatedLists);
        }
    };

    const deleteList = (index) => {
        const listToDelete = lists[index];
        const updatedLists = lists.filter((_, i) => i !== index);
        setLists(updatedLists);
        saveListToStorage(updatedLists);

        // Remove the individual list data
        chrome.storage.sync.remove(listToDelete, () => {
            if (chrome.runtime.lastError) {
                console.error('Error removing list data:', chrome.runtime.lastError);
            } else {
                console.log(`Data for list "${listToDelete}" removed successfully`);
            }
        });
    };

    return (
        <>
            <div id="list-background">
                {lists.map((list, index) => (
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