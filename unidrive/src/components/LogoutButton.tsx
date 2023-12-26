import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React from 'react';

interface LogoutButtonProps {
    app: FirebaseApp;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({app}) => {

    const auth = getAuth(app);

    const logout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('user');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div className = "transition duration-100 ease-out hover:-translate-y-2">
            <button onClick={logout} className="transition-color duration-200 ease-out bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-2 px-4 border-b-4 border-cyan-700 hover:border-cyan-500 rounded">
             Logout
            </button>
        </div>
    );
}