const config = {
  width: 800,
  height: 400,
  paddingX: 100,
  paddingY: 50,
  paddingX2: 20,
  lines: 13,
}

export default {
  ...config,
  lineHeight: (config.height - config.paddingY * 2) / config.lines,
}
