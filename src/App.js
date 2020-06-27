import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import './App.css';
import Title from './components/title.component';
import Form from './components/form.component';
import Weather from './components/weather.component';
import Forecast from './components/forecast.component';

const api_key = "ee7805b1493ea1513ea5afe3b5440a16";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      time: undefined,
      nameday: undefined,
      icon: undefined,
      fahrenheit: undefined,
      celsius: undefined,
      description: "",
      clouds: undefined,
      wind: undefined,
      humidity: undefined,
      sunrise: undefined,
      sunset: undefined,
      error: false,
      metropolis: undefined,
      day: [],
      hour: [],
      conditions: [],
      fTemp: [],
      cTemp: [],
      vapor: [],
      gust: [],
      moistness: [],
      dates: []
    };

    this.weatherIcon = {
      thunderstorm: "wi-thunderstorm",
      drizzle: "wi-sprinkle",
      hail: "wi-hail",
      rain: "wi-rain",
      sleet: "wi-sleet",
      snow: "wi-snow",
      smoke: "wi-smoke",
      dust: "wi-dust",
      fog: "wi-fog",
      squall: "wi-strong-wind",
      tornado: "wi-tornado",
      atmosphere: "wi-fog",
      clear: "wi-day-sunny",
      partCloud: "wi-night-partly-cloudy",
      clouds: "wi-cloudy"
    };
  }

  getIcon(id) {
    let wIcon;

    switch(true) {
      case id >= 200 && id <= 232:
        wIcon = this.weatherIcon.thunderstorm;
        break;
      case (id >= 300 && id <= 321) || (id === 701):
        wIcon = this.weatherIcon.drizzle;
        break;
      case id === 511:
        wIcon = this.weatherIcon.hail;
        break;
      case id >= 500 && id <= 531:
        wIcon = this.weatherIcon.rain;
        break;
      case id >= 611 && id <= 613:
        wIcon = this.weatherIcon.sleet;
        break;
      case id >= 600 && id <= 622:
        wIcon = this.weatherIcon.snow;
        break;
      case id === 711:
        wIcon = this.weatherIcon.smoke;
        break;
      case id === 731 || id === 751 || id === 761 || id === 762:
        wIcon = this.weatherIcon.dust;
        break;
      case id === 741:
        wIcon = this.weatherIcon.fog;
        break;
      case id === 771:
        wIcon = this.weatherIcon.squall;
        break;
      case id === 781:
        wIcon = this.weatherIcon.tornado;
        break;
      case id >= 701 && id <= 781:
        wIcon = this.weatherIcon.atmosphere;
        break;
      case id === 800:
        wIcon = this.weatherIcon.clear;
        break;
      case id === 801 || id === 802:
        wIcon = this.weatherIcon.partCloud;
        break;
      case id === 803 || id === 804:
        wIcon = this.weatherIcon.clouds;
        break;
      default:
        wIcon = null;
    }

    return wIcon;
  }

  direction(deg) {
    let compass = "";

    switch(true) {
      case deg >= 337.5 || deg < 22.5:
        compass = "N"; 
        break;
      case deg >= 22.5 && deg < 67.5:
        compass = "NE"; 
        break;
      case deg >= 67.5 && deg < 112.5:
        compass = "E"; 
        break;
      case deg >= 112.5 && deg < 157.5:
        compass = "SE"; 
        break;
      case deg >= 157.5 && deg < 202.5:
        compass = "S"; 
        break;
      case deg >= 202.5 && deg < 247.5:
        compass = "SW"; 
        break;
      case deg >= 247.5 && deg < 292.5:
        compass = "W"; 
        break;
      case deg >= 292.5 && deg < 337.5:
        compass = "N"; 
        break;
      default:
        compass = "";
    }

    return compass;
  }

  calFahrenheit(temp) {
    let fah = Math.round((9/5) * (temp - 273.15) + 32);
    return fah;
  }

  calCelsius(temp) {
    let cel = Math.round(temp - 273.15);
    return cel;
  }
  
  calMph(mps) {
    let num = mps * 2.23694;
    let mph = num.toFixed(1);
    return mph;
  }

  formatDate(time) {
    let d = new Date(time);
    let year = d.getUTCFullYear().toString();
    let dayofmonth = d.getUTCDate().toString();
    let month = d.getUTCMonth();
    let readMonth = month + 1;
    let alphaMonth;
    let readDate;

    switch(readMonth) {
      case 1:
        alphaMonth = "January";
        break;
      case 2:
        alphaMonth = "February";
        break;
      case 3:
        alphaMonth = "March";
        break;
      case 4:
        alphaMonth = "April";
        break;
      case 5:
        alphaMonth = "May";
        break;
      case 6:
        alphaMonth = "June";
        break;
      case 7:
        alphaMonth = "July";
        break;
      case 8:
        alphaMonth = "August";
        break;
      case 9:
        alphaMonth = "September";
        break;
      case 10:
        alphaMonth = "October";
        break;
      case 11:
        alphaMonth = "November";
        break;
      case 12:
        alphaMonth = "December";
        break;
      default:
        alphaMonth = readMonth.toString();  
    }

    readDate = alphaMonth + " " + dayofmonth + ", " + year; 

    return readDate;
  }

  theDay(time) {
    let d = new Date(time);
    let dayofweek = d.getUTCDay();
    let alphaDay;

    switch(dayofweek) {
      case 0:
        alphaDay= "Sunday";
        break;
      case 1:
        alphaDay= "Monday";
        break;
      case 2:
        alphaDay= "Tuesday";
        break;
      case 3:
        alphaDay= "Wednesday";
        break;
      case 4:
        alphaDay= "Thursday";
        break;
      case 5:
        alphaDay= "Friday";
        break;
      case 6:
        alphaDay= "Saturday";
        break;
      default:
        alphaDay= null;
    }
  
    return alphaDay;
  }

  timeofday(time) {
    let d = new Date(time);
    let forecastTime = d.toUTCString();
    let readHours = forecastTime.slice(-12, -7); 

    return readHours;
  }

  getMeridiem(hour) {
    let time = this.timeofday(hour);
    let theHour = time;

    switch(true) {
      case time === "00:00":
        theHour = "12am";
        break;
      case time.startsWith("0"):
        theHour = time.slice(1, 2) + "am";
        break;
      case (time.startsWith("1") && (time.slice(0, 2) < "12")): 
        theHour = time.slice(0, 2) + "am";
        break;
      case time === "12:00":
        theHour = "12pm";
        break;
      case (time.startsWith("1") || time.startsWith("2")): 
        theHour = (time.slice(0, 2) - "12") + "pm";
        break;
      default:
        theHour = time;
    }

    return theHour;
  }

  getDates() {
    const uniqueDays = this.state.day.filter((el, index) => {
      return el !== this.state.day[index - 1];
    });

    this.setState({ 
      dates: uniqueDays
    });
  }

  getData = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`;
      let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${api_key}`;
      const api_request = await fetch(url);
      const response = await api_request.json();
      const api_request2 = await fetch(url2);
      const response2 = await api_request2.json();

      if (response.sys !== undefined) {
        this.setState({
          city: `${response.name}, ${response.sys.country}`,
          time: this.formatDate((response.dt + response.timezone) * 1000),
          nameday: this.theDay((response.dt + response.timezone) * 1000),
          icon: this.getIcon(response.weather[0].id),
          fahrenheit: this.calFahrenheit(response.main.temp),
          celsius: this.calCelsius(response.main.temp),
          description: response.weather[0].description,
          clouds: response.clouds.all,
          wind: `${this.direction(response.wind.deg)} at ${this.calMph(response.wind.speed)} mph`,
          humidity: response.main.humidity,
          sunrise: this.timeofday((response.sys.sunrise + response.timezone)
            * 1000),
          sunset: this.timeofday((response.sys.sunset + response.timezone) 
            * 1000),
          error: false,
          metropolis: [],
          day: [],
          hour: [], 
          fTemp: [],
          cTemp: [],
          conditions: [],
          vapor: [],
          gust: [],
          moistness: []
        });
      } else {
        this.setState({
          error:
          <div className="alert alert-danger mx-5 my-4 p-3" role="alert">
            <p>City or country not found.  Make sure you have the city
            and country spelling or ISO 3166 country code correct. 
            Otherwise, enter another city or country.</p>
          </div>
        });
      }
      
      if (response2.list !== undefined) {
        for (let i = 0; i < response2.list.length; i++) {
          this.setState({
            metropolis: `${response2.city.name}, ${response2.city.country}`,
            day: [...this.state.day, 
              this.formatDate((response2.list[i].dt +
              response2.city.timezone) * 1000)],
            hour: [...this.state.hour, 
              this.getMeridiem((response2.list[i].dt +
              response2.city.timezone) * 1000)],
            fTemp: [...this.state.fTemp, 
              this.calFahrenheit(response2.list[i].main.temp)],
            cTemp: [...this.state.cTemp, 
              this.calCelsius(response2.list[i].main.temp)],
            conditions: [...this.state.conditions, 
              response2.list[i].weather[0].description],
            vapor: [...this.state.vapor, response2.list[i].clouds.all],
            gust: [...this.state.gust, 
              `${this.direction(response2.list[i].wind.deg)} at ${this.calMph(response2.list[i].wind.speed)} mph`],
            moistness: [...this.state.moistness, 
              response2.list[i].main.humidity],
          });
        }
      }

      this.getDates();
    } else {
      this.setState({
        error:
        <div className="alert alert-danger mx-5 my-4 p-3" role="alert">
          <p>Please, enter a city and country.</p>
        </div>
      });
    }
  };

  render() {
    if (this.state.city === undefined) {
      return (
        <div className="text-center">
          <Title />
          <Form 
            huntgather={this.getData} 
            error={this.state.error} 
          />
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <Title />
          <Form huntgather={this.getData} error={this.state.error} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg">
                <Weather
                  city={this.state.city} 
                  country={this.state.country} 
                  time={this.state.time}
                  nameday={this.state.nameday}
                  weathericon={this.state.icon}
                  tempF={this.state.fahrenheit}
                  tempC={this.state.celsius}
                  description={this.state.description}
                  clouds={this.state.clouds}
                  wind={this.state.wind}
                  humidity={this.state.humidity}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                />
              </div>
              <div className="col-lg">
                <Forecast 
                  metropolis={this.state.metropolis}
                  nation={this.state.nation}
                  dates={this.state.dates}
                  day={this.state.day}
                  hour={this.state.hour}
                  tempFah={this.state.fTemp}
                  tempCel={this.state.cTemp}
                  conditions={this.state.conditions}
                  vapor={this.state.vapor}
                  gust={this.state.gust}
                  moistness={this.state.moistness}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
