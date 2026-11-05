
import React, { useState } from "react";
import Homepage from "./components/Homepage";
import PropertyDetails from "./components/PropertyDetails";
import BookingForm from "./components/BookingForm";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleNavigate = (page, property = null) => {
    if (property) {
      setSelectedProperty(property);
    }

    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSearch = (searchData) => {
    console.log("Search details:", searchData);
  };

  return (
    <>
      {currentPage === "home" && (
        <Homepage
          onNavigate={handleNavigate}
          onSearch={handleSearch}
        />
      )}

      {currentPage === "details" && (
        <PropertyDetails
          property={selectedProperty}
          onBack={() => handleNavigate("home")}
          onBookNow={() => handleNavigate("booking")}
        />
      )}

      {currentPage === "booking" && (
        <BookingForm
          property={selectedProperty}
          onCancel={() => handleNavigate("details")}
        />
      )}
    </>
  );
}

export default App;
