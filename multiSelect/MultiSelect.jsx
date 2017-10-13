 /* global _, $ */
import React from 'react';

class MultiSelect extends React.Component {
  onClickSelect(item, e) {
    e.preventDefault();
    this.props.onClickSelect(item);
  }

  onSearch(e) {
    const searchtext = e.target.value;
    const li = $('li.ms-elem-selectable');
    _.forEach(li, (value) => {
      const searchkey = value.getElementsByTagName('span')[0].innerHTML;
      const v = value;
      if (_.includes(searchkey.toUpperCase(), searchtext.toUpperCase())) {
        v.style.display = '';
      } else {
        v.style.display = 'none';
      }
    });
  }

  processOptions() {
    if (this.props.selection.length <= 0) {
      return <li className="empty">Selection list empty</li>;
    }
    if (this.props.withGroup) {
      const optByGroup = _.groupBy(this.props.selection, 'parent.name');
      const collection = _.mapValues(optByGroup, (item, idx) => {
        const items = item.map((i) => {
          return (
            <li key={i.id} className="ms-elem-selectable" value={i.id}>
              <span>{i.name}</span>
              <button
                className="btn-arrow-right pull-right"
                onClick={this.onClickSelect.bind(this, i)}
              />
            </li>
          );
        });
        return (<ul className="ms-optgroup-container" key={idx}>{items}</ul>);
      });
      const selection = [];
      _.forIn(collection, (value, key) => {
        selection.push((
          <li key={key}>
            <span className="ms-optgroup-label">{key}</span>
            {value}
          </li>
        ));
      });
      return selection;
    }

    return this.props.selection.map((item, index) => {
      const crumbs = item.crumbs ? <div className="crumbs">{item.crumbs}</div> : null;
      return (
        <li key={index} className="ms-elem-selectable" value={item.id}>
          <span>{crumbs}<div>{item.name}</div></span>
          <button
            type="button"
            className="btn-arrow-right"
            onClick={this.onClickSelect.bind(this, item)}
          />
        </li>
      );
    });
  }

  renderSelectedList() {
    if (this.props.selected.length <= 0) {
      return <li className="empty">No data selected yet.</li>;
    }
    return this.props.selected.map((item, index) => {
      const parent = (item.parent) ? `${item.parent.name} > ` : '';
      const crumbs = item.crumbs ? <div className="crumbs">{item.crumbs}</div> : null;
      return (
        <li key={index} className="ms-elem-selected" value={item.id}>
          <div className="col-md-9">{crumbs}<div>{parent}{item.name}</div></div>
          <button
            className="btn-trash-can"
            onClick={this.props.onClickDelete.bind(this, index, item)}
          />
        </li>
      );
    });
  }

  render() {
    const id = _.uniqueId('multiselect_');
    const required = this.props.isRequired ? 'required' : '';
    const extraClass = this.props.extraClass ? this.props.extraClass : '';
    const formText = this.props.extraClass ? 'text-label' : '';
    return (
      <div className={`form-group ${required} ${extraClass}`}>
        {
          _.isEmpty(this.props.label)
          ? null
          : <label className={formText} htmlFor={id}>{this.props.label}</label>
        }
        <div id={id} className="multi-select-wrapper">
          <div className="row ms-container">
            <div className="col-md-6">
              <div className="ms-selectable">
                <div className="ms-header">{this.props.selectableHeader}</div>
                <div className="search-bar">
                  <div className="col-md-12">
                    <input
                      id="search-multi-list"
                      type="text"
                      className="form-control"
                      placeholder="Search list"
                      onChange={this.onSearch.bind(this)}
                    />
                  </div>
                </div>
                <ul className="ms-list">
                  {this.processOptions()}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="ms-selection">
                <div className="ms-header">{this.props.selectionHeader}</div>
                <ul className="ms-list">
                  {this.renderSelectedList()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MultiSelect.propTypes = {
  withGroup: React.PropTypes.bool,
  label: React.PropTypes.string,
  extraClass: React.PropTypes.string,
  selectableHeader: React.PropTypes.string.isRequired,
  selectionHeader: React.PropTypes.string.isRequired,
  onClickSelect: React.PropTypes.func.isRequired,
  onClickDelete: React.PropTypes.func.isRequired,
  selection: React.PropTypes.array,
  selected: React.PropTypes.any,
  isRequired: React.PropTypes.bool,
};

export default MultiSelect;
