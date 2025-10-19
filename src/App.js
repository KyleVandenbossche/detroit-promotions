import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Outlet } from 'react-router-dom';

import NavbarComponent from "./components/Navbar";
import Header from './components/Header';
import Footer from './components/Footer';
import MeetTheTeam from './components/MeetTheTeam';
import Portfolio from './components/Portfolio';
import OurStory from './components/OurStory';
import Services from './components/Services';
import Contact from './components/Contact';
import Home from './components/Home';
import SocialRail from './components/SocialRail';
import ScrollToTop from './components/ScrollToTop';

// ⬅️ add this import (assuming you saved the helper at ./ScrollToTop)

function Landing() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}

function Layout() {
  return (
    <>
      {/* Global baseline to make sticky-footer work everywhere */}
      <style>{`
        html, body, #root {
          height: 100%;
          min-height: 100dvh;  /* account for mobile UI chrome */
          margin: 0;
        }
      `}</style>

      {/* ⬅️ run scroll-to-top on every route change */}
      <ScrollToTop />

      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NavbarComponent />
        <SocialRail />

        {/* Main grows to push footer to the bottom if content is short */}
        <main style={{ flex: 1, display: 'block' }}>
          <Outlet />
        </main>

        {/* Footer is NORMAL flow, not fixed */}
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="home" element={<Landing />} />

        <Route path="meet-the-team" element={<MeetTheTeam />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="our-story" element={<OurStory />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />

        <Route path="*" element={<div style={{ padding: 24 }}>Page not found.</div>} />
      </Route>
    </Routes>
  );
}
