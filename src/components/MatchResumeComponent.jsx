import React, { useState } from 'react';
import axios from 'axios';

import Table from 'react-bootstrap/Table';

function MatchResumeComponent() {

    const [totalRoundsPlayed, setTotalRoundsPlayed] = useState('');
    const [totalWinsFirstPlayer, setTotalWinsFirstPlayer] = useState('');
    const [totalWinsSecondPlayer, setTotalWinsSecondPlayer] = useState('');
    const [totalDraws, setTotalDraws] = useState('');
    
        axios.get(`http://localhost:8080/match/resume`)
        .then(resume => resume.data)
        .then((resumeData) => {
            setTotalRoundsPlayed(resumeData.numberRoundsPlayed)
            setTotalWinsFirstPlayer(resumeData.winsFirstPlayer)
            setTotalWinsSecondPlayer(resumeData.winsSecondPlayer)
            setTotalDraws(resumeData.totalDraws)
        }).catch(function (error) {
            console.log('Error de axuios: ', error)
        })

    
        return(<>
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
                        <td>{totalRoundsPlayed}</td>
                        <td>{totalWinsFirstPlayer}</td>
                        <td>{totalWinsSecondPlayer}</td>
                        <td>{totalDraws}</td>
                    </tr>
                </tbody>
            </Table>
            </>
        )
    
}

export default MatchResumeComponent;
