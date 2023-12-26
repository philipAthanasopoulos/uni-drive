import { FirebaseApp } from 'firebase/app';
import { Auth, GoogleAuthProvider, User, browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithPopup } from 'firebase/auth';
import React, { useEffect } from 'react';

interface LoginCardProps {
    auth: Auth
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const LoginCard: React.FC<LoginCardProps> = ({ auth, setUser }) => {

    setPersistence(auth, browserLocalPersistence);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const credential = await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [setUser,auth]);

    return(
        <div className = "transition duration-100 ease-out hover:-translate-y-2">
            <button onClick={signInWithGoogle} className="transition-color duration-200 ease-out bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-4 border-b-4 border-cyan-700 hover:border-cyan-500 rounded">
             Sign In with Google
            </button>
        </div>
    );
}
