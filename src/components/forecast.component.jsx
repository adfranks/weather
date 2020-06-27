import React from 'react';
import {Accordion, Card} from 'react-bootstrap';

const Forecast = (props) => {
  return (
    <div className="forecast-wrap">
      <h3>
        5 Day / 3 Hour Forecast
        <small> - {props.metropolis}</small>
      </h3>
      <Accordion>
        {props.dates.map((dateitem, ind) => ( 
          <div 
            key={ind.toString()} 
          >
            <Card className="mb-1 forecast-content rounded">
              <Card.Header>
                <Accordion.Toggle 
                  className="p-0 text-white" 
                  as={Card.Header} 
                  variant="link" 
                  eventKey={ind}
                >
                  <h4>{dateitem}</h4> 
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={ind}>
                <Card.Body className="cbody">
                  {props.hour.map((item, index) => ( 
                    props.day[index].includes(dateitem) &&
                    <div 
                      key={index.toString()} 
                      className="time-block text-left mb-1 font-weight-bold"
                    >
                      <p key={item + 1}>
                        Time: {item}
                      </p>
                      <p key={item + 2}>
                        Description: {props.conditions[index]}
                      </p>
                      <p key={item + 3}>
                        Temperature: {props.tempFah[index]}&deg;F,
                        <span> </span>{props.tempCel[index]}&deg;C
                      </p>
                      <p key={item + 4}>
                        Clouds: {props.vapor[index]}%
                      </p>
                      <p key={item + 5}>
                        Wind: {props.gust[index]}
                      </p>
                      <p key={item + 6}>
                        Humidity: {props.moistness[index]}%
                      </p>
                    </div>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default Forecast;
