
import React, { useState } from "react";
import "../styles/PropertyDetails.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function PropertyDetails({ property, onBack, onBookNow }) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [booking, setBooking] = useState({
    name: "",
    email: "",
    contact: "",
    checkIn: "",
    checkOut: "",
    guests: "1"
  });

  
  const selectedProperty = property || {
    name: "Ocean Pearl Villa",
    location: "Mirissa, Sri Lanka",
    price: 18500,
    type: "Luxury Villa",
    guests: 4,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1000"
  };

  const propertyImages = [
    selectedProperty.image,
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000"
  ];

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (booking.checkOut <= booking.checkIn) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    if (Number(booking.guests) > selectedProperty.guests) {
      alert(`This property can accommodate a maximum of ${selectedProperty.guests} guests.`);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="details-page">

      {/* Header */}
      <header className="details-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>

        <h2>LANKA <span>Stayz.</span></h2>

        <p>Find your perfect stay in Sri Lanka</p>
      </header>

      {/* Property heading */}
      <section className="details-container">

        <div className="details-title">
          <div>
            <span className="details-type">{selectedProperty.type}</span>
            <h1>{selectedProperty.name}</h1>
            <p>📍 {selectedProperty.location}</p>
          </div>

          <div className="details-price">
            <strong>
              LKR {selectedProperty.price.toLocaleString("en-LK")}
            </strong>
            <span> / night</span>
          </div>
        </div>

        {/* Property images */}
        <div className="details-gallery">
          {propertyImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${selectedProperty.name} - Photo ${index + 1}`}
            />
          ))}
        </div>

        {/* Property information */}
        <div className="details-content">

          <div className="details-main">

            <section className="details-description">
              <h2>About This Property</h2>

              <p>
                Experience a comfortable and memorable stay at
                {` ${selectedProperty.name}`}. Located in the beautiful
                surroundings of {selectedProperty.location}, this
                accommodation offers a relaxing atmosphere for your
                next Sri Lankan getaway.
              </p>

              <p>
                Whether you are travelling with family, friends or
                enjoying a peaceful holiday, this property provides
                a welcoming space to relax and explore the destination.
              </p>
            </section>

            <section className="amenities-section">
              <h2>What This Place Offers</h2>

              <div className="amenities-grid">
                <div>🛜 Free Wi-Fi</div>
                <div>🏊 Swimming Pool</div>
                <div>❄️ Air Conditioning</div>
                <div>🚗 Free Parking</div>
              </div>
            </section>

            <section className="capacity-section">
              <h2>Property Information</h2>

              <p><strong>Property type:</strong> {selectedProperty.type}</p>
              <p><strong>Maximum guests:</strong> {selectedProperty.guests}</p>
              <p><strong>Location:</strong> {selectedProperty.location}</p>
            </section>

          </div>

          {/* Booking card */}
          <aside className="booking-card">
            <h2>Plan Your Stay</h2>

            <p className="booking-card-price">
              LKR {selectedProperty.price.toLocaleString("en-LK")}
              <span> / night</span>
            </p>

            <p className="capacity-note">
              Accommodates up to {selectedProperty.guests} guests
            </p>

                    <button
            className="book-now-button"
            onClick={onBookNow}
            >
            Book Now
            </button>

            <p className="booking-note">
              No payment required. Submit a booking request.
            </p>
          </aside>

        </div>

        {/* Booking form */}
        {showBookingForm && (
          <section className="booking-form-section" id="booking-form">

            {submitted ? (
              <div className="booking-success">
                <h2>Booking Request Submitted!</h2>

                <p>
                  Thank you, {booking.name}. Your booking request for
                  {" "}{selectedProperty.name} has been received.
                </p>

                <p>
                  We will contact you using the details you provided.
                </p>

                <button
                  onClick={() => {
                    setShowBookingForm(false);
                    setSubmitted(false);
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2>Request Your Booking</h2>
                <p className="form-description">
                  Please provide your details to submit a booking request.
                </p>

                <form onSubmit={handleBookingSubmit}>

                  <div className="form-grid">

                    <div className="form-field">
                      <label>Guest Name</label>
                      <input
                        type="text"
                        name="name"
                        value={booking.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={booking.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Contact Number</label>
                      <input
                        type="tel"
                        name="contact"
                        value={booking.contact}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Number of Guests</label>
                      <select
                        name="guests"
                        value={booking.guests}
                        onChange={handleChange}
                        required
                      >
                        {Array.from(
                          { length: selectedProperty.guests },
                          (_, i) => i + 1
                        ).map(number => (
                          <option key={number} value={number}>
                            {number} {number === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Check-in Date</label>
                      <input
                        type="date"
                        name="checkIn"
                        min={new Date().toISOString().split("T")[0]}
                        value={booking.checkIn}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label>Check-out Date</label>
                      <input
                        input="date"
                        name="checkOut"
                        min={booking.checkIn || new Date().toISOString().split("T")[0]}
                        value={booking.checkOut}
                        onChange={handleChange}
                        required
                      />
                    </div>

                  </div>

                  <div className="booking-form-actions">
                    <button type="submit" className="submit-booking-button">
                      Submit Booking Request
                    </button>

                    <button
                      type="button"
                      className="cancel-booking-button"
                      onClick={() => setShowBookingForm(false)}
                    >
                      Cancel
                    </button>
                  </div>

                </form>
              </>
            )}
          </section>
        )}

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

export default PropertyDetails;
