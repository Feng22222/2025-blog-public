# 网页记事本增强版（web-notepad-pro）

  本项目是基于minimalist-web-notepad项目的代码进行二次开发,包含简单txt笔记本、共享文件、图片外链几个功能，你可以将它作为跨设备数据交换的解决方案

## 本项目截图

![](/blogs/web-notepad-pro/7e8f26b5f386c6ee.png)
![](/blogs/web-notepad-pro/98b6ec3f4705ea02.png)

## **功能特性**

**在线Demo：**[https://pad.wld.ink](https://pad.wld.ink)

**【界面功能】**<br />基本功能：你的互联网记事本，可以在不同设备中免应用进行文本、图片、文件传输，只需要一个浏览器。<br />笔记：顾名思义，就是单纯的记事本，没有富文本等功能，只是文字记录的一个笔记，您在这里输入的内容将实时保存（除非你的网络十分卡顿或者不可用）。<br />网盘：通过访问file.php进入网盘管理页面，提供文件和文件夹的上传、下载、管理功能。支持文件夹嵌套、文件预览、文件外链等功能，适合跨设备文件传输和共享。<br />  - 支持单个文件最大500M上传<br />  - 支持文件夹上传和嵌套管理<br />  - 支持图片、视频等文件预览<br />  - 支持生成文件下载二维码<br />  - 支持文件夹展开/折叠管理<br />  - 支持文件删除操作

**【上传限制说明】**<br />源代码中虽然设置了500M的文件上传限制，但实际使用中还需要手动修改服务器环境的相关配置：<br />1. **PHP配置**：修改php.ini文件，调整以下参数：<br />   - upload_max_filesize = 500M<br />   - post_max_size = 520M<br />   - max_execution_time = 600<br />   - max_input_time = 600<br />   - memory_limit = 512M<br />2. **Nginx配置**：在nginx.conf或站点配置文件中添加：<br />   - client_max_body_size 500M;<br />3. **Apache配置**：在httpd.conf或.htaccess文件中添加：<br />   - php_value upload_max_filesize 500M<br />   - php_value post_max_size 520M<br />   - php_value max_execution_time 600<br />   - php_value max_input_time 600<br />   - php_value memory_limit 512M

**浏览器URL：**<br />在URL上，输入任意文本，将自动创建一个你知道的文本笔记，如 [https://pad.wld.ink/1](https://pad.wld.ink/1)，这里的README是我手动在地址栏里写入的，你可以写入123或者其他想要起的笔记本地址ID

**笔记本列表：**<br />左侧栏为笔记列表，这里记录本站所有的笔记，你可以点击打开查看，这个也算区分与原基础项目的主要功能<br />当面左侧菜单的命名规则为：笔记本地址+截取首行10个字符为标题

**随机建一个：**<br />随机建个文档，文档地址规则为 域名/XXX ，其中XXX是三位随机数

**收起/展开：**<br />这个功能主要为手机版而开发，由于手机的屏幕太小，默认左侧菜单会挤压主要输入区，当手机打开的时候默认收起，可以点击展开进行选择笔记。

**【其他功能】**<br />1、在笔记页面,双击改行会自动出发网页Copy到剪切板的JS脚本，你在任意行双击，该行内容就已经自动复制到剪切板了，可以直接CTRL+V进行粘贴。(注释：必须SSL部署后才生效)<br />2、图册上传的“粘贴板”功能，可以是一张图片，或者临时的微信QQ截图，直接粘贴到粘贴板即可。<br />3、文件页面的显示二维码功能，可以帮助你快速生成二维码进行手机下载。<br />4、关于本文档变灰只读，您只需要在后台_TMP文件中将该文本设置成只读即可。

**================【特别注意】================**<br />1、本项目的图片、文件共享中，上传的加密密码的代码逻辑比较简单，请注意限制服务器的空间容量，并且不要存储重要机密文件。 <br />2、本项目代码中，笔记的读写是公共可读写，请不要存放重要敏感内容，该笔记设计的初衷是只是为了临时传输文本和文件，解决跨设备的问题。 <br />====================================================

## 安装（Installation） 
本项目依赖Apache或者Nginx+PHP环境，请自行在服务器上部署对应的环境，默认主机空间和宝塔基本环境以及常用的网站环境都能满足要求。

**步骤大纲（outline）：**<br />1、在Github上下载本项目代码<br />2、修改项目代码，把代码中的域名改成自己的域名<br />3、将代码上传到自己的主机空间或者服务器网站目录<br />4、简单配置网站环境变量，如nginx的伪静态或者Apache的mod_rewrite模块等<br />5、[可选]为你的域名网站申请一个SSL，当仅使用http直接部署的时候，可能会缺失部分功能，比如双击复制

### 详细部署教程（detailed steps）
**1、克隆或者下载项目代码到你的本地**
```
git clone 本项目Github地址
```
或者<br />直接在Github项目页面中点击Code按钮，选择Download ZIP进行源代码下载。

**2、修改项目代码（填写您的域名或者IP）**<br />将项目代码解压，找到以下三个文件，用记事本或者代码编辑器打开修改文件内容。<br />index.php<br />png.php<br />file.php<br />以下变量都在文件最开始的几行代码中，打开即可看到。将三个文件的$base_url后面的变量改成你自己的域名。<br />域名的解析不在本项目教程范围内，需要自己配置。如果无域名，可以直接配置成【http://IP地址】进行部署。
```bash
$base_url = 'http://pad.wld.ink';
改成
$base_url = 'https://你的域名';
//默认http，如果使用了SSL，则需要使用https
```

**修改主页密码**
<br />修改index.php文件的 
```$password = 'xxx';```
<br />把xxx改成你想要设置的密码；
<br />
<br />在v1.0.4之后的版本，使用了哈希值代替明文密码，逻辑一致，可以使用在线工具将你的密码转换成哈希值之后，填入以下字段
<br />```$hashed_password = 'xxx';```
<br /> 推荐的在线生成哈希值网站：https://uutool.cn/php-password/  或者 https://toolkk.com/tools/php-password-hash 或者其他自行百度谷歌 



**3、上传代码到网站根目录，确保配置。**<br />将修改好的代码全部上传到你的网站目录，然后确保一下配置正确，建议打包成zip后再上传解压。<br />以下配置大部分的主机空间和服务器环境都不需要专门配置，只需要检查即可。如有异常，请自行修改。

- 确保你的主页文件设置为index.php
- 确保本项目中的_tmp、_png、sharefile这三个文件夹可读可写

**4、网站的环境变量**<br />**Nginx：**<br />如果你的网站使用的是nginx，请在伪静态配置里写入
```
location / {
    rewrite ^/([a-zA-Z0-9_-]+)$ /index.php?note=$1;
}
```
如果你的网站不在根目录，则伪静态的内容请根据自己的情况自行更改，例如
```
location ~* ^/notes/([a-zA-Z0-9_-]+)$ {
    try_files $uri /notes/index.php?note=$1;
}
```

**Apache：**<br />如果你使用的是Apache，默认配置即可，<br />如有异常，需要确保在站点配置中启用mod_rewrite并设置.htaccess文件。参见如何为Apache设置mod_rewrite。

原项目地址：<br />[https://github.com/pereorga/minimalist-web-notepad](https://github.com/pereorga/minimalist-web-notepad)

原项目地址2：<br />[https://github.com/jocksliu/web-notepad-enhanced](https://github.com/jocksliu/web-notepad-enhanced)