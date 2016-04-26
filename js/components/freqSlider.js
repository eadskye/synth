const React = require('react');

const FreqSlider = (props) => {
  return (
    <div>
      <p>freq: {props.frequency}</p>
      <input type="range" onChange={props.handleSlide}/>
    </div>
  )
}

module.exports = FreqSlider;
