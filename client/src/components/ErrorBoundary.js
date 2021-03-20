import React from "react";
import FetchError from "./FetchError";

function ErrorBoundary(props) {
  const { error, onRetry, errorMsg } = props;

  return (
    <React.Fragment>
      {error ? (
        <FetchError message={errorMsg} onRetry={onRetry} />
      ) : (
        props.children
      )}
    </React.Fragment>
  );
}

export default ErrorBoundary;
