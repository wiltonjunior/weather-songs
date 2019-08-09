'use strict';

class PropertyUtils {
  getValue(obj, path) {
    return path
      .replace(/\[(\w+)\]/g, '.$1')
      .replace(/^\./, '')
      .split('.')
      .reduce((acc, part) => acc && acc[part], obj);
  }

  setValue(obj = {}, path, value) {
    let i,
      array = path.replace(/^\./, '').split('.');
    for (i = 0; i < array.length - 1; i++) {
      if (!obj[array[i]]) obj[array[i]] = {};
      obj = obj[array[i]];
    }
    obj[array[i]] = value;
  }
}

module.exports = new PropertyUtils();
