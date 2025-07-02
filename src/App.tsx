import React, {ReactElement, useContext} from "react";

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignInPage, SignUpPage, FeedPage } from './pages';
import { AuthContext, AuthProvider } from './context/AuthContext';


interface PrivateRouteProps {
  children: ReactElement;
}


function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/signin" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FeedPage />} /> 
          <Route path="/signin" element={<SignInPage />} /> 
          <Route path="/signup" element={<SignUpPage />} /> 
          
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