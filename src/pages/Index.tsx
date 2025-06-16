
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the dashboard page
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to dashboard...</p>
    </div>
  );
};

export default Index;
