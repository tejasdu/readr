import React, { useState } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BookmarkRemoveRoundedIcon from '@mui/icons-material/BookmarkRemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import '../styles/reading_list.css';
// import Url_entry from './Url_entry';


export default function Reading_list({name, onDelete}) {
    const [urls, setUrls] = React.useState([]);
    const [newUrl, setNewUrl] = React.useState('');


    function handleAddUrl() {
    }

    function handleDropDown() {
    }
    
    return (
        <div className="list-container">
            {/* {urls.map((url) => (

            ))} */}
            <img src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-1024.png" alt="list icon" className="list-icon"/>
            <p className="list-name"> {name} </p>
            <button className="add-url" onClick={handleAddUrl}> 
                <AddRoundedIcon />
            </button>
            <button className="delete-button" onClick={onDelete}>
                <BookmarkRemoveRoundedIcon className='delete-icon'/>
            </button>
            <button className='dropdown-button' onClick={handleDropDown}> 
                <ChevronRightIcon />
            </button>
        </ div>
    )
}

/*
FOR LATER UPDATES:
- Add a 2nd check to ask if user is sure they want to delete readr list.
*/