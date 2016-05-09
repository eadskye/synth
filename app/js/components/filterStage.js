const React = require('react');
const Filter = require('./filterComponent');

/*
 * The filter stage controls parameters between two filters.
 * Filters can be run in serial or parallel. The filter stage should
 * not need to be rerendered
 */
const FilterStage = (props) => {
  let routing = "serial";
  let mix = 0.0;

  return (
    <Filter signal={props.signal} />
  )
};

module.exports = FilterStage;
