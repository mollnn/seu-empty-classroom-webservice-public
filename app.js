var express = require('express');
var app = express();
var mysql = require('mysql');
var fs = require("fs");

// JSON 表格化（引自 https://blog.csdn.net/weixin_33725270/article/details/88720861）

htmlKit = {
    _tags: [], html: [],
    _createAttrs: function (attrs) {
        var attrStr = [];
        for (var key in attrs) {
            if (!attrs.hasOwnProperty(key)) continue;
            attrStr.push(key + "=" + attrs[key] + "")
        }
        return attrStr.join(" ")
    }, _createTag: function (tag, attrs, isStart) {
        if (isStart) {
            return "<" + tag + " " + this._createAttrs(attrs) + ">"
        } else {
            return "</" + tag + ">"
        }
    }, start: function (tag, attrs) {
        this._tags.push(tag);
        this.html.push(this._createTag(tag, attrs, true));
        return this;
    }, end: function () {
        this.html.push(this._createTag(this._tags.pop(), null, false));
        return this;
    }, tag: function (tag, attr, text) {
        this.html.push(this._createTag(tag, attr, true) + text + this._createTag(tag, null, false));
        return this;
    },
    create: function () {
        var t = this.html.join("");
        this.clear();
        return t;
    },
    clear: function () {
        this._tags = [];
        this.html = [];
    }
};

function json2Html(data) {
    var html_kit = htmlKit;
    html_kit.start("table", { "cellpadding": "5", "border": "1" });
    html_kit.start("thead");
    html_kit.start("tr");
    data["heads"].forEach(function (head) {
        html_kit.tag("th", { "bgcolor": "AntiqueWhite" }, head)
    });
    html_kit.end();
    html_kit.end();
    html_kit.start("tbody");
    data["data"].forEach(function (dataList, i) {
        dataList.forEach(function (_data) {
            html_kit.start("tr");
            data["dataKeys"][i].forEach(function (key) {
                var rowsAndCol = key.split(":");
                html_kit.tag("td", { "rowspan": rowsAndCol[0], "colspan": 0 }, _data[rowsAndCol[0]]);
            });
            html_kit.end()
        })
    });
    html_kit.end();
    html_kit.end();
    return html_kit.create()
}

/* 连接数据库 */
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '********',
    port: '3306',
    database: 'findemptyclassroom'
});

connection.connect();

//查询数据
app.get('/', function (req, res) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");

    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");

    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    // console.log(req.params);
    console.log(req.query);

    let secBegin = req.query.sl;
    let secEnd = req.query.sr;
    let day = req.query.day;

    if (typeof(day) == "undefined") {
        var html = fs.readFileSync('./index.html');
        //client.html是发送给客户端的文件(客户端界面)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(html);
    }
    else {
        let sql = 'select * from mytable where day = "' + day + '"';
        for (var i = secBegin; i <= secEnd; i++) {
            sql += 'and section_list not like "%-' + i.toString() + '-%"';
        }

        // 执行sql语句
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }

            var data = result;

            var htmlMetadata = {
                "heads": ["教室", "星期X", "有课节次"],
                "dataKeys": [["name", "day", "section_list"], ["text", "1:2:total"]], // rowspan:colspan:value
                "data": [data]
            };

            // console.log(htmlMetadata);

            var html = json2Html(htmlMetadata);
            res.send(html);
        });
    }



});

app.listen(80);