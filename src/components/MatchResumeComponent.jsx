import React from 'react';
import axios from 'axios';

export default class MatchResumeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            games: []
        };  
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/match/resume`)
            .then(res => res.data )
            .then((data) => {
                this.setState({ games: data })
            })
            .catch(this.setState({games: 'Something went wrong' }))
    }

    render() {
        return(<>
            <div>
                <h1>Games</h1>
                <p> HOLA: { this.state.games.totalDraws }  </p>
            </div>
            </>
        )
    }

    
}
