{
  const name = "Hans"; // 字面量类型

  // 上下文自动推导 上游接口协议对下游实现的反向注入
  type Handler = (name: string, age: number) => boolean;

  const handler: Handler = (name, age) => {
    return true;
  };

  window.onerror = (event, source, line, col, err) => {};

  // @click 自动推导参数
  // 数组自动推导
  const list = [1, 2, 3];
  list.map((item) => item.toFixed(2));

  type ButtonClickContext = {
    componentId: string;
    pageId: string;
    payload: {
      x: number;
      y: number;
    };
  };

  type ComponentEventMap = {
    click: (ctx: ButtonClickContext) => void;
    mounted: (ctx: { componentId: string }) => void;
  };

  function on<K extends keyof ComponentEventMap>(
    eventName: K,
    handler: ComponentEventMap[K],
  ) {}
  // 根据定义类型自动推导，拿到对应类型
  on("click", (ctx) => {
    ctx.componentId;
    ctx.pageId;
  });

  // 若显示定义void返回类型则代表不关心返回值，而不是不能有返回值
  // void 回调 = 返回值会被丢弃
  type CustomHandler = (name: string, age: number) => void;
  const handle: CustomHandler = () => {
    return 10;
  };
  // 注意只在自动类型推导时才成立，而不是显示标注定义
  function fn(): void {
    return "Hans"; // 报错
  }
}

{
  // 推荐上方下文注入类型
  type Handler = (name: string, age: number) => boolean;

  const handler: Handler = (name, age) => {
    return true;
  };
}

{
  // 事件类型
  interface EventMap {
    click: {
      componentId: string;
      x: number;
      y: number;
    };
    change: {
      componentId: string;
      value: string | number;
    };
  }
  // 自动推导参数类型
  type On = <K extends keyof EventMap>(
    event: K,
    callBack: (args: EventMap[K]) => void,
  ) => void;

  const on: On = (eventName, callback) => {
    // 不用写 any，类型会自动推导
  };

  on("click", (ctx) => {
    ctx.componentId;
    ctx.x;
    ctx.y;
  });

  // 泛型工厂，需要显示创建
  type On2<K extends keyof EventMap> = (
    event: K,
    callBack: (args: EventMap[K]) => void,
  ) => void;

  const on2: On2<"click"> = (eventName, ctx) => {};
  on2("click", (ctx) => {
    ctx.componentId;
    ctx.x;
    ctx.y;
  });
}
