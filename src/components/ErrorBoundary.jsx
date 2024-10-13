import { Component } from "react";

export class ErrorBoundary extends Component {
  state = {};

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { fallback: Fallback, children } = this.props;

    return error ? (
      typeof Fallback === "function" ? (
        <Fallback error={error} />
      ) : (
        Fallback
      )
    ) : (
      children
    );
  }
}
