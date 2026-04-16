// ============================================================
// 题 1：实现 first<T> 和 last<T>
// 要求：返回类型要保留原数组元素类型
// ============================================================

function first<T>(arr: T[]): T | undefined {
    // TODO
    return arr[0];
}

function last<T>(arr: T[]): T | undefined {
    // TODO
    return arr[arr.length - 1];
}

// ============================================================
// 题 2：实现 mapArray<T, U>
// 理解 T -> U 的类型流向
// ============================================================

function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] {
    // TODO
    const list = [];
    for(let i =0;i<arr.length;i++) {
        const item = arr[i];
        list.push(fn(item));
    }
    return list;
  }


// ============================================================
// 题 3：实现 pick<T, K>
// 从对象中取出指定 key 的子集
// K 必须是 T 的 key
// ============================================================

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    // TODO
    return keys.reduce((target,key)=>{
        target[key] = obj[key];
        return target;  
    },{} as Pick<T, K>)
  }

// ============================================================
// 题 4：实现 groupBy<T, K>
// 按某个 key 把数组分组
// ============================================================

{
    type User = { name: string; role: 'admin' | 'user'; age: number }

    const users: User[] = [
        { name: 'Hans', role: 'admin', age: 28 },
        { name: 'Mike', role: 'user', age: 25 },
        { name: 'Anna', role: 'admin', age: 30 },
    ]

    function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
        // TODO
        const obj = {} as Record<string,T[]>;
        for(let i = 0;i<arr.length;i++) {
            const item:T = arr[i];
            const groupKey = String(item[key]) 
            if(!(groupKey in obj)) {
                obj[groupKey] = [];
            }
            obj[groupKey].push(item);
        }
        return obj;
    }
}

// ============================================================
// 题 5：getOrDefault<T>
// ============================================================

type Maybe<T> = T | null | undefined

function getOrDefault<T>(value: Maybe<T>, defaultValue: T): T {
  // TODO
//   if(value!==null && value !==undefined) {
//     return value;
//   }
//   return defaultValue;
return value ?? defaultValue;
}