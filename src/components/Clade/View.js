/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 14/11/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Button,
  ButtonToolbar,
  Image,
  Clearfix,
} from 'react-bootstrap';
import Link from '../../components/Link';
import s from './View.css';
import history from '../../core/history';
import S3 from 'common/aws/s3/Frontend';
import { Citation as AttributionsCitation } from '../Citation';

class CladeView extends React.Component {

  static propTypes = {
    clade: React.PropTypes.any,
  };

  constructor(props, context) {
    super(props);
    if (context.setTitle) {
      context.setTitle(this.props.clade.name);
    }
  }

  goBack(e) {
    e.preventDefault();
    history.goBack();
  }

  edit(e) {
    e.preventDefault();
    history.push(`/clades/update/${this.props.clade._id}`);
  }

  hasOtherNames() {
    return this.props.clade.otherNames && this.props.clade.otherNames.length > 0;
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.content_container}>
            <ButtonToolbar className={s.controls}>
              <Button type="button" bsStyle="success" onClick={(e) => this.edit(e)}>Edit</Button>
              <Button type="button" bsStyle="info" onClick={(e) => this.goBack(e)}>Return To Tree</Button>
            </ButtonToolbar>

            {this.props.clade.parent &&
              <p className={s.clade_parent}>
                <Link
                  to={`/clades/info/${this.props.clade.parent._id}`}>{this.props.clade.parent.name || '[UNNAMED]'}
                </Link>
                <span className="glyphicon glyphicon-menu-right" />
              </p>
            }

            <table>
              <tr>
                <td>
                  <h1>{!this.props.clade.extant && <sup>†</sup>}{this.props.clade.name}</h1>
                </td>
                <td className={s.attribution}>
                  <AttributionsCitation attributions={this.props.clade.attributions} />
                </td>
              </tr>
            </table>

            { this.hasOtherNames() && <p className={s.alternate_names}><b>Alternate Names:</b> {this.props.clade.otherNames}</p> }

            <a href={`https://en.wikipedia.org/wiki/${this.props.clade.name}`}>Lookup In Wikipedia</a>

            <hr />

            { this.props.clade.description && this.props.clade.description.length > 0
              ? <div dangerouslySetInnerHTML={{ __html: this.props.clade.description }} />
              : <p>No description provided.</p>
            }

            <div className={s.image_container}>
              {this.props.clade.assets.map((asset, j) =>
                <div key={j} className={s.thumbnail}>
                  <Image
                    src={S3.getCladeUrl(this.props.clade._id, asset.name)}
                    thumbnail
                  />
                </div>
              )}
            </div>

            <hr />
            <ButtonToolbar className={s.controls}>
              <Button type="button" bsStyle="success" onClick={(e) => this.edit(e)}>Edit</Button>
              <Button type="button" bsStyle="info" onClick={(e) => this.goBack(e)}>Return To Tree</Button>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }
}

CladeView.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(CladeView);
