import { useState } from "react";
import { useAuth } from "../context/AuthContext";


export default function Authentication() {
    const [isRegistration, setIsRegistration] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState(null);

    const { signup, login } = useAuth();

    function handleCloseModal() {
        $('#exampleModal').modal('hide');

        return;
    }

    async function handleAuthenticate() {
        if (
            !email || !email.includes("@") ||
            !password || password.length < 6 ||
            isAuthenticating
        ) {
            setError('error type');

            return;
        }


        try {
            setIsAuthenticating(true);
            setError(null);


            if (isRegistration) {
                // register a user
                await signup(email, password);
            }
            else {
                // login a user
                await login(email, password);
            }


            handleCloseModal();
        }
        catch (err) {
            console.log(err.message);

            setError(err.message);
        }
        finally {
            setIsAuthenticating(false);
        }
    }


    return (
        <>
            <h2 className="fw-bolder">
                {
                    isRegistration ?
                        'Sign Up' : 'Login'
                }
            </h2>
            <p>
                {
                    isRegistration ?
                        'Create an account!' : 'Sign in to your account!'
                }
            </p>
            {
                error &&
                <p className="fw-bolder text-danger">❌ {error}</p>
            }

            <form className="py-4" action={handleAuthenticate}>
                <div className="mb-3">
                    <label htmlFor="validationInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="validationInputEmail1" aria-describedby="emailHelp" placeholder="Email" required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="validationInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="validationInputPassword1" placeholder="******" required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {
                        isRegistration ?
                            'Authenticating...' : 'Submit'
                    }
                </button>
            </form>


            <hr />

            <p className="mt-3">
                {
                    isRegistration ?
                        'Already have an account?' : 'Don\'t have an account?'
                }
            </p>
            <button type="button" className="btn btn-outline-success"
                onClick={() => {
                    setIsRegistration(!isRegistration)
                }}
            >
                {
                    isRegistration ?
                        'Sign In' : 'Sign Up'
                }
            </button>
        </>
    )
}