#include <bits/stdc++.h>
using namespace std;

const string record_pattern_begin = "YPSJDD\": \"";
const string record_pattern_end = "\",";

const string daynames[] = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"};

vector<string> SplitString(const string &str, char delim)
{
    int cur = 0;
    vector<string> ans;
    while (cur < str.size())
    {
        int pos = str.find(delim, cur);
        if (pos < 0 || pos >= str.size())
        {
            string tmp = str.substr(cur);
            ans.push_back(tmp);
            break;
        }
        string tmp = str.substr(cur, pos - cur);
        ans.push_back(tmp);
        cur = pos + 1;
    }
    return ans;
}

string FindBetween(const string &str, const string &pattern_begin, const string &pattern_end)
{
    int pos_begin = 0;
    if (pattern_begin.size())
        pos_begin = str.find(pattern_begin, 0);
    if (pos_begin < 0 || pos_begin >= str.size())
        return "";
    pos_begin += pattern_begin.length();
    int pos_end = str.size();
    if (pattern_end.size())
        pos_end = str.find(pattern_end, pos_begin);
    if (pos_begin >= pos_end)
        return "";
    string ans = str.substr(pos_begin, pos_end - pos_begin);
    return ans;
}

struct Record
{
    string week;
    string day;
    int sec_min;
    int sec_max;
    string name;

    Record() {}
    Record(const string &str)
    {
        auto vec = SplitString(str, ' ');
        if (vec.size() >= 4)
        {
            const string &str_week = vec[0];
            const string &str_day = vec[1];
            const string &str_sec = vec[2];
            name = vec[3];
            week = str_week;
            day = str_day;
            if (str_sec.find('-') == str_sec.npos)
            {
                string tmp = FindBetween(str_sec, "", "节");
                sec_min = sec_max = atoi(tmp.c_str());
            }
            else
            {
                string tmp1 = FindBetween(str_sec, "", "-");
                string tmp2 = FindBetween(str_sec, "-", "节");
                sec_min = atoi(tmp1.c_str());
                sec_max = atoi(tmp2.c_str());
            }
        }
    }

    bool Compare(int q_day, int q_secl, int q_secr)
    {
        if (daynames[q_day] == day && !(q_secl > sec_max || q_secr < sec_min))
            return true;
        return false;
    }

    bool operator<(const Record &rhs) const
    {
        return name < rhs.name;
    }

    friend ostream &operator<<(ostream &os, const Record &rec)
    {
        os << rec.week << " " << rec.day << " " << rec.sec_min << "-" << rec.sec_max << " " << rec.name;
        return os;
    }
};

signed main()
{
    std::ifstream t("raw.json");

    std::stringstream buffer;
    buffer << t.rdbuf();
    std::string str(buffer.str());

    map<string, string> mp_cls;

    map<string, int> day_convert;
    for(int i=0;i<8;i++) day_convert[daynames[i]]=i;

    set<string> class_names;

    vector<Record> records;
    int cur = 0;
    while (cur < str.size())
    {
        int pos_begin = str.find(record_pattern_begin, cur);
        if (pos_begin < 0 || pos_begin >= str.size())
            break;
        pos_begin += record_pattern_begin.length();
        int pos_end = str.find(record_pattern_end, pos_begin);
        string ans = str.substr(pos_begin, pos_end - pos_begin);
        cur = pos_end;
        auto vec = SplitString(ans, ',');
        for (auto i : vec)
        {
            Record tmp(i);
            records.push_back(tmp);
            mp_cls[tmp.name] = "";
            class_names.insert(tmp.name);
        }
    }

    map<string, vector<set<int>>> ans;
    for(auto i:class_names)
    {
        ans[i]=vector<set<int>>(8);
    }
    for(auto rec:records)
    {
        for(int s=rec.sec_min;s<=rec.sec_max;s++)
        {
            ans[rec.name][day_convert[rec.day]].insert(s);
        }
    }

    cout<<"name,day,section_list"<<endl;

    for(auto [cls_name,cls_data]:ans)
    {
        for(int day=1;day<=7;day++)
        {
            string str="-";
            for(auto i:cls_data[day])
            {
                str+=to_string(i);
                str+="-";
            }
            cout<<cls_name<<","<<day<<","<<str<<endl;
        }
    }

    return 0;
}