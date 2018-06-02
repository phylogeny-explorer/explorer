import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  ButtonToolbar,
  Image,
  Grid,
  Row,
  Col,
  Glyphicon,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import s from './Form.css';
import Request from '../../core/Request';
import history from '../../core/history';
import Search from '../Search';
import PhylexEditor from '../Editor';
import S3 from 'common/aws/s3/Frontend';
import Link from '../../components/Link';

class Form extends React.Component {

  static propTypes = {
    clade: React.PropTypes.any,
    parent: React.PropTypes.any,
    mode: React.PropTypes.string,
  };

  constructor(props, context) {
    super(props);

    if (context.setTitle) {
      context.setTitle(`${this.props.mode} Clade ${this.props.clade ? this.props.clade.name || '[UNNAMED]' : ''}`);
    }

    if (this.props.mode !== 'Create') {
      this.state = {
        parent: this.props.clade.parent._id,
        name: this.props.clade.name || '',
        description: this.props.clade.description || '',
        extant: this.props.clade.extant || false,
        otherNames: this.props.clade.otherNames || '',
        assets: this.prepareExistingAssets(),
        newParent: '',
        newChildren: [],
        imagesToBeDeleted: [],
      };
    } else {
      this.state = {
        parent: this.props.parent._id,
        name: '',
        description: '',
        extant: false,
        otherNames: '',
        assets: [],
      };
    }

    this.state.submitting = false;
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  onDescriptionChange(html) {
    this.setState({ description: html });
  }

  onChange(e) {
    const model = {};
    this.setState(model);
    if (e.target.type === 'radio') {
      if (e.target.id === 'extant') {
        model.extant = e.target.checked;
      } else {
        model.extant = false;
      }
    } else {
      model[e.target.id] = e.target.value;
    }
  }

  onCancel(e) {
    e.preventDefault();
    history.goBack();
  }

  async onSubmit(e) {
    e.preventDefault();

    let payload = {};
    switch (this.props.mode) {
      case 'Create': {
        payload = this.prepareCreatePayload();
        break;
      }
      case 'Update': {
        payload = this.prepareUpdatePayload();
        break;
      }
      case 'Destroy': {
        payload = this.prepareDestroyPayload();
        break;
      }
      default: {
        break;
      }
    }

    this.setState({ submitting: true });

    const resp = await new Request('/transactions', 'POST', payload).fetch();

    const key = resp._id;

    if (key !== '') {
      history.goBack();
    } else {
      this.setState({ submitting: false });
    }
  }

  async onSubmitAttachments() {
    const cladeIds = this.state.newChildren.map((child) => child.id);
    const clades = await
      new Request('/clades/enrich', 'POST', { cladeIds }, Request.endPoints.public).fetch();
    for (let i = 0; i < clades.length; i += 1) {
      const dataBefore = JSON.parse(JSON.stringify(clades[i]));
      const dataAfter = JSON.parse(JSON.stringify(clades[i]));
      const assetsBefore = dataBefore.assets;
      const assetsAfter = dataBefore.assets;
      dataAfter.parent = this.props.clade._id;
      delete dataBefore.assets;
      delete dataAfter.assets;
      const postObj = {
        identifier: dataBefore._id,
        data: {
          before: dataBefore || {},
          after: dataAfter || {},
        },
        assets: {
          before: assetsBefore || [],
          after: assetsAfter || [],
        },
        mode: this.props.mode,
      };
      await new Request('/transactions', 'POST', postObj).fetch();
    }
  }

  onAddImages(files) {
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      (async () => {
        const s3Image = await new Request('/assets/temp', 'POST', { cladeImg: file }).fetch();
        if (s3Image.name) {
          s3Image.isDefault = false;
          if (this.state.assets.length === 0) {
            this.setState({ assets: [s3Image] });
          } else {
            this.setState({ assets: this.state.assets.concat(s3Image) });
          }
        }
      })();
    }
  }

  async onRemoveImage(e, asset) {
    e.preventDefault();
    const newAssets = this.state.assets;
    const postObj = asset;
    if (asset.folder === 'clades') {
      postObj.id = this.props.clade._id;
    }
    const request = await new Request(`/assets/${asset.folder}`,
      'DELETE', { asset: postObj });
    if (asset.folder === 'clades') {
      const imagesToBeDeleted = this.state.imagesToBeDeleted;
      imagesToBeDeleted.push(request);
      this.setState({ imagesToBeDeleted });
    } else {
      request.fetch();
    }

    for (let i = 0; i < this.state.assets.length; i += 1) {
      if (this.state.assets[i].name === asset.name) {
        newAssets.splice(i, 1);
        break;
      }
    }
    this.setState({ assets: newAssets });
  }

  onSetDefaultImage(e, imgObj) {
    e.preventDefault();
    const newAssets = this.state.assets;
    for (let i = 0; i < this.state.assets.length; i += 1) {
      newAssets[i].isDefault = (this.state.assets[i].name === imgObj.name);
    }
    this.setState({ assets: newAssets });
  }

  onSelectParent(id, value) {
    this.setState({ newParent: id });
  }

  onSearch(cladeName, cb) {
    (async () => {
      const items = await
        new Request('/clades/search', 'POST',
          { name: cladeName, self: this.props.clade._id },
          Request.endPoints.public)
          .fetch();
      cb(items);
    })();
  }

  getButtonStyle() {
    switch (this.props.mode) {
      case 'Destroy':
        return 'danger';
      case 'Update':
        return 'info';
      default:
        return 'success';
    }
  }

  prepareExistingAssets() {
    const existingAssets = [];
    for (let i = 0; i < this.props.clade.assets.length; i += 1) {
      existingAssets.push({
        name: this.props.clade.assets[i].name,
        isDefault: this.props.clade.assets[i].isDefault,
        folder: 'clades',
        link: S3.getCladeUrl(this.props.clade._id, this.props.clade.assets[i].name),
      });
    }
    return existingAssets;
  }

  prepareCreatePayload() {
    const dataAfter = {
      parent: this.state.newParent || this.state.parent,
      name: this.state.name || null,
      description: this.state.description || null,
      extant: this.state.extant,
      otherNames: this.state.otherNames || null,
    };

    const assetsAfter = this.state.assets.map((asset) =>
      ({
        name: asset.name,
        isDefault: asset.isDefault,
        folder: asset.folder,
      })
    );

    return {
      identifier: null,
      data: {
        before: {},
        after: dataAfter,
      },
      assets: {
        before: [],
        after: assetsAfter,
      },
      mode: this.props.mode,
    };
  }

  prepareUpdatePayload() {
    // TODO make this better
    for (let i = 0; i < this.state.imagesToBeDeleted.length; i += 1) {
      this.state.imagesToBeDeleted[i].fetch();
    }

    const dataBefore = {
      parent: this.props.clade.parent._id,
      name: this.props.clade.name,
      description: this.props.clade.description,
      extant: this.props.clade.extant,
      otherNames: this.props.clade.otherNames,
    };

    const assetsBefore = this.prepareExistingAssets();

    const dataAfter = {
      parent: this.state.newParent || this.state.parent,
      name: this.state.name || null,
      description: this.state.description || null,
      extant: this.state.extant || null,
      otherNames: this.state.otherNames || null,
    };

    const assetsAfter = this.state.assets.map((asset) =>
      ({
        name: asset.name,
        isDefault: asset.isDefault,
        folder: asset.folder,
      })
    );

    return {
      identifier: this.props.clade._id,
      data: {
        before: dataBefore,
        after: dataAfter,
      },
      assets: {
        before: assetsBefore,
        after: assetsAfter,
      },
      mode: this.props.mode,
    };
  }

  prepareDestroyPayload() {
    const dataBefore = {
      parent: this.props.clade.parent._id,
      name: this.props.clade.name,
      description: this.props.clade.description,
      extant: this.props.clade.extant,
      otherNames: this.props.clade.otherNames,
    };

    const assetsBefore = this.prepareExistingAssets();

    return {
      identifier: this.props.clade._id,
      data: {
        before: dataBefore,
        after: {},
      },
      assets: {
        before: assetsBefore,
        after: [],
      },
      mode: this.props.mode,
      hasChildren: this.props.clade.hasChildren,
    };
  }

  _onDragStart(ev) {
    ev.dataTransfer.setData('phylex-image', ev.target.src);
  }

  onExtantChange(extant) {
    this.setState({ extant });
  }

  onView(e) {
    e.preventDefault();
    history.push(`/clades/info/${this.props.clade._id}`);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.content_container}>
            <form onSubmit={(e) => this.onSubmit(e)}>

              <ButtonToolbar className={s.controls}>
                <Button type="submit" bsStyle={this.getButtonStyle()} disabled={this.state.submitting}>
                  {this.props.mode}
                </Button>
                <Button type="button" bsStyle="warning" onClick={(e) => this.onCancel(e)} disabled={this.state.submitting}>
                  Cancel
                </Button>
              </ButtonToolbar>

              {
                this.props.clade.parent &&
                <p className={s.clade_parent}>
                  <Link
                    to={`/clades/info/${this.props.clade.parent._id}`}>{this.props.clade.parent.name || '[UNNAMED]'}
                  </Link>
                  <span className="glyphicon glyphicon-menu-right" />
                </p>
              }

              <h1>{this.props.mode} Clade <i>{this.props.clade ? this.props.clade.name || '[UNNAMED]' : ''}</i></h1>

              <hr />

              {
                this.props.mode === 'Update' &&
                <Alert bsStyle="warning">
                  <FormGroup controlId="parent">
                    <ControlLabel>Set New Parent</ControlLabel>
                    <Search
                      id="newParent"
                      name="newParent"
                      placeholder="Start typing the parent's name"
                      onSelect={(id, value) => this.onSelectParent(id, value)}
                      onSearch={(name, cb) => this.onSearch(name, cb)}
                    />
                  </FormGroup>
                </Alert>
              }

              <FormGroup controlId="name">
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  placeholder="Name"
                  type="text"
                  value={this.state.name}
                  onChange={(e) => this.onChange(e)}
                  disabled={this.props.mode === 'Destroy'}
                />
              </FormGroup>

              <FormGroup controlId="otherNames">
                <ControlLabel>Alternative names</ControlLabel>
                <FormControl
                  placeholder="Alternative names"
                  type="text"
                  value={this.state.otherNames}
                  onChange={(e) => this.onChange(e)}
                  disabled={this.props.mode === 'Destroy'}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Status</ControlLabel>
                <div>
                  <ToggleButtonGroup
                    type="radio"
                    name="extant"
                    value={this.state.extant}
                    onChange={e => this.onExtantChange(e)}
                  >
                    <ToggleButton value={true}>Extant</ToggleButton>
                    <ToggleButton value={false}>Extinct</ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </FormGroup>

              <FormGroup controlId="description">
                <ControlLabel>Description</ControlLabel>
                <PhylexEditor
                  initialValue={this.state.description}
                  onChange={this.onDescriptionChange}
                  disabled={this.props.mode === 'Destroy'}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Clade Images</ControlLabel>
                <Grid>
                  <Row className="show-grid">
                    <Col xs={12} md={3}>
                      <Dropzone
                        style={{ display: this.props.mode === 'Destroy' ? 'none' : 'table' }}
                        onDrop={(e) => this.onAddImages(e)}
                        className={s.dropzone}
                      >
                        <div className={s.helpText}>
                          Drop Images Here<br/>
                          <b>.png, .jpg, .tiff</b>
                        </div>
                      </Dropzone>
                    </Col>
                    <Col xs={12} md={8}>
                      <Row>
                        <Col xs={12} md={12}>
                          {this.state.assets.length > 0 ? <div>
                            <h3>Uploaded Images: {this.state.assets.length}</h3>
                            {this.state.assets.map((asset, j) =>
                              <div key={j} className={s.thumbnail}>
                                <Image
                                  src={asset.link}
                                  thumbnail
                                  draggable="true"
                                  onDragStart={this._onDragStart}
                                />
                                <Button
                                  style={{
                                    display: this.props.mode === 'Destroy' ? 'none' : 'inline-block',
                                  }}
                                  bsSize="xsmall"
                                  onClick={(e) => this.onRemoveImage(e, asset)}
                                >
                                  <Glyphicon glyph="remove" />
                                </Button>
                                <Button
                                  style={{
                                    display: this.props.mode === 'Destroy' ? 'none' : 'inline-block',
                                  }}
                                  bsSize="xsmall"
                                  onClick={(e) => this.onSetDefaultImage(e, asset)}
                                >
                                  <Glyphicon glyph={asset.isDefault ? 'check' : 'unchecked'} />
                                </Button>
                              </div>
                            )}
                          </div> : null}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Grid>
              </FormGroup>

              <hr />

              <ButtonToolbar className={s.controls}>
                <Button type="submit" bsStyle={this.getButtonStyle()} disabled={this.state.submitting}>
                  {this.props.mode}
                </Button>
                <Button type="button" bsStyle="warning" onClick={(e) => this.onCancel(e)} disabled={this.state.submitting}>
                  Cancel
                </Button>
              </ButtonToolbar>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

Form.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Form);
