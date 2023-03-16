# Mybmw-Frida

criptable



capture

基于arm /frida 注入 实现此app 的packet capture



## 环境搭建

1.根据pc端frida版本和手机CPU版本下载对应的frida-server
  - [下载地址](https://github.com/frida/frida/releases)
 
2.实测python版本(Python 3.11.2)

## 注入脚本简介

功能：破解XXX的flutter 绕过证书验证

    1. 启动需要注入APP
    2. adb 连接
    3. cmd: adb shell  cd /data/local/tmp  //以root ./frida-server，root需要su
    4. 端口映射: adb forward tcp:27042 tcp:27042  adb forward tcp:27043 tcp:27043 //这一步可有可无，frida-ps —R失败则需要转发
    5. 运行时verify found at: 0xxxxxxxxx(内存对应地址) 表示注入成功
    
## 食用方法


python3 myhook.py
