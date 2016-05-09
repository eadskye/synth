const React = require('react');

const FreqSlider = (props) => {
  return (
    <div>
      <p>freq: {props.frequency}hz</p>
      <input type="range" min={0} max={2000} onChange={props.handleSlide}/>
    </div>
  )
}

module.exports = FreqSlider;
