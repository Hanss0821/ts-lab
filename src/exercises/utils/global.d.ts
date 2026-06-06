// 有export会被标记成模块
// interface会自动合并
// ?这是webview中的参数，在普通浏览器中调用不存在，可能有，可能没有

// global声明需要挂载到全局，会和全局Window合并
type IOSMessageHandlerName =
  | "showToast"
  | "closeWebView"
  | "jumpPage"
  | "openUserInfo";

type IosMessageHandler = {
  postMessage: (params: unknown) => void;
};

type IosMessageHandlers = Partial<
  Record<IOSMessageHandlerName, IosMessageHandler>
>;
type AndroidWebViewBridge = {
  showToast?: (message: string) => void;
  toHomePage?: (uid: string) => void;
  closeWebView?: () => void;
  jumpPage?: (path: string) => void;
};

type StandbyURLfromApp = {
  baseURL: string;
  api_xjp: string;
  api_flkf: string;
};

interface Window {
  AndroidWebView?: AndroidWebViewBridge;
  webkit?: {
    messageHandlers?: IosMessageHandlers;
  };
  getStandbyURLfromApp?: StandbyURLfromApp;
}
