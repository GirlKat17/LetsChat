'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './components/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log({ user });
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      console.log({ user: userCredential.user });
      setEmail('');
      setPassword('');
      setUsername('');
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const onClickGoogleSignIn = () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  };

  return (
    <div className='cover'>
    <div className="container">
      <div className> 💬 🤖 </div>
      <div className="text">Chatbox </div>
      {/* <div>connect with friends easily & quickly</div> */}
      <div className="container h1" style={{ paddingBottom: "16px" }}>
        {isLogin ? "Log in to Chatbox Welcome back! Sign in using your social account or email to continue" : "Sign up Get chatting with friends and family today by signing up for our chat app!!"}
      </div>
      <form onSubmit={isLogin ? handleLogin : handleSignUp}>
        {!isLogin && (
          <input className='login-input '
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        )}
        <input className='login-input '
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input className='login-input '
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p>{error}</p>}
        <button className='login-button ' type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button className="button" onClick={onClickGoogleSignIn}>
        {isLogin ? 'Log In' : 'Sign Up'} with Google
      </button>
      <button className="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
    </div>
    </div>
  );
};

export default AuthPage;
