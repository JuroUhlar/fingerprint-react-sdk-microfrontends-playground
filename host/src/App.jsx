import React, { Suspense, lazy } from 'react';

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

const HostApp = () => (
  <main>
    <h1 style={{ fontFamily: 'sans-serif' }}>Host Shell</h1>
    <p style={{ fontFamily: 'sans-serif', color: '#4b5563' }}>
      Each panel below mounts a dedicated instance of the Fingerprint Pro React SDK.
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
);

export default HostApp;
