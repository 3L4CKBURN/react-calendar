import React from "react";

const EventPopup = ({ isOpen, onClose, event }) => {
  return (
    <div className={`popup ${isOpen ? "open" : ""}`}>
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p>Date: {event.sdate}</p>
      </div>
    </div>
  );
};

export default EventPopup;
