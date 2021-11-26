import { useEffect, useState } from "react"
import axios from 'axios'
import { Button } from "react-bootstrap"

export const AuthorForeignScreen = () => {
    const [authors, setAuthors] = useState([])
    const [host, setHost] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        // axios.interceptors.request.use(request => {
        //     console.log('Starting Request', request)
        //     return request
        // })
        console.log(authors)
    }, [])

    const connectToForeignHostHandler = async () => {
        try {
            let token = btoa(`${username}:${password}`)
            let response = await axios.get(host, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            })
            // console.log(response.data.items)
            setAuthors(response.data.items)
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    return (
        <div className="m-5">
            <div className="row border mx-5 my-2">
                Get Authors URL: <input type="text" value={host} onInput={(e) => { setHost(e.currentTarget.value) }} />
            </div>
            <div className="row border mx-5 my-2">
                Username: <input type="text" value={username} onInput={(e) => { setUsername(e.currentTarget.value) }} />
            </div>
            <div className="row border mx-5 my-2">
                Password: <input type="text" value={password} onInput={(e) => { setPassword(e.currentTarget.value) }} />
            </div>
            <div className="row">
                <div className="col text-center">
                    <Button onClick={connectToForeignHostHandler}>Get all authors!</Button>

                </div>
            </div>
            <hr className="my-2" />
            <div className="my-5">
                {authors.map(author => (
                    <div className="row border m-5">
                        <div className="col">
                            id: {author.id}
                        </div>
                        <div className="col">
                            name: {author.displayName}
                        </div>
                        <div className="col">
                            github: {author.github}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

