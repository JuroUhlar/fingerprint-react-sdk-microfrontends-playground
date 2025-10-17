import React, { Suspense, lazy } from 'react';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';

const MicroAppOne = lazy(() => import('appOne/Module'));
const MicroAppTwo = lazy(() => import('appTwo/Module'));

const containerStyle = {
  border: '3px dashed #16a34a',
  borderRadius: '12px',
  padding: '24px',
  fontFamily: 'sans-serif',
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
};

const HostApp = () => {
  const apiKey = process.env.FPJS_PUBLIC_API_KEY || 'your-public-api-key';
  const region = process.env.FPJS_REGION || 'us';

  return (
    <FpjsProvider
      loadOptions={{
        apiKey,
        region,
      }}
    >
      <main>
        <h1 style={{ fontFamily: 'sans-serif' }}>Host Shell</h1>
        <p style={{ fontFamily: 'sans-serif', color: '#4b5563' }}>
          Both panels below share a single instance of the Fingerprint Pro React SDK.
        </p>
        <div style={containerStyle}>
          <Suspense fallback={<div>Loading App One…</div>}>
            <MicroAppOne />
          </Suspense>
          <Suspense fallback={<div>Loading App Two…</div>}>
            <MicroAppTwo />
          </Suspense>
        </div>
      </main>
    </FpjsProvider>
  );
};

export default HostApp;
