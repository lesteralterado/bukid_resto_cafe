import { useCallback, useEffect, useState } from 'react';
import { cn } from './utils/cn';
import Hero from './components/Hero';
import GoogleMapsEmbed from './components/GoogleMapsEmbed';
import LandingSections from './components/LandingSections';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
// import Navbar from './components/Navbar';
import ReservationPanel from './components/ReservationPanel';
import Preloader from './components/Preloader';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [contentReady, setContentReady] = useState(() =>
    localStorage.getItem('site_preloader_seen') === 'true'
  );

  useEffect(() => {
    if (contentReady) return;

    const timer = setTimeout(() => {
      setContentReady(true);
      localStorage.setItem('site_preloader_seen', 'true');
    }, 2000);

    return () => clearTimeout(timer);
  }, [contentReady]);

  const handlePreloaderComplete = useCallback(() => {
    setContentReady(true);
    localStorage.setItem('site_preloader_seen', 'true');
  }, []);

  return (
    <>
      {!contentReady && <Preloader onComplete={handlePreloaderComplete} />}
      <main
        className={cn(
          'min-h-screen bg-[#f0f0f0]',
          !contentReady && 'opacity-0 transition-opacity duration-500'
        )}
      >
        <Hero loading={!contentReady} onReserveTable={() => setIsReservationOpen(true)} />
        {/* <Navbar /> */}
        <GoogleMapsEmbed loading={!contentReady} />
        <LandingSections loading={!contentReady} />
        <ContactForm loading={!contentReady} />
        <Footer loading={!contentReady} />
        <ReservationPanel
          open={isReservationOpen}
          onClose={() => setIsReservationOpen(false)}
        />
      </main>
      <ScrollToTopButton />
    </>
  );
}

export default App;
