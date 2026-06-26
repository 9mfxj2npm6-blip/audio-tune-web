# 音频调音 Web 版

这是音频调音产品的免费网页版 MVP。页面使用浏览器本地能力完成音频解码、调性分析、保持速度变调，并导出 WAV/MP3 文件。

## 当前能力

- 支持导入 WAV、MP3。
- 音频在浏览器本地处理，不上传到服务器。
- 自动分析主体调性和尾段转调参考。
- 支持半音移调、目标调选择、向上/向下/最短路径。
- 支持 WAV、MP3 多选导出。
- 支持桌面浏览器与移动浏览器访问。

## 本地运行

```bash
python3 -m http.server 8787 --bind 127.0.0.1 --directory 03-工作文件/web-audio-tuner
```

打开：

```text
http://127.0.0.1:8787/
```

## 验证

```bash
node 03-工作文件/web-audio-tuner/tests/core.test.mjs
node 03-工作文件/web-audio-tuner/tests/html-module-syntax.mjs
```

## 发布说明

这是纯静态网页，可以部署到 GitHub Pages。部署目录应包含：

- `index.html`
- `core.js`
- `README.md`
- `NOTICE.md`
- `.nojekyll`

## 安全边界

首版不包含账号、登录、云端上传、支付或服务器处理。用户只有主动选择音频文件后，浏览器页面才能读取该文件内容。
