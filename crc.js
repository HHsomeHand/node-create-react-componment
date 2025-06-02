#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 获取组件名
const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('❌ 请提供组件名，例如: crc AppHeader');
    process.exit(1);
}
const componentName = args[0];

// 当前路径
const cwd = process.cwd();

let srcPath;
try {
    srcPath = findSrcDir(cwd);
} catch (err) {
    console.error(err.message);
    process.exit(1);
}

// 确定组件路径
const componentDir = path.join(cwd, componentName);

// 生成注释路径：相对于 src
const relativePath = path.relative(srcPath, path.join(cwd, componentName)).replace(/\\/g, '/');

// 模板内容
const indexTemplate =
`// src/${relativePath}/index.jsx

import React from 'react';
import {memo} from "react";
import {${componentName}Wrapper} from "./style.js";

export const ${componentName} = memo((props) => {
    return (
        <${componentName}Wrapper className="${componentName}">

        </${componentName}Wrapper>
    );
});

export default ${componentName};
`;

const styleTemplate =
`// src/${relativePath}/style.js

import styled from "styled-components";

// TODO: 添加类名
export const ${componentName}Wrapper = styled.div\`
    
\`

export default ${componentName}Wrapper;
`;

// 创建文件夹和文件
if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir);
}

fs.writeFileSync(path.join(componentDir, 'index.jsx'), indexTemplate);
fs.writeFileSync(path.join(componentDir, 'style.js'), styleTemplate);

console.log(`✅ 组件 ${componentName} 已创建在 ${componentDir}`);


// 向上查找 src 目录
function findSrcDir(startPath, maxDepth = 50) {
    let current = startPath;
    let depth = 0;
    while (depth < maxDepth) {
        const srcPath = path.join(current, 'src');
        if (fs.existsSync(srcPath) && fs.statSync(srcPath).isDirectory()) {
            return srcPath;
        }
        const parent = path.dirname(current);
        if (parent === current) break; // 根目录
        current = parent;
        depth++;
    }
    throw new Error('❌ 找不到 src 目录，或者层级过深 (> 50)');
}
