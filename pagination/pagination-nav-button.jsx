import React from 'react';
import { Link } from 'react-router';

class PaginationNavButton extends React.Component {
  onChangePage() {
    this.props.onChangePage(this.props.value);
  }

  render() {
    if (this.props.useFunctions || this.props.disabled) {
      return (
        <li>
          <button
            className="btn btn-pagination-nav"
            disabled={this.props.disabled}
            onClick={this.onChangePage.bind(this)}
          >
            <img
              className="pagination-icon"
              src={this.props.caption}
              alt="GoSpce pagination"
            />
          </button>
        </li>
      );
    }

    return (
      <li>
        <Link
          className="btn btn-pagination-nav"
          disabled={this.props.disabled}
          to={{
            pathname: this.props.to,
            query: this.props.query,
          }}
        >
          <img
            className="pagination-icon"
            src={this.props.caption}
            alt="GoSpce pagination"
          />
        </Link>
      </li>
    );
  }
}

PaginationNavButton.propTypes = {
  caption: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  query: React.PropTypes.object,
  to: React.PropTypes.string,

  // function specific
  onChangePage: React.PropTypes.func,
  useFunctions: React.PropTypes.bool,
  value: React.PropTypes.number,
};

export default PaginationNavButton;
