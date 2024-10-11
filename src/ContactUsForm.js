import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


const ContactUsForm = () => {
  const location = useLocation(); 
  const buttonValue = location.state?.key || ''; 
  console.log('Button value received:', buttonValue); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    companyName: '',
    notes: '',
    instrest: buttonValue,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    companyName: '',
    notes: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value, country, e, formattedValue) => {
    setFormData((prevData) => ({
      ...prevData,
      contact: formattedValue
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    return phone.replace(/\D/g,'').length >= 10;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      firstName: '',
      lastName: '',
      contact: '',
      email: '',
      companyName: '',
      notes: '',
    };

    if (!formData.firstName) newErrors.firstName = 'First name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.contact) {
      newErrors.contact = 'Phone number is required.';
    } else if (!validatePhone(formData.contact)) {
      newErrors.contact = 'Phone number must be exactly 10 digits.';
    }
    if (!formData.companyName) newErrors.companyName = 'Company name is required.';

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
    } else {
      // Prepare data to send
      const dataToSend = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        contact: formData.contact,
        email: formData.email,
        company_name: formData.companyName,
        notes: formData.notes,
        instrest: formData.instrest,
        received_from: 'Neetu Mishra',
      };

      console.log('Data being sent:', dataToSend);

      // Submit form using axios
      axios.post('http://192.168.102.92:8000/persons/', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('Form submitted successfully:', response.data);
          navigate('/thank-you');
        })
        .catch((error) => {
          console.error('Error submitting the form:', error.response ? error.response.data : error.message);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name 
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            country={'us'}
            value={formData.contact}
            onChange={handlePhoneChange}
            inputClass="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            containerClass="w-full"
            dropdownClass="bg-white"
            buttonClass="bg-white border border-gray-300"
          />
          {errors.contact && <p className="text-red-500 text-xs italic">{errors.contact}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.companyName && <p className="text-red-500 text-xs italic">{errors.companyName}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
            Remark 
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <input
          type="hidden"
          name="key"
          value={formData.key}
        />

         {/* Submit Button */}
         <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
