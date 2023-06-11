import React from 'react'
import Schedule from './components/Schedule'
import CronLine from './components/CronLine'
import Button from './components/Button'

function App() {

    const load = () => {

    }

    const save = () => {
        
    }

    return (
        <div className="container">
            <Schedule />
            <div className="btn-group">
                <Button name='Load' onClick={load} />
                <Button name='Save' onClick={save} />
            </div>
            <CronLine />
        </div>
    )
}

export default App;
