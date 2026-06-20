import { useState } from 'react';
import Hero from './components/Hero';
import GoogleMapsEmbed from './components/GoogleMapsEmbed';
import LandingSections from './components/LandingSections';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ReservationPanel from './components/ReservationPanel';

function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f0f0f0]">
      <Hero />
      <Navbar onReserveTable={() => setIsReservationOpen(true)} />
      {/* <DecorativeMap /> */}
      <GoogleMapsEmbed />
      <LandingSections />
      <ContactForm />
      <Footer />

      <ReservationPanel open={isReservationOpen} onClose={() => setIsReservationOpen(false)} />
    </main>
  );
}

export default App;
