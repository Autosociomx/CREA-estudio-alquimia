import Navbar       from './components/casino/Navbar';
import Hero         from './components/casino/Hero';
import Features     from './components/casino/Features';
import Marquee      from './components/casino/Marquee';
import About        from './components/casino/About';
import Spaces       from './components/casino/Spaces';
import Events       from './components/casino/Events';
import Gallery      from './components/casino/Gallery';
import QuoteAI      from './components/casino/QuoteAI';
import Contact      from './components/casino/Contact';
import Footer       from './components/casino/Footer';
import WhatsAppBtn  from './components/casino/WhatsAppBtn';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Marquee />
        <About />
        <Spaces />
        <Events />
        <Gallery />
        <QuoteAI />
        <Contact />
      </main>
      <Footer />
      <WhatsAppBtn />
    </>
  );
}
