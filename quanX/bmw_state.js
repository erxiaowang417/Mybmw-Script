/*
[task_local]
#bmw-车辆状态
0 0 1 1 * bmw_state.js
update：20231103
 */
const $ = new Env('bmw-车辆状态');

const HEADERS = "eyJ1c2VyLWFnZW50IjoiRGFydC8yLjE5IChkYXJ0OmlvKSIsIkNvbnRlbnQtVHlwZSI6ImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgiLCJBY2NlcHQtTGFuZ3VhZ2UiOiJ6aC1DTiIsIngtdXNlci1hZ2VudCI6ImFuZHJvaWQocXAxYS4xOTA3MTEuMDIwLm45NjBmeHhzOGZ1YzQpO2JtdzszLjkuMCgyNzc5MCk7Y24iLCJhY2NlcHQtbGFuZ3VhZ2UiOiJ6aC1DTiIsImhvc3QiOiJteXByb2ZpbGUuYm13LmNvbS5jbiIsIngtY2x1c3Rlci11c2UtbW9jayI6Im5ldmVyIiwiMjQtaG91ci1mb3JtYXQiOiJmYWxzZSIsIngtaWRlbnRpdHktcHJvdmlkZXIiOiJnY2RtIiwiYm13LXVuaXRzLXByZWZlcmVuY2VzIjoiZD1LTTt2PUw7cD1CO2VjPUtXSDEwMEtNO2ZjPUwxMDBLTTtlbT1HS007In0=";
!function (t, r) {
  var e, n, i, o, s, a, c; t.CryptoJS = (e = e || function (t, r) { var e; if ("undefined" != typeof window && window.crypto && (e = window.crypto), "undefined" != typeof self && self.crypto && (e = self.crypto), "undefined" != typeof globalThis && globalThis.crypto && (e = globalThis.crypto), !e && "undefined" != typeof window && window.msCrypto && (e = window.msCrypto), !e && "undefined" != typeof global && global.crypto && (e = global.crypto), !e && "function" == typeof require) try { e = require("crypto") } catch (t) { } var n = function () { if (e) { if ("function" == typeof e.getRandomValues) try { return e.getRandomValues(new Uint32Array(1))[0] } catch (t) { } if ("function" == typeof e.randomBytes) try { return e.randomBytes(4).readInt32LE() } catch (t) { } } throw new Error("Native crypto module could not be used to get secure random number.") }, i = Object.create || function () { function t() { } return function (r) { var e; return t.prototype = r, e = new t, t.prototype = null, e } }(), o = {}, s = o.lib = {}, a = s.Base = { extend: function (t) { var r = i(this); return t && r.mixIn(t), r.hasOwnProperty("init") && this.init !== r.init || (r.init = function () { r.$super.init.apply(this, arguments) }), r.init.prototype = r, r.$super = this, r }, create: function () { var t = this.extend(); return t.init.apply(t, arguments), t }, init: function () { }, mixIn: function (t) { for (var r in t) t.hasOwnProperty(r) && (this[r] = t[r]); t.hasOwnProperty("toString") && (this.toString = t.toString) }, clone: function () { return this.init.prototype.extend(this) } }, c = s.WordArray = a.extend({ init: function (t, r) { t = this.words = t || [], this.sigBytes = null != r ? r : 4 * t.length }, toString: function (t) { return (t || h).stringify(this) }, concat: function (t) { var r = this.words, e = t.words, n = this.sigBytes, i = t.sigBytes; if (this.clamp(), n % 4) for (var o = 0; o < i; o++) { var s = e[o >>> 2] >>> 24 - o % 4 * 8 & 255; r[n + o >>> 2] |= s << 24 - (n + o) % 4 * 8 } else for (var a = 0; a < i; a += 4)r[n + a >>> 2] = e[a >>> 2]; return this.sigBytes += i, this }, clamp: function () { var r = this.words, e = this.sigBytes; r[e >>> 2] &= 4294967295 << 32 - e % 4 * 8, r.length = t.ceil(e / 4) }, clone: function () { var t = a.clone.call(this); return t.words = this.words.slice(0), t }, random: function (t) { for (var r = [], e = 0; e < t; e += 4)r.push(n()); return new c.init(r, t) } }), f = o.enc = {}, h = f.Hex = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, n = [], i = 0; i < e; i++) { var o = r[i >>> 2] >>> 24 - i % 4 * 8 & 255; n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16)) } return n.join("") }, parse: function (t) { for (var r = t.length, e = [], n = 0; n < r; n += 2)e[n >>> 3] |= parseInt(t.substr(n, 2), 16) << 24 - n % 8 * 4; return new c.init(e, r / 2) } }, u = f.Latin1 = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, n = [], i = 0; i < e; i++) { var o = r[i >>> 2] >>> 24 - i % 4 * 8 & 255; n.push(String.fromCharCode(o)) } return n.join("") }, parse: function (t) { for (var r = t.length, e = [], n = 0; n < r; n++)e[n >>> 2] |= (255 & t.charCodeAt(n)) << 24 - n % 4 * 8; return new c.init(e, r) } }, d = f.Utf8 = { stringify: function (t) { try { return decodeURIComponent(escape(u.stringify(t))) } catch (t) { throw new Error("Malformed UTF-8 data") } }, parse: function (t) { return u.parse(unescape(encodeURIComponent(t))) } }, p = s.BufferedBlockAlgorithm = a.extend({ reset: function () { this._data = new c.init, this._nDataBytes = 0 }, _append: function (t) { "string" == typeof t && (t = d.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes }, _process: function (r) { var e, n = this._data, i = n.words, o = n.sigBytes, s = this.blockSize, a = 4 * s, f = o / a, h = (f = r ? t.ceil(f) : t.max((0 | f) - this._minBufferSize, 0)) * s, u = t.min(4 * h, o); if (h) { for (var d = 0; d < h; d += s)this._doProcessBlock(i, d); e = i.splice(0, h), n.sigBytes -= u } return new c.init(e, u) }, clone: function () { var t = a.clone.call(this); return t._data = this._data.clone(), t }, _minBufferSize: 0 }); s.Hasher = p.extend({ cfg: a.extend(), init: function (t) { this.cfg = this.cfg.extend(t), this.reset() }, reset: function () { p.reset.call(this), this._doReset() }, update: function (t) { return this._append(t), this._process(), this }, finalize: function (t) { t && this._append(t); var r = this._doFinalize(); return r }, blockSize: 16, _createHelper: function (t) { return function (r, e) { return new t.init(e).finalize(r) } } }), o.algo = {}; return o }(Math), o = (i = e).lib, s = o.Base, a = o.WordArray, (c = i.x64 = {}).Word = s.extend({ init: function (t, r) { this.high = t, this.low = r } }), c.WordArray = s.extend({ init: function (t, r) { t = this.words = t || [], this.sigBytes = null != r ? r : 8 * t.length }, toX32: function () { for (var t = this.words, r = t.length, e = [], n = 0; n < r; n++) { var i = t[n]; e.push(i.high), e.push(i.low) } return a.create(e, this.sigBytes) }, clone: function () { for (var t = s.clone.call(this), r = t.words = this.words.slice(0), e = r.length, n = 0; n < e; n++)r[n] = r[n].clone(); return t } }), function () { if ("function" == typeof ArrayBuffer) { var t = e.lib.WordArray, r = t.init; (t.init = function (t) { if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), t instanceof Uint8Array) { for (var e = t.byteLength, n = [], i = 0; i < e; i++)n[i >>> 2] |= t[i] << 24 - i % 4 * 8; r.call(this, n, e) } else r.apply(this, arguments) }).prototype = t } }(), function () { var t = e, r = t.lib.WordArray, n = t.enc; function i(t) { return t << 8 & 4278255360 | t >>> 8 & 16711935 } n.Utf16 = n.Utf16BE = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, n = [], i = 0; i < e; i += 2) { var o = r[i >>> 2] >>> 16 - i % 4 * 8 & 65535; n.push(String.fromCharCode(o)) } return n.join("") }, parse: function (t) { for (var e = t.length, n = [], i = 0; i < e; i++)n[i >>> 1] |= t.charCodeAt(i) << 16 - i % 2 * 16; return r.create(n, 2 * e) } }, n.Utf16LE = { stringify: function (t) { for (var r = t.words, e = t.sigBytes, n = [], o = 0; o < e; o += 2) { var s = i(r[o >>> 2] >>> 16 - o % 4 * 8 & 65535); n.push(String.fromCharCode(s)) } return n.join("") }, parse: function (t) { for (var e = t.length, n = [], o = 0; o < e; o++)n[o >>> 1] |= i(t.charCodeAt(o) << 16 - o % 2 * 16); return r.create(n, 2 * e) } } }(), function () { var t = e, r = t.lib.WordArray; t.enc.Base64 = { stringify: function (t) { var r = t.words, e = t.sigBytes, n = this._map; t.clamp(); for (var i = [], o = 0; o < e; o += 3)for (var s = (r[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (r[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | r[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < e; a++)i.push(n.charAt(s >>> 6 * (3 - a) & 63)); var c = n.charAt(64); if (c) for (; i.length % 4;)i.push(c); return i.join("") }, parse: function (t) { var e = t.length, n = this._map, i = this._reverseMap; if (!i) { i = this._reverseMap = []; for (var o = 0; o < n.length; o++)i[n.charCodeAt(o)] = o } var s = n.charAt(64); if (s) { var a = t.indexOf(s); -1 !== a && (e = a) } return function (t, e, n) { for (var i = [], o = 0, s = 0; s < e; s++)if (s % 4) { var a = n[t.charCodeAt(s - 1)] << s % 4 * 2, c = n[t.charCodeAt(s)] >>> 6 - s % 4 * 2, f = a | c; i[o >>> 2] |= f << 24 - o % 4 * 8, o++ } return r.create(i, o) }(t, e, i) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" } }(), function () { var t = e, r = t.lib.WordArray; t.enc.Base64url = { stringify: function (t, r = !0) { var e = t.words, n = t.sigBytes, i = r ? this._safe_map : this._map; t.clamp(); for (var o = [], s = 0; s < n; s += 3)for (var a = (e[s >>> 2] >>> 24 - s % 4 * 8 & 255) << 16 | (e[s + 1 >>> 2] >>> 24 - (s + 1) % 4 * 8 & 255) << 8 | e[s + 2 >>> 2] >>> 24 - (s + 2) % 4 * 8 & 255, c = 0; c < 4 && s + .75 * c < n; c++)o.push(i.charAt(a >>> 6 * (3 - c) & 63)); var f = i.charAt(64); if (f) for (; o.length % 4;)o.push(f); return o.join("") }, parse: function (t, e = !0) { var n = t.length, i = e ? this._safe_map : this._map, o = this._reverseMap; if (!o) { o = this._reverseMap = []; for (var s = 0; s < i.length; s++)o[i.charCodeAt(s)] = s } var a = i.charAt(64); if (a) { var c = t.indexOf(a); -1 !== c && (n = c) } return function (t, e, n) { for (var i = [], o = 0, s = 0; s < e; s++)if (s % 4) { var a = n[t.charCodeAt(s - 1)] << s % 4 * 2, c = n[t.charCodeAt(s)] >>> 6 - s % 4 * 2, f = a | c; i[o >>> 2] |= f << 24 - o % 4 * 8, o++ } return r.create(i, o) }(t, n, o) }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" } }(), function (t) { var r = e, n = r.lib, i = n.WordArray, o = n.Hasher, s = r.algo, a = []; !function () { for (var r = 0; r < 64; r++)a[r] = 4294967296 * t.abs(t.sin(r + 1)) | 0 }(); var c = s.MD5 = o.extend({ _doReset: function () { this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878]) }, _doProcessBlock: function (t, r) { for (var e = 0; e < 16; e++) { var n = r + e, i = t[n]; t[n] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8) } var o = this._hash.words, s = t[r + 0], c = t[r + 1], p = t[r + 2], l = t[r + 3], y = t[r + 4], v = t[r + 5], _ = t[r + 6], g = t[r + 7], B = t[r + 8], m = t[r + 9], w = t[r + 10], x = t[r + 11], k = t[r + 12], S = t[r + 13], A = t[r + 14], C = t[r + 15], b = o[0], z = o[1], E = o[2], M = o[3]; z = d(z = d(z = d(z = d(z = u(z = u(z = u(z = u(z = h(z = h(z = h(z = h(z = f(z = f(z = f(z = f(z, E = f(E, M = f(M, b = f(b, z, E, M, s, 7, a[0]), z, E, c, 12, a[1]), b, z, p, 17, a[2]), M, b, l, 22, a[3]), E = f(E, M = f(M, b = f(b, z, E, M, y, 7, a[4]), z, E, v, 12, a[5]), b, z, _, 17, a[6]), M, b, g, 22, a[7]), E = f(E, M = f(M, b = f(b, z, E, M, B, 7, a[8]), z, E, m, 12, a[9]), b, z, w, 17, a[10]), M, b, x, 22, a[11]), E = f(E, M = f(M, b = f(b, z, E, M, k, 7, a[12]), z, E, S, 12, a[13]), b, z, A, 17, a[14]), M, b, C, 22, a[15]), E = h(E, M = h(M, b = h(b, z, E, M, c, 5, a[16]), z, E, _, 9, a[17]), b, z, x, 14, a[18]), M, b, s, 20, a[19]), E = h(E, M = h(M, b = h(b, z, E, M, v, 5, a[20]), z, E, w, 9, a[21]), b, z, C, 14, a[22]), M, b, y, 20, a[23]), E = h(E, M = h(M, b = h(b, z, E, M, m, 5, a[24]), z, E, A, 9, a[25]), b, z, l, 14, a[26]), M, b, B, 20, a[27]), E = h(E, M = h(M, b = h(b, z, E, M, S, 5, a[28]), z, E, p, 9, a[29]), b, z, g, 14, a[30]), M, b, k, 20, a[31]), E = u(E, M = u(M, b = u(b, z, E, M, v, 4, a[32]), z, E, B, 11, a[33]), b, z, x, 16, a[34]), M, b, A, 23, a[35]), E = u(E, M = u(M, b = u(b, z, E, M, c, 4, a[36]), z, E, y, 11, a[37]), b, z, g, 16, a[38]), M, b, w, 23, a[39]), E = u(E, M = u(M, b = u(b, z, E, M, S, 4, a[40]), z, E, s, 11, a[41]), b, z, l, 16, a[42]), M, b, _, 23, a[43]), E = u(E, M = u(M, b = u(b, z, E, M, m, 4, a[44]), z, E, k, 11, a[45]), b, z, C, 16, a[46]), M, b, p, 23, a[47]), E = d(E, M = d(M, b = d(b, z, E, M, s, 6, a[48]), z, E, g, 10, a[49]), b, z, A, 15, a[50]), M, b, v, 21, a[51]), E = d(E, M = d(M, b = d(b, z, E, M, k, 6, a[52]), z, E, l, 10, a[53]), b, z, w, 15, a[54]), M, b, c, 21, a[55]), E = d(E, M = d(M, b = d(b, z, E, M, B, 6, a[56]), z, E, C, 10, a[57]), b, z, _, 15, a[58]), M, b, S, 21, a[59]), E = d(E, M = d(M, b = d(b, z, E, M, y, 6, a[60]), z, E, x, 10, a[61]), b, z, p, 15, a[62]), M, b, m, 21, a[63]), o[0] = o[0] + b | 0, o[1] = o[1] + z | 0, o[2] = o[2] + E | 0, o[3] = o[3] + M | 0 }, _doFinalize: function () { var r = this._data, e = r.words, n = 8 * this._nDataBytes, i = 8 * r.sigBytes; e[i >>> 5] |= 128 << 24 - i % 32; var o = t.floor(n / 4294967296), s = n; e[15 + (i + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), e[14 + (i + 64 >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), r.sigBytes = 4 * (e.length + 1), this._process(); for (var a = this._hash, c = a.words, f = 0; f < 4; f++) { var h = c[f]; c[f] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8) } return a }, clone: function () { var t = o.clone.call(this); return t._hash = this._hash.clone(), t } }); function f(t, r, e, n, i, o, s) { var a = t + (r & e | ~r & n) + i + s; return (a << o | a >>> 32 - o) + r } function h(t, r, e, n, i, o, s) { var a = t + (r & n | e & ~n) + i + s; return (a << o | a >>> 32 - o) + r } function u(t, r, e, n, i, o, s) { var a = t + (r ^ e ^ n) + i + s; return (a << o | a >>> 32 - o) + r } function d(t, r, e, n, i, o, s) { var a = t + (e ^ (r | ~n)) + i + s; return (a << o | a >>> 32 - o) + r } r.MD5 = o._createHelper(c) }(Math), function (t) { var r = e, n = r.lib, i = n.WordArray, o = n.Hasher, s = r.algo, a = [], c = []; !function () { function r(r) { for (var e = t.sqrt(r), n = 2; n <= e; n++)if (!(r % n)) return !1; return !0 } function e(t) { return 4294967296 * (t - (0 | t)) | 0 } for (var n = 2, i = 0; i < 64;)r(n) && (i < 8 && (a[i] = e(t.pow(n, .5))), c[i] = e(t.pow(n, 1 / 3)), i++), n++ }(); var f = [], h = s.SHA256 = o.extend({ _doReset: function () { this._hash = new i.init(a.slice(0)) }, _doProcessBlock: function (t, r) { for (var e = this._hash.words, n = e[0], i = e[1], o = e[2], s = e[3], a = e[4], h = e[5], u = e[6], d = e[7], p = 0; p < 64; p++) { if (p < 16) f[p] = 0 | t[r + p]; else { var l = f[p - 15], y = (l << 25 | l >>> 7) ^ (l << 14 | l >>> 18) ^ l >>> 3, v = f[p - 2], _ = (v << 15 | v >>> 17) ^ (v << 13 | v >>> 19) ^ v >>> 10; f[p] = y + f[p - 7] + _ + f[p - 16] } var g = n & i ^ n & o ^ i & o, B = (n << 30 | n >>> 2) ^ (n << 19 | n >>> 13) ^ (n << 10 | n >>> 22), m = d + ((a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25)) + (a & h ^ ~a & u) + c[p] + f[p]; d = u, u = h, h = a, a = s + m | 0, s = o, o = i, i = n, n = m + (B + g) | 0 } e[0] = e[0] + n | 0, e[1] = e[1] + i | 0, e[2] = e[2] + o | 0, e[3] = e[3] + s | 0, e[4] = e[4] + a | 0, e[5] = e[5] + h | 0, e[6] = e[6] + u | 0, e[7] = e[7] + d | 0 }, _doFinalize: function () { var r = this._data, e = r.words, n = 8 * this._nDataBytes, i = 8 * r.sigBytes; return e[i >>> 5] |= 128 << 24 - i % 32, e[14 + (i + 64 >>> 9 << 4)] = t.floor(n / 4294967296), e[15 + (i + 64 >>> 9 << 4)] = n, r.sigBytes = 4 * e.length, this._process(), this._hash }, clone: function () { var t = o.clone.call(this); return t._hash = this._hash.clone(), t } }); r.SHA256 = o._createHelper(h) }(Math),
    function () { var t = e, r = t.lib, n = r.Base, i = r.WordArray, o = t.algo, s = o.MD5, a = o.EvpKDF = n.extend({ cfg: n.extend({ keySize: 4, hasher: s, iterations: 1 }), init: function (t) { this.cfg = this.cfg.extend(t) }, compute: function (t, r) { for (var e, n = this.cfg, o = n.hasher.create(), s = i.create(), a = s.words, c = n.keySize, f = n.iterations; a.length < c;) { e && o.update(e), e = o.update(t).finalize(r), o.reset(); for (var h = 1; h < f; h++)e = o.finalize(e), o.reset(); s.concat(e) } return s.sigBytes = 4 * c, s } }); t.EvpKDF = function (t, r, e) { return a.create(e).compute(t, r) } }(), e.lib.Cipher || function (t) { var r = e, n = r.lib, i = n.Base, o = n.WordArray, s = n.BufferedBlockAlgorithm, a = r.enc, c = (a.Utf8, a.Base64), f = r.algo.EvpKDF, h = n.Cipher = s.extend({ cfg: i.extend(), createEncryptor: function (t, r) { return this.create(this._ENC_XFORM_MODE, t, r) }, createDecryptor: function (t, r) { return this.create(this._DEC_XFORM_MODE, t, r) }, init: function (t, r, e) { this.cfg = this.cfg.extend(e), this._xformMode = t, this._key = r, this.reset() }, reset: function () { s.reset.call(this), this._doReset() }, process: function (t) { return this._append(t), this._process() }, finalize: function (t) { return t && this._append(t), this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function () { function t(t) { return "string" == typeof t ? B : _ } return function (r) { return { encrypt: function (e, n, i) { return t(n).encrypt(r, e, n, i) }, decrypt: function (e, n, i) { return t(n).decrypt(r, e, n, i) } } } }() }), u = (n.StreamCipher = h.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }), r.mode = {}), d = n.BlockCipherMode = i.extend({ createEncryptor: function (t, r) { return this.Encryptor.create(t, r) }, createDecryptor: function (t, r) { return this.Decryptor.create(t, r) }, init: function (t, r) { this._cipher = t, this._iv = r } }), p = u.CBC = function () { var r = d.extend(); function e(r, e, n) { var i, o = this._iv; o ? (i = o, this._iv = t) : i = this._prevBlock; for (var s = 0; s < n; s++)r[e + s] ^= i[s] } return r.Encryptor = r.extend({ processBlock: function (t, r) { var n = this._cipher, i = n.blockSize; e.call(this, t, r, i), n.encryptBlock(t, r), this._prevBlock = t.slice(r, r + i) } }), r.Decryptor = r.extend({ processBlock: function (t, r) { var n = this._cipher, i = n.blockSize, o = t.slice(r, r + i); n.decryptBlock(t, r), e.call(this, t, r, i), this._prevBlock = o } }), r }(), l = (r.pad = {}).Pkcs7 = { pad: function (t, r) { for (var e = 4 * r, n = e - t.sigBytes % e, i = n << 24 | n << 16 | n << 8 | n, s = [], a = 0; a < n; a += 4)s.push(i); var c = o.create(s, n); t.concat(c) }, unpad: function (t) { var r = 255 & t.words[t.sigBytes - 1 >>> 2]; t.sigBytes -= r } }, y = (n.BlockCipher = h.extend({ cfg: h.cfg.extend({ mode: p, padding: l }), reset: function () { var t; h.reset.call(this); var r = this.cfg, e = r.iv, n = r.mode; this._xformMode == this._ENC_XFORM_MODE ? t = n.createEncryptor : (t = n.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == t ? this._mode.init(this, e && e.words) : (this._mode = t.call(n, this, e && e.words), this._mode.__creator = t) }, _doProcessBlock: function (t, r) { this._mode.processBlock(t, r) }, _doFinalize: function () { var t, r = this.cfg.padding; return this._xformMode == this._ENC_XFORM_MODE ? (r.pad(this._data, this.blockSize), t = this._process(!0)) : (t = this._process(!0), r.unpad(t)), t }, blockSize: 4 }), n.CipherParams = i.extend({ init: function (t) { this.mixIn(t) }, toString: function (t) { return (t || this.formatter).stringify(this) } })), v = (r.format = {}).OpenSSL = { stringify: function (t) { var r = t.ciphertext, e = t.salt; return (e ? o.create([1398893684, 1701076831]).concat(e).concat(r) : r).toString(c) }, parse: function (t) { var r, e = c.parse(t), n = e.words; return 1398893684 == n[0] && 1701076831 == n[1] && (r = o.create(n.slice(2, 4)), n.splice(0, 4), e.sigBytes -= 16), y.create({ ciphertext: e, salt: r }) } }, _ = n.SerializableCipher = i.extend({ cfg: i.extend({ format: v }), encrypt: function (t, r, e, n) { n = this.cfg.extend(n); var i = t.createEncryptor(e, n), o = i.finalize(r), s = i.cfg; return y.create({ ciphertext: o, key: e, iv: s.iv, algorithm: t, mode: s.mode, padding: s.padding, blockSize: t.blockSize, formatter: n.format }) }, decrypt: function (t, r, e, n) { return n = this.cfg.extend(n), r = this._parse(r, n.format), t.createDecryptor(e, n).finalize(r.ciphertext) }, _parse: function (t, r) { return "string" == typeof t ? r.parse(t, this) : t } }), g = (r.kdf = {}).OpenSSL = { execute: function (t, r, e, n) { n || (n = o.random(8)); var i = f.create({ keySize: r + e }).compute(t, n), s = o.create(i.words.slice(r), 4 * e); return i.sigBytes = 4 * r, y.create({ key: i, iv: s, salt: n }) } }, B = n.PasswordBasedCipher = _.extend({ cfg: _.cfg.extend({ kdf: g }), encrypt: function (t, r, e, n) { var i = (n = this.cfg.extend(n)).kdf.execute(e, t.keySize, t.ivSize); n.iv = i.iv; var o = _.encrypt.call(this, t, r, i.key, n); return o.mixIn(i), o }, decrypt: function (t, r, e, n) { n = this.cfg.extend(n), r = this._parse(r, n.format); var i = n.kdf.execute(e, t.keySize, t.ivSize, r.salt); return n.iv = i.iv, _.decrypt.call(this, t, r, i.key, n) } }) }(), e.mode.ECB = ((n = e.lib.BlockCipherMode.extend()).Encryptor = n.extend({ processBlock: function (t, r) { this._cipher.encryptBlock(t, r) } }), n.Decryptor = n.extend({ processBlock: function (t, r) { this._cipher.decryptBlock(t, r) } }), n), e.pad.NoPadding = { pad: function () { }, unpad: function () { } }, function (t) { var r = e, n = r.lib.CipherParams, i = r.enc.Hex; r.format.Hex = { stringify: function (t) { return t.ciphertext.toString(i) }, parse: function (t) { var r = i.parse(t); return n.create({ ciphertext: r }) } } }(), function () { var t = e, r = t.lib.BlockCipher, n = t.algo, i = [], o = [], s = [], a = [], c = [], f = [], h = [], u = [], d = [], p = []; !function () { for (var t = [], r = 0; r < 256; r++)t[r] = r < 128 ? r << 1 : r << 1 ^ 283; var e = 0, n = 0; for (r = 0; r < 256; r++) { var l = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4; l = l >>> 8 ^ 255 & l ^ 99, i[e] = l, o[l] = e; var y = t[e], v = t[y], _ = t[v], g = 257 * t[l] ^ 16843008 * l; s[e] = g << 24 | g >>> 8, a[e] = g << 16 | g >>> 16, c[e] = g << 8 | g >>> 24, f[e] = g, g = 16843009 * _ ^ 65537 * v ^ 257 * y ^ 16843008 * e, h[l] = g << 24 | g >>> 8, u[l] = g << 16 | g >>> 16, d[l] = g << 8 | g >>> 24, p[l] = g, e ? (e = y ^ t[t[t[_ ^ y]]], n ^= t[t[n]]) : e = n = 1 } }(); var l = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], y = n.AES = r.extend({ _doReset: function () { if (!this._nRounds || this._keyPriorReset !== this._key) { for (var t = this._keyPriorReset = this._key, r = t.words, e = t.sigBytes / 4, n = 4 * ((this._nRounds = e + 6) + 1), o = this._keySchedule = [], s = 0; s < n; s++)s < e ? o[s] = r[s] : (f = o[s - 1], s % e ? e > 6 && s % e == 4 && (f = i[f >>> 24] << 24 | i[f >>> 16 & 255] << 16 | i[f >>> 8 & 255] << 8 | i[255 & f]) : (f = i[(f = f << 8 | f >>> 24) >>> 24] << 24 | i[f >>> 16 & 255] << 16 | i[f >>> 8 & 255] << 8 | i[255 & f], f ^= l[s / e | 0] << 24), o[s] = o[s - e] ^ f); for (var a = this._invKeySchedule = [], c = 0; c < n; c++) { if (s = n - c, c % 4) var f = o[s]; else f = o[s - 4]; a[c] = c < 4 || s <= 4 ? f : h[i[f >>> 24]] ^ u[i[f >>> 16 & 255]] ^ d[i[f >>> 8 & 255]] ^ p[i[255 & f]] } } }, encryptBlock: function (t, r) { this._doCryptBlock(t, r, this._keySchedule, s, a, c, f, i) }, decryptBlock: function (t, r) { var e = t[r + 1]; t[r + 1] = t[r + 3], t[r + 3] = e, this._doCryptBlock(t, r, this._invKeySchedule, h, u, d, p, o), e = t[r + 1], t[r + 1] = t[r + 3], t[r + 3] = e }, _doCryptBlock: function (t, r, e, n, i, o, s, a) { for (var c = this._nRounds, f = t[r] ^ e[0], h = t[r + 1] ^ e[1], u = t[r + 2] ^ e[2], d = t[r + 3] ^ e[3], p = 4, l = 1; l < c; l++) { var y = n[f >>> 24] ^ i[h >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & d] ^ e[p++], v = n[h >>> 24] ^ i[u >>> 16 & 255] ^ o[d >>> 8 & 255] ^ s[255 & f] ^ e[p++], _ = n[u >>> 24] ^ i[d >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & h] ^ e[p++], g = n[d >>> 24] ^ i[f >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & u] ^ e[p++]; f = y, h = v, u = _, d = g } y = (a[f >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & d]) ^ e[p++], v = (a[h >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[d >>> 8 & 255] << 8 | a[255 & f]) ^ e[p++], _ = (a[u >>> 24] << 24 | a[d >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[255 & h]) ^ e[p++], g = (a[d >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & u]) ^ e[p++], t[r] = y, t[r + 1] = v, t[r + 2] = _, t[r + 3] = g }, keySize: 8 }); t.AES = r._createHelper(y) }(), e)
}(this);
var CryptoJS = this.CryptoJS;
function base64De(options) {
  const Str = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(options));
  let res = Str;
  if (Str.includes("{") || Str.includes("[")) {
    res = JSON.parse(Str);
  }
  return res
}
$.USER_HEADERS = base64De(HEADERS);
!(async () => {
  if (await requiConfig()) {
    $.log("script end.");
  }
  await bmwAlert();
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })
async function requiConfig() {
  $.bmwToken = getKey("bmwToken");
  if (!$.bmwToken) {
    $.log("无账号token");
    return 1;
  }
  $.token = await genToken();
  if (!$.token) {
    $.log("- 账号token异常，无法执行");
    return 1;
  }
  $.custom_vehile = getKey("custom_vehile");
  if (!$.custom_vehile) {
    $.log("- 获取当前车辆信息");
    await getVehicleList();
    $.custom_vehile = getKey("custom_vehile");
  }
  if (!$.custom_vehile) {
    return 1;
  }
  $.custom_vin = $.custom_vehile[0].vin;
  $.custom_model = $.custom_vehile[0].model;
  $.custom_licensePlate = $.custom_vehile[0].licensePlate;
  return 0
}
async function bmwAlert() {
  const data = await carDetails();
  if (data && data.state) {
    await doorCheck(data);
  }
}
async function carDetails() {
  const URL = "aHR0cHM6Ly9teXByb2ZpbGUuYm13LmNvbS5jbi9lYWRyYXgtdmNzL3Y0L3ZlaGljbGVzL3N0YXRlPw==";
  const url = base64De(URL);
  const options = {
    method: "GET",
    url: url,
    headers: {
      ...$.USER_HEADERS,
      authorization: `Bearer ${$.token}`,
      "bmw-vin": $.custom_vin,
    },
    body: ``,
  }
  return await fetch(options);
}
async function doorCheck(data) {
  let msg = '';
  const state = data.state || '';
  const combinedSecurityState = `锁定状态：${state.doorsState && state.doorsState.combinedSecurityState && state.doorsState.combinedSecurityState === 'SECURED' && '☑️ 锁定' || '⚠️ 解锁'} \n`;
  let doorsState = false;
  let door = '车门：';
  if (state.doorsState && state.doorsState.leftRear !== 'CLOSED') {
    door += '|左后门';
    doorsState = true;
  }
  if (state.doorsState && state.doorsState.rightRear !== 'CLOSED') {
    door += '|右后门';
    doorsState = true;
  }
  if (state.doorsState && state.doorsState.rightFront !== 'CLOSED') {
    door += '|右前门';
    doorsState = true;
  }
  if (state.doorsState && state.doorsState.leftFront !== 'CLOSED') {
    door += '|左前门';
    doorsState = true;
  }
  if (doorsState) {
    door += '| ⚠️ 异常！\n'
  } else {
    door += '        ☑️ 全关 \n'
  }
  doorsState = false;
  let windows = '车窗：';
  if (state.windowsState && state.windowsState.leftRear !== 'CLOSED') {
    windows += '|左后窗';
    doorsState = true;
  }
  if (state.windowsState && state.windowsState.rightRear !== 'CLOSED') {
    windows += '|右后窗';
    doorsState = true;
  }
  if (state.windowsState && state.windowsState.rightFront !== 'CLOSED') {
    windows += '|右前窗';
    doorsState = true;
  }
  if (state.windowsState && state.windowsState.leftFront !== 'CLOSED') {
    windows += '|左前窗';
    doorsState = true;
  }
  if (doorsState) {
    windows += '| ⚠️ 异常！\n'
  } else {
    windows += '        ☑️ 全关 \n'
  }
  const hood = `引擎盖：${state.doorsState && state.doorsState.hood === 'CLOSED' &&
    '    ☑️ 关闭' || ' ⚠️ 异常！\n'} \n`;
  const roof = `天窗：${state.roofState && state.roofState.roofState === 'CLOSED' &&
    '        ☑️ 关闭' || ' ⚠️ 异常！\n'} \n`;
  const trunk = `后备箱：${state.doorsState && state.doorsState.trunk === 'CLOSED' &&
    '    ☑️ 关闭' || ' ⚠️ 异常！\n'} \n`;
  if (combinedSecurityState.indexOf('⚠️') === -1 && door.indexOf('⚠️') === -1 && windows.indexOf('⚠️') === -1 && hood.indexOf('⚠️') === -1 && trunk.indexOf('⚠️') === -1 && roof.indexOf('⚠️') === -1) {
    msg += '✅ 未见异常 \n';
    doorsState = false;
  } else {
    msg += '⚠️ 状态异常 \n'
    doorsState = true;
  }
  msg += '⬇️长按查看详情 \n'
  msg += '======================\n'
  msg += combinedSecurityState + door + windows + hood + trunk + roof;
  $notify($.custom_model + ':动态信息' + '              ' + $.time("[MM-dd HH:mm]"), "", msg);
}
async function fetch(options) {
  return await $task.fetch(options).then(response => {
    data = JSON.parse(response.body)
    return data;
  }, reason => {
    console.log(reason.error);
    return 0;
  });
};
function getKey(e) { const n = $prefs.valueForKey(e); if (!n) return console.log(e + "not exsit"), n; let t = n; return (n.includes("{") || n.includes("[")) && (t = JSON.parse(n)), t }
function setKey(e, t) { let r = t; return "object" == typeof t && (r = JSON.stringify(t)), $prefs.setValueForKey(r, e), 0 }
async function genToken() {
  let token = "";
  const { access_token, ts, refresh_token, gcid } = $.bmwToken;
  if (new Date().valueOf() > (ts + 1000 * 60 * 55)) {
    console.log("- 等待刷新刷新");
    token = await refreshToken(refresh_token, gcid);
    if (!token) {
      $.log("- 刷新失败❌");
      return 0;
    }
    console.log("- 刷新成功");
  } else {
    token = access_token;
  }
  return token;
}
function generateNonce(In) {
  const appVersion = "3.9.0";
  let nonce = "";
  const bet = "34785ghicotuvwdeflmnxyjkabzpqrs60129";
  function RandomNum(length) {
    return Array.from({ length }, () => bet[Math.floor(Math.random() * bet.length)]).join("");
  }
  let offest = 3, div = "#", sd = "a";
  const a1 = RandomNum(8),
    a2 = RandomNum(8);
  const k1 = bet[bet.length - 1 - bet.indexOf(a1.substr(offest, 1))],
    k2 = bet[bet.length - 1 - bet.indexOf(a2.substr(offest, 1))];
  const key = a1.substr(0, offest) + k1 + a1.substr(offest + 1) + a2.substr(0, offest) + k2 + a2.substr(offest + 1);
  let vi = RandomNum(16),
    b1 = vi.substr(0, 8),
    b2 = vi.substr(8, 8),
    a3 = RandomNum(8);
  const c1 = a2 + b1,
    c2 = a1 + b2;
  let StrIn = c1 + sd + CryptoJS.MD5(In).toString() + appVersion + In.substr(-4) + c2;
  const hash = CryptoJS.SHA256(StrIn).toString();
  const ts = new Date().toGMTString();
  StrIn = [In, ts, a3].join(div);
  const en = CryptoJS.enc.Hex.stringify(
    CryptoJS.AES.encrypt(
      StrIn, CryptoJS.enc.Utf8.parse(key),
      { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: CryptoJS.enc.Utf8.parse(vi) }
    ).ciphertext
  );
  nonce = c1 + hash.substr(0, 32) + en + c2 + hash.substr(32);
  return nonce;
}
async function refreshToken(refresh_token, gcid) {
  const URL = "aHR0cHM6Ly9teXByb2ZpbGUuYm13LmNvbS5jbi9lYWRyYXgtY29hcy92Mi9vYXV0aC90b2tlbg==";
  const url = base64De(URL);
  let tk = "";
  const nonce = generateNonce(gcid);
  const options = {
    method: "POST",
    url: url,
    headers: {
      ...$.USER_HEADERS,
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      "x-login-nonce": nonce,
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`
  };
  const res = await fetch(options);
  if (res && res.access_token) {
    const ts = new Date().valueOf();
    res.ts = ts;
    tk = res.access_token;
    setKey("bmwToken", res);
  } else {
    console.log("refreshToken false");
    return 0;
  }
  return tk;
};
async function getVehicleList() {
  //查找车辆列表
  const URL = "aHR0cHM6Ly9teXByb2ZpbGUuYm13LmNvbS5jbi9lYWRyYXgtdmNzL3Y1L3ZlaGljbGUtbGlzdD8=";
  const url = base64De(URL);
  const O = {
    method: "POST",
    url: url,
    headers: {
      ...$.USER_HEADERS,
      authorization: `Bearer ${$.token}`,
    },
    body: `{}`,
  }
  let res = await fetch(O);
  if (res.mappingInfos) {
    const obj = res.mappingInfos;
    let custom_vehile = [];
    for (let i = 0; i < obj.length; i++) {
      custom_vehile.push(
        {
          vin: obj[i].cnData.vin,
          model: obj[i].cnData.model,
          licensePlate: obj[i].cnData.licensePlate,
        }
      )
    }
    setKey("custom_vehile", custom_vehile);
  }
}

// prettier-ignore
function Env(e, t) { return new class { constructor(e, t) { this.name = e, this.data = null, this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, t), this.log("", `🔔${this.name}, 开始!`) } isQuanX() { return "undefined" != typeof $task } time(e, t = null) { const s = t ? new Date(t) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(e) && (e = e.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let t in i) new RegExp("(" + t + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? i[t] : ("00" + i[t]).substr(("" + i[t]).length))); return e } msg(t = e, s = "", i = "", n) { if (this.isMute || this.isQuanX() && $notify(t, s, i, (e => { if (!e) return e; if ("string" == typeof e) return { "open-url": e }; if ("object" == typeof e && this.isQuanX()) return { "open-url": e["open-url"] || e.url || e.openUrl, "media-url": e["media-url"] || e.mediaUrl } })(n)), !this.isMuteLog) { let e = ["", "==============📣系统通知📣=============="]; e.push(t), s && e.push(s), i && e.push(i), console.log(e.join("\n")), this.logs = this.logs.concat(e) } } log(...e) { e.length > 0 && (this.logs = [...this.logs, ...e]), console.log(e.join(this.logSeparator)) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { const t = ((new Date).getTime() - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${t} 秒`), $done(e) } }(e, t) }
