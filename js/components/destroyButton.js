const React = require('react');

const DestroyButton = (props) => {
  let handleClick = function() {
    props.onDestroy(props.id);
  };

  return (
    <button onClick={handleClick}>DESTROY</button>
  )
};

module.exports = DestroyButton;
