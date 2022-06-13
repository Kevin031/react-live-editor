# 一个轻量的React在线编辑器

在线DEMO：http://react-live-editor.kevinlau.cn/

此项目旨在探索在线协同开发小组件的可能性，以及开发者给项目提issue的时候提供一段固定环境下能重现问题的代码片段的反馈方式。

## 特性：

1. 嵌入了`monaco-editor`，支持在线编写和代码高亮 
2. 支持`react`代码直接编译和预览（通过`escodegen`, `@babel/standalone`, `acorn`实现）
3. 支持第三方包引用，目前只支持提前定义的包（antd、react)

## 启动方式：

```shell
npm start
```

## 后续计划：

1. 提交问题代码
2. 依赖包提供可选版本
