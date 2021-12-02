import react, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

export const LandingScreen = () => {

    const isLoggedIn = useStoreState((state) => state.isLoggedIn)
    const isLoggedInAdmin = useStoreState((state) => state.isLoggedInAdmin)
    const st = useStoreState(s => s)


    const navigate = useNavigate()

    useEffect(() => {
        console.log(st)
        if(isLoggedIn) navigate("/Home")
        if(isLoggedInAdmin) navigate("/Admin")
        console.log(isLoggedIn, isLoggedInAdmin)
    }, [])

    return (
        <>
        <div>
            <a 
                href="/LoginUser"
                className="btn btn-primary"
                >
                Log in as User
            </a>
        </div>
        <div>
            <a
                href="/LoginAdmin"
                className="btn btn-primary"
                >
                Log in as Site Admin
            </a>
        </div>
        </>
    )
}
