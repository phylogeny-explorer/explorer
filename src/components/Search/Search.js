/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 02/12/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import React from 'react';
import AutoComplete from 'react-autocomplete';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Search.css';

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
    this.props.onSearch(value, (items) => {
      this.setState({ items, loading: false });
    });
  }

  // onRenderMenu(items, value, style) {
  //   return (
  //     <div className={s.menu} style={{ ...style }}>
  //       {value === '' ? (
  //         <div style={{ padding: 6 }}>Please type a name of a {this.props.name}</div>
  //       ) : this.state.loading ? (
  //         <div style={{ padding: 6 }}>Loading...</div>
  //       ) : items.length === 0 ? (
  //         <div style={{ padding: 6 }}>No matches for {value}</div>
  //       ) : this.onRenderItems(items)}
  //     </div>
  //   );
  // }

  onRenderItem(item, isHighlighted) {
    return (
      <div
        className={isHighlighted ? s.highlightedItem : s.item}
        key={item._id}
        id={item._id}
      >{item.name}</div>);
  }

  // onRenderItems(items) {
  //   return items.map((item, index) => {
  //     const text = item.props.children;
  //     if (index === 0 || items[index - 1].props.children.charAt(0) !== text.charAt(0)) {
  //       const style = {
  //         background: '#eee',
  //         color: '#454545',
  //         padding: '2px 6px',
  //         fontWeight: 'bold',
  //       };
  //       return [<div style={style}>{text.charAt(0)}</div>, item];
  //     } else {
  //       return item;
  //     }
  //   });
  // }

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
          className: 'form-control',
          placeholder: this.props.placeholder,
        }}
        value={this.state.value}
        items={this.state.items}
        getItemValue={(item) => item.name}
        onSelect={(value, item) => this.onSelect(value, item)}
        onChange={(event, value) => this.onChange(event, value)}
        renderItem={(item, isHighlighted) => this.onRenderItem(item, isHighlighted)}
        menuStyle={{
          borderRadius: '3px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '2px 0',
          fontSize: '90%',
          position: 'absolute',
          overflow: 'auto',
          maxHeight: '50%',
          zIndex: '1000',
        }}
        wrapperStyle={{ display: this.props.inline ? 'inline-block' : 'block', }}
      />
    );
  }
}

export default withStyles(s)(Search);
