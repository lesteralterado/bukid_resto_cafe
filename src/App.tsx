import Hero from './components/Hero';
import DecorativeMap from './components/DecorativeMap';
import GoogleMapsEmbed from './components/GoogleMapsEmbed';
import LandingSections from './components/LandingSections';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <main className="min-h-screen bg-[#f0f0f0]">
      <Hero />
      {/* <DecorativeMap /> */}
      <GoogleMapsEmbed />
      <LandingSections />
      <ContactForm />
      <Footer />
    </main>
  );
}

export default App;

