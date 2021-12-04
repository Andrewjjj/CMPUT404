import react, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import {Button, Input, Image} from 'react-bootstrap';

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
        <body className="background">
            <div className="container" style={{backgroundColor: "rgb(21,32,43)", display: "flex", justifyContent: "center", alignItems: "center", 
                    flexDirection: "column", gap: "50px"}}>
                    <div style={{width: "50%", height: "40%"}}>
                        <Image src="appLogo.png" fluid/>
                    </div>
                    
                    <div>
                        <Button  href="/LoginUser" className="Buttons">
                        Log in as User
                        </Button>
                    </div>
                    <div>
                        <Button href="/LoginAdmin" className="Buttons">
                        Log in as Site Admin
                        </Button>
                    </div>   
                
            </div>
        </body>
        
                
        
        </>
    )
}
