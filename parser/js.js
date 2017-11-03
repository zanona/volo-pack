exports.setContent = function (content, file) {
  /*
   * replace require or import statements module names ending with
   * .js or .json so these won't get renamed by the general parser
   */
  const requireMatch = /require\((['"])(.*?)(?:\.js|\.json)?\1\)/gm,
        importMatch  = /import((?:.*?from)? +)(["'])(.+?)(?:\.js|\.json)?\2/gm;

  if (requireMatch.test(content) || importMatch.test(content)) {
    file.hasImports = true;
  }

  return content.replace(requireMatch, 'require($1$2$1)')
                .replace(importMatch,  'import$1$2$3$2');
};
exports.setResource = function (file, parent) {
    var resolve = require('../utils/resolve');
    if (!parent.name.match(/-html-/)) { file = resolve(file.href, './'); }
    return file;
};
