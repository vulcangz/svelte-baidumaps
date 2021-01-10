export function createPoint (bdmap, options = {}) {
  const {lng, lat} = options
  return new bdmap.Point(lng, lat)
}

export function createPixel (bdmap, options = {}) {
  const {x, y} = options
  return new bdmap.Pixel(x, y)
}

export function createBounds (bdmap, options = {}) {
  const {sw, ne} = options
  return new bdmap.Bounds(createPoint(bdmap, sw), createPoint(bdmap, ne))
}

export function createSize (bdmap, options = {}) {
  const {width, height} = options
  return new bdmap.Size(width, height)
}

export function createIcon (bdmap, options = {}) {
  const {url, size, opts = {}} = options
  return new bdmap.Icon(url, createSize(bdmap, size), {
    anchor: opts.anchor && createSize(bdmap, opts.anchor),
    imageSize: opts.imageSize && createSize(bdmap, opts.imageSize),
    imageOffset: opts.imageOffset && createSize(bdmap, opts.imageOffset),
    infoWindowAnchor: opts.infoWindowAnchor && createSize(bdmap, opts.infoWindowAnchor),
    printImageUrl: opts.printImageUrl
  })
}

export function createLabel (bdmap, options = {}) {
  const {content, opts} = options
  return new bdmap.Label(content, {
    offset: opts.offset && createSize(bdmap, opts.offset),
    position: opts.position && createPoint(bdmap, opts.position),
    enableMassClear: opts.enableMassClear
  })
}

export function createSymbol (bdmap, options = {}) {
  const {path, opts} = options
  return new bdmap.Symbol( path, {
    // anchor: createSize(bdmap, {width: 10, height: 10}),
    anchor: opts.anchor && createSize(bdmap, opts.anchor),
    fillColor: opts.fillColor,
    fillOpacity: opts.fillOpacity,
    scale: opts.scale,
    rotation: opts.rotation,
    strokeColor: opts.strokeColor,
    strokeOpacity: opts.strokeOpacity,
    strokeWeight: opts.strokeWeight
  })
}

export function createIconSequence (bdmap, options = {}) {
  const {symbol, offset, repeat, fixedRotation} = options
  return new bdmap.IconSequence(
    symbol && createSymbol(bdmap, symbol),
    offset,
    repeat,
    fixedRotation
  )
}
