import React, { useState } from 'react';

const Reservation = () => {
  const initialFormData = {
    destination: '',
    roomType: '',
    numberOfPeople: '',
    priceClass: '',
    checkInDate: '',
    checkOutDate: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comments: '',
    acceptTerms: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0]; // Get today's date in the 'YYYY-MM-DD' format

  const validateForm = () => {
    const errors = {};

    ['destination', 'roomType', 'numberOfPeople', 'priceClass', 'checkInDate', 'checkOutDate', 'firstName', 'lastName', 'email', 'phone', 'acceptTerms'].forEach((field) => {
      if (!formData[field]) {
        errors[field] = 'Dette felt skal udfyldes.';
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked ? name : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Add logic for form submission

      // Set the form as submitted
      setIsSubmitted(true);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setIsSubmitted(false);
  };


  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="reservation-form-container max-w-md mr-4">
        <h2 className="text-2xl font-bold">Hotel Overlook &gt; Reservation</h2>
        <h3 className="text-xl font-semibold mb-4">Reservation</h3>
        <p>Udfyld nedenstående formular for at reservere et af vores værelser.</p>

        {/* Vertical red line on the right side */}
        <div className="vl bg-gray-400 h-3/4 w-1 absolute lg:right-64 sm:right-0 right-0 lg:left-auto left-auto" />

      
      <form className="max-w-md  mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Vælg destination:</label>
          <select
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          >
            <option value="">Vælg destination</option>
            <option value="destination1">Destination 1</option>
            {/* Add more options as needed */}
          </select>
          {formErrors.destination && <p className="text-red-500 text-sm">{formErrors.destination}</p>}
        </div>

        <div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label className="block text-sm font-medium">Vælg værelse:</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Vælg værelse</option>
              <option value="single">Single Room</option>
              {/* Add more options as needed */}
            </select>
            {formErrors.roomType && <p className="text-red-500 text-sm">{formErrors.roomType}</p>}
          </div>

          <div className="w-1/2 ml-2">
            <label className="block text-sm font-medium">Vælg antal personer:</label>
            <select
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Vælg antal personer</option>
              <option value="1">1 person</option>
              <option value="2">2 personer</option>
              {/* Add more options as needed */}
            </select>
            {formErrors.numberOfPeople && <p className="text-red-500 text-sm">{formErrors.numberOfPeople}</p>}
          </div>
        </div>

        <div className="mb-4">
  <label className="block text-sm font-medium">Vælg prisklasse:</label>
  <div>
    <label className="flex items-center">
      <input
        type="radio"
        name="priceClass"
        value="Normal"
        checked={formData.priceClass === 'Normal'}
        onChange={handleInputChange}
        className="rounded-full border-gray-300 text-blue-500 focus:ring-blue-500"
      />
      <span className="ml-2">Normal</span>
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="priceClass"
        value="Flex"
        checked={formData.priceClass === 'Flex'}
        onChange={handleInputChange}
        className="rounded-full border-gray-300 text-blue-500 focus:ring-blue-500"
      />
      <span className="ml-2">Flex</span>
    </label>
  </div>
  {formErrors.priceClass && <p className="text-red-500 text-sm">{formErrors.priceClass}</p>}
</div>

<div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label className="block text-sm font-medium">Check-in date:</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleInputChange}
              min={today} // Set the minimum date to today
              className="mt-1 p-2 w-full border rounded"
            />
            {formErrors.checkInDate && <p className="text-red-500 text-sm">{formErrors.checkInDate}</p>}
          </div>

          <div className="w-1/2 ml-2">
            <label className="block text-sm font-medium">Check-out date:</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleInputChange}
              min={formData.checkInDate || today} // Set the minimum date to check-in date or today if check-in date is not selected
              className="mt-1 p-2 w-full border rounded"
            />
            {formErrors.checkOutDate && <p className="text-red-500 text-sm">{formErrors.checkOutDate}</p>}
          </div>
        </div>


        <div className="mb-4">
          <label className="block text-sm font-medium">Fornavn:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
          {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Efternavn(e):</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
          {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
        </div>

        <div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>

          <div className="w-1/2 ml-2">
            <label className="block text-sm font-medium">Telefon:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
            {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
          </div>
        </div>

        {/* ... (existing form fields) */}

        <div className="mb-4">
          <label className="block text-sm font-medium">Kommentarer:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
          {formErrors.comments && <p className="text-red-500 text-sm">{formErrors.comments}</p>}
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Jeg accepterer vilkår og betingelser
          </label>
          {formErrors.acceptTerms && <p className="text-red-500 text-sm">{formErrors.acceptTerms}</p>}
        </div>

              {/* Display confirmation message */}
      {isSubmitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your reservation has been submitted.</span>
          <button
            type="button"
            className="absolute top-0 right-0 px-4 py-3"
            onClick={() => setIsSubmitted(false)}
          >
            <span className="text-green-500">×</span>
          </button>
        </div>
      )}


        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Send reservation
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-12 py-2 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
          >
            Annuller
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Reservation;

    