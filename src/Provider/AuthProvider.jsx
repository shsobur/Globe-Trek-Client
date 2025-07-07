import { auth } from "../Firebase/firebase.config";

// Imported package__
import {
  signOut,
  updateProfile,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// From react__
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  console.log(user);

  // Sign in with google__
  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.log("Error google signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle sign up__
  const handleCreateUser = async (email, password) => {
    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      console.log("Error signing up:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handle sign in__
  const handleLoginUser = async (email, password) => {
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.log("Error signing in: error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile__
  const handleUserProfile = async (name, photo) => {
    setLoading(true);

    try {
      const result = await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      return result;
    } catch (error) {
      console.log("Error signing in: error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handle log out__
  const logOut = () => {
    return signOut(auth);
  };

  // Monitor user__
  useEffect(() => {
    setUserLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserLoading(false);

      if (currentUser) {
        const userEmail = { email: currentUser.email };

        axiosPublic.post("/jwt", userEmail).then((res) => {
          console.log(res.data);
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    userLoading,
    handleCreateUser,
    handleLoginUser,
    handleGoogleSignIn,
    handleUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}> {children} </AuthContext.Provider>
  );
};

export default AuthProvider;