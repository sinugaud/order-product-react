
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let authenticated = sessionStorage.getItem('token')
    if (!authenticated) {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <Component />
    </div>
  )
}

export default ProtectedRoute;


