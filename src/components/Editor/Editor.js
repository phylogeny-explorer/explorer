/* eslint-disable no-console */
/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 04/12/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import React from 'react';
import 'react-dom';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  AtomicBlockUtils,
  Editor,
  EditorState,
  RichUtils,
  Entity,
  ContentState,
  convertFromHTML,
  CompositeDecorator,
} from 'draft-js';
import MediaBlockRenderer from './MediaBlockRenderer';
import { BlockStyleControls, InlineStyleControls, getBlockStyle } from './RichControls';
import s from './RichEditor.css';

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{
      color: '#3b5998',
      textDecoration: 'underline',
    }}>
      {props.children}
    </a>
  );
};

const options = {
  blockRenderers: {
    atomic: (block) => `<img src="${block.getText()}" />`,
  },
};

const Image = (props) => {
  const { src } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <img src={src} />
  );
};

function findImageEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'IMAGE'
      );
    },
    callback
  );
}

class PhylexEditor extends React.Component {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: findImageEntities,
        component: Image,
      },
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);

    if (props.initialValue) {
      const blocksFromHTML = convertFromHTML(props.initialValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );
      this.state = {
        editorState: EditorState.createWithContent(contentState, decorator),
        linkAddress: '',
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty(),
        linkAddress: '',
      };
    }
    this._onChange = this._onChange.bind(this);
    this._handleKeyCommand = this._handleKeyCommand.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this.editor = null;
    this._onConvertToLink = this._onConvertToLink.bind(this);
    this.focus = () => this.editor.focus();
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this._onLinkAddressChange = this._onLinkAddressChange.bind(this);
  }

  _onTab(e) {
    const maxDepth = 4;
    this._onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _onLinkAddressChange(e) {
    this.setState({ linkAddress: e.target.value });
  }

  _toggleBlockType(blockType) {
    this._onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _onChange(editorState) {
    this.setState({ editorState }, () => {
      this.props.onChange(stateToHTML(this.state.editorState.getCurrentContent(), options));
    });
  }

  _toggleInlineStyle(inlineStyle) {
    this._onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _onDrop(selectionState, dataTransfer) {
    const imgSrc = dataTransfer.data.getData('phylex-image');
    this._addImage(imgSrc);
    return true;
  }

  _addImage(urlValue) {
    const { editorState } = this.state;
    const entityKey = Entity.create('image', 'IMMUTABLE', { src: urlValue });
    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        urlValue
      ),
    }, () => {
      setTimeout(() => this.editor.focus(), 0);
    });
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this._onChange(newState);
      return true;
    }
    return false;
  }

  _onConvertToLink() {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: this.state.linkAddress }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey,
      ),
      linkAddress: '',
    }, () => {
      setTimeout(() => this.editor.focus(), 0);
    });
  }

  render() {
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = s['RichEditor-editor'];
    const contentState = this.state.editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ` ${s['RichEditor-hideplaceholder']}`;
      }
    }

    return (
      <div className={s['RichEditor-root']}>
        {!this.props.disabled && (
          <div>
            <div>
              <a className={s['link-generator-btn']} onClick={this._onConvertToLink}>LINK</a>
              <input
                type="text"
                onChange={this._onLinkAddressChange}
                value={this.state.linkAddress}
              />
            </div>
            <BlockStyleControls
              editorState={this.state.editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={this.state.editorState}
              onToggle={this.toggleInlineStyle}
            />
          </div>
        )}
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            blockRendererFn={MediaBlockRenderer}
            onTab={this.onTab}
            handleDrop={this._onDrop}
            editorState={this.state.editorState}
            handleKeyCommand={this._handleKeyCommand}
            onChange={this._onChange}
            placeholder="Start typing here..."
            ref={(ref) => this.editor = ref}
            readOnly={this.props.disabled}
            spellCheck
          />
        </div>
      </div>
    );
  }
}

PhylexEditor.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  initialValue: React.PropTypes.string.isRequired,
};

export default withStyles(s)(PhylexEditor);
