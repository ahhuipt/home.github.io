// bing.js
const https = require('https');
const fs = require('fs');
const path = require('path');

// 1. 配置项分离，便于维护
const BING_API_CONFIG = {
  hostname: 'www.bing.com',
  port: 443,
  path: '/HPImageArchive.aspx?format=js&idx=0&n=8', // 获取最近8天的图片
  method: 'GET',
  timeout: 5000 // 设置请求超时时间，避免卡死
};

// 2. 定义输出文件路径
const OUTPUT_DIR = './assets/json';
const OUTPUT_FILE = 'images.json';
const OUTPUT_PATH = path.join(OUTPUT_DIR, OUTPUT_FILE);

// 3. 主函数，封装逻辑
function updateBingImages() {
  console.log('Starting to fetch Bing images...');

  const req = https.request(BING_API_CONFIG, (bing_res) => {
    // 检查 HTTP 响应状态码
    if (bing_res.statusCode !== 200) {
      throw new Error(`Bing API request failed with status code: ${bing_res.statusCode}`);
    }

    let bing_body = [];

    bing_res.on('data', (chunk) => {
      bing_body.push(chunk);
    });

    bing_res.on('end', () => {
      try {
        // 将 Buffer 数组合并成一个 Buffer，然后转换为字符串
        bing_body = Buffer.concat(bing_body).toString();

        // 4. 解析 JSON 响应
        const bing_data = JSON.parse(bing_body);
        
        // 5. 验证数据结构
        if (!bing_data || !Array.isArray(bing_data.images)) {
          throw new Error('Invalid response structure from Bing API');
        }

        // 6. 提取图片 URL
        const img_urls = bing_data.images.map(img => img.url);

        // 7. 构建 JSONP 字符串
        const jsonpStr = `getBingImages(${JSON.stringify(img_urls)});`;

        // 8. 确保输出目录存在
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });

        // 9. 写入文件
        fs.writeFile(OUTPUT_PATH, jsonpStr, 'utf8', (err) => {
          if (err) {
            console.error('❌ Error writing file:', err);
            process.exit(1); // 明确退出并返回错误码，让 GitHub Actions 知道任务失败
          }
          console.log('✅ JSON data saved successfully:', OUTPUT_PATH);
          console.log('Updated URLs:', img_urls); // 输出更新的 URL，便于调试
        });

      } catch (parseError) {
        console.error('❌ Error parsing Bing API response:', parseError);
        process.exit(1);
      }
    });
  });

  // 10. 处理请求过程中的错误（如网络问题）
  req.on('error', (error) => {
    console.error('❌ Error during HTTPS request:', error);
    process.exit(1);
  });

  // 11. 处理请求超时
  req.setTimeout(BING_API_CONFIG.timeout, () => {
    req.destroy(); // 销毁请求
    console.error('❌ Request to Bing API timed out');
    process.exit(1);
  });

  // 12. 发送请求
  req.end();
}

// 13. 执行主函数
updateBingImages();