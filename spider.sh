#!/bin/bash

for i in {100000..100300}
do
curl 'http://ehall.seu.edu.cn/jwapp/sys/kcbcx/modules/jskcb/jaskcb.do' \
  -H 'Connection: keep-alive' \
  -H 'Accept: application/json, text/javascript, */*; q=0.01' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 Edg/94.0.992.50' \
  -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
  -H 'Origin: http://ehall.seu.edu.cn' \
  -H 'Referer: http://ehall.seu.edu.cn/jwapp/sys/kcbcx/*default/index.do?t_s=1634967315184&amp_sec_version_=1&gid_=WlBqQWVpOE03VWcrZWNIVVo0VDNvWEVqTlpJTmRnV3VNWC9ya29QcGRSZXo4NGM1SEQ3VTY0dTBNYlFrVXdKMklsM1I1bkY0Q1pxeFM4WkF4bGU3K0E9PQ&EMAP_LANG=zh&THEME=indigo' \
  -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6' \
  -H $'Cookie: route=c230f986cfb1ca016a7ead449790e283; EMAP_LANG=zh; THEME=indigo; _WEU=HLhzlw0v4Y2Wvx7VNQABMRuS2OMk0ue4x4ssLSOdFxubU4d30t187BnYPIwTrflwGIMt86GBcLjcxsboJITnCU_nOMsgyB_fTJq8aq0RABKISaoikMx6BWiCBdoAQrVy; amp.locale=zh_CN; zg_did=%7B%22did%22%3A%20%2217c39855ee1bfe-007c808eb1d59c-7e647c6c-186a00-17c39855ee21068%22%7D; zg_=%7B%22sid%22%3A%201633995916986%2C%22updated%22%3A%201633995916993%2C%22info%22%3A%201633841929441%2C%22superProperty%22%3A%20%22%7B%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22ehall.seu.edu.cn%22%2C%22cuid%22%3A%20%22213191437%22%2C%22zs%22%3A%200%2C%22sc%22%3A%200%2C%22firstScreen%22%3A%201633995916986%7D; NSC_JOqgyvhaegq01uld2umxhgbeip03kb0=ffffffff09489f1645525d5f4f58455e445a4a423660; iPlanetDirectoryPro=AQIC5wM2LY4Sfcz5cqc4Jljlq162i6g5PpOteKJ7SdpJLDY%3D%40AAJTSQACMDE%3D%23; MOD_AUTH_CAS=MOD_AUTH_ST-768221-XPQtlQVre42uc40rOxI31634967303782-MbTh-cas; route=8f44abc1739fbe239d2b96faa8917c02; asessionid=2d3db5ea-469f-4c0d-bf78-94fede646efe; HWWAFSESID=3c35c73122e510626d; HWWAFSESTIME=1634967304285; JSESSIONID=TuGrpWQ5Hp_kKcDZrrNw7-dW-O73_WZWdH4xlF2JJrmK9wWJrZOx\u0021-1782873013' \
  --data-raw "*order=%2BKSJC&XNXQDM=2021-2022-1&JASDM=${i}" \
  --compressed \
  --insecure
done