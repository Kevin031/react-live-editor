import React from 'react';
import ReactPkg from 'react/package.json';
import * as AntdComponents from 'antd';
import AntdPkg from 'antd/package.json';

export const moduleListMap = {
  antd: {
    module: AntdComponents,
    version: ReactPkg.version,
  },
  react: {
    module: React,
    version: AntdPkg.version,
  },
};

export const moduleList = Object.keys(moduleListMap).map(name => ({
  name,
  ...moduleListMap[name],
}));
