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
            totalDraws: ''
        };

        this.playGameChange = this.playGameChange.bind(this);
        this.playGameSubmit = this.playGameSubmit.bind(this);
    }

    componentDidMount() {
        // axios.get(`http://localhost:8080/match/resume`)
        // .then(resume => resume.data)
        // .then((resumeData) => {
        //     console.log('===>', resumeData)
        //     this.setState({
        //         totalRoundsPlayed: resumeData.numberRoundsPlayed,
        //         totalWinsFirstPlayer: resumeData.winsFirstPlayer,
        //         totalWinsSecondPlayer: resumeData.winsSecondPlayer,
        //     })
        // }).catch(console.log('vata mierda'))
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
        }).catch(console.log('vata mierda'))

        // players move
        axios.get(`http://localhost:8080/match/players`)
        .then(playersResume => playersResume.data)
        .then((playersResumeData) => {

            console.log('------>>>>', playersResumeData)
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
                    <input type="submit" value="Play" />
                </div>
            </form>


            <h1>Current user stats</h1>    
            <Table striped={true} bordered={true} hover>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Rounds</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.state.userNameResponse}</td>
                        <td>{this.state.userRounds}</td>
                    </tr>
                </tbody>
            </Table>

            <h1>Second Part</h1>
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

            </>
        )
    }
}