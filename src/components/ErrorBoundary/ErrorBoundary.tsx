import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Alert } from '../Alert/Alert.js';
import { Button } from '../Button/Button.js';

export interface ErrorBoundaryFallbackProps {
  error: Error;
  /** Clears the error and re-renders the children. */
  reset: () => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  /** Custom fallback: a node, or a function receiving the error and `reset`. */
  fallback?: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
  /** Hook for error reporting (Sentry, analytics, …). */
  onError?: (error: Error, info: ErrorInfo) => void;
  /** Default fallback title. @default 'Something went wrong' */
  title?: ReactNode;
  /** Default fallback text. @default 'An unexpected error occurred.' */
  message?: ReactNode;
  /** Label of the retry button in the default fallback. @default 'Try again' */
  retryLabel?: string;
  /** Hide the retry button in the default fallback. */
  disableRetry?: boolean;
}

interface State {
  error: Error | null;
}

/** Catches render errors in its subtree and shows a fallback instead of a blank page. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  reset = () => this.setState({ error: null });

  override render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const {
      fallback,
      title = 'Something went wrong',
      message = 'An unexpected error occurred.',
      retryLabel = 'Try again',
      disableRetry,
    } = this.props;

    if (typeof fallback === 'function') return fallback({ error, reset: this.reset });
    if (fallback !== undefined) return fallback;

    return (
      <Alert variant="danger" title={title}>
        <p style={{ margin: 0 }}>{message}</p>
        {!disableRetry && (
          <div style={{ marginBlockStart: '0.5rem' }}>
            <Button variant="secondary" size="sm" onPress={this.reset}>
              {retryLabel}
            </Button>
          </div>
        )}
      </Alert>
    );
  }
}
