const React = require('react');
const Filter = require('../filter.js');
const FreqSlider = require('./freqSlider');

const FilterComponent = (props) => {
  let filter = new Filter(props.signal);
  let handleSlide = (e) => {
    filter.setCutoff(e.target.value);
  }

  return (
    <div>
      Filter Cutoff:
      <FreqSlider handleSlide={handleSlide} />
    </div>
  );
}

module.exports = FilterComponent;
