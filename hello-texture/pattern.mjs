export const palettes = {
  'autumn': ['sienna', 'peru', 'khaki', 'darkkhaki', 'olive'],
  'pink': ['mediumvioletred', 'palevioletred', 'pink', 'mistyrose', 'white'],
  'sunrise': ['purple', 'crimson', 'tomato', 'orange', 'gold'],
  'sea': ['darkslategray', 'teal', 'cadetblue', 'palegoldenrod', 'beige'],
  'warmcold': ['indianred', 'salmon', 'palegoldenrod', 'cadetblue', 'teal'],
  'skyblue': ['steelblue', 'skyblue', 'paleturquoise', 'lightcyan', 'aliceblue']
}

function poly(ctx, color, ...coords) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  const len = (coords.length / 2)|0;
  ctx.moveTo(coords[0], coords[1]);
  for (let i = 1; i < len; i++) {
    ctx.lineTo(coords[i * 2], coords[i * 2 + 1]);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

export function trianglePattern(palette, width = 512, height = 512, N = 10) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const squares = Array(N*N).fill(0);
  const tW = width / N;
  const tH = height / N;
  squares.map((_, i) => {
    const x = i % 10;
    const y = Math.floor(i / 10);
    const x1 = x * tW;
    const y1 = y * tH;
    const x2 = x1 + tW;
    const y2 = y1 + tH;
    if ((x + y) % 3 === 0) {
      poly(ctx, palette[(x + y) % palette.length], x1, y1, x2, y1, x1, y2);
      poly(ctx, palette[(x * y + 1) % palette.length], x1, y2, x2, y2, x2, y1);
    } else {
      poly(ctx, palette[(x + y) % palette.length], x1, y1, x1, y2, x2, y2);
      poly(ctx, palette[(x * y + 1) % palette.length], x1, y1, x2, y1, x2, y2); 
    }
  });
  return canvas.toDataURL();
}
