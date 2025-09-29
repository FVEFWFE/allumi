export default function MinimalPage() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        backgroundImage: 'url(/collage-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1>Minimal Background Test</h1>
          <p>Background should be visible at 30% (70% black overlay)</p>
          <br />
          <a href="/" style={{ color: '#00ff00' }}>← Back to Main</a>
        </div>
      </div>
    </div>
  );
}