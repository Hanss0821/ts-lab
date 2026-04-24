import { readFile } from 'fs/promises'

// 要求：
// 1. 接收 filePath: string
// 2. 返回 Promise<T | null>，读取或解析失败时返回 null
// 3. 不使用任何 any
// 4. 所有错误分支用 try/catch + instanceof Error 处理

async function readJsonFile<T>(filePath: string): Promise<T | null> {
    try{
        // readFile得到的是buffer，它是一个字节序列，不是可读字符串，需要转换为可读字符串，要指定编码
        // overload 根据不同的参数类型，返回不同的返回值类型
        const jsonFile = await readFile(filePath,'utf-8');
        return JSON.parse(jsonFile) as T;
    }catch(err) {
        if(err instanceof Error) {
            console.log(err.name, err.message)
        }
        return null;
    }
}


type EnvType = 'development' | 'production' | 'test';
const VALID_ENVS = ['development', 'production', 'test'] as const
function getServerConfig() {
    const isValidEnv = (value:string):value is EnvType=>{
        return (VALID_ENVS as readonly string[]).includes(value)
    }
    const port = Number(process.env.Port??'3000');
    const host = process.env.HOST?? 'localhost';
    const rawEnv = process.env.NODE_ENV ?? ''
    const env:EnvType = isValidEnv(rawEnv) ? rawEnv : 'development';
    return { port, host, env }
  }


  import path from 'path'
  // 给定一个文件路径，返回以下信息：
  // - dir: 所在目录
  // - filename: 不含扩展名的文件名
  // - ext: 扩展名（含点，如 '.ts'）
  // - isTypeScript: 是否是 .ts 或 .tsx 文件（boolean）
  // 所有字段类型由 path 模块的返回值推断，不手写
  
function parseFilePath(filePath: string) {
    const parsedPath = path.parse(filePath);
    return {
        dir: parsedPath.dir,
        filename: parsedPath.name,
        ext:parsedPath.ext,
        isTypeScript:['.ts','.tsx'].includes(parsedPath.ext)
    }
  }
  
  // 调用示例：
  // parseFilePath('src/components/Button.tsx')
  // → { dir: 'src/components', filename: 'Button', ext: '.tsx', isTypeScript: true }


  