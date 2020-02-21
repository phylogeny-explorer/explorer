require("@babel/register")({
  ignore: [
    function(filename) {
      if (!/\/node_modules\//.test(filename)) {
        return false; // ignore all node_modules except client
      } else if (/\/node_modules\/client\//.test(filename)) {
        // transpile everything in client
        // because webpack.config.js is used in `yarn run build`
        // and it has import statements
        return false;
      }
      // transpile all source code that is not in node_modules
      return true;
    }
  ]
});
