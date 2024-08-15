import React, { useState, useEffect } from 'react';
import '../styles/url_entry.css';
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

export default function Url_entry({link, title, onDeleteUrl}) {
    return (
        <div className='url-container'> 
            <div className='url-name'>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {title}
                </a>
            </div>

            <Tooltip title="Remove url" arrow>
                <button className='remove-url' onClick={onDeleteUrl}> 
                    <DeleteOutlineRoundedIcon fontSize='small'/> 
                </button>
            </Tooltip>
        </div>
    )
}