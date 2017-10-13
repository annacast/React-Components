/* global $, _ */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

class AutoSuggest extends React.Component {
  constructor() {
    super();
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(e) {
    if (this.props.onBlur) this.props.onBlur(e.target.value);
  }

  onSelect(option, e) {
    e.preventDefault();
    this.props.onSelect(option);
  }

  render() {
    const id = this.props.id ? this.props.id : _.uniqueId('react-select_');
    const optionsId = _.uniqueId('react-select-options_');
    const placeholder = this.props.placeholder ? this.props.placeholder : `Select ${this.props.label}`;
    const extraClass = this.props.extraClass ? ` ${this.props.extraClass}` : '';
    const extraFormClass = this.props.extraFormClass ? ` ${this.props.extraFormClass}` : '';
    const required = this.props.isRequired ? ' required' : '';
    const showOptions = this.props.isOpen ? '_show-options' : '';
    return (
      <div className={`form-group react-select${extraClass}${required}`}>
        <label htmlFor={id}>{this.props.label}</label>
        <input
          id={id}
          type="text"
          className={`form-control form-search${extraFormClass}`}
          placeholder={placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.onBlur}
        />
        <ul id={optionsId} className={showOptions}>
          {
            this.props.options.map((option, idx) => {
              const withImage = this.props.withImage ? '_with-image' : '';
              const imgUrl = _.isNull(option.image) ? '/assets/images/empty-states/profile-default.svg' : option.image;
              return (
                <li
                  type="button"
                  key={idx}
                  id={option.id}
                  className={withImage}
                  onClick={this.onSelect.bind(this, option)}
                >
                  {
                    this.props.withImage
                    ? (<div className="img-holder"><img src={imgUrl} alt={option.label} /></div>)
                    : null
                  }
                  <div className="text-holder">
                    {option.label}
                    {
                      option.sublabel
                      ? (<div className="sublabel">{option.sublabel}</div>)
                      : null
                    }
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

AutoSuggest.propTypes = {
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  extraClass: React.PropTypes.string,
  extraFormClass: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.any.isRequired,
    label: React.PropTypes.string.isRequired,
    sublabel: React.PropTypes.string,
    image: React.PropTypes.string,
  })).isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onBlur: React.PropTypes.func,
  isOpen: React.PropTypes.bool.isRequired,
  isRequired: React.PropTypes.bool,
  withImage: React.PropTypes.bool,
};

export default AutoSuggest;
