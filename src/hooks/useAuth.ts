import { useContext } from 'react';

import { User, AuthError, Auth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseContext } from '..';

interface IUseAuthReturnValue {
  user?: User | null;
  loading: boolean;
  error?: AuthError;
  auth: Auth;
}

const useAuth = (): IUseAuthReturnValue => {
  const { auth } = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(auth);

  return { user, loading, error, auth };
};

export default useAuth;
