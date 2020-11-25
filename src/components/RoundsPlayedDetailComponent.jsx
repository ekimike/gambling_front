import React from 'react'
import Table from 'react-bootstrap/Table'

function RoundsPlayedDetailComponent(props) {
    console.log(', props: ', props);
    const gameDetails  = props.value;
    console.log('the moon darker side: ', gameDetails, ', props: ', props);
 
    for (var meow in gameDetails ) {
        console.log('meow: ', meow);
    }
    

    return <>
    <Table responsive>
        <thead>
            <tr>
                <th>User</th>
                <th></th>
                <th>Option</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>User1</td>
                <td></td>
                <td><button>Button</button></td>
            </tr>
            <tr>
                <td>1 choose</td>
                <td>2 choose </td>
                <td>result</td>
            </tr>
            <tr>
                <td>1 choose</td>
                <td>2 choose </td>
                <td>result</td>
            </tr>
            <tr>
                <td>User1</td>
                <td></td>
                <td><button>Button</button></td>
            </tr>
            <tr>
                <td>1 choose</td>
                <td>2 choose </td>
                <td>result</td>
            </tr>
            <tr>
                <td>1 choose</td>
                <td>2 choose </td>
                <td>result</td>
            </tr>
        </tbody>
    </Table>
    </>
}





export default RoundsPlayedDetailComponent;