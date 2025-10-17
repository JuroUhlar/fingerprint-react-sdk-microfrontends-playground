import React from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

const borderStyle = {
  border: '3px solid #f97316',
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
      // Errors are surfaced via the hook state, so no-op here.
    }
  };

  return (
    <div style={borderStyle}>
      <h2 style={{ marginTop: 0 }}>useVisitorData() One</h2>
      {isLoading && <p>Identifying visitor…</p>}
      {error && <p style={{ color: '#b91c1c' }}>Error: {error.message}</p>}
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

const MicroAppOne = () => {
  return <VisitorPanel />;
};

export default MicroAppOne;
