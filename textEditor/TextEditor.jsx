/* global tinymce, _, $ */

import React from 'react';
import NetworkService from '../../utils/networkService';

const editorLoader = window.__env.editorLoader;

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: _.uniqueId('textarea'),
      isEditorLoaded: window.__env.editorLoader.getValue(),
    };
    this.div = null;
    this.onEditorLoad = this.onEditorLoad.bind(this);
    this.attachEditor = this.attachEditor.bind(this);
    this.editorListener = editorLoader.registerListener(this.onEditorLoad);
    this.preloadEditorLibrary();
  }

  componentDidMount() {
    if (this.state.isEditorLoaded) {
      setTimeout(this.attachEditor, 200);
    }
  }

  componentDidUpdate() {
    if (this.state.isEditorLoaded) {
      tinymce.remove(`#${this.state.id}`);
      setTimeout(this.attachEditor, 200);
    }
  }

  componentWillUnmount() {
    tinymce.remove(`#${this.state.id}`);
    editorLoader.removeListener(this.editorListener);
  }

  onEditorLoad(isEditorLoaded) {
    if (isEditorLoaded && !this.state.isEditorLoaded) {
      this.setState({ isEditorLoaded });
    }
  }

  attachEditor() {
    const self = this;
    tinymce.init({
      selector: `#${this.state.id}`,
      theme: 'modern',
      height: 500,
      branding: false,
      plugins: [
        'advlist autolink lists link image charmap preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
      ],
      toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image', // eslint-disable-line
      toolbar2: 'preview media | forecolor backcolor emoticons | codesample help',
      image_advtab: true,
      plugin_preview_height: 800,
      plugin_preview_width: 950,
      setup: (editor) => {
        editor.on('init', () => { editor.setContent(this.props.value); });
        editor.on('blur', () => {
          setTimeout(() => { self.props.onChange(editor.getContent()); }, 200);
        });
      },
      paste_data_images: true,
      file_picker_callback: (callback, value, meta) => {
        if (meta.filetype === 'image') {
          $('#upload').trigger('click');
          $('#upload').on('change', function() { // eslint-disable-line
            const file = this.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
              // Upload
              NetworkService
              .uploadTempFile(e.target.result, 'img')
              .done((response) => {
                const { tempUrl } = response.data;
                callback(tempUrl, { alt: '' });
              });
            };
            reader.readAsDataURL(file);
          });
        }
      },
    });
  }

  preloadEditorLibrary() {
    if (!this.state.isEditorLoaded) {
      const src = '//cdn.tinymce.com/4/tinymce.min.js';
      const script = document.createElement('script');
      script.setAttribute('src', src);
      script.setAttribute('type', 'text/javascript');
      script.onload = () => {
        window.__env.editorLoader.setValue(true);
      };
      document.body.appendChild(script);
    }
  }

  render() {
    this.state.id = _.uniqueId('texteditor_');
    return (
      <div>
        <div id={this.state.id} className="text-editor-div" />
        <input name="image" type="file" id="upload" style={{ visibility: 'hidden' }} />
      </div>
    );
  }
}

TextEditor.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};
