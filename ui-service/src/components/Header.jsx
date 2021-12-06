import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

export const Header = ({title}) => {
    Header.propTypes={
        title: PropTypes.string.isRequired,
    }

    return (
        
            <div className='headerc'>
               <div><h1>{title}</h1></div>
            </div>
        
    );

    
    
}



