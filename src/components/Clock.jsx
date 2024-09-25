import React from "react";
// import "./App.css";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), locale: "bn-BD" };
    this.handleClick = this.handleClick.bind(this);
  }
  // state = { date: new Date(), locale: "bn-BD" };

  componentDidMount() {
    this.colockTimer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.colockTimer);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  handleClick = () => {
    this.setState({
      locale: "en-US",
    });
  };

  render() {
    const { date, locale } = this.state;
    return (
      <div>
        <h1 className="heading">
          <span className="text">{date.toLocaleTimeString(locale)}</span>
        </h1>
        <button type="button" onClick={this.handleClick}>
          Click here
        </button>
      </div>
    );
  }
}

export default Clock;
