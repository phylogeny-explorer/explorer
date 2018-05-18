/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 21/10/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */
import React, { PropTypes } from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
  HelpBlock,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Clade.css';
import Tree from '../../components/Tree';
import history from '../../core/history';
import CladePopover from './CladePopover';
import Search from '../../components/Search';
import Request from '../../core/Request';

const title = 'Cladogram';

class Cladogram extends React.Component {
  static propTypes = {
    root: PropTypes.any.isRequired,
    depth: PropTypes.number.isRequired,
    actualDepth: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props);
    if (context.setTitle) {
      context.setTitle(title);
    }
    this.prepareState(props);
    this.isCladogramMounted = false;
  }

  componentDidMount() {
    this.isCladogramMounted = true;
    const dims = document.getElementsByClassName(s.container)[0];
    this.setState({
      width: dims.clientWidth,
      height: dims.clientHeight + 100,
    });
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
    this.isCladogramMounted = false;
  }

  componentWillReceiveProps(newProps) {
    // const dims = document.getElementsByClassName(s.container)[0];
    this.setState({
      width: this.state.width,
      height: this.state.height,
    });
    this.prepareState(newProps);
  }

  async pollData() {
    if (this.isCladogramMounted) {
      const response = await new Request(`/clades/tree/${this.state.root._id}/depth/${this.state.depth}`,
        'GET', {}, Request.endPoints.public).fetch();
      this.setState({root: response.root});
    }

    this._timeout = setTimeout(this.pollData.bind(this), 5000);
  }

  onChangeDepth(e) {
    history.push(`/clades/${this.state.id}/depth/${e.target.value}`);
  }

  async onSearchClade(cladeName, cb) {
    const items = await
      new Request('/clades/search', 'POST',
        { name: cladeName },
        Request.endPoints.public)
        .fetch();
    cb(items);
  }

  onSelectClade(id, value) {
    history.push(`/clades/${id}/depth/${this.state.depth}`);
  }

  onSelectNode(node) {
    if (node.id === this.state.id) {
      if (this.state.root.parent != null) {
        history.push(`/clades/${this.state.root.parent}/depth/${this.state.depth}`);
      }
    } else {
      history.push(`/clades/${node.id}/depth/${this.state.depth}`);
    }
  }

  prepareState(props) {
    this.state = {
      root: props.root,
      total: props.total,
      depth: props.depth,
      actualDepth: props.actualDepth,
      id: props.root._id,
      width: 0,
      height: 0,
    };
    this._timeout = setTimeout(this.pollData.bind(this), 5000);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <Form inline>
            <FormGroup controlId="search">
              <ControlLabel>Search</ControlLabel>
              &nbsp;&nbsp;
              <Search
                id="search"
                name="search"
                placeholder="Start typing the clade's name"
                onSelect={(id, value) => this.onSelectClade(id, value)}
                onSearch={(name, cb) => this.onSearchClade(name, cb)}
                inline
              />
            </FormGroup>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <FormGroup controlId="depth">
              <ControlLabel>Depth</ControlLabel>
              &nbsp;&nbsp;
              <FormControl
                componentClass="select"
                value={this.state.depth}
                onChange={(e) => this.onChangeDepth(e)}
                required
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </FormControl>
            </FormGroup>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <FormGroup>
              <FormControl.Static>
                <HelpBlock><i>Actual Depth:  {this.state.actualDepth}</i></HelpBlock>
              </FormControl.Static>
            </FormGroup>
          </Form>
          <Tree
            root={this.state.root}
            width={this.state.width}
            height={this.state.height}
            onSelectNode={(e) => this.onSelectNode(e)}
            popoverComponent={CladePopover}
          />
        </div>
      </div>
    );
  }
}

Cladogram.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Cladogram);
