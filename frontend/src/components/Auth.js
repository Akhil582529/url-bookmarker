import React from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Auth = () => {
  const { token, setToken } = useContext(AuthContext);
  return (
    <div>
      Token: {token}
      <button onClick={() => setToken('')}>Clear Token</button>
    </div>
  );
};

export default Auth;