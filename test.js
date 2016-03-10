
const builder = require('.')
const test = require('tape')

const skip = false

test('feature simple', {skip:skip}, function (t) {

  t.equal(builder('(width:400px)'),             '(width: 400px)')
  t.equal(builder('(min-width:400px)'),         '(min-width: 400px)')
  t.equal(builder('(max-width:400px)'),         '(max-width: 400px)')

  t.equal(builder('(device-width:400px)'),      '(device-width: 400px)')
  t.equal(builder('(min-device-width:400px)'),  '(min-device-width: 400px)')
  t.equal(builder('(max-device-width:400px)'),  '(max-device-width: 400px)')

  t.equal(builder('(height:400px)'),            '(height: 400px)')
  t.equal(builder('(min-height:400px)'),        '(min-height: 400px)')
  t.equal(builder('(max-height:400px)'),        '(max-height: 400px)')

  t.equal(builder('(device-height:400px)'),     '(device-height: 400px)')
  t.equal(builder('(min-device-height:400px)'), '(min-device-height: 400px)')
  t.equal(builder('(max-device-height:400px)'), '(max-device-height: 400px)')

  t.equal(builder('(orientation:portrait)'),    '(orientation: portrait)')
  t.equal(builder('(orientation:landscape)'),   '(orientation: landscape)')

  t.equal(builder('(hd:true)'),                 '(min-resolution: 144dpi)')
  t.equal(builder('(hd:false)'),                '(max-resolution: 96dpi)')

  t.end()
})

test('feature multiple', {skip:skip}, function (t) {

  t.equal(builder('(width:400px) and (height:400px)'),
    '(width: 400px) and (height: 400px)')
  t.equal(builder('(width:400px) and (height:400px) and (height:600px)'),
    '(width: 400px) and (height: 400px) and (height: 600px)')
  t.equal(builder('(width:400px) and (height:400px) and (height:600px) and (hd:true)'),
    '(width: 400px) and (height: 400px) and (height: 600px) and (min-resolution: 144dpi)')

  t.end()
})

test('1 range px simple', {skip:skip}, function (t) {

  t.equal(builder('(width<400px)'),  '(max-width: 399px)')
  t.equal(builder('(width<=400px)'), '(max-width: 400px)')
  t.equal(builder('(width==400px)'), '(width: 400px)')
  t.equal(builder('(width>=400px)'), '(min-width: 400px)')
  t.equal(builder('(width>400px)'),  '(min-width: 401px)')

  t.equal(builder('(400px>width)'),  '(max-width: 399px)')
  t.equal(builder('(400px>=width)'), '(max-width: 400px)')
  t.equal(builder('(400px==width)'), '(width: 400px)')
  t.equal(builder('(400px<=width)'), '(min-width: 400px)')
  t.equal(builder('(400px<width)'),  '(min-width: 401px)')

  t.end()
})

test('1 range em/rem simple', {skip:skip}, function (t) {

  t.equal(builder('(width<4em)'),     '(max-width: 3.999em)')
  t.equal(builder('(width<=4em)'),    '(max-width: 4em)')
  t.equal(builder('(width==4em)'),    '(width: 4em)')
  t.equal(builder('(width>=4em)'),    '(min-width: 4em)')
  t.equal(builder('(width>4em)'),     '(min-width: 4.001em)')

  t.equal(builder('(1.4rem>width)'),  '(max-width: 1.399rem)')
  t.equal(builder('(1.4rem>=width)'), '(max-width: 1.4rem)')
  t.equal(builder('(1.4rem==width)'), '(width: 1.4rem)')
  t.equal(builder('(1.4rem<=width)'), '(min-width: 1.4rem)')
  t.equal(builder('(1.4rem<width)'),  '(min-width: 1.401rem)')

  t.end()
})

test('1 range px multiple', {skip:skip}, function (t) {

  t.equal(builder('(width<400px) and (device-height<400px)'),
    '(max-width: 399px) and (max-device-height: 399px)')
  t.equal(builder('(width<=400px) and (device-height<400px) and (400px<width)'),
    '(max-width: 400px) and (max-device-height: 399px) and (min-width: 401px)')
  t.equal(builder('(width<=400px) and (device-height<400px) and (400px<width) and (hd:true)'),
    '(max-width: 400px) and (max-device-height: 399px) and (min-width: 401px) and (min-resolution: 144dpi)')

  t.end()
})

test('1 range px simple', {skip:skip}, function (t) {

  t.equal(builder('(300px<width<400px)'),   '(min-width: 301px) and (max-width: 399px)')
  t.equal(builder('(300px<=width<=400px)'), '(min-width: 300px) and (max-width: 400px)')
  t.equal(builder('(300px==width==400px)'), '(width: 300px) and (width: 400px)')
  t.equal(builder('(300px>=width>=400px)'), '(max-width: 300px) and (min-width: 400px)')
  t.equal(builder('(300px>width>400px)'),   '(max-width: 299px) and (min-width: 401px)')

  t.end()
})

test('1 range px simple', {skip:skip}, function (t) {

  t.equal(builder('(300px<width<400px) and (300px<=width<=400px)'),
    '(min-width: 301px) and (max-width: 399px) and (min-width: 300px) and (max-width: 400px)')
  t.equal(builder('(300px<width<400px) and (300px<=width<=400px) and (300px>=width>=400px)'),
    '(min-width: 301px) and (max-width: 399px) and (min-width: 300px) and (max-width: 400px) and (max-width: 300px) and (min-width: 400px)')

  t.end()
})

test('wrong queries', {skip:skip}, function (t) {

  t.equal(builder('width:400px'),                     '')
  t.equal(builder('(width 400px)'),                   '')
  t.equal(builder('(width)'),                         '')
  t.equal(builder('(orientation:port)'),              '')
  t.equal(builder('(device-size:20em)'),              '')
  t.equal(builder('(width:400px) or (height:400px)'), '')
  t.equal(builder('(width<40<0px)'),                  '')
  t.equal(builder('(yo<width<0px)'),                  '')
  t.equal(builder('(0px<width<0px<2px)'),             '')
  t.equal(builder('(aspect-ratio:)'),                 '')

  t.end()
})

// https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
test('skipped queries', {skip:false}, function (t) {

  t.equal(builder('(aspect-ratio:1/1)'),     '(aspect-ratio: 1/1)')
  t.equal(builder('(min-aspect-ratio:1/1)'), '(min-aspect-ratio: 1/1)')
  t.equal(builder('(max-aspect-ratio:1/1)'), '(max-aspect-ratio: 1/1)')

  t.equal(builder('(color-index:256)'),      '(color-index: 256)')
  t.equal(builder('(min-color-index:256)'),  '(min-color-index: 256)')
  t.equal(builder('(max-color-index:256)'),  '(max-color-index: 256)')

  t.equal(builder('(device-aspect-ratio:16/9)'),     '(device-aspect-ratio: 16/9)')
  t.equal(builder('(min-device-aspect-ratio:16/9)'), '(min-device-aspect-ratio: 16/9)')
  t.equal(builder('(max-device-aspect-ratio:16/9)'), '(max-device-aspect-ratio: 16/9)')

  t.equal(builder('(display-mode:fullscreen)'), '(display-mode: fullscreen)')
  t.equal(builder('(display-mode:standalone)'), '(display-mode: standalone)')
  t.equal(builder('(display-mode:minimal-ui)'), '(display-mode: minimal-ui)')
  t.equal(builder('(display-mode:browser)'),    '(display-mode: browser)')

  t.equal(builder('(monochrome:8)'),          '(monochrome: 8)')
  t.equal(builder('(min-monochrome:8)'),      '(min-monochrome: 8)')
  t.equal(builder('(max-monochrome:8)'),      '(max-monochrome: 8)')

  t.equal(builder('(resolution:300dpi)'),     '(resolution: 300dpi)')
  t.equal(builder('(min-resolution:300dpi)'), '(min-resolution: 300dpi)')
  t.equal(builder('(max-resolution:300dpi)'), '(max-resolution: 300dpi)')

  t.equal(builder('(scan:progressive)'),      '(scan: progressive)')
  t.equal(builder('(scan:interlace)'),        '(scan: interlace)')

  t.end()
})
