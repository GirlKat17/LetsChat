"use client"
import { useState, useEffect } from "react";
import AuthPage from "./Auth";
import ChatPage from "./components/indvChat";
import Loading from "./components/loading";
import { auth } from "./components/firebaseConfig";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <Loading />;
  } else if (user === null) {
    return <AuthPage />;
  } else {
    return <ChatPage user={user} />;
  }
}
