/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 02/12/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */
///
import React from 'react';
import AutoComplete from 'react-autocomplete';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Search.css';
import debounce from 'throttle-debounce/debounce';
import reactStringReplace from 'react-string-replace';

class Search extends React.Component {
  static propTypes = {
    onSelect: React.PropTypes.any.isRequired,
    onSearch: React.PropTypes.any.isRequired,
    items: React.PropTypes.any,
    id: React.PropTypes.any.isRequired,
    name: React.PropTypes.any.isRequired,
    placeholder: React.PropTypes.any,
    value: React.PropTypes.any,
    resetAfterSelection: React.PropTypes.bool,
    inline: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: this.props.items || [],
      loading: false,
    };
    this.search = debounce(600, this.search.bind(this));
  }

  onSelect(value, item) {
    this.setState({
      value,
      items: [item],
    });
    this.props.onSelect(item._id, item.name);
    if (this.props.resetAfterSelection) {
      this.resetComponent();
    }
  }

  onChange(e, value) {
    e.preventDefault();
    this.setState({ value, loading: true });
    if (!value.length) {
      this.setState({items:[], loading: false});
      return;
    }
    this.search(value);
  }

  search(value) {
    this.props.onSearch(value, (items) => {
      if (this.state.value.length === 0) items = [];
      this.setState({ items, loading: true });
    });
  }

  onRenderItem(item, isHighlighted) {
    console.log(this.state.value);
    let name = reactStringReplace(item.name, this.state.value, (match, i) => (
      <span className={s.match}>{match}</span>
    ));

    let otherNames = item.otherNames ? reactStringReplace(item.otherNames, this.state.value, (match, i) => (
      <span className={s.match}>{match}</span>
    )) : null;

    return (
      <div
        className={`${s.item} ${isHighlighted ? s.highlightedItem : ''}`}
        key={item._id}
        id={item._id}
      >
        <strong>{name}</strong>
        {
          otherNames &&
          <div><small>{otherNames}</small></div>
        }
      </div>
    );
  }

  resetComponent() {
    this.setState({
      value: '',
      items: [],
    });
  }

  render() {
    return (
      <AutoComplete
        inputProps={{
          name: this.props.name,
          id: this.props.id,
          type: 'text',
          className: 'form-control ' + s.search_input,
          placeholder: this.props.placeholder,
        }}
        value={this.state.value}
        items={this.state.items}
        getItemValue={(item) => item.name}
        onSelect={(value, item) => this.onSelect(value, item)}
        onChange={(event, value) => this.onChange(event, value)}
        renderItem={(item, isHighlighted) => this.onRenderItem(item, isHighlighted)}
        menuStyle={{
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#ffffff',
          padding: '2px 0',
          fontSize: '90%',
          position: 'absolute',
          overflow: 'auto',
          maxHeight: '400px',
          zIndex: '1000',
          top: '36px',
          left: 0,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        }}
        wrapperStyle={{
          display: this.props.inline ? 'inline-block' : 'block',
          width: '100%',
        }}
      />
    );
  }
}

export default withStyles(s)(Search);
