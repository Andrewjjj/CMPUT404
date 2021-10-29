import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Header = ({title}) => {
    Header.propTypes={
        title: PropTypes.string.isRequired,
    }

    return (
        
            <div className='headerc'>
               <div><h1>{title}</h1></div>
               <div>
                   <Link to='/'> 
                   <button className='friendButton'>Close</button>
                   </Link>
                </div>
            </div>
        
    );

    
    
}



