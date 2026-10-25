import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { createPortal } from "react-dom";
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  Users,
  GraduationCap,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Play,
  ChevronLeft,
  Image as ImageIcon,
  Microscope,
  Palette,
  Quote,
  CalendarDays,
} from "lucide-react";

// Custom Social Icons (matching Lucide's stroke style)
const FacebookIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const useInView = (options = { threshold: 0.1 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(ref.current);
    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [options]);

  return [ref, isVisible];
};

// --- Components ---

// 1. Navigation Bar
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navBackground = "bg-green-800 shadow-md";

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "admissions", label: "Admissions" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact Us" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${navBackground} text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between h-20">
          {/* Logo & School Name */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage("home")}
          >
            <div className="flex-shrink-0 flex items-center bg-white p-1 rounded-full h-16 w-16 justify-center shadow-md">
              {!imageError ? (
                <img
                  src="/Logo.jpg"
                  alt="GWGS Logo"
                  className="h-14 w-14 rounded-full object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="h-14 w-14 rounded-full border-2 border-green-800 flex items-center justify-center bg-white">
                  <span className="text-green-800 font-bold text-xs tracking-tighter">
                    GWGS
                  </span>
                </div>
              )}
            </div>
            <div className="ml-3 lg:ml-4 flex items-center">
              <span className="font-bold text-[0.85rem] sm:text-[1.1rem] lg:text-[1.15rem] xl:text-[1.375rem] leading-[1.1em] tracking-wide text-white xl:whitespace-nowrap max-w-[10rem] lg:max-w-[16rem] xl:max-w-none">
                GREEN WOOD GRAMMAR SCHOOL
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`cursor-pointer whitespace-nowrap group relative py-2 px-2 text-[0.9rem] xl:text-[1.05rem] leading-[1.5em] font-medium transition-colors ${
                  currentPage === item.id
                    ? "text-white"
                    : "text-green-50 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-green-400 transition-all duration-300 ${currentPage === item.id ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-100 hover:text-white hover:bg-green-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-green-800 shadow-xl absolute w-full z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 rounded-md text-[1.1rem] leading-[1.5em] font-medium ${
                  currentPage === item.id
                    ? "bg-green-800 text-white"
                    : "text-green-100 hover:bg-green-700 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// 2. Home Page Component
const Home = ({ setCurrentPage }) => {
  const images = [
    "/Principle.jpg",
    "/Principle 2.jpg",
    "/Principle 3.jpg",
    "/Principle 4.jpg",
    "/Principle 5.jpg",
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const [statsRef, statsVisible] = useInView({ threshold: 0.2 });
  const [campusRef, campusVisible] = useInView({ threshold: 0.2 });
  const [principalRef, principalVisible] = useInView({ threshold: 0.2 });
  const [ctaRef, ctaVisible] = useInView({ threshold: 0.2 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIdx((prevIdx) => (prevIdx + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div
        id="hero-section"
        className="relative bg-stone-900 min-h-[100dvh] pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col"
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`School Principal with students ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center sm:object-top transition-opacity duration-1000 ${idx === currentIdx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          />
        ))}

        {/* Responsive Contrast Overlay: Bottom-up on mobile, Left-to-right on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/95 sm:from-black/90 via-black/80 sm:via-black/60 to-transparent z-10 pointer-events-none"></div>

        <div className="relative flex-grow flex flex-col justify-end sm:justify-center z-30 pointer-events-none pt-12 sm:pt-0 pb-8 sm:pb-0">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pointer-events-auto">
            <div className="w-full max-w-3xl text-left">
              <span className="inline-block py-1.5 px-4 rounded-full bg-green-600/90 text-white text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in-up shadow-md">
                Gather to Learn
              </span>
              <h1
                className="font-extrabold text-white mb-6 leading-[1.2] drop-shadow-xl animate-fade-in-up delay-200"
                style={{ fontSize: "clamp(2rem, 3.5vw + 1rem, 3.5rem)" }}
              >
                Rooted in Excellence,
                <br className="hidden md:block" /> Growing for Tomorrow.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-stone-200 mb-10 drop-shadow-md animate-fade-in-up delay-400 font-normal leading-relaxed">
                We empower the next generation of thinkers and leaders by
                combining rigorous academics with deep moral foundations in a
                supportive, future-focused environment.
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-600">
                <button
                  onClick={() => setCurrentPage("admissions")}
                  className="cursor-pointer bg-[#824B1E] hover:bg-[#683c18] hover:scale-105 text-white px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 shadow-lg flex items-center justify-center"
                >
                  Apply Now{" "}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage("about")}
                  className="cursor-pointer bg-transparent border-2 border-white hover:bg-white/10 hover:scale-105 text-white px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 flex items-center justify-center"
                >
                  Discover GWGS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: QUICK STATS */}
      <div className="bg-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Green Wood at a Glance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Building a foundation for lifelong success through dedicated
              resources and a supportive environment.
            </p>
          </div>
          <div
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10"
          >
            {[
              {
                icon: <Users size={28} />,
                title: "15:1 Student-Teacher Ratio",
                desc: "Ensuring personalized attention, tailored feedback, and a deeper understanding of every child's unique learning style.",
              },
              {
                icon: <Microscope size={28} />,
                title: "Modern Interactive Campus",
                desc: "Equipped with state-of-the-art science laboratories, IT centers, and collaborative spaces designed for modern education.",
              },
              {
                icon: <Palette size={28} />,
                title: "Holistic Development",
                desc: "Offering a robust selection of extracurricular activities, sports, and arts programs to nurture diverse talents.",
              },
              {
                icon: <MapPin size={28} />,
                title: "Rooted in Community",
                desc: "Proudly serving the families of Karachi by providing an accessible, high-standard educational institution.",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 sm:p-8 md:p-10 lg:p-6 rounded-xl shadow-sm border border-stone-200 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${statsVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-green-800">
                  {stat.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {stat.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: PRINCIPAL'S WELCOME */}
      <div className="py-20 bg-white overflow-hidden" ref={principalRef}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div
              className={`w-full lg:w-5/12 ${principalVisible ? "animate-slide-in-left" : "opacity-0"}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-green-800 rounded-2xl transform -translate-x-4 translate-y-4"></div>
                <img
                  src="/principal.jpg"
                  alt="Principal"
                  className="relative rounded-2xl shadow-xl w-full h-[300px] lg:h-[500px] object-cover object-top"
                />
              </div>
            </div>
            <div
              className={`w-full lg:w-7/12 ${principalVisible ? "animate-slide-in-right" : "opacity-0"}`}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 mb-2">
                A Message from the Principal
              </h2>
              <h3 className="text-lg sm:text-xl text-amber-600 font-semibold mb-6">
                Welcome to a Community of Excellence
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-base sm:text-lg">
                "Welcome to Green Wood Grammar School. In today’s fast-paced
                world, education must go far beyond the memorization of
                textbooks. Our mission is to provide an educational experience
                that engages the intellect while nurturing the heart."
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed text-base sm:text-lg">
                "We are deeply dedicated to cultivating a secure, stimulating,
                and stress-free environment. Here, every student is empowered to
                discover their unique potential, build unwavering character, and
                develop the critical thinking skills necessary to become a
                responsible leader of tomorrow. We invite you to explore our
                campus, meet our dedicated faculty, and experience the Green
                Wood difference for yourself."
              </p>
              <button
                onClick={() => setCurrentPage("about")}
                className="cursor-pointer border-2 border-green-800 text-green-800 hover:bg-green-50 px-8 py-3 rounded-lg font-bold transition-colors shadow-sm"
              >
                Read the Full Vision
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: TESTIMONIALS */}
      <div className="py-20 bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Voices of Our Community
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear what our parents have to say about the Green Wood experience.
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto h-[400px] sm:h-[300px] md:h-[250px] lg:h-[250px]">
            {[
              {
                text: "The focus on 'Optimized Stress' is truly revolutionary. My child comes home excited to learn, rather than feeling overwhelmed by academic pressure. Green Wood has found the perfect balance between high academic standards and mental well-being.",
                author: "Mrs. A. Khan",
                role: "Parent of Grade 6 Student",
              },
              {
                text: "We chose GWGS for its strong emphasis on character building. In a highly competitive world, it is wonderful to be part of a school community that values empathy, morality, and integrity just as highly as academic grades.",
                author: "Mr. S. Ahmed",
                role: "Parent of Grade 8 Student",
              },
              {
                text: "The teaching methodologies here are exceptional. The teachers don't just lecture; they engage. My daughter has developed such a strong foundation in her core subjects, and her confidence has grown immensely since joining.",
                author: "Dr. F. Ali",
                role: "Parent of Grade 4 Student",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 bg-white p-8 md:p-12 rounded-2xl shadow-md border border-stone-100 flex flex-col justify-center transition-opacity duration-1000 ease-in-out ${idx === currentTestimonialIdx ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"}`}
              >
                <Quote
                  className="text-green-800 opacity-10 absolute top-6 right-6 md:top-8 md:right-8"
                  size={80}
                />
                <p className="text-gray-600 italic mb-6 relative z-10 leading-relaxed text-lg md:text-xl">
                  "{testimonial.text}"
                </p>
                <div className="mt-auto">
                  <p className="font-bold text-green-900 text-lg">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-12 space-x-3 relative z-20">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonialIdx(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${idx === currentTestimonialIdx ? "bg-green-800 w-10" : "bg-green-300 hover:bg-green-500 w-3"}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4: CAMPUS LIFE & UPCOMING EVENTS */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Campus Life
            </h2>
            <p className="text-lg text-gray-600">
              Discover what is happening at Green Wood Grammar School.
            </p>
          </div>
          <div ref={campusRef} className="cursor-pointer flex flex-col gap-6">
            {[
              {
                title: "Admissions Open for Fall 2026",
                date: "Ongoing",
                desc: "We are currently accepting applications for the upcoming academic year. Secure your child's future at GWGS today.",
                btnLabel: "Apply Now",
                btnAction: () => setCurrentPage("admissions"),
              },
              {
                title: "Annual Science & Innovation Fair",
                date: "May 15, 2026",
                desc: "Join us as our students showcase their hands-on projects, demonstrating their skills in STEM and creative problem-solving.",
                btnLabel: "Learn More",
                btnAction: () => {},
              },
              {
                title: "Parent-Teacher Wellness Workshop",
                date: "May 28, 2026",
                desc: "A collaborative session focused on fostering positive attitudes and managing academic expectations healthily at home.",
                btnLabel: "Register Here",
                btnAction: () => {},
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col md:flex-row bg-stone-50 border border-stone-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${campusVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="bg-green-800 text-white p-6 md:w-64 flex flex-col justify-center shrink-0 items-center md:items-start text-center md:text-left">
                  <CalendarDays size={32} className="mb-2 text-amber-400" />
                  <span className="font-bold text-xl">{item.date}</span>
                </div>
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <div>
                    <button
                      onClick={item.btnAction}
                      className="cursor-pointer text-amber-600 font-bold hover:text-amber-700 flex items-center"
                    >
                      {item.btnLabel} <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 5: FINAL CALL-TO-ACTION */}
      <div ref={ctaRef} className="bg-green-800 py-24 overflow-hidden">
        <div
          className={`max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-white transition-all duration-1000 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight">
            Ready to Join the Green Wood Family?
          </h2>
          <p className="text-base sm:text-xl text-green-50 mb-10 leading-relaxed font-light">
            Take the first step towards a balanced, high-quality education for
            your child. Connect with our admissions team to learn more about our
            curriculum, culture, and enrollment process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage("admissions")}
              className="cursor-pointer bg-[#824B1E] hover:bg-[#683c18] hover:scale-105 text-white w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 shadow-lg"
            >
              Start the Admission Process
            </button>
            <button
              onClick={() => setCurrentPage("contact")}
              className="cursor-pointer bg-transparent border-2 border-white hover:bg-white/10 hover:scale-105 text-white w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300"
            >
              Schedule a Campus Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. About Us Component
const About = () => (
  <div className="py-16 bg-white animate-fadeIn">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-4">
          About Green Wood Grammar School
        </h2>
        <div className="h-1 w-24 bg-amber-600 mx-auto rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-green-100 text-green-800 p-2 rounded-lg mr-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Our Mission & Vision
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed border-l-4 border-green-800 pl-4 italic">
            "GWGS's aim is to set the right goals in the areas of education,
            morality, and attitude by optimizing student stress and fostering a
            supportive environment where every child can thrive."
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Founded on the principle that true education goes beyond textbooks,
            Green Wood Grammar School is dedicated to holistic child
            development. We believe in nurturing not just the intellect, but the
            character of our students.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our motto, <strong>"Gather to Learn,"</strong> reflects our
            community-centric approach. We bring together passionate educators,
            engaged parents, and curious students to create a vibrant ecosystem
            of knowledge and moral growth.
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-green-800 rounded-2xl transform translate-x-4 translate-y-4"></div>
          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="School Building"
            className="relative rounded-2xl shadow-xl w-full h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  </div>
);

// 4. Admissions Component
const Admissions = () => (
  <div className="py-16 bg-stone-50 animate-fadeIn">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-4">
          Join Our Community
        </h2>
        <div className="h-1 w-24 bg-amber-600 mx-auto rounded"></div>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          We welcome families who share our vision of holistic education. Here
          is how you can become a part of Green Wood Grammar School.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
        <div className="p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Admissions Process
          </h3>
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Schedule a Visit",
                desc: "Contact our admissions office to arrange a campus tour. See our facilities and meet our educators firsthand.",
              },
              {
                step: "02",
                title: "Submit Application",
                desc: "Complete the online application form and submit the required documents including previous academic records.",
              },
              {
                step: "03",
                title: "Assessment & Interaction",
                desc: "Prospective students will participate in a brief, stress-free assessment and an interaction session with our staff.",
              },
              {
                step: "04",
                title: "Enrollment",
                desc: "Upon acceptance, complete the fee submission and secure your child's seat for the upcoming academic term.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center p-4 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100"
              >
                <div className="text-4xl font-black text-green-200 mb-4 sm:mb-0 sm:mr-6">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-green-50 rounded-xl border border-green-100">
            <h4 className="font-bold text-green-900 mb-2">Need Assistance?</h4>
            <p className="text-green-800 mb-4">
              Our admissions team is here to help you through every step.
            </p>
            <button className="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Download Fee Structure
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 5. Gallery Component
const Gallery = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // PRODUCTION FIX: Lock background scrolling when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup function in case component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  const mediaItems = [
    {
      type: "photo",
      url: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Classroom Activities",
    },
    {
      type: "photo",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZapizoOrMSoevJk-wCZX5I2criP6BTGm__Nb-MpOz6Q&s=10",
      title: "Sports Day",
    },
    {
      type: "video",
      url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Green Wood Grammar School Convocation",
      videoUrl:
        "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F809426298387428%2F&show_text=false&width=560&t=0",
    },
    {
      type: "photo",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-qT-mvI6Ca68BoTVJ9GkdMPr8Pgo2UrgkL-dBfZmNaA&s=10",
      title: "Prefect Oath Taking",
    },
    {
      type: "photo",
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Science Exhibition",
    },
    {
      type: "video",
      url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Library Opening Ceremony",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      type: "photo",
      url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Art & Creativity",
    },
  ];

  const filteredMedia = mediaItems.filter(
    (item) => activeTab === "all" || item.type === activeTab,
  );

  const openLightbox = (idx) => {
    setSelectedIndex(idx);
    setLightboxOpen(true);
  };

  const nextMedia = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % filteredMedia.length);
  };
  const prevMedia = (e) => {
    e.stopPropagation();
    setSelectedIndex(
      (prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length,
    );
  };

  const getGridSpan = (idx) => {
    if (idx === 0) return "md:col-span-2 md:row-span-2";
    if (idx === 3 || idx === 6) return "md:col-span-2 md:row-span-1";
    return "md:col-span-1 md:row-span-1";
  };

  return (
    <div className="py-16 bg-stone-50 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-4">
            Media Hub
          </h2>
          <div className="h-1 w-24 bg-amber-600 mx-auto rounded"></div>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Explore moments of celebration, academic excellence, and vibrant
            student life at Green Wood Grammar School.
          </p>
        </div>

        {/* Dynamic Filters */}
        <div className="flex justify-center space-x-3 sm:space-x-4 mb-12">
          {["all", "photo", "video"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${
                activeTab === tab
                  ? "bg-green-800 text-white shadow-lg scale-105"
                  : "bg-white text-green-800 hover:bg-green-100 shadow-sm border border-stone-200"
              }`}
            >
              {tab === "all"
                ? "All Media"
                : tab === "photo"
                  ? "Photos"
                  : "Videos"}
            </button>
          ))}
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4 md:gap-5 group/bento grid-flow-dense">
          {filteredMedia.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className={`group/item relative rounded-2xl overflow-hidden bg-stone-200 shadow-md cursor-pointer transition-all duration-500 hover:!opacity-100 hover:scale-[1.02] hover:shadow-2xl hover:z-10 group-hover/bento:opacity-50 animate-fade-in-up ${getGridSpan(idx)}`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover/item:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover/item:opacity-90 transition-opacity duration-300"></div>
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-md w-16 h-16 rounded-full flex items-center justify-center transform group-hover/item:scale-110 group-hover/item:bg-white/30 transition-all duration-300 shadow-xl border border-white/30">
                    <Play
                      className="text-white ml-1 w-8 h-8"
                      fill="currentColor"
                    />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex justify-between items-end">
                <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md pr-4 leading-tight">
                  {item.title}
                </h3>
                <div className="bg-black/30 backdrop-blur-sm p-2 rounded-full shrink-0">
                  {item.type === "video" ? (
                    <Play
                      className="text-white"
                      size={16}
                      fill="currentColor"
                    />
                  ) : (
                    <ImageIcon className="text-white" size={16} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Integrated Social Wall */}
        <div className="mt-20 flex flex-col items-center w-full">
          <h3 className="text-2xl font-bold text-green-900 mb-3 text-center">
            Latest Updates from Facebook
          </h3>
          <p className="text-gray-500 mb-8 max-w-2xl text-center">
            Stay connected and see our daily activities directly on our social
            feed!
          </p>
          <div className="bg-white p-2 md:p-3 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-stone-200 flex justify-center w-full overflow-hidden max-w-[530px] mx-auto hover:shadow-[0_8px_30px_rgb(0,0,0,0.14)] transition-shadow duration-500">
            <iframe
              src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02r8pQPieQyd17Wq4N3XmMNhhseJSrQMwfq496LFGBX3mnEuYDDP8w8ac9asdQSgbKl%26id%3D100039759026390&show_text=true&width=500"
              width="500"
              height="652"
              style={{
                border: "none",
                overflow: "hidden",
                maxWidth: "100%",
                borderRadius: "1.5rem",
              }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </div>

      {/* PRODUCTION FIX: Using createPortal to inject the Lightbox directly into the document body */}
      {lightboxOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[999999] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center animate-fadeIn"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Top Bar with distinct close button */}
            <div className="absolute top-0 right-0 w-full p-3 md:p-6 flex justify-end z-[1000000] pointer-events-none">
              <button
                className="text-white/60 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-full p-2 md:p-3 transition-all pointer-events-auto shadow-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(false);
                }}
              >
                <X className="w-5 h-5 md:w-7 md:h-7" />
              </button>
            </div>

            {/* Left Navigation */}
            <button
              className="absolute left-2 md:left-8 text-white/50 hover:text-white bg-white/5 hover:bg-white/20 border border-transparent hover:border-white/10 backdrop-blur-md rounded-full p-2 md:p-5 transition-all z-[1000000]"
              onClick={prevMedia}
            >
              <ChevronLeft className="w-6 h-6 md:w-9 md:h-9" />
            </button>

            {/* Main Content Area */}
            <div className="w-full h-full max-w-7xl px-12 md:px-24 py-12 md:py-16 flex flex-col items-center justify-center pointer-events-none">
              <div
                className="relative w-full flex items-center justify-center pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredMedia[selectedIndex].type === "video" ? (
                  // FIX: Reduced max-w-5xl to max-w-3xl (lg:max-w-4xl) to prevent the 16:9 height from crushing the text on wide screens
                  <div className="w-full max-w-3xl lg:max-w-4xl aspect-video rounded-xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10 bg-stone-950">
                    <iframe
                      className="w-full h-full"
                      src={filteredMedia[selectedIndex].videoUrl}
                      title={filteredMedia[selectedIndex].title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  // FIX: Capped image height specifically to 65vh to guarantee a safe zone for the typography below
                  <img
                    src={filteredMedia[selectedIndex].url}
                    alt={filteredMedia[selectedIndex].title}
                    className="max-h-[60vh] md:max-h-[65vh] max-w-full object-contain rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                  />
                )}
              </div>

              {/* Typography & Counter */}
              {/* FIX: Added max-w-3xl to the text container so long titles wrap beautifully instead of running off the screen */}
              <div className="mt-4 md:mt-6 lg:mt-8 text-center text-white pointer-events-auto px-2 max-w-3xl">
                <h3 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-extrabold tracking-wide drop-shadow-lg leading-snug">
                  {filteredMedia[selectedIndex].title}
                </h3>
                <p className="mt-1 md:mt-2 text-white/60 font-semibold tracking-widest uppercase text-[10px] md:text-xs">
                  {selectedIndex + 1} OF {filteredMedia.length}
                </p>
              </div>
            </div>

            {/* Right Navigation */}
            <button
              className="absolute right-2 md:right-8 text-white/50 hover:text-white bg-white/5 hover:bg-white/20 border border-transparent hover:border-white/10 backdrop-blur-md rounded-full p-2 md:p-5 transition-all z-[1000000]"
              onClick={nextMedia}
            >
              <ChevronRight className="w-6 h-6 md:w-9 md:h-9" />
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
};

// 6. Contact Component
const Contact = () => (
  <div className="py-16 bg-stone-100 animate-fadeIn">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-4">
          Contact Us
        </h2>
        <div className="h-1 w-24 bg-amber-600 mx-auto rounded"></div>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          We would love to hear from you. Reach out to us for admissions,
          inquiries, or feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Contact Info */}
        <div className="bg-green-900 p-10 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin
                  className="text-amber-500 mt-1 mr-4 flex-shrink-0"
                  size={24}
                />
                <div>
                  <h4 className="font-semibold text-lg">Our Campus</h4>
                  <p className="text-green-100 mt-1">
                    123 Education Lane, Sector X,
                    <br />
                    Karachi, Sindh, Pakistan
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone
                  className="text-amber-500 mr-4 flex-shrink-0"
                  size={24}
                />
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-green-100 mt-1">+92 21 1234 5678</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="text-amber-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-green-100 mt-1">info@gwgs.edu.pk</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <div className="bg-green-800/50 p-6 rounded-xl border border-green-700">
              <h4 className="font-bold text-amber-400 mb-2">Office Hours</h4>
              <p className="text-green-100 text-sm">
                Monday - Friday: 8:00 AM - 2:00 PM
              </p>
              <p className="text-green-100 text-sm">
                Saturday: 9:00 AM - 12:00 PM
              </p>
              <p className="text-green-100 text-sm">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Send us a Message
          </h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button className="cursor-pointer w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center">
              Send Message <ChevronRight size={20} className="ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// 7. Footer Component
const Footer = ({ onOpenLegal }) => (
  <footer className="w-full flex flex-col relative">
    {/* Official CSS Banner matching the requested design */}
    <div className="bg-white relative w-full overflow-hidden py-8 md:py-14 border-t border-gray-200">
      {/* Decorative Green Geometric Slants */}
      <div className="absolute top-0 -left-12 sm:-left-8 h-full w-20 sm:w-24 md:w-64 bg-green-800 origin-bottom-left -skew-x-[15deg] md:-skew-x-[20deg] shadow-lg"></div>
      <div className="absolute top-0 -right-12 sm:-right-8 h-full w-20 sm:w-24 md:w-64 bg-green-800 origin-bottom-right skew-x-[15deg] md:skew-x-[20deg] shadow-lg"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-10 sm:px-16 md:px-24 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 min-h-[120px]">
        {/* Banner Logo */}
        <div className="flex-shrink-0 animate-fade-in-up">
          <img
            src="/Logo.jpg"
            alt="Official GWGS Logo"
            className="w-16 h-16 sm:w-28 sm:h-28 object-contain rounded-full shadow-md border-2 border-white"
          />
        </div>

        {/* Text Authority Lockup */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left animate-fade-in-up delay-200 relative">
          {/* FIX: Using inline-block on spans to keep the space on desktop, while breaking on mobile */}
          <h2 className="text-[1.15rem] sm:text-2xl md:text-3xl lg:text-[2.2rem] font-extrabold text-green-800 tracking-tight leading-tight sm:leading-none mb-2 sm:mb-1 text-center sm:text-left">
            <span className="block sm:inline-block">GREEN WOOD</span>
            <span className="hidden sm:inline">&nbsp;</span>
            <span className="block sm:inline-block">GRAMMAR SCHOOL</span>
          </h2>

          {/* FIX: Removed w-full so this container hugs the text naturally, keeping "Registered" in place */}
          <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-4 mt-1 sm:mt-0">
            <span className="text-green-700 text-[0.65rem] sm:text-[0.75rem] md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.45em] uppercase text-center">
              Gather To Learn
            </span>
            <span className="text-green-800 text-[10px] font-semibold">
              Registered.
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Modern Premium Fat Footer */}
    <div className="bg-green-800 text-green-50 py-16 border-t-4 border-[#824B1E]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-bold text-xl tracking-wide">GWGS</h4>
            <p className="text-green-100/90 text-sm leading-relaxed max-w-xs">
              We empower the next generation of thinkers and leaders through
              rigorous academics and strong moral foundations in the heart of
              Karachi.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-green-900/50 border border-green-700/50 flex items-center justify-center text-green-100 hover:bg-[#824B1E] hover:border-[#824B1E] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-green-900/50 border border-green-700/50 flex items-center justify-center text-green-100 hover:bg-[#824B1E] hover:border-[#824B1E] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-green-900/50 border border-green-700/50 flex items-center justify-center text-green-100 hover:bg-[#824B1E] hover:border-[#824B1E] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                aria-label="Twitter / X"
              >
                <TwitterIcon size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-bold text-lg tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-green-100/90">
              <li>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight size={14} className="mr-2" /> About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="cursor-pointer hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight size={14} className="mr-2" /> Admissions
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="cursor-pointer hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight size={14} className="mr-2" /> Campus Life
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="cursor-pointer hover:text-amber-400 transition-colors flex items-center"
                >
                  <ChevronRight size={14} className="mr-2" /> Contact Office
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-bold text-lg tracking-wide">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-green-100/90">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-3 text-amber-500 shrink-0 mt-0.5"
                />
                <span>
                  123 Education Lane, Block 4<br />
                  Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-amber-500 shrink-0" />
                <span>+92 (21) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-amber-500 shrink-0" />
                <span>admissions@gwgs.edu.pk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-green-700 flex flex-col md:flex-row justify-between items-center text-xs text-green-100/80">
          <p className="mb-4 md:mb-0 text-center md:text-left">
            &copy; {new Date().getFullYear()} Green Wood Grammar School. All
            rights reserved.
          </p>
          <div className="flex space-x-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                onOpenLegal("privacy");
              }}
              className="cursor-pointer hover:text-white transition-colors uppercase tracking-wider"
            >
              Privacy Policy
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onOpenLegal("terms");
              }}
              className="cursor-pointer hover:text-white transition-colors uppercase tracking-wider"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// 8. Legal Modal Component
const LegalModal = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="text-gray-600">
          <p className="mb-4 font-semibold text-stone-800">
            Effective Date: {new Date().getFullYear()}
          </p>
          <p className="mb-4 leading-relaxed">
            Green Wood Grammar School respects your privacy and is committed to
            protecting the personal data of our prospective students, enrolled
            families, alumni, and website visitors.
          </p>
          <h4 className="font-bold text-green-900 mt-6 mb-2">
            1. Data Collection
          </h4>
          <p className="mb-4 leading-relaxed">
            We collect information that you voluntarily provide to us when you
            fill out forms on our website, such as admissions inquiries or
            contact requests. This may include names, email addresses, phone
            numbers, and academic histories.
          </p>
          <h4 className="font-bold text-green-900 mt-6 mb-2">
            2. How We Use Your Data
          </h4>
          <p className="mb-4 leading-relaxed">
            Your data is strictly used for school-related communication,
            processing enrollment applications, responding to your inquiries,
            and improving our educational services. We never sell or rent your
            personal information to third parties.
          </p>
          <h4 className="font-bold text-green-900 mt-6 mb-2">
            3. Data Security
          </h4>
          <p className="mb-4 leading-relaxed">
            We employ reasonable security measures to protect your personal data
            from unauthorized access. However, no internet transmission is
            entirely secure, and we cannot guarantee absolute security.
          </p>
          <h4 className="font-bold text-green-900 mt-6 mb-2">
            4. Contacting Us
          </h4>
          <p className="mb-4 leading-relaxed">
            If you have any questions regarding this Privacy Policy or wish to
            request the deletion of your records, please contact us at
            admissions@gwgs.edu.pk.
          </p>
        </div>
      ),
    },
    terms: {
      title: "Terms of Service",
      body: (
        <div className="text-gray-600">
          <p className="mb-4 font-semibold text-stone-800">
            Effective Date: {new Date().getFullYear()}
          </p>
          <p className="mb-4 leading-relaxed">
            By accessing and using the Green Wood Grammar School website, you
            accept and agree to be bound by the terms and provisions of this
            agreement.
          </p>
          <h4 className="font-bold text-green-900 mt-6 mb-2">
            1. Website Usage
          </h4>
          <p className="mb-4 leading-relaxed">
            The content of this website is for your general information and use
            only. It is subject to change without notice. Unauthorized use of
            this website may give rise to a claim for damages or be a criminal
            offense.
          </p>
          <h4 className="font-bold text-green-900 mt-6 mb-2">
            2. Admissions & Applications
          </h4>
          <p className="mb-4 leading-relaxed">
            Submitting an application or inquiry through our website does not
            guarantee admission. Admissions are subject to reviews, interviews,
            and available capacity as determined solely by the administration.
          </p>
          <h4 className="font-bold text-green-900 mt-6 mb-2">
            3. Intellectual Property
          </h4>
          <p className="mb-4 leading-relaxed">
            This website contains material owned by or licensed to us, including
            the design, layout, look, appearance, photographs, and graphics.
            Reproduction is explicitly prohibited without written consent.
          </p>
        </div>
      ),
    },
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white max-w-2xl w-full max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center px-6 md:px-8 py-5 border-b border-gray-100 bg-stone-50">
          <h2 className="text-xl md:text-2xl font-extrabold text-green-900">
            {content[type].title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        {/* Scrollable Content */}
        <div
          className="p-6 md:p-8 overflow-y-auto"
          style={{ maxHeight: "calc(85vh - 150px)" }}
        >
          {content[type].body}
        </div>
        {/* Footer */}
        <div className="border-t border-gray-100 p-4 md:p-6 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-6 py-2.5 bg-green-800 hover:bg-green-900 text-white font-bold rounded-lg transition-colors shadow-sm"
          >
            Agree & Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Container ---
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeModal, setActiveModal] = useState(null);

  // Simple router simulation
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setCurrentPage={setCurrentPage} />;
      case "about":
        return <About />;
      case "admissions":
        return <Admissions />;
      case "gallery":
        return <Gallery />;
      case "contact":
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 selection:bg-green-200 selection:text-green-900 text-gray-800">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `,
        }}
      />

      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className={`flex-grow ${currentPage !== "home" ? "pt-24" : ""}`}>
        {renderPage()}
      </main>

      <Footer onOpenLegal={setActiveModal} />

      {/* Dynamic Overlay Modals */}
      <LegalModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
