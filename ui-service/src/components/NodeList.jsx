import axios from 'axios';
import {Button} from 'react-bootstrap';

const removeNode = async (nodeID) => {
    try {
        await axios.delete("https://fast-chamber-90421.herokuapp.com/admin/nodes/" + nodeID)
        alert("Success")
        window.location.reload();
    } catch(err) {
        console.log(err)
        alert(err)
    }
}

export const NodeList = ({nodes}) => {
    return (
        <ul>
            {nodes.map((node) => (
                <>
                <li>
                    {node.Host}
                </li>
                <Button className="btn btn-danger"
                    onClick={() => {removeNode(node.NodeID)}}>
                    Remove Node
                </Button>
                </>
                )
            )}
        </ul>
    )
}