{
  function handle<T>(input: T): T {
    return input;
  }

  const a = handle("hello");

  // 通过泛型建立类型之间的数据流

  type Box<T> = {
    value: T;
  };

  type A = Box<string>;

  type ApiResponse<T> = {
    // [k in keyof T]: T[k];
    code: number;
    message: string;
    data: T;
  };

  type UserRes = ApiResponse<{
    name: string;
    age: number;
  }>;

  function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  const user = {
    name: "Hans",
    age: 30,
  };

  const nameType = getValue(user, "name");
  const ageType = getValue(user, "age");

  type Pagination<T> = {
    list: T[];
    page: number;
    pageSize: number;
    total: number;
  };

  type User = {
    id: number;
    name: string;
    age: number;
  };

  // 目标：定义 UserListRes
  //   type UserListRes = {
  //         code: number;
  //         message: string;
  //         data: Pagination<User>
  //   }

  type UserListRes = ApiResponse<Pagination<User>>;
}

{
  interface Activity {
    id: number;
    title: string;
    status: "draft" | "published";
  }

  type ApiResponse<T> = {
    code: number;
    message: string;
    data: T;
  };

  type Pagination<T> = {
    list: T[];
    page: number;
    pageSize: number;
    total: number;
  };

  function request<T>(data: object): Promise<ApiResponse<T>> {
    return fetch(data);
  }

  const res = await request<Pagination<Activity>>();
}
