import { useCallback, useEffect, useState } from 'react';
import Hero from './components/Hero';
import GoogleMapsEmbed from './components/GoogleMapsEmbed';
import LandingSections from './components/LandingSections';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ReservationPanel from './components/ReservationPanel';
import ScrollToTopButton from './components/ScrollToTopButton';
import MobileActionBar from './components/MobileActionBar';
import { initAnalytics, track } from './utils/analytics';

export type ReserveSource = 'navbar' | 'hero' | 'mobile_bar' | 'event_card' | 'events_cta' | 'dishes_cta';
export type ReserveHandler = (source: ReserveSource, occasion?: string) => void;

function App() {
  const [reservation, setReservation] = useState<{ open: boolean; occasion?: string }>({ open: false });

  useEffect(() => {
    initAnalytics();
  }, []);

  const openReservation = useCallback<ReserveHandler>((source, occasion) => {
    track('reserve_open', { source, occasion: occasion ?? 'none' });
    setReservation({ open: true, occasion });
  }, []);

  const closeReservation = useCallback(() => setReservation((current) => ({ ...current, open: false })), []);

  return (
    <>
      <main id="top" className="min-h-screen bg-[#f0f0f0]">
        <Hero onReserveTable={openReservation} />
        <LandingSections onReserve={openReservation} />
        <GoogleMapsEmbed />
        <ContactForm />
      </main>
      <Footer />
      <ReservationPanel open={reservation.open} occasion={reservation.occasion} onClose={closeReservation} />
      <MobileActionBar onReserve={() => openReservation('mobile_bar')} />
      <ScrollToTopButton />
    </>
  );
}

export default App;
