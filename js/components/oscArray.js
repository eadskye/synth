const React = require('react');
const OscComponent = require('./oscComponent');

const OscillatorArray = (props) => {
  let createOsc = (osc) => {
    return <OscComponent key={osc.id} />
  }
  return <div>{props.oscillators.map(createOsc)}</div>
};

module.exports = OscillatorArray;
