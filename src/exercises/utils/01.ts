export function formatProjectName(name: string) {
  return name.replace(/-/g, "_");
}
export function showToast(message: string) {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  // Android 环境下调用，调用原生的toast提示
  if (isAndroid) {
    console.log(message);
    window.AndroidWebView &&
      window.AndroidWebView.showToast &&
      window.AndroidWebView.showToast(message);
  }
  if (isIOS) {
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.showToast
    ) {
      console.log(message);
      window.webkit.messageHandlers.showToast.postMessage(message);
    }
  }
}
export function toHomePages(uid: string) {
  if (!uid) return;
  var u = navigator.userAgent,
    app = navigator.appVersion;
  let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isAndroid) {
    window.AndroidWebView &&
      window.AndroidWebView.toHomePage &&
      window.AndroidWebView.toHomePage(uid);
  }
  if (isIOS) {
    window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.openUserInfo &&
      window.webkit.messageHandlers.openUserInfo.postMessage({ aid: uid });
  }
}

export function goBack() {
  // 返回逻辑
  // 调用安卓和ios的关闭页面方法closeWebView
  let ua = navigator.userAgent;
  let isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1;
  if (isAndroid) {
    // 安卓
    window.AndroidWebView &&
      window.AndroidWebView.closeWebView &&
      window.AndroidWebView.closeWebView();
  }

  if (isIOS) {
    // 苹果
    window.webkit &&
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.closeWebView &&
      window.webkit.messageHandlers.closeWebView.postMessage({});
  }
}
export function closePage() {
  // 调用安卓和ios的关闭页面方法closeWebView
  let ua = navigator.userAgent;
  let isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1;
  if (isAndroid) {
    // 安卓
    window.AndroidWebView &&
      window.AndroidWebView.closeWebView &&
      window.AndroidWebView.closeWebView();
  }

  if (isIOS) {
    // 苹果
    window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.closeWebView &&
      window.webkit.messageHandlers.closeWebView.postMessage({});
  }
}
export function getPlatForm() {
  // 判断平台
  let ua = navigator.userAgent;
  let isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1;
  if (isAndroid) {
    return "android";
  } else if (isIOS) {
    return "ios";
  }
}
export function jumpToSelfInfo(uid: string) {
  if (!uid) return;
  const platForm = getPlatForm();
  if (platForm === "android") {
    window.AndroidWebView &&
      window.AndroidWebView.jumpPage &&
      window.AndroidWebView.jumpPage(`spnp_profile>user_id=${uid}`);
  } else {
    window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.jumpPage &&
      window.webkit.messageHandlers.jumpPage.postMessage(
        `spnp_profile>user_id=${uid}`,
      );
  }
}
export function jumpToTat(tatId: string) {
  if (!tatId) return;
  const platForm = getPlatForm();
  if (platForm === "android") {
    window.AndroidWebView &&
      window.AndroidWebView.jumpPage &&
      window.AndroidWebView.jumpPage(`spnp_tat>tat_id=${tatId}`);
  } else {
    window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.jumpPage &&
      window.webkit.messageHandlers.jumpPage.postMessage(
        `spnp_tat>tat_id=${tatId}`,
      );
  }
}

export function topUp(params = "") {
  const platForm = getPlatForm();
  if (platForm === "android") {
    window.AndroidWebView &&
      window.AndroidWebView.jumpPage &&
      window.AndroidWebView.jumpPage("spnp_happy" + params);
  } else {
    window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.jumpPage &&
      window.webkit.messageHandlers.jumpPage.postMessage("spnp_happy" + params);
  }
}
// 安卓url会拿到两个token，取最后一个
export function getLastTokenFromURL() {
  try {
    var url = new URL(window.location.href);
    var tokens = url.searchParams.getAll("token");
    if (tokens && tokens.length) return tokens[tokens.length - 1];
  } catch (e) {}
  var query = window.location.href.split("?")[1] || "";
  if (!query) return "";
  var pairs = query.split("&");
  var last = "";
  for (var i = 0; i < pairs.length; i++) {
    var kv = pairs[i].split("=");
    if (kv[0] === "token") last = kv[1] || "";
  }
  return last;
}

export function getQueryVariable(variable: string) {
  var query = window.location.href.split("/?")[1] || [];
  if (query.length && typeof query === "string") {
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
  }
  return false;
}

// 时区映射表
const area_zone_offset_mapping = {
  ar: 3,
  en: -6,
  hi: 5.5,
  id: 7,
  tr: 3,
} as const;

type Zone = keyof typeof area_zone_offset_mapping;

// 关联类型：时区 Z 决定偏移量的类型（en 为动态 -5|-6，其余为映射表静态值）
type ZoneOffsetFor<Z extends Zone> = Z extends "en"
  ? ReturnType<typeof getEnOffsetForTimestamp>
  : (typeof area_zone_offset_mapping)[Z];

/**
 * 根据传入的 UTC 时间戳，计算该时刻在 en 区域（美中时区）应使用的时区偏移
 * 使用美中时区夏令时规则：3 月第 2 个周日 2:00 至 11 月第 1 个周日 2:00 为夏令时（UTC-5），其余为冬令时（UTC-6）
 * @param {number} utcTimestampSeconds - UTC 时间戳（秒）
 * @returns {number} 相对于 UTC 的小时偏移（-5 或 -6）
 */
export function getEnOffsetForTimestamp(utcTimestampSeconds: number): -5 | -6 {
  const date = new Date(utcTimestampSeconds * 1000);
  const year = date.getUTCFullYear();

  // 3 月第 2 个周日 08:00 UTC（美中 2:00 冬令时）为夏令时开始
  const marchFirst = new Date(Date.UTC(year, 2, 1));
  const firstSundayMarch = 1 + ((7 - marchFirst.getUTCDay()) % 7);
  const secondSundayMarch = firstSundayMarch + 7;
  const dstStart = Math.floor(
    Date.UTC(year, 2, secondSundayMarch, 8, 0, 0, 0) / 1000,
  );

  // 11 月第 1 个周日 07:00 UTC（美中 2:00 夏令时）为夏令时结束
  const novFirst = new Date(Date.UTC(year, 10, 1));
  const firstSundayNov = 1 + ((7 - novFirst.getUTCDay()) % 7);
  const dstEnd = Math.floor(
    Date.UTC(year, 10, firstSundayNov, 7, 0, 0, 0) / 1000,
  );

  const isDST = utcTimestampSeconds >= dstStart && utcTimestampSeconds < dstEnd;
  return isDST ? -5 : -6;
}

/**
 * 根据时区获取偏移量（类型关联的入口）
 *
 * 设计要点：
 * - 关联类型 ZoneOffsetFor<Z> 体现在「返回值」上，调用方传入字面量时自动推导
 * - 实现内部的 as 集中在此处，是 TS 无法证明索引类型 ≡ 条件类型的唯一断言点
 * - 不在此处用类型谓词收窄泛型 Z（TS 不支持依赖类型联动）
 */
export function getOffsetForZone<Z extends Zone>(
  zone: Z,
  utcTimestampSeconds: number,
): ZoneOffsetFor<Z> {
  if (zone === "en") {
    return getEnOffsetForTimestamp(utcTimestampSeconds) as ZoneOffsetFor<Z>;
  }
  return area_zone_offset_mapping[zone] as ZoneOffsetFor<Z>;
}

/** 将 UTC 秒级时间戳 + 偏移量格式化为目标时区时间字符串 */
function formatUtcWithOffset(
  utcTimestampSeconds: number,
  targetOffset: number,
): string {
  const targetTimestamp = utcTimestampSeconds + targetOffset * 3600;
  const date = new Date(targetTimestamp * 1000);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const Y = date.getUTCFullYear();
  const M = String(date.getUTCMonth() + 1).padStart(2, "0");
  const D = String(date.getUTCDate()).padStart(2, "0");
  const h = String(date.getUTCHours()).padStart(2, "0");
  const m = String(date.getUTCMinutes()).padStart(2, "0");
  const s = String(date.getUTCSeconds()).padStart(2, "0");
  return `${Y}/${M}/${D} ${h}:${m}:${s}`;
}

/**
 * 将 UTC 时间戳转换为指定时区的时间
 * @param zone - 时区标识
 * @param utcTimestamp - 以 UTC+0 为基准的时间戳（秒）
 * @returns 格式化的时间字符串（YYYY/MM/DD HH:mm:ss）
 */
export function convertUTCToZoneTime(zone: Zone, utcTimestamp: number): string {
  const ts = Number(utcTimestamp);
  if (utcTimestamp == null || isNaN(ts)) {
    return "";
  }
  const targetOffset = getOffsetForZone(zone, ts);
  return formatUtcWithOffset(ts, targetOffset);
}
/**
 * 格式化金币数量
 * @param {number} amount - 金币数量
 * @returns {string} 格式化后的金币字符串
 *
 * 规则：
 * 1. 达到千单位展示K，例如1000 -> 1K
 * 2. 达到百万则使用M，例如1000000 -> 1M
 * 3. 非整数部分保留两位小数
 * 4. 若没有小数则展示整数，不需要补0
 */
export function formatCoin(amount: number) {
  amount = Number(amount);
  if (typeof amount !== "number" || isNaN(amount)) {
    return "0";
  }

  // 处理负数
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  let result = "";

  // 将数值截断到两位小数（不向上进位，与业务侧整数门槛比较一致）
  const truncate2 = (n: number) => Math.floor(n * 100) / 100;

  if (absAmount >= 1000000) {
    // 百万单位，使用M
    const millions = absAmount / 1000000;
    if (millions % 1 === 0) {
      // 整数，不显示小数
      result = `${millions}M`;
    } else {
      // 截断两位小数后展示，去掉末尾的0（避免 29999999 显示成 30M）
      result = `${parseFloat(truncate2(millions).toFixed(2))}M`;
    }
  } else if (absAmount >= 1000) {
    // 千单位，使用K
    const thousands = absAmount / 1000;
    if (thousands % 1 === 0) {
      // 整数，不显示小数
      result = `${thousands}K`;
    } else {
      result = `${parseFloat(truncate2(thousands).toFixed(2))}K`;
    }
  } else {
    // 小于1000，直接显示
    if (absAmount % 1 === 0) {
      // 整数
      result = `${absAmount}`;
    } else {
      // 保留两位小数，去掉末尾的0
      result = `${parseFloat(absAmount.toFixed(2))}`;
    }
  }

  return isNegative ? `-${result}` : result;
}

/**
 * 动态将 px 转换为 rem
 * @param {number|string} px - 需要转换的像素值 (例如: 100, "100", "100px")
 * @returns {string} - 转换后的 rem 字符串 (例如: "2.66667rem")
 */
export function px2rem(px: string | number) {
  // 1. 配置基准值 (必须与 postcss-pxtorem 的 rootValue 保持一致)
  // 如果你的设计稿是 750px，且使用了 Vant，通常建议设置为 37.5
  // 如果没用 Vant，纯 750 稿，可能是 75
  const rootValue = 37.5;

  // 3. 提取数值 (处理 "20px" 这种字符串情况)
  if (typeof px === "string" && px !== "") {
    const value = parseFloat(px);
    if (isNaN(value)) {
      return px; // 如果无法转为数字，原样返回
    }
    // 4. 计算并保留小数精度 (这里保留5位，与 postcss 默认行为接近)
    const rem = (value / rootValue).toFixed(5);

    return `${rem}rem`;
  }
  return px;
}

/**
 * 批量处理 style 对象 (可选辅助函数)
 * @param {Object} styles - 样式对象
 * @returns {Object}
 */
export function transformStyles(styles: Record<string, string | number>) {
  const newStyles: Record<string, string | number> = {};
  for (const key in styles) {
    const value = styles[key];
    // 假设只转换 font-size, width, height, margin, padding 等包含数字的属性
    // 这里简单判断：如果是数字或以 px 结尾的字符串，尝试转换
    if (
      typeof value === "number" ||
      (typeof value === "string" && value.includes("px"))
    ) {
      newStyles[key] = px2rem(value);
    } else {
      newStyles[key] = value;
    }
  }
  return newStyles;
}

// 处理日期展示
export function formatDateTime(dateTimeStr: string) {
  if (!dateTimeStr) return "";
  const parts = dateTimeStr.split(" ");
  console.log(parts);
  if (parts.length < 2) return dateTimeStr;
  const [year, month, day] = parts[0].split("/");
  const [hour, minute, second] = parts[1].split(":");
  return `${day}/${month} ${hour}:${minute}`;
}

export default {
  showToast,
  closePage,
  jumpToSelfInfo,
  jumpToTat,
  getLastTokenFromURL,
  getQueryVariable,
  convertUTCToZoneTime,
  formatCoin,
  topUp,
  goBack,
  getPlatForm,
  toHomePages,
  formatProjectName,
};
