/* global _, $ */

import React from 'react';

export default class Slider extends React.Component {
  render() {
    const id = this.props.id ? this.props.id : _.uniqueId('slider');
    const extraClass = !_.isUndefined(this.props.extraClass) ? this.props.extraClass : '';
    const disabled = this.props.isDisabled ? 'disabled' : '';
    if (this.props.isDisabled) {
      $(document).on('click', 'label.slider-label.disabled', (e) => {
        e.preventDefault();
        return false;
      });
    }

    return (
      <label className={`slider-label ${extraClass} ${disabled}`} htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <span className="slider">
          <span className="sliderOn">&nbsp;</span>
          <span className="sliderOff">&nbsp;</span>
          <span className="sliderBlock">&nbsp;</span>
        </span>
      </label>
    );
  }
}

Slider.propTypes = {
  id: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  checked: React.PropTypes.bool.isRequired,
  extraClass: React.PropTypes.string,
  isDisabled: React.PropTypes.bool,
};
