'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Redirect to index.html in the public folder
    window.location.href = '/index.html';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <p>Redirecting to CV...</p>
    </div>
  );
}