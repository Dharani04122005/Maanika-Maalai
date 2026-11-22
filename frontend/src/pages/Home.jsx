import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Collections from "../components/Collections";
import WhyChoose from "../components/WhyChoose";
import CustomerReviews from "../components/CustomerReviews";
import ContactBanner from "../components/ContactBanner";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Collections />
      <WhyChoose />
      <CustomerReviews />
      <ContactBanner />
      <Footer />
    </>
  );
}

export default Home;