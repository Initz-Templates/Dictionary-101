import React from 'react';
import './MyComponent.css'; // Make sure to import your CSS file

const CircleContainer = () => (
  <div className="circle-container">
    <div className="circle"></div>
  </div>
);

const MyComponent = () => {
  const repeatCount = 100; // Adjust the count as needed

  return (
    <div className="container">
      {[...Array(repeatCount)].map((_, index) => (
        <CircleContainer key={index} />
      ))}
    </div>
  );
};

export default MyComponent;
