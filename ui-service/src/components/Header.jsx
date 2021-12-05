import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

export const Header = ({title}) => {
    Header.propTypes={
        title: PropTypes.string.isRequired,
    }

    return (
        
            <div className='headerc'>
               <div><h1>{title}</h1></div>
               {/* <div>
                   <Link to='/'> 
                   <button className='friendButton' onClick={useStoreActions((state) => state.logOut)}>Log out</button>
                   </Link>
                </div> */}
            </div>
        
    );

    
    
}



