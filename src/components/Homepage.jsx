import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "../styles/Homepage.css";
import headerLogo from "../assets/header-logo.jpg";

const properties = [
  {
    id: 1,
    name: "Ocean Pearl Villa",
    location: "Mirissa",
    price: 18500,
    rating: 4.9,
    type: "Luxury Villa",
    guests: 4,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900",
  },
  {
    id: 2,
    name: "The Kandy Escape",
    location: "Kandy",
    price: 12000,
    rating: 4.8,
    type: "Mountain Retreat",
    guests: 3,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900",
  },
  {
    id: 3,
    name: "Ella Mountain Haven",
    location: "Ella",
    price: 15000,
    rating: 4.9,
    type: "Boutique Stay",
    guests: 2,
    image:
      "https://images.unsplash.com/photo-1764600276944-537340511979?q=80&w=1192&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: 4,
    name: "Colombo City Suites",
    location: "Colombo",
    price: 14500,
    rating: 4.7,
    type: "Luxury Apartment",
    guests: 4,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
  },
  {
    id: 5,
    name: "Galle Heritage House",
    location: "Galle",
    price: 16000,
    rating: 4.8,
    type: "Heritage Villa",
    guests: 5,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
  },
  {
    id: 6,
    name: "Nuwara Eliya Retreat",
    location: "Nuwara Eliya",
    price: 13500,
    rating: 4.9,
    type: "Nature Retreat",
    guests: 3,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900",
  },
];

const destinations = [
  "All",
  "Colombo",
  "Kandy",
  "Ella",
  "Galle",
  "Mirissa",
  "Nuwara Eliya",
];

// Hero background images array
const heroImages = [
  "https://images.unsplash.com/photo-1642095012245-bda8033e8ee3?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1709755545093-bc5bba511227?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "https://images.unsplash.com/photo-1709755545093-bc5bba511227?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
];

function Homepage({ onNavigate, onSearch }) {
  const [destination, setDestination] = useState("All");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");

  const [searchDestination, setSearchDestination] = useState("All");
  const [searchGuests, setSearchGuests] = useState("1");

  // Hero image slider state
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4500); // Change image every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Get today's date
  const today = new Date().toLocaleDateString("en-CA");

  // Filter properties by selected destination
  const filteredProperties = properties.filter((property) => {
    const matchesDestination =
      searchDestination === "All" ||
      property.location.toLowerCase() ===
        searchDestination.toLowerCase();

    const matchesGuests = property.guests >= Number(searchGuests);

    return matchesDestination && matchesGuests;
  });

  // Handle search button
  const handleSearch = (e) => {
    e.preventDefault();

    if (checkIn && checkOut && checkOut <= checkIn) {
      alert("Check-out date must be after the check-in date.");
      return;
    }

    setSearchDestination(destination);
    setSearchGuests(guests);

    if (onSearch) {
      onSearch({
        destination,
        checkIn,
        checkOut,
        guests: Number(guests),
      });
    }

    document
      .getElementById("stays")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div
          className="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img
        src={headerLogo}
        alt="Lanka Stayz Logo"
        className="header-logo-img"
        />
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#stays">Explore Stays</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section with Dynamic Background */}
      <section 
        className="hero" 
        id="home"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(12, 35, 27, 0.76), rgba(12, 35, 27, 0.12)), url(${heroImages[currentHeroIndex]})`,
        }}
      >
        <div className="hero-content">
          <p className="hero-subtitle">YOUR JOURNEY BEGINS HERE</p>

          <h1>Discover Your Perfect Stay in Sri Lanka</h1>

          <p>
            Explore beautiful accommodations and experience unforgettable
            moments across Sri Lanka.
          </p>
        </div>

        {/* Search Form */}
        <form className="search-box" onSubmit={handleSearch}>
          <div className="search-field">
            <label>Destination</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {destinations.map((place) => (
                <option key={place} value={place}>
                  {place === "All" ? "All Destinations" : place}
                </option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label>Check-in</label>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="search-field">
            <label>Check-out</label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="search-field">
            <label>Guests</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6].map((number) => (
                <option key={number} value={number}>
                  {number} {number === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="search-button">
            Search Stays
          </button>
        </form>
      </section>

      {/* Accommodation Section */}
      <section className="stays-section" id="stays">
        <div className="section-heading">
          <p>EXPLORE SRI LANKA</p>
          <h2>Find Your Perfect Accommodation</h2>
          <span>Discover handpicked places for your next getaway.</span>
        </div>

        {/* Destination Filter */}
        <div className="destination-filter">
          <label htmlFor="destinationFilter">Filter by destination:</label>
          <select
            id="destinationFilter"
            value={searchDestination}
            onChange={(e) => setSearchDestination(e.target.value)}
          >
            {destinations.map((place) => (
              <option key={place} value={place}>
                {place === "All" ? "All Destinations" : place}
              </option>
            ))}
          </select>
        </div>

        {/* Property Cards */}
        {filteredProperties.length > 0 ? (
          <div className="property-grid">
            {filteredProperties.map((property) => (
              <div className="property-card" key={property.id}>
                <div className="property-image">
                  <img src={property.image} alt={property.name} />
                  <span className="property-type">{property.type}</span>
                </div>

                <div className="property-info">
                  <div className="property-title-row">
                    <h3>{property.name}</h3>
                    <span> ⭐ {property.rating}</span>
                  </div>

                  <p className="property-location">
                    📍 {property.location}, Sri Lanka
                  </p>

                  <p className="property-guests">
                    👨‍👩‍👧‍👦 Up to {property.guests} guests
                  </p>

                  <div className="property-bottom">
                    <div className="property-price">
                      <h4>LKR {property.price.toLocaleString()}</h4>
                      <span>per night</span>
                    </div>

                    <button
                      onClick={() => onNavigate?.("details", property)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-properties">
            <h3>No accommodations found</h3>
            <p>
              Try selecting another destination or reducing the number of guests.
            </p>
            <button
              onClick={() => {
                setSearchDestination("All");
                setSearchGuests("1");
              }}
            >
              Show All Properties
            </button>
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div>
          <p>ABOUT LANKA STAYZ</p>
          <h2>Experience Sri Lanka Your Way</h2>
          <p>
            Lanka Stayz helps travellers discover comfortable and memorable
            accommodation across Sri Lanka. From peaceful mountain retreats to
            beautiful coastal villas, find a stay that suits your journey.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div>
            <h2>
              Lanka<span>Stayz.</span>
            </h2>
            <p>Find your perfect stay and explore the beauty of Sri Lanka.</p>
          </div>

          <div>
            <h3>Contact Us</h3>
            <p>Email: hello@lankastayz.com</p>
            <p>Phone: +94 77 123 4567</p>
            <p>Location: Sri Lanka</p>

            {/* Social Media Icons */}
            <div className="footer-social">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="https://facebook.com/" target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://youtube.com/" target="_blank" rel="noreferrer">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#stays">Explore Stays</a>
            <a href="#about">About Us</a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Lanka Stayz. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Homepage;