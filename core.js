export function calculateInterval(source, target, strategy) {
  const upward = (target - source + 12) % 12;
  if (strategy === "up") return upward === 0 ? 0 : upward;
  if (strategy === "down") return upward === 0 ? 0 : upward - 12;
  return upward > 6 ? upward - 12 : upward === 6 ? -6 : upward;
}

function writeAscii(view, offset, text) {
  for (let index = 0; index < text.length; index += 1) {
    view.setUint8(offset + index, text.charCodeAt(index));
  }
}

function pcm16Sample(sample) {
  const clamped = Math.max(-1, Math.min(1, sample || 0));
  return clamped < 0 ? clamped * 32768 : clamped * 32767;
}

export function encodeWavFromChannels(channels, sampleRate) {
  const channelCount = Math.max(1, Math.min(2, channels.length));
  const frameCount = channels[0]?.length || 0;
  const bytesPerSample = 2;
  const blockAlign = channelCount * bytesPerSample;
  const dataSize = frameCount * blockAlign;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channelCount, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let frame = 0; frame < frameCount; frame += 1) {
    for (let channel = 0; channel < channelCount; channel += 1) {
      const source = channels[channel] || channels[0];
      view.setInt16(offset, pcm16Sample(source[frame]), true);
      offset += bytesPerSample;
    }
  }

  return buffer;
}
