const React = require('react');

const GainButton = (props) => {
  const text = `Gain is ${props.on ? "ON" : "OFF"}`;
  return(
    <div>
      <p>{text}</p>
      <button onClick={props.handleClick}>GAIN</button>
    </div>
  )
}

module.exports = GainButton;
