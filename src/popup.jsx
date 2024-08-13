import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Heading from './components/Heading.jsx'
import Lists from './components/Lists.jsx'
import 'react-tooltip/dist/react-tooltip.css'

function Popup() {
    return (
        <div>
           <Heading />
           <Lists />
        </div>
    );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>
);
