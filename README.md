因为好几次大中午在教学楼找空教室被晒中暑所以兴起搞了个小工具。

体验：[fec.mollnn.com](http://fec.mollnn.com) （不确定哪天会关）

网页版：[mollnn/seu-empty-classroom-webservice: seu-empty-classroom-webservice-public (github.com)](https://github.com/mollnn/seu-empty-classroom-webservice-public)

离线版：[mollnn/seu-empty-classroom: Find empty classrooms in SEU Jiulonghu Campus (github.com)](https://github.com/mollnn/seu-empty-classroom)

Note:

1. 原始数据获取。从 ehall.seu.edu.cn 的全校课表查询中爬取数据，由于 SEU 的教室很少，将请求提取为 curl(bash) 并跑一遍，将输出丢尽一个文件里。为了偷懒，直接用傻傻的字符串匹配提取出需要的字段，简单整理一下，生成一个可爱的 CSV，并顺便制作一个离线查询系统。
2. 导入数据库。到阿里云大网吧开台最低配的机器，装个 Ubuntu 并装上 Node.js, MySQL, screen 等，将 CSV 导入到 MySQL 中。
3. 用 Node.js 写一个查 MySQL 返回 JSON 并搞成 HTML 表格的暴躁小家伙，再搞个憨憨的 HTML 表单当查询页。

![image](https://user-images.githubusercontent.com/57652546/117805823-0260dc80-b28c-11eb-8ef6-410bf2de6cad.png)

![image](https://user-images.githubusercontent.com/57652546/117805785-f9700b00-b28b-11eb-8b4a-2bd3b2fdeabc.png)
