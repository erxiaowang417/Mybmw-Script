# Mybmw

## scriptable

* 非原作者
* 免费
* 仅在原方案基础上仅修改登陆失败的问题

- 下载对应版本(两种方式)

        食用方法：
            1.本代码调试过程使用密码登录，介意登录的慎用！
            2.登录过程写入正确的代码【版本号】，不要随意猜测

- 方式一 账户+password

        U='小组件完全免费-收费的都是骗子';
        N='bmw_scriptV3-release';
        await Promise.all([`${N}.js`].map(async(js)=>{try{F=FileManager[module.filename.includes('Documents/iCloud~')?'iCloud':'local']();F.remove(F.joinPath(F.documentsDirectory(),js));}catch(e){}F.write(F.joinPath(F.documentsDirectory(),js),await new Request(`https://gitee.com/erxiaowang417/scriptable/raw/master/src/${encodeURI(N)}.js`).load());}));F.remove(module.filename);Safari.open('scriptable:///run?scriptName=')
        //复制整段代码，新建一个空白小组件，粘贴进去点一下右下角运行，然后进入宝马小组件登陆就好了。

- 方式二 账户+短信验证   
    
        U='小组件完全免费-收费的都是骗子';
        N='bmw_scriptV2_SMS-release';
        await Promise.all([`${N}.js`].map(async(js)=>{try{F=FileManager[module.filename.includes('Documents/iCloud~')?'iCloud':'local']();F.remove(F.joinPath(F.documentsDirectory(),js));}catch(e){}F.write(F.joinPath(F.documentsDirectory(),js),await new Request(`https://gitee.com/erxiaowang417/scriptable/raw/master/src/${encodeURI(N)}.js`).load());}));F.remove(module.filename);Safari.open('scriptable:///run?scriptName=')
        //复制整段代码，新建一个空白小组件，粘贴进去点一下右下角运行，然后进入宝马小组件登陆就好了。





## 仅使用 catcher
[查看方案](https://github.com/erxiaowang417/Mybmw-Script/tree/main/frida)
