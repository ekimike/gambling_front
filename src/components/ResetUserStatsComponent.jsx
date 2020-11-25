import React from 'react';
import axios from 'axios';

function ResetUserStatsComponent(props) {
    console.log(props)

    function handleResetButton(user, e) {
        axios.patch(`http://localhost:8080/match/player/${user.value}/restart`)
            .then(res => res.data)
            .catch(function(error) {
                console.log('Error al restart: ', error)
            })
    }
    
    return <button onClick={handleResetButton.bind(this, props)}>Reset user stats</button>
}



export default ResetUserStatsComponent;