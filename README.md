## AI promp

帮我写一个 node js 脚本, 命令为:

```
crc [组件名]
crc AppHeader
```

我可以创建一个文件夹:
组件名
里面包含两个文件, 内容分别为:
文件头部是 src 的相对路径

index.js

```js
// src/xxx/ [组件名]/index.js

import React from 'react';
import {memo} from "react";
import {[组件名]Wrapper} from "./style.js";

export const [组件名] = memo((props) => {
    return (
		// TODO: 添加类名
        <[组件名]Wrapper>

        </[组件名]Wrapper>
    );

});

export default [组件名] ;
```

style.js

```js
// src/.../[组件名]/style.js

import styled from "styled-components";

// TODO: 添加类名
export const  [组件名]Wrapper = styled.div`
    
`

export default  [组件名]Wrapper;
```



这个脚本我想要全局生效, 任何地方都可以执行, 我是windows 电脑, 我应该如何操作



头部的相对路径, 你没获取正确, 要一路向上遍历, 直到遇到 src, 或是层级大于 50 , 或是到根目录了, 就报错

### 方法三：使用 npm 全局链接（推荐做法）

要是 `a.js` 是一个 npm 包，你可以通过 npm 全局链接的方式，让它在系统的任何地方都能被调用。具体步骤为：

1. 在 `a.js` 文件所在的目录下，创建一个 `package.json` 文件，内容如下：



```json
{
  "name": "a-script",
  "version": "1.0.0",
  "bin": {
    "a": "a.js"
  }
}
```

1. 打开命令行，在该目录下执行 `npm link` 命令。
2. 执行成功后，就可以在任意路径下直接使用 `a` 命令来运行脚本了。

通过上述方法，你就能在 Windows 的全路径环境下方便地使用 `a.js` 文件了。