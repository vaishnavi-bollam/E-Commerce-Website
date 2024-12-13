import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:4000/register', formData);
      console.log(response)
      alert(response.data.message);
      history.push('/login');
    } catch (error) {
      alert(error.response.data.error);
    }finally {
      setLoading(false);  // Set loading to false
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      {/* <button type="submit">Sign Up</button> */}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Signup;
