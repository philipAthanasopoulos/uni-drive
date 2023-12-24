import { FirebaseApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React from 'react';

interface LoginCardProps {
    app: FirebaseApp;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginCard: React.FC<LoginCardProps> = ({ app, setLoggedIn }) => {

    const auth = getAuth(app);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const credential = await signInWithPopup(auth, provider);
            setLoggedIn(true);
            alert('Logged in successfully: ' + credential.user?.displayName + ', ' + credential.user?.email);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <button onClick={signInWithGoogle} className="transition-color duration-200 ease-out bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-4 border-b-4 border-cyan-700 hover:border-cyan-500 rounded">
             Sign In with Google
            </button>
        </div>
    );
}
