'use client'
import React, { useState } from 'react';

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email.');
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append('EMAIL', email);
    formData.append('FNAME', firstName);
    formData.append('b_b3f451687c14b6c481a4bb808_1b52efc44a', '');
    
    try {
      const response = await fetch('https://gmail.us17.list-manage.com/subscribe/post?u=b3f451687c14b6c481a4bb808&amp;id=1b52efc44a&amp;f_id=00edf1e2f0', {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      setMessage('Subscription successful!');
      setEmail('');
      setFirstName('');
      setIsError(false);
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage('Error subscribing.');
      setIsError(true);
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-4">
      <h2 className='text-slate-300'>Enrol to enjoy full access.</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center w-full gap-4">
        <input
          type="email"
          name="EMAIL"
          id="mce-EMAIL"
          className="rounded-full font-medium h-12 !bg-blue-800/30  border-blue-700 p-4  duration-300 flex-grow text-sm text-blue-300"
          placeholder="youremail@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          name="FNAME"
          id="mce-FNAME"
          className="rounded-full font-medium h-12 !bg-blue-800/30  border-blue-700 p-4  duration-300 flex-grow text-sm text-blue-300"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <button
          type="submit"
          className="justify-center h-12 flex items-center gap-4 bg-blue-800/100 text-blue-200 h-10 py-1 md:py-2 px-8 md:px-12 md:text-xl rounded-full hover:scale-105 duration-300 font-medium"
        >
          Subscribe
        </button>
      </form>
      {message && (
        <p className={`mt-2 text-lg font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default EmailForm;
