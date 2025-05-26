'use client';

import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  showLogs: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      showLogs: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, showLogs: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, showLogs: false });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  toggleLogs = () => {
    this.setState((prevState) => ({ showLogs: !prevState.showLogs }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">Something went wrong.</h2>
          <p className="text-gray-600">
            We were unable to load the content. This might be a temporary issue.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={this.handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Retry
            </button>

            <a
              href="/"
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
            >
              Go Home
            </a>

            <button
              onClick={this.toggleLogs}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              {this.state.showLogs ? 'Hide Logs' : 'See Logs'}
            </button>
          </div>

          {this.state.showLogs && this.state.error && (
            <div className="mt-4 w-full max-w-2xl text-left bg-gray-100 text-sm text-red-800 p-4 rounded overflow-auto">
              <p><strong>Error Message:</strong> {this.state.error.message}</p>
              {this.state.error.stack && (
                <pre className="mt-2 whitespace-pre-wrap">
                  <strong>Stack Trace:</strong>{'\n'}{this.state.error.stack}
                </pre>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
