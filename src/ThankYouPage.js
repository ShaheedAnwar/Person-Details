import React from 'react';

const ThankYouPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-green-500 text-center">Thank You!</h1>
      <p className="mt-4 text-base md:text-lg text-center">
        Your submission has been received successfully.
      </p>
      <p className="mt-1 text-base md:text-lg text-center">
        We will get back to you soon!
      </p>
    </div>
  );
};

export default ThankYouPage;
