/* global _ */
import React from 'react';

import PaginationNavButton from './pagination-nav-button';
import PaginationNumButton from './pagination-num-button';

const minSeparatorDistance = 3;

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: props.totalPages > 0 ? props.totalPages : 1,
      maxVisiblePages: props.maxVisiblePages,
      activePage: props.activePage > 0 ? props.activePage : 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalPages: nextProps.totalPages > 0 ? nextProps.totalPages : 1,
      maxVisiblePages: nextProps.maxVisiblePages,
      activePage: nextProps.activePage > 0 ? nextProps.activePage : 1,
    });
  }

  renderNumberButtons() {
    const {
      totalPages,
      maxVisiblePages,
      activePage,
    } = this.state;

    let numbers = [];

    if (totalPages <= maxVisiblePages || totalPages < 5) {
      numbers = _.range(1, totalPages + 1, 1);

      // active page is near first page
    } else if (activePage <= minSeparatorDistance + 1) {
      const tail = [-1, totalPages]; // separator and last page
      const maxNumber = (maxVisiblePages - tail.length) + 1;
      numbers = _.range(1, maxNumber).concat(tail);

      // active page is near last page
    } else if (activePage >= totalPages - minSeparatorDistance) {
      const head = [1, -1]; // 1 and separator
      const minRangeNumber = (totalPages - (maxVisiblePages - head.length)) + 1;
      const maxRangeNumber = totalPages + 1; // range is exclusive
      const tail = _.range(minRangeNumber, maxRangeNumber);
      numbers = head.concat(tail);

      // need two separators
    } else {
      const head = [1, -1];
      const tail = [-2, totalPages];

      // count lengths for every part of middle range
      const middleLength = maxVisiblePages - head.length - tail.length;
      const upperLength = Math.floor(middleLength / 2);
      const lowerLength = middleLength - upperLength - 1;

      const startNumber = activePage - lowerLength;
      const endNumber = activePage + upperLength + 1;

      const middle = _.range(startNumber, endNumber);
      numbers = head.concat(middle).concat(tail);
    }

    return this.renderNumberList(numbers, activePage);
  }

  renderNumberList(numbers, activePage) {
    return numbers.map((num) => {
      if (num < 0) { // separator
        const key = `separator-${num}`;
        return (
          <li key={key}>
            <div className="separator">
              ...
            </div>
          </li>
        );
      }

      const cssClass = (activePage === num) ? 'active' : '';

      if (!this.props.useFunctions) {
        const query = Object.assign({}, this.props.query, {
          activePage: num,
        });

        return (
          <PaginationNumButton
            className={cssClass}
            caption={num}
            key={`pag-btn-${num}`}
            to={this.props.to}
            query={query}
          />
        );
      }

      return (
        <PaginationNumButton
          className={cssClass}
          caption={num}
          key={`pag-btn-${num}`}
          onChangePage={this.props.onChangePage}
          useFunctions
          value={num}
        />
      );
    });
  }

  renderNavButton(direction) {
    const { totalPages, activePage } = this.state;
    const currentPage = activePage;
    const props = {};

    if (direction === -1) {
      props.caption = '/assets/images/flaticon-left.png';
      props.disabled = currentPage === 1;
    } else {
      props.caption = '/assets/images/flaticon-right.png';
      props.disabled = currentPage === totalPages;
    }

    const value = currentPage + direction;

    if (!this.props.useFunctions) {
      const query = Object.assign({}, this.props.query, {
        activePage: value,
      });

      return (
        <PaginationNavButton
          caption={props.caption}
          disabled={props.disabled}
          to={this.props.to}
          query={query}
        />
      );
    }

    return (
      <PaginationNavButton
        caption={props.caption}
        disabled={props.disabled}
        onChangePage={this.props.onChangePage}
        value={value}
        useFunctions
      />
    );
  }

  render() {
    const { activePage, totalPages } = this.state;
    const { alwaysShow, totalCount } = this.props;
    if (totalPages < 2 && !alwaysShow) return null;

    const from = ((activePage * 10) - 10) + 1;
    const to = (activePage * 10 > totalCount) ? totalCount : (activePage * 10);
    return (
      <ul className="space-pagination">
        {this.renderNavButton(-1)}
        {this.renderNumberButtons()}
        {this.renderNavButton(1)}
        <li className="count-label">
          Showing {from} to {to} of {totalCount}
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = {
  activePage: React.PropTypes.number,
  alwaysShow: React.PropTypes.bool,
  maxVisiblePages: React.PropTypes.number.isRequired,
  query: React.PropTypes.object,
  to: React.PropTypes.string,
  totalPages: React.PropTypes.number.isRequired,
  totalCount: React.PropTypes.number.isRequired,

  // false will use links
  // use useFunctions when you don't want
  // the browser history to change after
  // a page change
  useFunctions: React.PropTypes.bool,
  onChangePage: React.PropTypes.func, // needs useFunctions true for usage
};

export default Pagination;
