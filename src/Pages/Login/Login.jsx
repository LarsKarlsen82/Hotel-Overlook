//Login.jsx
import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "../../Providers/SupabaseProvider";
import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper";
import { useAuth } from '../../Providers/AuthContext';

const LoginPage = () => {
  const { supabase } = useSupabase();
  const [session, setSession] = useState(null);
  const { login, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      // Redirect or perform any additional actions after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  useEffect(() => {
    supabase?.auth?.getSession().then(({ data: { session } }) => {
      if (session) {
        login(session.user);
      } else {
        logout();
      }
    });
    if (supabase && supabase.auth) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
      return () => subscription.unsubscribe();
    }
  }, [supabase]);

  if (!session) {
    return (
      <ContentWrapper title="Hotel Overlook > Login" description="Login to the site">
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">Login</h3>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]} // Remove providers if not needed
            />
          </div>
                  {/* Vertical red line on the right side */}
        <div className="vl bg-gray-400 h-3/4 w-1 absolute lg:right-64 sm:right-0 right-0 lg:left-auto left-auto" />
        </div>
      </ContentWrapper>
    );
  } else {
    return (
      <ContentWrapper title="Logged in">
        <p>Du er logget ind som {session.user.email}</p>
        <button onClick={handleLogout} className="text-indigo-500 hover:text-indigo-600">
          Log af
        </button>
      </ContentWrapper>
      
    );
    
  }
};

export default LoginPage;
