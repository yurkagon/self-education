import React, { Component, Suspense } from "react";

import Page500 from "../../pages/Page500";

class ErrorBoundary extends Component<{}, { hasError: boolean }> {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  renderError() {
    return (
      <Suspense fallback={null}>
        <Page500 />
      </Suspense>
    );
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    return hasError ? this.renderError() : children;
  }
}

export default ErrorBoundary;
