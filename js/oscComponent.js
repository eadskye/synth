const React = require('react');
const GainButton = require('./components/gainButton');
const FreqSlider = require('./components/freqSlider');
const Synth = require('./synth');

const Oscillator = React.createClass({
  getInitialState: function() {
    return {
      frequency: 1000,
      gain: false
    }
  },

  componentDidMount: function() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var synth = new Synth(audioCtx);
  },

  handleSlide: function(e) {
    this.setState({
      frequency: e.target.value
    })
    synth.frequency.value = this.state.frequency;
  },

  handleGainClick: function(e) {
    e.preventDefault();
    this.setState({
      gain: !this.state.gain
    });
    this.state.gain ? synth.gain = 0 : synth.gain = 1;
  },

  render: function() {
    return (
      <div>
        <GainButton on={this.state.gain} handleClick={this.handleGainClick}/>
        <FreqSlider frequency={this.state.frequency} handleSlide={this.handleSlide} />
      </div>
    )
  }
});

module.exports = Oscillator;
