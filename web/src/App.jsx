import { useRef } from 'react';
import RallyScene from './components/RallyScene.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Lessons from './components/Lessons.jsx';
import Programs from './components/Programs.jsx';
import Rental from './components/Rental.jsx';
import Gallery from './components/Gallery.jsx';
import Composer from './components/Composer.jsx';
import Footer from './components/Footer.jsx';
import { GENERAL_MESSAGE, waLink } from './content.js';
import { WhatsAppIcon } from './components/Icons.jsx';
import { useGSAP, ScrollTrigger } from './lib/gsap.js';

export default function App() {
  const fab = useRef(null);

  // Yüzen WhatsApp düğmesi ilk ekrandan sonra görünür; ilk ekranda tek eylem var.
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#top',
      start: 'bottom 60%',
      end: 'max',
      toggleClass: { targets: fab.current, className: 'is-shown' },
    });
  });

  return (
    <>
      <a className="skip" href="#dersler">İçeriğe geç</a>
      <RallyScene />
      <Header />
      <main className="page">
        <Hero />
        <Lessons />
        <Programs />
        <Rental />
        <Gallery />
        <Composer />
      </main>
      <Footer />
      <a
        ref={fab}
        className="fab"
        href={waLink(GENERAL_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp'tan yazın"
      >
        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}
