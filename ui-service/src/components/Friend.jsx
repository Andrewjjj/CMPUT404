export const Friend = ( {friend} ) => {
    return (
        
        <div className='friend'>
            <div className ='friendDivRight'>
                <img className= 'profileImage' src= {friend.Image} alt=""></img>
                <h4>{friend.Name}</h4>
                {/* <p>{friend.type}</p> */}
            </div> 
            <div className='friendDivLeft'>
                <div>
            
                <button className= 'friendDivButton' onClick={() => {window.location.href=friend.Hrl}} rel="noreferrer noopener" target="_blank"> Visit Profile </button>
                </div>
                <div>
                <button className='friendDivButton' onClick={() => {window.location.href=friend.Github}} rel ="noreferrer noopener" target="_blank"  target="_blank"> Visit Github </button>
                </div>
            </div>
            
        </div>
    )
}

