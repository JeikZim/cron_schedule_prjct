import React from 'react';
import Schedule from './components/Schedule';
import CronLine from './components/CronLine';
import SaveLoadButtons from "./components/SaveLoadButtons";

function App() {
    return (
        <div className="container">
            <Schedule />
            <SaveLoadButtons />
            <CronLine />
        </div>
    )
}

export default App;

