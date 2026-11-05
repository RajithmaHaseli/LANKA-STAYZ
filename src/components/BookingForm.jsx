
import React, { useState } from "react";
import "../styles/BookingForm.css";

function BookingForm({ property, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    checkIn: "",
    checkOut: "",
    guests: "1"
  });

  const [submitted, setSubmitted] = useState(false);

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.checkIn < todayString) {
      alert("Check-in date cannot be in the past.");
      return;
    }

    if (formData.checkOut <= formData.checkIn) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    if (Number(formData.guests) > property.guests) {
      alert(`Maximum capacity is ${property.guests} guests.`);
      return;
    }

    setSubmitted(true);
  };

  return (
    <section className="booking-form-section">

      {submitted ? (
        <div className="booking-confirmation">
          <div className="success-icon">✓</div>

          <h2>Request Submitted Successfully!</h2>

          <p>
            Thank you, {formData.name}!
          </p>

          <p>
            Your booking request for <strong>{property.name}</strong>
            has been received.
          </p>

          <div className="confirmation-details">
            <p><strong>Check-in:</strong> {formData.checkIn}</p>
            <p><strong>Check-out:</strong> {formData.checkOut}</p>
            <p><strong>Guests:</strong> {formData.guests}</p>
          </div>

          <p className="confirmation-note">
            This is a demo booking request. No payment has been made.
          </p>

          <button onClick={onCancel} className="confirmation-button">
            Back to Property
          </button>
        </div>
      ) : (
        <>
          <div className="booking-form-heading">
            <div>
              <p className="form-tag">YOUR NEXT GETAWAY</p>
              <h2>Request Your Booking</h2>
              <p>Complete the form below to request your stay.</p>
            </div>

            <button
              type="button"
              className="close-form-button"
              onClick={onCancel}
              aria-label="Close booking form"
            >
              ×
            </button>
          </div>

          <div className="selected-property">
            <h3>{property.name}</h3>
            <p>{property.location}</p>
            <strong>
              LKR {property.price.toLocaleString("en-LK")} / night
            </strong>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="booking-input-grid">

              <div className="booking-input">
                <label>Guest Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="booking-input">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="booking-input">
                <label>Contact Number *</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  pattern="[0-9+()\-\s]{7,20}"
                  title="Enter a valid contact number"
                  required
                />
              </div>

              <div className="booking-input">
                <label>Number of Guests *</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                >
                  {Array.from(
                    { length: property.guests },
                    (_, index) => index + 1
                  ).map(number => (
                    <option key={number} value={number}>
                      {number} {number === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="booking-input">
                <label>Check-in Date *</label>
                <input
                  type="date"
                  name="checkIn"
                  min={todayString}
                  value={formData.checkIn}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="booking-input">
                <label>Check-out Date *</label>
                <input
                  type="date"
                  name="checkOut"
                  min={formData.checkIn || todayString}
                  value={formData.checkOut}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <button type="submit" className="submit-booking-button">
              Submit Booking Request
            </button>

            <p className="form-disclaimer">
              No payment is required. This is a booking request only.
            </p>

          </form>
        </>
      )}

    </section>
  );
}

export default BookingForm;
