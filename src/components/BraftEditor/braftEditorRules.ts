import { ControlType } from 'braft-editor';

export const getBraftEditorRules = (braftEditorRef: React.RefObject<any>) => {
  return [
    {
      required: true,
      validator: () => {
        const htmlContent = braftEditorRef?.current?.getHtmlContent();
        if (htmlContent === '<p></p>') {
          return Promise.reject('请输入内容');
        } else {
          return Promise.resolve();
        }
      },
    },
  ];
};

export const controls: ControlType[] = [
  'undo', // 撤销
  'redo', // 前进
  'separator', // 分割线
  'font-size', // 字号
  'line-height', // 行高
  'letter-spacing', // 行间距
  'separator', // 分割线
  'text-color', // 颜色
  'bold', // 加粗
  'italic', // 斜体
  'underline', // 下划线
  'strike-through', // 删除线
  'separator', // 分割线
  'superscript', // 上标
  'subscript', // 下标
  'remove-styles', // 删除样式
  // 'emoji', // 表情【表中无法存储】
  'separator', // 分割线
  'text-indent', // 缩进【增加缩进/减少缩进】
  'text-align', // 位置【居左/居右/两端】
  'separator', // 分割线
  'headings', // 常规、
  'list-ul',
  'list-ol', // 无序列表, 有序列表
  'blockquote',
  // 'code',
  'separator', // 引用, 代码, 分割线
  // 'link',
  'separator', // 链接，分割线
  'hr',
  'separator', // 水平线，分割线
  'media',
  'separator', // 媒体，分割线
  'clear', // 清楚内容
];
