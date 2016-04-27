const React = require('react');

const TypeToggle = (props) => {
  let types = ['sine', 'square', 'sawtooth', 'triangle']
  let active = { border: "1px solid purple"}
  return(
    <div>
      {types.map((type) => {
        return <p onClick={props.handleToggle} value={type} style={props.type === type ? active : null}>{type}</p>
      })}
    </div>
  )
}

module.exports = TypeToggle;
