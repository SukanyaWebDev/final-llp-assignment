import { Component } from 'react'

import './index.css'

const RedGreenArray = [
    { id: 1, color: "green" }, { id: 2, color: "red" }
]

const levelsArray = [{ id: 1, level: "Easy", minimum: 10 }, { id: 2, level: "Medium", minimum: 15 }, { id: 3, level: "Hard", minimum: 25 }]

class GreenLightRedLight extends Component {

    state = { isLoginVisible: true, userName: "", userEmail: "", gameRunning: true, userMobileNumner: "", userSelectionLevel: levelsArray[0].level, timer: 40, isStart: true, changeColor: "", result: 0 }

    startTime = () => {
        const { timer } = this.state
        let count = timer
        this.startTimeInterVal = setInterval(() => {
            count = count - 1
            if (count > -1) {
                this.setState({ timer: count, gameRunning: true })
            }
            else {
                this.setState({ gameRunning: false })
            }

        }, 2000)

    }

    getUserName = (event) => {
        this.setState({ userName: event.target.value })
    }

    getUserMail = (event) => {
        this.setState({ userEmail: event.target.value })
    }

    getUserMobile = (event) => {
        this.setState({ userMobileNumner: event.target.value })
    }

    getUserOption = (event) => {
        this.setState({ userSelectionLevel: event.target.value })
    }

    submitForm = (event) => {
        const { userEmail, userMobileNumner, userSelectionLevel, userName } = this.setState
        event.preventDefault()

        if (userEmail !== "" && userMobileNumner !== "" && userName !== "" && userSelectionLevel !== "") {
            this.setState({ isLoginVisible: false })
        }

    }

    startGame = () => {
        this.setState({ timer: 40 })
        this.startTime()
        this.setState({ isStart: false })
        this.setTimerForColorChange()
    }

    setTimerForColorChange = () => {
        let count = 0
        this.startTimeInterValRed = setInterval(() => {
            if (count % 2 === 0) {
                const colorDis = RedGreenArray[0].color
                // console.log(colorDis)
                this.setState({ changeColor: colorDis })

            }
            else {
                const colorDis = RedGreenArray[1].color
                this.setState({ changeColor: colorDis })
                // console.log(colorDis)
            }
            count = count + 1
        }, 1000)

    }

    stopPlay = () => {
        const { changeColor } = this.state
        // console.log(changeColor)
        if (changeColor === "red") {
            this.setState({ isStart: false, gameRunning: false })
            clearInterval(this.startTimeInterValRed)
            clearInterval(this.startTimeInterVal)

        }
        else {
            this.setState((preState) => ({ result: preState.result + 1 }))
        }
    }


    gameCard = () => {
        const { userName, timer, isStart, changeColor, result, gameRunning, userSelectionLevel } = this.state

        let minimuCount = 0
        if (userSelectionLevel === "Easy") {
            minimuCount = 10
        }
        else if (userSelectionLevel === "Hard") {
            minimuCount = 15
        }
        else {
            minimuCount = 25
        }

        const isWin = result >= minimuCount
        console.log(isWin)

        return (
            <div >
                <nav className='navBar'>
                    
                    <h1 >Welcome....<span className='welcomepage'>{userName}</span></h1>
                    <h1>Your Score : <span className='welcomepage'>{result}</span></h1>
                    <h1>Time : <span className='welcomepage'>{timer}</span></h1>
                </nav>
                <div className='gamecard'>{
                    isStart ?
                        (
                            <button onClick={this.startGame} className='startButton'>Start</button>
                        ) : (
                            <div>
                                {gameRunning ?
                                    (<button className={`gameCardButton ${changeColor}`} onClick={this.stopPlay}>Click on Green Color to Increase Count</button>
                                    ) : (
                                        <div>
                                            {
                                                isWin ? (
                                                     <div className='successCard'>You Win..{userSelectionLevel}Level</div>
                                                ) : (
                                                    <div className='failureCard'>Game Over...</div> 
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                }
                </div>
            </div >)
    }



    loginForm = () => {
        const { userEmail, userMobileNumner, userName, userSelectionLevel } = this.state
        return (
            <div className='LoginPage'>
                <form className='myForm' onSubmit={this.submitForm}>
                    <h1>Register Here...</h1>
                    <div className='labelItem'>
                        <label htmlFor='userName'>Name</label>
                        <input type='text' id="userName" onChange={this.getUserName} required value={userName} />
                    </div>
                    <div className='labelItem'>
                        <label htmlFor='userEmail'>Email</label>
                        <input type='email' id="userEmail" onChange={this.getUserMail} required value={userEmail} />
                    </div>
                    <div className='labelItem'>
                        <label htmlFor='userMobile'>Mobile Number</label>
                        <input type='tel' id="userMobile" onChange={this.getUserMobile} required value={userMobileNumner} />
                    </div>
                    <div className='labelItem' required>
                        <label htmlFor='userSelectionOption'>Difficulty Level</label>
                        <select id="userSelectionOption" onChange={this.getUserOption} value={userSelectionLevel}>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div className='buttonEle'><button type='submit' className='buttonElement'>Login</button></div>
                </form>
            </div>)
    }

    render() {
        const { isLoginVisible } = this.state

        return (
            <div>
                {
                    isLoginVisible ? (this.loginForm()) : (this.gameCard())
                }
            </div>
        )
    }

}
export default GreenLightRedLight