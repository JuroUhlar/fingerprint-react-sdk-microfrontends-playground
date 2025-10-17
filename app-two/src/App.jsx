import React from 'react';
import { FpjsProvider, useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

const borderStyle = {
  border: '3px solid #3b82f6',
  borderRadius: '12px',
  padding: '16px',
  maxWidth: '360px',
  fontFamily: 'sans-serif',
};

const VisitorPanel = () => {
  const { data, error, isLoading, getData } = useVisitorData(
    { ignoreCache: true },
    { immediate: true }
  );

  const handleIdentify = async () => {
    try {
      await getData({ ignoreCache: true });
    } catch (err) {
      // State is reported via the hook; nothing to do here.
    }
  };

  return (
    <div style={borderStyle}>
      <h2 style={{ marginTop: 0 }}>React SDK Two</h2>
      {isLoading && <p>Identifying visitor…</p>}
      {error && <p style={{ color: '#1d4ed8' }}>Error: {error.message}</p>}
      {data && (
        <p>
          <strong>Visitor ID:</strong> {data.visitorId}
        </p>
      )}
      <button onClick={handleIdentify} style={{ marginTop: '8px' }}>
        Identify again
      </button>
    </div>
  );
};

const MicroAppTwo = () => {
  const apiKey = process.env.FPJS_PUBLIC_API_KEY || 'your-public-api-key';
  const region = process.env.FPJS_REGION || 'us';

  return (
    <FpjsProvider
      loadOptions={{
        apiKey,
        region,
      }}
    >
      <VisitorPanel />
    </FpjsProvider>
  );
};

export default MicroAppTwo;
