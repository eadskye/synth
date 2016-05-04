const React = require('react');
const Filter = require('../filter');
const FreqSlider = require('./freqSlider');

const FilterComponent = React.createClass({
  filter: {},
  getInitialState: function() {
    return {
      cutoff: 2000
    }
  },

  componentDidMount: function() {
    this.filter = new Filter();
  },

  componentWillReceiveProps: function(nextProps) {
    this.filter.connect(nextProps.signal)
  },

  handleSlide: function(e) {
    this.setState({cutoff: e.target.value});
    this.filter.setCutoff(e.target.value);
  },

  render: function() {
    return (
      <div>
        Filter Cutoff:
        <FreqSlider frequency={this.state.cutoff} handleSlide={this.handleSlide} />
      </div>
    );
  }
});

module.exports = FilterComponent;
