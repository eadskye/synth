const React = require('react');
const GainButton = require('./components/gainButton');
const FreqSlider = require('./components/freqSlider');
const Synth = require('./synth');
const audioCtx = require('./helpers/audioctx');

const Oscillator = React.createClass({
  synth: {},
  getInitialState: function() {
    return {
      frequency: 100,
      gain: false
    }
  },

  componentDidMount: function() {
    this.synth = new Synth(audioCtx);
    this.synth.setGain(0);
    this.synth.setFreq(this.state.frequency);
    this.synth.start();
  },

  handleSlide: function(e) {
    this.setState({
      frequency: e.target.value
    })
    this.synth.setFreq(this.state.frequency);
  },

  handleGainClick: function(e) {
    e.preventDefault();
    this.setState({
      gain: !this.state.gain
    });
    this.state.gain ? this.synth.setGain(0) : this.synth.setGain(1);
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
