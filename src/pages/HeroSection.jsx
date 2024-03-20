/* eslint-disable react/no-unescaped-entities */

import FeatureSection from "../utils/FeatureSection";
import NavHeader from "../utils/NavHeader";
import NewsLetterSection from "../utils/NewsLetterSection";
import TextNavSection from "../utils/TextNavSection";

export default function HeroSection() {
  return (
    <div className="bg-white">
      <NavHeader />
      <TextNavSection />
      <FeatureSection />
      <NewsLetterSection />
    </div>
  );
}
