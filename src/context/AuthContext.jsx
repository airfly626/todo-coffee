import { useState, useEffect, useContext, createContext } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';


const AuthContext = createContext();


export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider(props) {
    const { children } = props;

    const [globalUser, setGlobalUser] = useState(null);
    const [globalData, setGlobalData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function logout() {
        setGlobalUser(null);
        setGlobalData(null);

        return signOut(auth);
    }


    const value = { globalUser, globalData, setGlobalData, isLoading, signup, login, logout };


    useEffect(() => {
        const unSubscribe =
            onAuthStateChanged(auth, async (user) => {
                setGlobalUser(user)


                // if there's no user, empty the user state and return from this listener
                if (!user) {
                    return;
                }


                // if there is a user, then check if the user has data in the database, and if they do, then fetch said data and update the global state
                try {
                    setIsLoading(true);


                    // first we create a reference for the document (labelled json object), and then we get the doc, and then we snapshot it to see if there's anything there
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);

                    let firebaseData = {};
                    if (docSnap.exists()) {
                        firebaseData = docSnap.data();
                    }

                    setGlobalData(firebaseData);
                }
                catch (err) {
                    console.log(err.message);
                }
                finally {
                    setIsLoading(false);
                }
            })


        return unSubscribe;
    }, []);



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}