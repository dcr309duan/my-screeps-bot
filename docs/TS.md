# TS

## 路径别名

当文件夹层级比较深了之后，可能会遇到如下问题：

```ts
// 获取 src/utils.ts 中的函数
import { utilsFun } form '../../../../utils'
```

可以为特定的路径配置别名，提高我们引入代码的可读性，打开 `tsconfig.json` 文件，添加以下配置：

```json
{
    "compilerOptions": {
        ...
        "paths": {
            "@/*": ["./src/*"]
        }
    },
}
```