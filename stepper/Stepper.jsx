/* global _ */
import React from 'react';

class Stepper extends React.Component {
  render() {
    const id = _.uniqueId('stepper_');
    const required = this.props.isRequired ? 'required' : '';
    return (
      <div className={`form-group ${required}`}>
        <label htmlFor={id}>{this.props.label}</label>
        <div className="row stepper" id={id}>
          <div className="step-group">
            <button
              type="button"
              className="btn-step-down"
              onClick={this.props.onClickSubtract}
              disabled={this.props.value <= 1}
            />
          </div>
          <div className="step-group">
            <div className="stepper-value">{this.props.value}</div>
          </div>
          <div className="step-group">
            <button
              type="button"
              className="btn-step-up"
              onClick={this.props.onClickAdd}
              disabled={_.gte(this.props.value, this.props.maxValue)}
            />
          </div>
        </div>
      </div>
    );
  }
}

Stepper.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.number.isRequired,
  maxValue: React.PropTypes.number,
  onClickAdd: React.PropTypes.func.isRequired,
  onClickSubtract: React.PropTypes.func.isRequired,
  isRequired: React.PropTypes.bool,
};

export default Stepper;
