import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../firebase/firebase.config";
export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const auth = getAuth(app);

  const registerWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };
  const loginWithEmailPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const handlePasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const authInfo = {
    registerWithEmailPassword,
    updateUserProfile,
    loginWithEmailPass,
    googleSignIn,
    handlePasswordReset,
    logOut,
    loading,
    setLoading,
    user,

  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
