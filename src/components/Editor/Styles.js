const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 0,
    width: '100%',
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #DEDEDE',
    cursor: 'text',
    minHeight: 400,
    padding: 5,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    width: '100%',
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial',
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
};

export default styles;
