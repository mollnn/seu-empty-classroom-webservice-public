因为好几次大中午在教学楼找空教室被晒中暑所以兴起搞了个小工具。

UPD on 2021.10.23: 数据已更新 Fall 2021

体验：[fec.mollnn.com](http://fec.mollnn.com) （不确定哪天会关）

网页版：[mollnn/seu-empty-classroom-webservice: seu-empty-classroom-webservice-public (github.com)](https://github.com/mollnn/seu-empty-classroom-webservice-public)

离线版：[mollnn/seu-empty-classroom: Find empty classrooms in SEU Jiulonghu Campus (github.com)](https://github.com/mollnn/seu-empty-classroom)

实现方案：从 ehall.seu.edu.cn 的全校课表查询中爬取数据，由于 SEU 的教室很少，将请求提取为 curl(bash) 并跑一遍，字符串匹配提取出需要的字段，简单整理一下生成一个可爱的 CSV。导入数据库，将 CSV 导入到 MySQL 中。用 Node.js 实现查 MySQL 返回 JSON 并转 HTML 表格，用 HTML 表单当查询页。

![image](https://user-images.githubusercontent.com/57652546/117805823-0260dc80-b28c-11eb-8ef6-410bf2de6cad.png)

![image](https://user-images.githubusercontent.com/57652546/117805785-f9700b00-b28b-11eb-8b4a-2bd3b2fdeabc.png)
