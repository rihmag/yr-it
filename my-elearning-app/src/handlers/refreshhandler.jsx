import React, { use } from 'react'
import { useNavigate , useLocation } from 'react-router-dom';
import { useEffect } from 'react';


function Refreshhandler  ({SetIsAuthenticated}) {
    const navigate = useNavigate();
    const location = useLocation();
    const token= localStorage.getItem('token');
    useEffect(() => { 
    if(!token){
        SetIsAuthenticated(false);
        if(location.pathname !== '/login' && location.pathname !== '/signup'){
            
        }
    }
    else{
        SetIsAuthenticated(true);
        
        if(location.pathname === '/login' || location.pathname === '/signup'){
            navigate('/dashboard');
        }

    }
    
    
},[] )
  return (
     null
     
    )
}

export default Refreshhandler
