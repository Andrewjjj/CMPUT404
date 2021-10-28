export const Friend = ( {friend} ) => {
    return (
        
        <div className='friend'>
            <div className ='friendDivRight'>
                <img className= 'profileImage' src= {friend.profileImage} alt=""></img>
                <h4>{friend.displayName}</h4>
                <p>{friend.type}</p>
            </div> 
            <div className='friendDivLeft'>
                <div>
            
                <button className= 'friendDivButton' onClick={() => {window.location.href=friend.url}} rel="noreferrer noopener" target="_blank"> Visit Profile </button>
                </div>
                <div>
                <button className='friendDivButton' onClick={() => {window.location.href=friend.github}} rel ="noreferrer noopener" target="_blank"  target="_blank"> Visit Github </button>
                </div>
            </div>
            
        </div>
    )
}

