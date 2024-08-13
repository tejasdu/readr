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
        chrome.storage.sync.get('urlList', (result) => {
            console.log('Loading data:', result.urlList);
            if (result.urlList) {
                setUrls(result.urlList);
            }
        });
    }, []);

    const saveUrlToStorage = (updatedUrls) => {
        chrome.storage.sync.set({ urlList: updatedUrls }, () => {
            if (chrome.runtime.lastError) {
                console.error('Error saving data:', chrome.runtime.lastError);
            } else {
                console.log('Data saved successfully:', updatedUrls);
            }
        });
    }

    const addUrl= () => {
        // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //     const currentTab = tabs[0];
        //     if (currentTab.url) {
        //         const updatedUrls = [...urls, currentTab.url];
        //         setUrls(updatedUrls);
        //         saveUrlToStorage(updatedUrls);
        //     }
        // });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            if (currentTab.title) {
                const updatedUrls = [...urls, currentTab.title];
                setUrls(updatedUrls);
                saveUrlToStorage(updatedUrls);
            }
        });
    }

    const deleteUrl = (index) => {
        const updatedUrls = urls.filter((_, i) => i !== index);
        setLists(updatedUrls);
        saveUrlToStorage(updatedUrls);      
    }

    
    return (
            <div className="list-container">
                <div className="list-left">
                    <div className="list-icon">
                        <ListIcon />
                    </div>
                    <p className="list-name">{name}</p>
                </div>

                <div className="list-right">
                    <Tooltip title="Add Url" arrow>
                        <button className="add-url" onClick={addUrl}>
                            <AddRoundedIcon />
                        </button>
                    </Tooltip>

                    <Tooltip title="Delete Url" arrow> 
                        <button className="delete-button" onClick={onDelete}>
                            <BookmarkRemoveRoundedIcon className='delete-icon'/>
                        </button>
                    </Tooltip>

                    <Tooltip title="Show Readr list" arrow>
                        <button className='dropdown-button' onClick={() => setListOpened(!listOpened)}>
                            {listOpened ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                        </button>
                    </Tooltip>
                </div>

                {listOpened && (
                    <div className="collapsible-url-menu">
                        {urls.map((url, index) => (
                            <Url_entry
                                key={index}
                                name={url}
                                onDeleteUrl={() => deleteUrl(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
    )
}

/*
FOR LATER UPDATES:
- Add a 2nd check to ask if user is sure they want to delete readr list.
*/