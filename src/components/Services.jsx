import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      title: "Automobile Rental",
      description: "Rent vehicles for personal or business use effortlessly.",
      link: "/rental"
    },
    {
      title: "Second-Hand Cars",
      description: "Explore and buy verified, affordable pre-owned cars.",
      link: "/cars"
    },
    {
      title: "Vehicle Servicing",
      description:
        "Schedule services, repairs, or maintenance with trusted vendors.",
      link: "/service"
    },
    {
      title: "Drivers",
      description:
        "Hire professional drivers for personal or business needs, available on-demand.",
      link: "/drivers"
    },
    {
      title: "Rental Gears",
      description:
        "Rent essential travel and safety gear to complement your journey.",
      link: "/gears"
    }
  ];
  

  return (
    <>
      <h2 className="service-header">Our Services</h2>
      <div className="service-cards">
        {services.map((service, index) => {
          return (
            <div key={index} className="service-card">
              <Link className="service-card-link" to={service.link}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Services;
