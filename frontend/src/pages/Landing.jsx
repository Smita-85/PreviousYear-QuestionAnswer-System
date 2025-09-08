import React, { useRef } from "react";

export default function LandingPage() {
  const aboutRef = useRef(null);

  // Scroll to about section
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Previous Year Question Answer System
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Search, practice, and save your favourite previous year questions
            with ease. Prepare smart, not hard.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/register"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition"
            >
              Get Started
            </a>
            <button
              onClick={scrollToAbout}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-lg shadow-lg transition"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        id="about"
        className="py-20 px-6 bg-gray-100 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Our platform helps students prepare effectively by providing access to
          previous year question papers and their answers. Easily filter
          questions by subject, mark your favourites, and track your progress.
          Whether you're preparing for semester exams or competitive tests, this
          is your one-stop solution.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo / Name */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              PrevYearQnA<span className="text-blue-400">.</span>
            </h3>
            <p className="text-gray-400">
              Making exam preparation smarter and easier with organized access
              to previous year question papers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/login" className="hover:text-blue-400">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="hover:text-blue-400">
                  Register
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-400">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-400">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-10 text-gray-500 text-sm">
          © {new Date().getFullYear()} PrevYearQnA. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
