/* eslint-disable react/prop-types */

//Protecting the Routes

import styled from "styled-components";
import Spinner from "./Spinner";

import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  //1. Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //2. If not authenticated, redirect to "/login"
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //3. Show loading state
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If there is a user, return the compone
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
