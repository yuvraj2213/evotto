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
      <h2 className="service-header">Our Services</h2>
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
