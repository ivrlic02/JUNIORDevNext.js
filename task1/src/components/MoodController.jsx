import { useState } from 'react'
import './Mood.css'
import MoodDisplay from './MoodDisplay'

function MoodController(){
    const [currentMood, setMood] = useState("")
    const [counter, setCounter] = useState(0)
    const [animation, setAnimation] = useState("")

    function handleClick(mood) {
        if(currentMood !== mood) {
            setMood(mood)
            setCounter(counter + 1)

            setAnimation("animate")
            setTimeout(() => setAnimation(""), 500)
        }
    }

    return (
        <>  
            <div id="emoji-container" className={animation}>
                <MoodDisplay mood = {currentMood} />
            </div>

            <div id="select-container">
                <button className='mood-button' onClick={() => handleClick("happy")}>Happy</button>
                <button className='mood-button' onClick={() => handleClick("neutral")}>Neutral</button>
                <button className='mood-button' onClick={() => handleClick("sad")}>Sad</button>
                {currentMood === "" && <p>Select one of moods</p>}
            </div>

            <div id="counter-container">
                <span>Counter: {counter}</span>
                {counter >= 10 && <button onClick={() => setCounter(0)}>Reset!</button>}
            </div>
        </>
    )
}

export default MoodController