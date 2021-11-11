import 'braft-editor/dist/index.css';
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { message } from 'antd';
import BraftEditor, { EditorState } from 'braft-editor';
import { controls } from './braftEditorRules';
import { postUploadFile } from '@/services/api';
import './index.less';

interface Props {
  editorValue: string;
  [key: string]: any;
}

const createEditorState = (htmlString: string | null) => {
  return BraftEditor.createEditorState(htmlString);
};

const BraftEditorInit = (props: Props, ref: React.Ref<any>) => {
  const { editorValue } = props;
  const editorRef: React.MutableRefObject<any> = useRef();
  useImperativeHandle(ref, () => ({
    getHtmlContent: getHtmlContent,
  }));
  const [editorState, setEditorState] = useState(createEditorState(null));

  useEffect(() => {
    setEditorState(createEditorState(editorValue));
  }, [editorValue]);

  const handleChange = (editorState: EditorState) => {
    if (props.onChange) {
      props.onChange();
    }
    setEditorState(editorState);
  };
  const getHtmlContent = () => {
    const htmlContent = editorState.toHTML();
    return htmlContent;
  };

  // 上传函数
  const uploadFn = async (param: any) => {
    const { file } = param;
    try {
      let formData = new FormData();
      formData.append('file', file);
      let size = file.size;
      if (size > 1048576 * 3) {
        message.error('图片太大，请上传小于3M图片');
        param.progress(100); // 显示完成上传的进度条
        param.error({
          msg: '上传失败',
        });
        return;
      }
      const { success, data } = await postUploadFile(formData);
      if (success) {
        console.log(data, 'data - data');

        param.progress(100);
        param.success({
          url: data.imgPath,
          meta: {
            alt: data.name,
            //   loop: true, // 指定音视频是否循环播放
            //   autoPlay: true, // 指定音视频是否自动播放
            //   controls: true, // 指定音视频是否显示控制栏
          },
        });
      } else {
        param.progress(100);
        param.error({
          msg: '上传失败',
        });
      }
      // 更新数据
      const value = editorRef?.current?.getValue();
      handleChange(value);
    } catch (error) {
      let msg = error + '，上传失败';
      message.error(msg);
    }
  };

  // 媒体资源 change 的函数
  const mediaChange = async (file: any) => {
    console.log(file, '媒体资源 - change');
  };
  return (
    <div className="editor-wrapper">
      <BraftEditor
        controls={controls}
        ref={editorRef}
        value={editorState}
        onChange={handleChange}
        placeholder="请输入内容"
        media={{
          uploadFn: uploadFn,
          pasteImage: true,
          onChange: mediaChange,
          accepts: {
            image: 'image/*',
            video: false,
            audio: false,
          },
        }}
      />
    </div>
  );
};
export default forwardRef(BraftEditorInit);
