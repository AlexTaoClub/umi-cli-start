export const regUrl =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path: string) => regUrl.test(path);

export const regMobile = /(^(\d{3,4}-)?\d{7,8})$/;
export const isMobile = (str: string) => regMobile.test(str);

export const regPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
export const isPhone = (str: string) => regPhone.test(str);

export const regPhoneMobile =
  /(^(\d{3,4}-)?\d{7,8})$|^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
export const isPhoneMobile = (str: string) => regPhoneMobile.test(str);

export const regEmail =
  /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
export const isEmail = (str: string) => regEmail.test(str);

// 身份证
// export const regCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
export const regCard =
  /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
export const isCard = (str: string) => regCard.test(str);
// 护照
export const regPassport = /^[A-Za-z0-9]{2,20}$/;
export const isPassport = (str: string) => regPassport.test(str);

// 6到20位（包括字母，数字，下划线，减号）
export const passwordReg = /^[a-zA-Z0-9_-]{6,20}$/;

export const regNumber = /^[0-9]*$/;
export const isNumber = (str: string) => regNumber.test(str);

export const regSort = /^\d{1,6}$/;
export const isSort = (str: string) => regSort.test(str);

export const regNumberFloat =
  /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
export const isNumberFloat = (str: string) => regNumberFloat.test(str);

//禁止空格
export const regTrim = /^\S+$/;
//禁止前后空格
export const regTrimBeforeAfter = /^\S+(\s+\S+)*$/;

//YYYY-MM-DD
export const regYYYYMMDD =
  /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
