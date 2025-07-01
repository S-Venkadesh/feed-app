import React, {ReactElement} from "react";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignInPage, SignUpPage, FeedPage } from './pages';
import { AuthProvider, useAuth } from './context/AuthContext';


interface PrivateRouteProps {
  children: ReactElement;
}


function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FeedPage />} /> {/* Feed page */}
          <Route path="/signin" element={<SignInPage />} /> {/* Sign In */}
          <Route path="/signup" element={<SignUpPage />} /> {/* Sign Up */}
          
          {/* Example protected route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <FeedPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;