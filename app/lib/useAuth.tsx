import { useApolloClient } from '@apollo/client';
import { useCurrentUserQuery } from 'lib/graphql/currentUser.graphql';
import { useSignInMutation } from 'lib/graphql/signin.graphql';
import { useSignUpMutation } from 'lib/graphql/signup.graphql';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type AuthProps = {
  user: any;
  error: string;
  message: string;
  signIn: (email: any, password: any) => Promise<void>;
  signUp: (username: any, email: any, password: any) => Promise<void>;
  signOut: () => void;
};
const AuthContext = createContext<Partial<AuthProps>>({});

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const client = useApolloClient();
  const router = useRouter();

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { data } = useCurrentUserQuery({
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  });
  const user = data && data.currentUser;

  const [signInMutation] = useSignInMutation();
  const [signUpMutation] = useSignUpMutation();

  const signIn = async (email, password) => {
    try {
      const { data } = await signInMutation({ variables: { email, password } });
      if (data.login.token && data.login.user) {
        sessionStorage.setItem('token', data.login.token);
        client.resetStore().then(() => {
          setMessage('Success login!');
          router.push('/');
        });
      } else {
        setError('Invalid Login');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const signUp = async (username, email, password) => {
    try {
      const { data } = await signUpMutation({ variables: { username, email, password } });
      if (data.register.token && data.register.user) {
        sessionStorage.setItem('token', data.register.token);
        client.resetStore().then(() => {
          setMessage('Success login!');
          router.push('/');
        });
      } else {
        setError('Invalid Login');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem('token');
    client.resetStore().then(() => {
      setMessage('You have successfully logged out of your account.');
      router.push('/');
    });
  };

  return {
    user,
    error,
    message,
    signIn,
    signUp,
    signOut,
  };
}
