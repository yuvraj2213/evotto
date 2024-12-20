import React from "react";

const Services = () => {
  const services = [
    {
      title: "Automobile Rental",
      description: "Rent vehicles for personal or business use effortlessly.",
    },
    {
      title: "Second-Hand Cars",
      description: "Explore and buy verified, affordable pre-owned cars.",
    },
    {
      title: "Vehicle Servicing",
      description:
        "Schedule services, repairs, or maintenance with trusted vendors.",
    },
  ];

  return (
    <>
      <h2>Our Services</h2>
      {/* <div className="service-card">
        <h3>Automobile Rental</h3>
        <p>Rent vehicles for personal or business use effortlessly.</p>
      </div>
      <div className="service-card">
        <h3>Second-Hand Cars</h3>
        <p>Explore and buy verified, affordable pre-owned cars.</p>
      </div>
      <div className="service-card">
        <h3>Vehicle Servicing</h3>
        <p>Schedule services, repairs, or maintenance with trusted vendors.</p>
      </div> */}
      <div className="service-cards">
        {services.map((service, index) => {
          return (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Services;
