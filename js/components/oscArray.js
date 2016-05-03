const React = require('react');
const OscComponent = require('./oscComponent');
const Scope = require('./scope');

let createOscComponent = (oscComp) => {
  return <OscComponent key={oscComp.id} osc={oscComp.osc}/>
}

const OscillatorArray = (props) => {
  return (
    <div className="osc-array-main">
      <div className="osc-array">
        {props.oscillators.map(createOscComponent)}
      </div>
      <Scope signal={props.oscillators.map((osc) => osc.osc.getOscNode())} />
    </div>
  )
};

module.exports = OscillatorArray;
