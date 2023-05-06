# Reverse (nonce)

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>目录</summary>
  <ol>
    <li><a href="#逆向环境">逆向环境</a></li>
    <li>
      <a href="#逆向思路">frida逆向思路 </a>
    </li>
    <li>
      <a href="#逆向so">so逆向思路 </a>
    </li>
  </ol>
</details>

## 逆向环境

* 安卓真机
* frida
* ida


## 逆向思路

------
**get token**

1获取滑动验证码 ➡ 2滑动验证 ➡ 3获取token

分析3的请求中header必要参数nonce

------
1.frida注入so与app交互接口

    python frida-function.py >test.log 
    

<img src="https://github.com/erxiaowang417/Mybmw-Script/blob/main/png/r1.png" width="300"  alt="">

------
2.查看并分析log

2.1 查看有效交互内容

<img src="https://github.com/erxiaowang417/Mybmw-Script/blob/main/png/r2.png" width="300"  alt="">

    1.sha256哈希
    2.AES-CBC-PKCS7Padding加密
    3.1370行的224字符=nonce(对比抓包可验证)

    N=owclwf1atqivwtaee45b08a8b76e5cc646fb53b0eb036405dd8592309105a76c3499558d3f5d14e9f3add8a5fa1f9ef169adab02e4c859cc09228c543772164ce9634478989315896be375e012475eb863e256b10adbd080q9bt0pldw426eikf01e284b5cfc88d08c809ba37f62765bf
    记
    key  = q9bt9pldowcldf1a
    vi   = tqivwtaew426eikf
    numer= 5gp7y25b

2.2 文本分析

    原始文本1: 8618577778888&Fri, 05 May 2023 04:59:24 GMT&5gp7y25b(t1)
    t1=phone&GMT&numer
    原始文本2: owclwf1atqivwtaeu3.3.18888q9bt0pldw426eikf(t2)
    t2=key`.substr(8)+vi.substr(0,8)+u3.3.1+phone.substr(9)+key`.substr(0,8)+vi.substr(8)
    sha256 
      bc9d65f3e9f8a45dac29812a29961c9a7c45b070ed73ef07b8e1d926910c0296
      e45b08a8b76e5cc646fb53b0eb03640541e284b5cfc88d08c809ba37f62765bf

2.3 显然文本t2为哈希输入，根据此信息对n进行分割

    sha256： 
    e45b08a8b76e5cc646fb53b0eb036405=s1
    41e284b5cfc88d08c809ba37f62765bf=s2
    N：
    owclwf1atqivwtae[key`.substr(8)+vi.substr(0,8)]
    e45b08a8b76e5cc646fb53b0eb036405(s1)
    dd8592309105a76c3499558d3f5d14e9414f089160a9d009c0233e724e665df4c87710a19702c8ddcad84c7aa5d0afd1bced31aa8fe7751e96868055389b7aa2(e=128字符)
    q9bt0pldw426eikf[key`.substr(0,8)+vi.substr(8)]
    01e284b5cfc88d08c809ba37f62765bf(s2)

2.4 试验aes128cbc计算
  
    in
    8618577778888&Fri, 05 May 2023 10:59:24 GMT&5gp7y25b(t1)
    
    key=key
    vi =vi

    out
    dd8592309105a76c3499558d3f5d14e9f3add8a5fa1f9ef169adab02e4c859cc09228c543772164ce9634478989315896be375e012475eb863e256b10adbd080
    ==e    

2.5

    N拼接完成,总结：
    大体框架基本完成，key存在2位混淆（方法比较简单，可用眼看出）
    详细算法可以逆向libso

## 逆向so

------
测试环境
* 安卓真机arm64
* ida
------
1.7 调试记录分析



<img src="https://github.com/erxiaowang417/Mybmw-Script/blob/main/png/r9.png" width="300"  alt="">

<img src="https://github.com/erxiaowang417/Mybmw-Script/blob/main/png/r10.png" width="300"  alt="">

不难看出，运用了xxx混淆函数。规律亦可得出



