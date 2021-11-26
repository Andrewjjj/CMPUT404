import react from 'react'

export const LandingScreen = () => {
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
