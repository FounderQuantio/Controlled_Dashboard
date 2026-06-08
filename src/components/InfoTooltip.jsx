import { useState } from 'react';

export default function InfoTooltip({ text }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      style={{ position: 'absolute', top: 10, right: 10 }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 16, height: 16, borderRadius: '50%',
        background: 'transparent', border: '1.5px solid rgba(255,255,255,0.5)',
        color: '#fff', fontSize: 10, fontWeight: 700,
        cursor: 'default', lineHeight: 1, userSelect: 'none',
      }}>i</span>

      {visible && (
        <span style={{
          position: 'absolute', bottom: '130%', right: 0,
          width: 300, background: '#1c1917',
          border: '1px solid #78350f', borderRadius: 8,
          padding: '10px 12px', fontSize: 11, color: '#fcd34d',
          lineHeight: 1.6, zIndex: 100, boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
          pointerEvents: 'none',
        }}>
          {text}
          <span style={{
            position: 'absolute', top: '100%', right: 4,
            borderWidth: 5, borderStyle: 'solid',
            borderColor: '#78350f transparent transparent transparent',
          }} />
        </span>
      )}
    </span>
  );
}
