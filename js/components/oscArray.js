const React = require('react');
const Oscillator = require('./oscComponent');
const Scope = require('./scope');

const OscillatorArray = (props) => {
  return (
    <div className="osc-array-main">
      <button onClick={props.onAdd}>Add New Oscillator</button>
      <div className="osc-array">
        {props.oscillators.map((osc) =>
          <Oscillator
            id={osc.id}
            key={osc.id}
            osc={osc.osc}
            destroy={props.destroy}
          />
         )}
      </div>
      <Scope signal={props.summedSignal} />
    </div>
  )
};

module.exports = OscillatorArray;
