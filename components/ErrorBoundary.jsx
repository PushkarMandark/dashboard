import { Component } from "react";

import { Button } from "@/components/ui/button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    // Example: Sentry, LogRocket, etc.
    this.setState({
      error,
      errorInfo,
    });

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.warn("🚨 Error Boundary Caught Error");
      console.error("Error:", error);
      console.error("Error Info:", errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">Something went wrong</h2>
              <p className="text-muted-foreground">
                {this.props.fallback || "We're sorry, but there was an error loading this page."}
              </p>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="text-left p-4 bg-destructive/10 rounded-lg overflow-auto max-h-[200px]">
                <p className="text-sm font-mono text-destructive whitespace-pre-wrap">
                  {this.state.error && this.state.error.toString()}
                </p>
                <pre className="text-xs text-destructive/80 mt-2">
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}

            <div className="space-x-4">
              <Button onClick={() => window.location.reload()} variant="default">
                Reload Page
              </Button>
              <Button onClick={() => (window.location.href = "/")} variant="outline">
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
