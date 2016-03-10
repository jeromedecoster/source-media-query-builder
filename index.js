
module.exports = builder

function builder(query) {
  return query
    .toLowerCase()
    .replace(/\s+/g, '')
    .split(')and(')
    .map(function(e, i, a) {
      if (i < a.length - 1) e = e + ')'
      if (i > 0) e = '(' + e
      return e
    })
    .map(function(e) {
      var l = e.length
      return e.charAt(0) == '(' && e.charAt(l - 1) == ')' && l > 2
        ? e.substr(1, l - 2)
        : null
    })
    .filter(function(e) { return e != null })
    .map(function(e) {
      return kv(e)
        || single(e)
        || double(e)
    })
    .join(' and ')
}

function kv(str) {
  var a = str.split(/:/g)
  if (!a || a.length != 2) return

  return feature(a[0], a[1], true)
    || orientation(a[0], a[1])
    || hd(a[0], a[1])
    || skiped(a[0], a[1])
}

function feature(k, v, min) {
  if (!/^(\d+|\d+?\.\d+)(px|em|rem)$/.test(v)) return
  if ((/^(min-|max-)?(device-)?(width|height)$/.test(k) && min === true)
    || /^(device-)?(width|height)$/.test(k)) {
    return '(' + k + ': ' + v + ')'
  }
}

function orientation(k, v) {
  if (k == 'orientation' && (v == 'portrait' || v == 'landscape')) {
    return '(' + k + ': ' + v + ')'
  }
}

function hd(k, v) {
  if (k == 'hd' && (v == 'true' || v == 'false')) {
    return v == 'true'
      ? '(min-resolution: 144dpi)'
      : '(max-resolution: 96dpi)'
  }
}

function skiped(k, v) {
  if (!v.length) return
  if (/^(min-|max-)?(aspect-ratio|color-index|device-aspect-ratio|monochrome|resolution)$/.test(k)
    || k == 'display-mode' && (v == 'fullscreen' || v == 'standalone' || v == 'minimal-ui' || 'browser')
    || k == 'scan' && (v == 'progressive' || v == 'interlace')) {
    return '(' + k + ': ' + v + ')'
  }
}

function single(str) {
  var a = /^(.*)(<=?|>=?|==)(.*)$/g.exec(str)
  if (!a) return

  var k, c, v

  if (feature(a[1], a[3])) {
    k = a[1]
    v = a[3]
    c = a[2]
  }
  else if (feature(a[3], a[1])) {
    k = a[3]
    v = a[1]
    c = a[2]
    if (c == '<')       c = '>'
    else if (c == '<=') c = '>='
    else if (c == '>')  c = '<'
    else if (c == '>=') c = '<='
  }
  else return

  if (c == '<')  return '(max-' + k + ': ' + changeValue(v, true) + ')'
  if (c == '<=') return '(max-' + k + ': ' + v + ')'
  if (c == '>')  return '(min-' + k + ': ' + changeValue(v) + ')'
  if (c == '>=') return '(min-' + k + ': ' + v + ')'
  if (c == '==') return '(' + k + ': ' + v + ')'
}

function changeValue(v, dec) {
  var a = /^(\d+|\d+?\.\d+)(px|em|rem)$/.exec(v)
  if (!a) return
  var step = a[2] == 'px' ? 1 : .001
  if (dec === true) step *= -1
  var val = parseFloat(a[1]) + step
  return Math.round(val * 10000000000) / 10000000000 + a[2]
}

function double(str) {
  var a = /^(.*)(<=?|>=?|==)(.*)(<=?|>=?|==)(.*)$/g.exec(str)
  if (!a) return
  var m1 = single(a[1] + a[2] + a[3])
  var m2 = single(a[3] + a[4] + a[5])
  if (m1 && m2) return m1 + ' and ' + m2
}
