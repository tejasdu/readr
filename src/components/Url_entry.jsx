import React, { useState, useEffect } from 'react';
import '../styles/url_entry.css';

export default function Url_entry({name, onDeleteUrl}) {
    

    return (
        <div className='url-container'> {name} </div>
    )
}