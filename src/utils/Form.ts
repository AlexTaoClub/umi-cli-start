/**
 *
 * @param form 表单需要
 */
import React from 'react';
import moment, { Moment } from 'moment';

import { regTrimBeforeAfter } from '@/utils/Regular';
import { message, Button } from 'antd';
// 必填项
const required = (
  message: string = '必填项',
  maxLength?: number,
  minLength?: number,
  trimRegFlag?: boolean,
) => {
  const requiredArr: any[] = [
    {
      required: true,
      message,
    },
  ];
  if (trimRegFlag) {
    requiredArr.push({
      pattern: regTrimBeforeAfter,
      message: '前后禁止输入空格!',
    });
  }
  if (maxLength) {
    requiredArr.push({
      max: maxLength,
      message: `最多输入${maxLength}个字符!`,
    });
  }
  if (minLength) {
    requiredArr.push({
      min: minLength,
      message: `最少输入${minLength}个字符!`,
    });
  }
  return requiredArr;
};
//可选项
const optional = (maxLength?: number, minLength?: number) => {
  const requiredArr: any[] = [
    {
      required: false,
      messgae: '请完善',
    },
  ];
  if (maxLength) {
    requiredArr.push({
      max: maxLength,
      message: `最多输入${maxLength}个字符!`,
    });
  }
  if (minLength) {
    requiredArr.push({
      min: minLength,
      message: `最少输入${minLength}个字符!`,
    });
  }
  return requiredArr;
};

// 错误信息提示
const errorMessage = (error: any) => {
  message.error(error.message || '服务器链接失败，请稍后重试!');
  return false;
};
// 成功信息提示
const successMessage = (result: any) => {
  const { success } = result;
  if (success) {
    message.success(result.message || '操作成功');
    return true;
  } else {
    message.error(result.message || '操作失败');
    return false;
  }
};

// 结束时间 大于 开始时间
const endTimeVailMsg = (startTime: string, endTime: string) => {
  let startTamp = moment(startTime).valueOf();
  let endTamp = moment(endTime).valueOf();
  if (startTamp > endTamp) {
    message.error('结束时间应该大于开始时间');
    return true;
  }
  return false;
};

export { required, optional, errorMessage, successMessage, endTimeVailMsg };
