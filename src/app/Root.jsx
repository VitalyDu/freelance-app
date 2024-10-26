import { App } from "@/app/App";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { SDKProvider, useLaunchParams } from "@telegram-apps/sdk-react";
import { CookiesProvider } from "react-cookie";

const ErrorBoundaryError = ({ error }) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const Inner = () => {
  const debug = useLaunchParams().startParam === "debug";

  return (
    <SDKProvider acceptCustomStyles debug={debug}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <App />
      </CookiesProvider>
    </SDKProvider>
  );
};

export const Root = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
