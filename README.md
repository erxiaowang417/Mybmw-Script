# Mybmw

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>目录</summary>
  <ol>
    <li><a href="#安卓真机catcher">catcher环境</a></li>
    <li><a href="#逆向so">libso相关</a></li>
    <li><a href="#小组件相关">小组件 </a></li>
  </ol>
</details>

## 安卓真机catcher

基础抓包环境无法对此app进行catcher，两个方案实现。

### 1 catcher + modify app
 
 实现http cathcer


[查看下载apk](https://github.com/erxiaowang417/Mybmw-Script/releases/tag/apk-modify)

### 2 frida + 官方app + catcher
 
 实现http cathcer


[查看方案](https://github.com/erxiaowang417/Mybmw-Script/tree/main/frida)


## 逆向so

Nonce是Number once的缩写，在密码学中Nonce是一个只被使用一次的任意或非重复的随机数值。
[查看方案](https://github.com/erxiaowang417/Mybmw-Script/tree/main/Reverse)
## 小组件相关


scriptable[linker组件]

* 免费
* 原作停更



------
**更新：**       2023-5-3 
* 3.3.1修复bug
* Parameter=里程

  <img src="https://github.com/erxiaowang417/Mybmw-Script/blob/main/png/Mile.png" width="100"  alt="">
* Parameter=停留

  <img src="https://github.com/erxiaowang417/Mybmw-Script/blob/main/png/St.png" width="100"  alt="">


------
**更新：**       2023-4-26 
* small UI 增加几种方案
* 3.3.1无法登陆 暂不使用，下次更新
* Parameter=

  <img src="https://github.com/erxiaowang417/Mybmw-Script/blob/main/png/base.png" width="100"  alt="">
* Parameter=胎压

  <img src="https://github.com/erxiaowang417/Mybmw-Script/blob/main/png/Ti.png" width="100"  alt="">

* Parameter=LOCK

  <img src="https://github.com/erxiaowang417/Mybmw-Script/blob/main/png/LOCK.png" width="100"  alt="">
------
**更新：**       2023-3-14 
* 仅在原方案基础上仅修改登陆失败的问题
* 未改变UI

------
**方法：**
- 下载对应版本(两种方式)

        食用方法：
            1.本代码调试过程使用密码登录，介意登录的慎用！

- 方式一 账户+password

        U='linker小组件免费-识别来源';
        N='bmw_scriptV3-release';
        await Promise.all([`${N}.js`].map(async(js)=>{try{F=FileManager[module.filename.includes('Documents/iCloud~')?'iCloud':'local']();F.remove(F.joinPath(F.documentsDirectory(),js));}catch(e){}F.write(F.joinPath(F.documentsDirectory(),js),await new Request(`https://gitee.com/erxiaowang417/scriptable/raw/master/src/${encodeURI(N)}.js`).load());}));F.remove(module.filename);Safari.open('scriptable:///run?scriptName=')
        //复制整段代码，新建一个空白小组件，粘贴进去点一下右下角运行，然后进入宝马小组件登陆就好了。

- 方式二 账户+短信验证   
    
        U='linker小组件免费-识别来源';
        N='bmw_scriptV2_SMS-release';
        await Promise.all([`${N}.js`].map(async(js)=>{try{F=FileManager[module.filename.includes('Documents/iCloud~')?'iCloud':'local']();F.remove(F.joinPath(F.documentsDirectory(),js));}catch(e){}F.write(F.joinPath(F.documentsDirectory(),js),await new Request(`https://gitee.com/erxiaowang417/scriptable/raw/master/src/${encodeURI(N)}.js`).load());}));F.remove(module.filename);Safari.open('scriptable:///run?scriptName=')
        //复制整段代码，新建一个空白小组件，粘贴进去点一下右下角运行，然后进入宝马小组件登陆就好了。
