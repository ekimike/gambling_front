import React from 'react';
import axios from 'axios';

import Table from 'react-bootstrap/Table';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class PlayRoundComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userRounds: '',
            userNameResponse: '',
            totalRoundsPlayed: '',
            totalWinsFirstPlayer: '',
            totalWinsSecondPlayer: '',
            totalDraws: '',
            firstPlayerChoose: '',
            secondPlayerChoose: 'Rock',
            roundResult: '',
            roundUsername: '',
        };

        this.playGameChange = this.playGameChange.bind(this);
        this.playGameSubmit = this.playGameSubmit.bind(this);
    }
    
    playGameSubmit(event) {

        axios.post(`http://localhost:8080/match/player/${this.state.userName}/new_game`)
        .then(res => res.data)
        .then((data) => {
            this.setState({
                userNameResponse: data.userName,
                userRounds: data.roundsPlayed    
            })
        }).catch(this.setState({
            responseUser: 'WRONG'
        }))

        axios.get(`http://localhost:8080/match/resume`)
        .then(resume => resume.data)
        .then((resumeData) => {
            this.setState({
                totalRoundsPlayed: resumeData.numberRoundsPlayed,
                totalWinsFirstPlayer: resumeData.winsFirstPlayer,
                totalWinsSecondPlayer: resumeData.winsSecondPlayer,
                totalDraws: resumeData.totalDraws
            })
        }).catch(console.log('cannot get resume'))

        // players move
        axios.get(`http://localhost:8080/match/players`)
        .then(playersResume => playersResume.data)
        .then((playersResumeData) => {

            console.log('------>>>>', playersResumeData)
            for(var foo in playersResumeData) {
                console.log('foo: ', foo, ', bar: ', playersResumeData[foo].gameDetail[0].firstPlayerSelection);
                for(var bar in playersResumeData[foo].gameDetail) {
                    console.log('elliot: ', playersResumeData[foo].gameDetail[bar].firstPlayerSelection);
                    this.setState({
                        roundUsername: foo,
                        firstPlayerChoose: playersResumeData[foo].gameDetail[bar].firstPlayerSelection,
                        roundResult: playersResumeData[foo].gameDetail[bar].matchResult,
                    })

                }
            }
        })
        
        event.preventDefault();
    }

    playGameChange(event) {
        this.setState(
            {
                userName: event.target.value
            }
        );
    }

    render() {
        return (<>
            <form autoComplete="off" onSubmit={this.playGameSubmit}>
                <div>
                    <label>
                        Name: <input type="text" value={this.state.userName} onChange={this.playGameChange} autoFocus={true}/>
                    </label>
                    <input type="submit" value="Play Round" />
                </div>
            </form>


            <h1>Current User stats</h1>    
            <Table striped={true} bordered={true} hover>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Rounds</th>
                        <th>Reset stats</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.state.userNameResponse}</td>
                        <td>{this.state.userRounds}</td>
                        <td><button onClick={this.handleClick.bind(this, this.state.userNameResponse)}>Reset</button></td>
                    </tr>
                </tbody>
            </Table>

            <h1>Game stats</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Total rounds played</th>
                        <th>total wins first player</th>
                        <th>total wins second player</th>
                        <th>total draws</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.state.totalRoundsPlayed}</td>
                        <td>{this.state.totalWinsFirstPlayer}</td>
                        <td>{this.state.totalWinsSecondPlayer}</td>
                        <td>{this.state.totalDraws}</td>
                    </tr>
                </tbody>
            </Table>

            <h1>Rounds played</h1>    
            <Table>
                <thead>
                    <tr>
                        <th>Player name</th>
                        <th>First player choose</th>
                        <th>Second player chooose</th>
                        <th>Round resul</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{this.state.roundUsername}</td>
                        <td>{this.state.firstPlayerChoose}</td>
                        <td>{this.state.secondPlayerChoose}</td>
                        <td>{this.state.roundResult}</td>
                    </tr>
                </tbody>
            </Table>
            </>
        )
    }

    handleClick(user, e) {
        e.preventDefault();
        console.log('prevent default: ', user);
        
        axios.patch(`http://localhost:8080/match/player/${user}/restart`)
        .then(res => res.data)
        .then((data) => {
            console.log('UPDATE MAS NA')
        }).catch(this.setState({
            responseUser: 'WRONG'
        }))
    }
}
