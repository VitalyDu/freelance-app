/* eslint-disable react-refresh/only-export-components */
import { SignIn } from "@/pages/signin";
import { SignUp } from "@/pages/signup";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthGuard } from "./auth-guard";

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <AuthGuard />,
      children: [
        {
          path: "/",
          element: <Navigate to="/main" />,
        },
        {
          path: "/main",
          Component: lazy(() => import("@/pages/main")),
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);
