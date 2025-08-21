[![Version](https://img.shields.io/github/package-json/v/wojackop/home.github.io)](https://www.npmjs.com/package/@wojackop/homepage)
[![Website](https://img.shields.io/website-up-down-green-red/https/home.gyhwd.top.svg)](https://wojackop.github.io/home.github.io/)
[![License](https://img.shields.io/github/license/wojackop/home.github.io.svg)](/LICENSE)
[![Say Thanks](https://img.shields.io/badge/Say-Thanks!-1EAEDB.svg)](https://saythanks.io/to/wojackop)

## 个人主页项目

一个基于 GitHub Pages 的个人主页，每日自动更新 Bing 高清壁纸。

![home](./README.assets/home.gif)

一个简洁、美观的个人主页，灵感源自 [dmego](https://github.com/dmego) 的 [dmego-home-page](https://github.com/dmego/dmego-home-page) 项目。通过 GitHub Actions 实现每日自动更新必应（Bing）高清壁纸。

## ✨ 功能亮点

- 📅 **每日自动更新**：利用 GitHub Actions 定时任务，每天凌晨 1 点（UTC时间）自动从 `cn.bing.com` 抓取最新的高清壁纸（1920x1080）。
- 💬 **每日一言**：集成 [一言](https://hitokoto.cn/) API，为页面增添一句随机的励志或哲理名言。
- ⚡ **轻量高效**：移除了 jQuery 依赖，使用原生 JavaScript，加载更快。
- 🎨 **鼠标特效**：集成鼠标点击爆炸五颜六色特效，增加互动乐趣。

## 📦 文件结构

```markdown
├─📁 .github/
│   └─📁 workflows/
│       └─📄 auto-bing.yml             # GitHub Actions 定时任务配置（每天凌晨1点更新Bing壁纸）
├─📁 assets/
│   ├─📁 css/
│   │   ├─📄 footer-style.css         # 网站页脚样式表
│   │   ├─📄 iconfont.css             # 图标字体样式表
│   │   ├─📄 onlinewebfonts.css       # 在线字体样式表
│   │   └─📄 vno.css                  # 主题样式表
│   ├─📁 fonts/
│   │   ├─📄 d571b52b60b5617399ce8eab62bf3eb3.eot     # 字体文件 (EOT格式)
│   │   ├─📄 d571b52b60b5617399ce8eab62bf3eb3.svg     # 字体文件 (SVG格式)
│   │   ├─📄 d571b52b60b5617399ce8eab62bf3eb3.ttf     # 字体文件 (TTF格式)
│   │   ├─📄 d571b52b60b5617399ce8eab62bf3eb3.woff    # 字体文件 (WOFF格式)
│   │   └─📄 d571b52b60b5617399ce8eab62bf3eb3.woff2   # 字体文件 (WOFF2格式，压缩率更高)
│   ├─📁 img/
│   │   ├─📁 action/
│   │   ├─📄 home.gif                 # 首页动画GIF
│   │   └─📄 logo.png                 # 主要Logo图片
│   ├─📁 js/
│   │   ├─📄 bing.js                  # 获取每日Bing壁纸URL的Node.js脚本
│   │   ├─📄 djtx.js                  # 鼠标点击爆炸特效脚本
│   │   └─📄 main.js                  # 主要JavaScript脚本（包含getBingImages函数定义）
│   └─📁 json/
│       └─📄 images.json              # 存储每日Bing壁纸URL的JSONP文件
├─📄 404.html                       # 404错误页面
├─📄 .gitignore                     # Git版本控制忽略文件列表
├─📄 ActionNotes.md                 # 关于GitHub Actions的说明文档
├─📄 apple-touch-icon.png           # iOS设备上的网站图标
├─📄 CNAME                          # 自定义域名配置文件
├─📄 favicon.ico                    # 网站favicon图标
├─📄 index.html                     # 网站主页HTML文件
├─📄 LICENSE                        # 软件许可证
├─📄 package.json                   # Node.js项目配置文件
└─📄 README.md                      # 项目说明文档
```

## 🎉 配置教程

### ⚙️ GitHub Actions 配置

- 利用 `Github Action` 提交代码需要一个 `GitHub API` 令牌, 可以在 [Create Tokens](https://github.com/settings/tokens) 这个地址，点击 `Generate new token` 按钮来创建
  - `Expiration` 过期时间设置为 `No expiration`
  - `Select scopes` 勾选 `repo`
  - 点击 `Generate Token` 生成
- 在仓库的 `Settings` ——>`Secrets` 功能栏中，点击 `New repository secrets` 按钮
  -  在 `Name` 框中填写 `GH_TOKEN`
  -  在 `Secrets` 栏中填写第一步生成的 `Token` 值
- 详细配置步骤图可以参考《[GitHub Action 配置详细步骤](./ActionNotes.md)》文档

### 🎀 NPM 包发布与使用笔记

将网站的静态资源（CSS, JS, 图片, 字体等）打包发布为一个 NPM 包，使用 UNPKG 作为资源文件的 CDN。以下是详细步骤：

1. **项目配置**

首先在 [npmjs.com ](https://www.npmjs.com/?spm=a2ty_o01.29997173.0.0.274d5171Jsoi6V)注册一个账号，在您的项目根目录下创建或修改 `package.json` 文件。

```json
{
  "name": "@您的GitHub用户名/包名",
  "version": "1.0.0",
  "description": "A personal homepage theme for your name.",
  "main": "index.html",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/您的GitHub用户名/您的仓库名.git"
  },
  "keywords": ["personal", "homepage", "theme"],
  "author": "您的名字",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/您的GitHub用户名/您的仓库名/issues"
  },
  "homepage": "https://您的自定义域名",
  "files": [
    "assets/css/",
    "assets/fonts/",
    "assets/img/",
    "assets/js/"
  ]
}
```

**关键点**：

- **`name`**: 建议使用作用域格式 `@username/package-name`。
- **`files`**: 精确列出要发布的静态资源文件夹。


2.  发布 NPM 包流程

```bash
# 1️⃣ 检查当前 npm 源
npm config get registry 

# 2️⃣ 切换到官方 npm 源（发布必须在此源下进行）
npm config set registry https://registry.npmjs.org

# 3️⃣ 登录您的 npm 账号
# 系统会提示您在浏览器中登录，或直接在终端输入用户名、密码和邮箱
npm login

# 4️⃣ 发布包（作用域包必须指定 --access public）
npm publish --access public

# 5️⃣ 【重要】发布成功后，切换回国内镜像源以加速日常开发
npm config set registry https://mirrors.huaweicloud.com/repository/npm/
# 或使用淘宝镜像：https://registry.npmmirror.com
```

**常见错误**：

- `E402 Payment Required`: 忘记添加 `--access public`。
- `E409 Conflict`: 瞬时错误，稍等片刻后重试 `npm publish --access public` 即可。
- `400 Bad Request`: 包名包含大写字母，需改为全小写。

**其他命令：**

```bash
npm config list -l          # 用于查看当前 npm 的所有配置项及其详细信息，包括默认值和用户自定义的设置。
npm cache clean --force     # 清理 npm 缓存
```

3. **在网页中使用 (UNPKG)**

发布成功后，您可以通过 UNPKG 这个 CDN 服务，在您的 `index.html` 中引用这些资源。

参考：[UNPKG](https://unpkg.com/)

## ⏱️ 自动化工作流

```mermaid
graph TD
    A[GitHub Action 每日定时运行] --> B[执行 bing.js 脚本]
    B --> C[从 cn.bing.com API 获取最新壁纸]
    C --> D[生成或更新 assets/json/images.json]
    D --> E[提交并推送到 gh-pages 分支]
    E --> F[GitHub Pages 自动部署]
    F --> G[您的网页加载最新壁纸]
```

1. **定时触发**：GitHub Actions 每天在设定时间自动触发。
2. **获取数据**：`bing.js` 脚本调用 Bing API，获取包含最近 8 天壁纸 URL 的 JSON 数据。
3. **生成文件**：脚本将数据转换为 `getBingImages([...])` 格式的 JSONP，并写入 `assets/json/images.json` 文件。
4. **自动部署**：工作流将更新后的 `images.json` 文件提交并推送到 `gh-pages` 分支。
5. **网页加载**：您的 `index.html` 通过 `<script>` 标签加载 `images.json`，执行 `getBingImages` 函数，从而设置最新的背景图片。


## 📝 更新记录

- **2023-08-28**: 将壁纸地址从 `www.bing.com` 换成 `cn.bing.com`，确保在中国大陆也能正常访问。
- **2023-04-12**: 移除 jQuery 依赖，改用原生 JavaScript，提升性能。
- **2023-02-27**: 添加《GitHub Action 配置详细步骤》文档。
- **2022-06-10**: 发布 NPM 包，使用 UNPKG 作为资源文件的 CDN。

## 🤝 致谢与参考

- **设计灵感**: 本项目衍生自 [Vno ](https://github.com/onevcat/vno-jekyll)Jekyll 主题。
- **功能参考**: 页面加载效果借鉴了 [Mno ](https://github.com/mcc108/mno)Ghost 主题。
- **头像样式**: 参考了 [北岛向南的小屋 ](https://javef.github.io/)的头像样式。
- **核心机制**: 借鉴并改进了 [dmego ](https://github.com/dmego)的 `dmego-home-page` 项目。

## 📜 许可证

本项目基于 [MIT 许可证 ](https://chat.qwen.ai/c/LICENSE)开源，壁纸版权归 Bing 及原作者所有，仅供学习与个人使用，严禁商用。
