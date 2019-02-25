import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  Form,
  Button,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cladogram.css';
import Tree from '../../components/Tree';
import history from '../../core/history';
import Pane from './Pane';
import Search from '../../components/Search';
import Request from '../../core/Request';

const HEADER_HEIGHT = 62;

const resetViewTooltip = (<Tooltip>Reset Zoom / Center Cladogram</Tooltip>);
const depthTooltip = (<Tooltip>Depth</Tooltip>);

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
      context.setTitle('Phylogeny Explorer');
    }
    this.prepareState(props);
    this.resetView = this.resetView.bind(this);
  }

  componentDidMount() {
    const dims = document.getElementsByClassName(s.container)[0];
    dims && this.setState({
      width: dims.clientWidth,
      height: window.innerHeight - HEADER_HEIGHT,
    });
  }

  componentWillReceiveProps(newProps) {
    // const dims = document.getElementsByClassName(s.container)[0];
    this.setState({
      width: this.state.width,
      height: this.state.height,
      root: newProps.root,
      total: newProps.total,
      depth: newProps.depth,
      actualDepth: newProps.actualDepth,
      id: newProps.root._id,
      scale: 1,
      matrix: [1, 0, 0, 1, 0, 0],
    });
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
      scale: 1,
      matrix: [1, 0, 0, 1, 0, 0],
    };
  }

  resetView(e) {
    e.preventDefault();
    this.setState({ matrix: [1, 0, 0, 1, 0, 0] });
  }

  render() {
    let options = [];
    for (let i = 1; i <= 9; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }

    return (
      <div className={s.container}>
        <Form inline className={s.search_form}>
          <FormGroup controlId="search" className={s.search_form_group}>
            <Search
              id="search"
              name="search"
              placeholder="Search for Clade"
              onSelect={(id, value) => this.onSelectClade(id, value)}
              onSearch={(name, cb) => this.onSearchClade(name, cb)}
              inline
            />
          </FormGroup>
          <OverlayTrigger placement="bottom" overlay={depthTooltip}>
            <FormGroup controlId="depth" className={s.depth_form_group}>
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
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </FormControl>
            </FormGroup>
          </OverlayTrigger>
        </Form>
        <Tree
          root={this.state.root}
          width={this.state.width}
          height={this.state.height}
          onSelectNode={(e) => this.onSelectNode(e)}
          popoverComponent={Pane}
          depth={this.state.actualDepth}
          matrix={this.state.matrix}
        />
        <OverlayTrigger placement="left" overlay={resetViewTooltip}>
          <Button
            bsStyle="default"
            className={s.reset_button}
            onClick={e => this.resetView(e)}
          ><span className="glyphicon glyphicon-screenshot" /></Button>
        </OverlayTrigger>
      </div>
    );
  }
}

Cladogram.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Cladogram);
