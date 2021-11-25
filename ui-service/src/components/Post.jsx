export const Post = ({post}) => {
    
    return (
        
    
        <div style={{textAlign: 'left', color: "white", padding:"20px",margin:"10px", backgroundColor:"#1E2F41", borderRadius:"10px"}}>
                    <h4><b>{post.title}</b></h4>
                    <h5 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{post.author.displayName} </h5>
                    <br></br>
                    <div>
                    {post.description}
                </div>
                </div>
                
    )
}
