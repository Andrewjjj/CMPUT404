export const Details = ( ) => {
    const author={
        "type":"author",
        "id":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
        "url":"http://127.0.0.1:5454/author/1d698d25ff008f7538453c120f581471",
        "host":"http://127.0.0.1:5454/",
        "displayName":"Greg Johnson",
        "github": "http://github.com/gjohnson",
        "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
      }
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