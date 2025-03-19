import Header from './components/Header';
import Hero from './components/Hero';
import ModelsSection from './components/ModelsSection';
import WhyUsSection from './components/WhyUsSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ModelsSection />
      <WhyUsSection />
      <Footer />
    </main>
  );
}
