import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductAndServices = () => {
    const navigate = useNavigate(); 

    // Function to handle button click
    const handleButtonClick = (key) => {
        console.log('Button clicked with key:', key);
        navigate('/contact-us', { state: { key } });
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Product Section */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Products</h1>
        <div className="flex flex-col gap-4 mb-6">
          <button onClick={() => handleButtonClick('AI Admin')} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            AI Admin
          </button>
          <button onClick={() => handleButtonClick('Cloud Admin')} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Cloud Admin
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Services</h1>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => handleButtonClick('Data Base')} className="w-full sm:w-32 md:w-40 lg:w-48 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 text-center">
            Data Base Management
          </button>
          <button onClick={() => handleButtonClick('Middleware')} className="w-full sm:w-32 md:w-40 lg:w-48 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 text-center">
            Middleware Management
          </button>
          <button onClick={() => handleButtonClick('OS')} className="w-full sm:w-32 md:w-40 lg:w-48 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 text-center">
            OS Management 
          </button>
          <button onClick={() => handleButtonClick('Application')} className="w-full sm:w-32 md:w-40 lg:w-48 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 text-center">
            Application Management
          </button>
          <button onClick={() => handleButtonClick('Cloud Transformation')} className="w-full sm:w-32 md:w-40 lg:w-48 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 text-center">
            Cloud Transformation
          </button>
          <button onClick={() => handleButtonClick('Digital Transformation & Automation')} className="w-full sm:w-32 md:w-40 lg:w-48 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 text-center">
            Digital Transformation & Automation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductAndServices;
