var express = require('express');
var app = express();
var mysql = require('mysql');
var fs = require("fs");



htmlKit = {
    _tags: [],
    html: [],
    _createAttrs: function(attrs) {
        var attrStr = [];
        for (var key in attrs) {
            if (!attrs.hasOwnProperty(key)) continue;
            attrStr.push(key + "=" + attrs[key] + "")
        }
        return attrStr.join(" ")
    },
    _createTag: function(tag, attrs, isStart) {
        if (isStart) {
            return "<" + tag + " " + this._createAttrs(attrs) + ">"
        } else {
            return "</" + tag + ">"
        }
    },
    start: function(tag, attrs) {
        this._tags.push(tag);
        this.html.push(this._createTag(tag, attrs, true));
        return this;
    },
    end: function() {
        this.html.push(this._createTag(this._tags.pop(), null, false));
        return this;
    },
    tag: function(tag, attr, text) {
        this.html.push(this._createTag(tag, attr, true) + text + this._createTag(tag, null, false));
        return this;
    },
    create: function() {
        var t = this.html.join('');
        this.clear();
        return t;
    },
    clear: function() {
        this._tags = [];
        this.html = [];
    }
};

function json2Html(data) {
    var html_kit = htmlKit;
    html_kit.start("table", { "cellpadding": "5", "border": "1" });
    html_kit.start("thead");
    html_kit.start("tr");
    data["heads"].forEach(function(head) {
        html_kit.tag("th", { "bgcolor": "AntiqueWhite" }, head)
    });
    html_kit.end();
    html_kit.end();
    html_kit.start("tbody");
    data["data"].forEach(function(dataList, i) {
        dataList.forEach(function(_data) {
            html_kit.start("tr");
            data["dataKeys"][i].forEach(function(key) {
                var rowsAndCol = key.split(":");
                html_kit.tag("td", { "rowspan": rowsAndCol[0], "colspan": 0 }, _data[rowsAndCol[0]]);
            });
            html_kit.end()
        })
    });
    html_kit.end();
    html_kit.end();
    var html_head = '<html> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <title>Result</title> <style> table {   border-collapse: collapse;   width: 100%; }  th, td {   text-align: left;   padding: 8px; }  tr:nth-child(even){background-color: #f2f2f2}  th {   background-color: black;   color: white; } </style> </head> <body>';
    var html_tail = '</body> </html>';
    var html_body = html_kit.create();
    console.log(html_head);
    console.log(html_body);
    console.log(html_tail);

    return html_head + html_body + html_tail;
}

/* 连接数据库 */
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'findemptyclassroom'
});

connection.connect();

app.get('/', function(req, res) {

    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "content-type");
        res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

        console.log(req.query);

        let secBegin = parseInt(req.query.sl);
        let secEnd = parseInt(req.query.sr);
        let day = req.query.day;
        let busy_str = req.query.busy;

        let busy = 0;
        if (typeof busy_str == "string" && busy_str.length > 0) busy = parseInt(busy_str);
        else if (typeof busy_str == "number") busy = busy_str;

        if (typeof(day) == "undefined") {
            var html = fs.readFileSync('./index.html');
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(html);
        } else {
            let sql = 'select * from mytable where day = "' + day + '"';
            for (var i = secBegin; i <= secEnd; i++) {
                sql += 'and section_list not like "%-' + i.toString() + '-%"';
            }
            if (busy != 0) {
                sql += 'and section_list like "%-' + busy.toString() + '-%"';
            }

            connection.query(sql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }

                var data = result;

                var htmlMetadata = {
                    "heads": ["教室", "星期X", "有课节次"],
                    "dataKeys": [
                        ["name", "day", "section_list"],
                        ["text", "1:2:total"]
                    ],
                    "data": [data]
                };

                var html = json2Html(htmlMetadata);
                res.send(html);
            });
        }

    } catch (e) {
        console.log(e);
        console.log("Unknown error occured!");
    }


});

app.listen(80);