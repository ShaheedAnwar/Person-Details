import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactUsForm from './ContactUsForm';
import MediaPage from './MediaPage';  
import ThankYouPage from './ThankYouPage';    
import UserList from './UserList';   
import ProductAndServices from './Products&Services';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MediaPage />} />
        <Route path="/contact-us" element={<ContactUsForm />} />
        <Route path="/products&services" element={<ProductAndServices />} />
        <Route path="/thank-you" element={<ThankYouPage />} /> 
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
