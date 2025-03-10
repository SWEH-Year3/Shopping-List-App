import { useState } from "react";
import './App.css';

const App = () =>
{

    let [counter, setCounter] = useState(0);
    
    let inc = () => { setCounter(counter + 1); }
    let dec = () => { setCounter(counter - 1); }
    
    return (
        <>
            <div id='Card' style={{"display": "flex", "flexDirection":"column","justifyContent":"center","height": "100dvh","alignItems":"center"}}>
                <div><strong> Counter:</strong> <span>{counter}</span></div>
                <div id="action" style={{"display": "flex"}}>
                    <span><button onClick={inc}>+</button></span>
                    <span><button onClick={dec} disabled={counter <= 0 ? true : false} style={{ "backgroundColor": counter <= 0 ? 'gray' : 'blue', "cursor": counter <= 0 ? "not-allowed":'pointer'}}>-</button></span>
                </div>
            </div>
        </>
    );
}

export default App;