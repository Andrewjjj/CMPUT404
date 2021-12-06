export const Details = ( {author}) => {
    
    return (
        
    
        <div className='author'>
            <div className ='profileDiv'>
                <img className= 'profileImage' src= {author["profileImage"]} alt=""></img>
                <br></br>
                <h4>{author["displayName"]}</h4>
                <br></br>
                <p>{author["type"]}</p>
                <br></br>
                <button className= 'profileDivButton' onClick={() => {window.location.href=author.github}} rel="noreferrer noopener" target="_blank"> Visit Github </button>
                <br></br>
                <button className= 'profileDivButton' onClick={() => {window.location.href=author.github}} rel="noreferrer noopener" target="_blank"> Follow </button> 
                <br></br>
                <button className= 'profileDivButton' onClick={() => {window.location.href=author.github}} rel="noreferrer noopener" target="_blank"> Add as Friend </button>
            </div> 
            
        </div>


    )
}

export default Details;