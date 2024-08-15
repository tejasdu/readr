import React, { useState, useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BookmarkRemoveRoundedIcon from '@mui/icons-material/BookmarkRemoveRounded';
import ListIcon from '@mui/icons-material/List';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import '../styles/reading_list.css';
import Url_entry from './Url_entry.jsx';
import Tooltip from '@mui/material/Tooltip';

export default function Reading_list({name, onDelete}) {
    const [urls, setUrls] = useState([]);
    const [listOpened, setListOpened] = React.useState(false);

    useEffect(() => {
        chrome.storage.sync.get(name, (result) => {
            console.log(`Loading data for ${name}:`, result[name]);
            if (result[name]) {
                setUrls(result[name]);
            }
        });
    }, [name]);

    const saveUrlsToStorage = (updatedUrls) => {
        chrome.storage.sync.set({ [name]: updatedUrls }, () => {
            if (chrome.runtime.lastError) {
                console.error('Error saving data:', chrome.runtime.lastError);
            } else {
                console.log('Data saved successfully:', updatedUrls);
            }
        });
    }

    const addUrl = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            if (currentTab.url && currentTab.title) {
                const newUrl = { url: currentTab.url, title: currentTab.title };
                const updatedUrls = [...urls, newUrl];
                setUrls(updatedUrls);
                saveUrlsToStorage(updatedUrls);
            }
        });
    }

    const deleteUrl = (index) => {
        const updatedUrls = urls.filter((_, i) => i !== index);
        setUrls(updatedUrls);
        saveUrlsToStorage(updatedUrls);      
    }

    return (
        <div className="list-container">
            <div className="list-header">
                <div className="list-left">
                    <ListIcon className="list-icon" />
                    <p className="list-name">{name}</p>
                </div>
                <div className="list-right">
                    <Tooltip title="Add Url" arrow>
                        <button className="add-url" onClick={addUrl}>
                            <AddRoundedIcon  fontSize='small'/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Delete Url" arrow> 
                        <button className="delete-button" onClick={onDelete}>
                            <BookmarkRemoveRoundedIcon  fontSize='small' className='delete-icon'/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Show Readr list" arrow>
                        <button className='dropdown-button' onClick={() => setListOpened(!listOpened)}>
                            {listOpened ? <KeyboardArrowDownIcon  fontSize='small' /> : <KeyboardArrowRightIcon fontSize='small'/>}
                        </button>
                    </Tooltip>
                </div>
            </div>
            
            <div className={`collapsible-url-menu ${listOpened ? 'open' : ''}`}>
                {urls.map((urlObj, index) => (
                    <Url_entry
                        key={index}
                        title={urlObj.title}
                        link={urlObj.url}
                        onDeleteUrl={() => deleteUrl(index)}
                    />
                ))}
            </div>
        </div>
    )
}

/*
FOR LATER UPDATES:
- Add a 2nd check to ask if user is sure they want to delete readr list.
*/