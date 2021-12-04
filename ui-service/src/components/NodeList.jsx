import axios from 'axios';
import {Button} from 'react-bootstrap';
import { useStoreState } from 'easy-peasy'

export const NodeList = ({nodes}) => {

    const restHost = useStoreState((state) => state.restHost)

    const removeNode = async (nodeID) => {
        try {
            await axios.delete(`${restHost}/admin/nodes/${nodeID}`)
            alert("Success")
            window.location.reload();
        } catch(err) {
            console.log(err)
            alert(err)
        }
    }

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