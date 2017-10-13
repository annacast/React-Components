import React from 'react';
import { Link } from 'react-router';

class PaginationNumButton extends React.Component {
  onChangePage() {
    this.props.onChangePage(this.props.value);
  }

  render() {
    if (this.props.useFunctions) {
      return (
        <li className={this.props.className}>
          <button
            className="btn btn-sm btn-pagination-num"
            onClick={this.onChangePage.bind(this)}
          >
            {this.props.caption}
          </button>
        </li>
      );
    }

    return (
      <li className={this.props.className}>
        <Link
          className="btn btn-sm btn-pagination-num"
          to={{
            pathname: this.props.to,
            query: this.props.query,
          }}
        >
          {this.props.caption}
        </Link>
      </li>
    );
  }
}

PaginationNumButton.propTypes = {
  caption: React.PropTypes.number.isRequired,
  className: React.PropTypes.string,
  query: React.PropTypes.object,
  to: React.PropTypes.string,

  // function specific
  onChangePage: React.PropTypes.func,
  useFunctions: React.PropTypes.bool,
  value: React.PropTypes.number,
};

export default PaginationNumButton;
