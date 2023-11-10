import React, {useState} from 'react'
import yeah from '../audios/yeah sound.mp3'


export default function Main(){

    function getNum(){
        return Math.floor(Math.random() * 10)
    }
    //initialize variable
    const [numberData, setNumberData] = useState(
        [
            {number: getNum(), colorState: false}, {number: getNum(), colorState: false}, 
            {number: getNum(), colorState: false}, {number: getNum(), colorState: false},
            {number: getNum(), colorState: false}, {number: getNum(), colorState: false},
            {number: getNum(), colorState: false}, {number: getNum(), colorState: false},
            {number: getNum(), colorState: false}, {number: getNum(), colorState: false},
        ]
    )
    const [winStatus, setWinStatus] = useState(false)
    const [count, setCount] = useState(0)
    const [highScore, setHightScore] = useState( JSON.parse(localStorage.getItem("highScore")) || [999])
    const [enableClick, setEnableClick] = useState(true)
    
    function getNewNumber(){
        setCount(prevCount => prevCount + 1)

        setNumberData(prevNumberData => {
            const newArray = prevNumberData.map(object => {
                // if the number is highlighted then do not change the number
                if (object.colorState === true){
                    return {...object}
                } else {
                    // return same object but change number only
                    return {
                        ...object,
                        number: getNum()
                    }
                }

            })
            return newArray
        })
    }

    function toggle(num){
        if(enableClick){
                setNumberData( prevNumberData => {
                const newArray = [...prevNumberData]
                newArray[num] = {
                    ...newArray[num], 
                    colorState: !newArray[num].colorState
                }
                return newArray
            })
        }
    } 

    function checkWin(){
        if(enableClick){
            if (numberData.every( obj => obj.number === numberData[0].number ) ){
                var audio = new Audio(yeah)
                audio.play()
                setEnableClick(state => !state)
                setNewScore()
                setWinStatus(state => !state)
            }
        }
    }

    function setNewScore(){
        for (let num = 0; num < 5; num++){
            if (count < highScore[num]){
                highScore.splice(num, 0, count)
                localStorage.setItem("highScore",JSON.stringify(highScore))
                break
            }
            
        }  
    }

    return (
        <main className='main'>
            <div className='outside'>
                <div className='inside'>
                    <h1 className='title'>Tenzies</h1>
                    <p className='description'>
                        Roll until all dice are the same. 
                        Click each dice to freeze it at its current value
                        between rolls.
                    </p>
                    <div className='count'>Roll Count: {count}</div>
                    <div className={`win ${winStatus ? "win-animation" : "hidden"}`}>YOU WIN!!!</div>
                    <div className="dices">
                        <div className='dices-top'>
                            <div className={`dices-item ${numberData[0].colorState ? "green" : ""}`} onClick={() => {toggle(0); checkWin()}} style={{ cursor: enableClick ? 'pointer' : 'not-allowed' }}>{numberData[0].number}</div>
                            <div className={`dices-item ${numberData[1].colorState ? "green" : ""}`} onClick={() => {toggle(1); checkWin()}} style={{ cursor: enableClick ? 'pointer' : 'not-allowed' }}>{numberData[1].number}</div>
                            <div className={`dices-item ${numberData[2].colorState ? "green" : ""}`} onClick={() => {toggle(2); checkWin()}} style={{ cursor: enableClick ? 'pointer' : 'not-allowed' }}>{numberData[2].number}</div>
                            <div className={`dices-item ${numberData[3].colorState ? "green" : ""}`} onClick={() => {toggle(3); checkWin()}} style={{ cursor: enableClick ? 'pointer' : 'not-allowed' }}>{numberData[3].number}</div>
                            <div className={`dices-item ${numberData[4].colorState ? "green" : ""}`} onClick={() => {toggle(4); checkWin()}} style={{ cursor: enableClick ? 'pointer' : 'not-allowed' }}>{numberData[4].number}</div>
                        </div>
                        <div className='dices-bottom'>
                            <div className={`dices-item ${numberData[5].colorState ? "green" : ""}`} onClick={() => {toggle(5); checkWin()}} style={{ cursor: enableClick ? 'pointer' : 'not-allowed' }}>{numberData[5].number}</div>
                            <div className={`dices-item ${numberData[6].colorState ? "green" : ""}`} onClick={() => {toggle(6); checkWin()}} style={{ cursor: enableClick ? 'pointer' : 'not-allowed' }}>{numberData[6].number}</div>
                            <div className={`dices-item ${numberData[7].colorState ? "green" : ""}`} onClick={() => {toggle(7); checkWin()}} style={{ cursor: enableClick ? 'pointer' : 'not-allowed' }}>{numberData[7].number}</div>
                            <div className={`dices-item ${numberData[8].colorState ? "green" : ""}`} onClick={() => {toggle(8); checkWin()}} style={{ cursor: enableClick ? 'pointer' : 'not-allowed' }}>{numberData[8].number}</div>
                            <div className={`dices-item ${numberData[9].colorState ? "green" : ""}`} onClick={() => {toggle(9); checkWin()}} style={{ cursor: enableClick ? 'pointer' : 'not-allowed' }}>{numberData[9].number}</div>
                        </div>
                    </div>
                    <button className="button" onClick={getNewNumber}>Roll</button>
                </div>
            </div>
            <div className='outside'>
                <div className="inside-highscore">
                    <h1 className='title'>High Score</h1>
                    <div className="description">Roll Count:</div>
                    <div className="description">1. {highScore[0]}</div>
                    <div className="description">2. {highScore[1]}</div>
                    <div className="description">3. {highScore[2]}</div>
                    <div className="description">4. {highScore[3]}</div>
                    <div className="description">5. {highScore[4]}</div>
                </div>
            </div>
        </main>
    )
}