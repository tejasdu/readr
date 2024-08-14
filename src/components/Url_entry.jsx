import React, { useState, useEffect } from 'react';
import '../styles/url_entry.css';
import Tooltip from '@mui/material/Tooltip';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

export default function Url_entry({name, onDeleteUrl}) {
    

    return (
        <div className='url-container'> 
            <div className='url-name'>
                {name}
            </div>

            <Tooltip title="Remove url" arrow>
                <button className='remove-url' onClick={onDeleteUrl}> 
                    <RemoveRoundedIcon /> 
                </button>
            </Tooltip>
        </div>
    )
}