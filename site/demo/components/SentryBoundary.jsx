import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';
import { version } from '@/package.json';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://65316bddbfa64862bf282ccf5740d686@ets.zhonganinfo.com/44',
    release: version,
    environment: 'prd',
  });
}

class SentryBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      eventId: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production') {
      this.setState({ error });
      Sentry.withScope((scope) => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    } else {
      console.error('SentryBoundary', error, errorInfo);
    }
  }

  render() {
    const { children } = this.props;
    const { error, eventId } = this.state;

    return error
      ? <button onClick={() => Sentry.showReportDialog({ eventId })}>Report feedback</button>
      : children;
  }
}

export default SentryBoundary;
