import React from 'react';

const Weather = (props) => {
  return (
    <div className="current-wrap">
      <h2 className="font-weight-bold">{props.city}</h2>
      <p>{props.nameday}, {props.time}</p>
      <p>
        <i className={`wi ${props.weathericon} focus-data px-3`} />
        <span className=
          "px-3 text-capitalize desc text-nowrap">
          {props.description}
        </span>
      </p>
      <p className="mb-1 focus-data">
        {props.tempF ? 
          (<span className="px-3">{props.tempF}&deg;F</span>) : null}
        {props.tempC | (props.tempC === 0) ? (<span className=
          "px-3 text-nowrap">{props.tempC}&deg;C</span>) : null}
      </p>
      <p className="my-1">Clouds: {props.clouds}%</p>
      <p className="my-1">Wind: {props.wind}</p>
      <p className="my-1">Humidity: {props.humidity}%</p>
      <p className="my-1">Sunrise: {props.sunrise}</p>
      <p className="my-1">Sunset: {props.sunset}</p>
    </div>
  );
};

export default Weather;
