import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherDay = (props) => {
  return (
    <Card className="weather-day">
      <Card.Body>
      <Card.Text>Date: {props.date}</Card.Text>
      <Card.Text>Description: {props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WeatherDay;
