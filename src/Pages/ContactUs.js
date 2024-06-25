import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });
  const chiefWardenEmail = "chiefwarden@lnmiit.ac.in";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${chiefWardenEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
    window.location.href = mailtoLink;
  };

  const administrators = [
    {
      designation: "Chief Warden",
      name: 'Nabyendu Das',
      phone: '+91-9125124813',
    },
    {
      designation: "Associate Warden",
      name: 'Samar Singh',
      phone: '+91-7131912145',
    }
  ];

  return (
    <div className='pt-24'>
    <div className="max-w-4xl mx-auto p-6 bg-black rounded-lg shadow-md flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold text-white mb-4">Contact Details</h2>
        {administrators.map((admin, index) => (
          <div key={index} className="mb-4 p-4 bg-black  rounded-lg">
            <h2 className='font-bold text-spotify-green'>{admin.designation}</h2>
            <p className='text-white'><strong>Name:</strong> {admin.name}</p>
            <p className='text-white'><strong>Phone:</strong> {admin.phone}</p>
          </div>
        ))}
      </div>
      <div className="w-full md:w-1/2">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-spotify-green" htmlFor="name">Name:</label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-black rounded-md shadow-sm focus:ring-spotify-green focus:border-spotify-green text-white"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-spotify-green" htmlFor="subject">Subject:</label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-black rounded-md shadow-sm focus:ring-spotify-green focus:border-spotify-green text-white"
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-spotify-green" htmlFor="message">Message:</label>
              <textarea
                className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-black rounded-md shadow-sm focus:ring-spotify-green focus:border-spotify-green text-white"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-spotify-green hover:bg-spotify-green-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-spotify-green"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
