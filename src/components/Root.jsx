import { App } from "@/components/App";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SDKProvider, useLaunchParams } from "@telegram-apps/sdk-react";

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
      <App />
    </SDKProvider>
  );
};

export const Root = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner />
  </ErrorBoundary>
);
