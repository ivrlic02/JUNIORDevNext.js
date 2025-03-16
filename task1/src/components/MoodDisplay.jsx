import './Mood.css'

function MoodDisplay(props) {
    if(props.mood === "happy") {
        document.getElementById("emoji-container").style.backgroundColor = "yellow"
        return <p className='emoji'>😀</p>
    } else if(props.mood === "neutral"){
        document.getElementById("emoji-container").style.backgroundColor = "blue"
        return <p className='emoji'>😐</p>
    } else if(props.mood === "sad"){
        document.getElementById("emoji-container").style.backgroundColor = "gray"
        return <p className='emoji'>😓</p>
    }

    return <p className='emoji'>❔</p>
}

export default MoodDisplay