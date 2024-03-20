import BlogSection from "../utils/BlogSection";
import LogoClouds from "../utils/LogoClouds";
import NavHeader from "../utils/NavHeader";
import NewsLetterSection from "../utils/NewsLetterSection";
import Stats from "../utils/Stats";
import Testimonials from "../utils/Testimonials";

function AboutUs() {
  return (
    <>
      <NavHeader />
      <BlogSection />
      <Stats />
      <Testimonials />
      <LogoClouds />
      <NewsLetterSection />
    </>
  );
}

export default AboutUs;
