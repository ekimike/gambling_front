import React, { useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table';

function CurrentGamerStatsComponent(props) {

    const [currentGamerName, setCurrentGamerName] = useState();
    const [currentGamerMatches, setCurrentGamerMatches] = useState();

    console.log('props de currentGamerStats: ', props.userNameResponsex, ', x> ', props.userRoundsx);

    useEffect(() => {
        setCurrentGamerName(props.userNameResponsex);
        setCurrentGamerMatches(props.userRoundsx);    
    }, [props, currentGamerName]);

    return(<>
        <Table>
            <thead>
                <tr>
                    <th>Gamer</th>
                    <th>Rounds so far</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{currentGamerName}</td>
                    <td>{currentGamerMatches}</td>
                </tr>
            </tbody>
        </Table>
        </>
    )
}

export default CurrentGamerStatsComponent;
