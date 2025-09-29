export default function TestPage() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url(/collage-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'red' // Red fallback to see if div renders
    }}>
      <h1 style={{ color: 'white', padding: '20px' }}>
        TEST: Background should be visible. If you see red, image failed. If black, div didn't render.
      </h1>
    </div>
  )
}