/**
 * @file 时间格式化
 * @author liujintao
 */
/** 通用的日期和时间格式化 */
import moment, { Moment } from 'moment';

export enum LangEnum {
  zh_CN = 'zh_CN',
  en_US = 'en_US',
  zh_TW = 'zh_TW',
}

/**
 * 获取当前语言的
 */
export function getCurrentLang(): LangEnum {
  return LangEnum.zh_CN;
}

export const DATE_FORMAT_NEXT = 'YYYY/MM/DD';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT_TIME = 'YYYY-MM-DD HH:mm:ss';
/**
 * 根据当前 locale 获取默认日期格式
 */
export function getDefaultDateFormat() {
  return getCurrentLang() === LangEnum.en_US ? 'MM/DD/YYYY' : DATE_FORMAT;
}

/**
 * 根据当前 locale 获取默认日期格式
 */
export function getDateFormatMini() {
  return getCurrentLang() === LangEnum.en_US ? 'DD/MM' : 'MM/DD';
}

/**
 * 根据当前 locale 获取默认时间格式
 */
export function getDefaultTimeFormat() {
  if (getCurrentLang() === LangEnum.en_US) {
    return 'll, HH:mm:ss';
  }
  return DATE_FORMAT_TIME;
}

/**
 * 根据当前 locale 获取默认时间格式
 */
export function getDefaultTimeFormatUtil() {
  if (getCurrentLang() === LangEnum.en_US) {
    return 'MM/DD/YYYY HH:mm:ss';
  }
  return DATE_FORMAT_TIME;
}

/**
 * 根据当前 locale 获取默认时间格式
 */
export function getDefaultTimeFormatMini(): string {
  if (getCurrentLang() === LangEnum.en_US) {
    return 'll';
  }
  return 'MM-DD';
}

/**
 * 格式化日期，不指定格式时使用默认日期格式
 */
export const formatDate = (
  date: moment.Moment | string | number,
  format?: string,
) => {
  if (!date) {
    return '';
  }
  return moment(date).format(format || getDefaultDateFormat());
};

/**
 * 格式化时间，不指定格式时使用默认时间格式
 */
export const formatTime = (
  time: moment.Moment | string | number,
  format?: string,
) => {
  if (!time) {
    return '';
  }
  return moment(time).format(format || getDefaultTimeFormat());
};

/**
 * 格式化时间，不指定格式时使用默认时间格式
 */
export const formatTimeUtil = (
  time: moment.Moment | string | number,
  format?: string,
) => {
  if (!time) {
    return '';
  }
  return moment(time).format(format || getDefaultTimeFormatUtil());
};

/**
 * 获取当前日期的 2020-05-18 || Jun 2, 2020
 * @param date 日期
 */
export const getStartOfDate = function (date: string | moment.Moment) {
  let format = DATE_FORMAT;
  if (getCurrentLang() === LangEnum.en_US) {
    format = 'll';
  }

  if (!date) {
    return '';
  }

  if (typeof date === 'string') {
    return moment(date).startOf('date').format(format);
  }

  return date.startOf('date').format(format);
};

/**
 * 获取7天日期的数据
 * @param startDate 开始日期 默认当前时间 - 7
 * @param endDate 结束日期 默认 当前时间
 * @returns string[]  返回格式化后的日期时间
 */
export function getDateStrs(
  startDate: string | moment.Moment = moment().subtract(7, 'days'),
  endDate: string | moment.Moment = moment(),
) {
  const days = moment(endDate).diff(moment(startDate), 'days');
  const dates: string[] = [];

  for (let index = 0; index <= days; index++) {
    const date = getStartOfDate(moment(startDate).add(index, 'days'));
    dates.push(date);
  }

  return dates;
}

/**
 * 获取当前时间戳的 月份
 * @param 时间戳 日期
 */
const valueOfMonthEnum = {};
export const getValueOfMonth = function (date: number) {
  const months = moment(date).months() + 1;
  const monthsUse = months > 9 ? months : `0${months}`;
  return `${moment(date).year()}-${monthsUse}`;
};
