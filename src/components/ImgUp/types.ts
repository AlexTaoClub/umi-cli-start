import { Loading } from './../../.umi/plugin-dva/connect';
import { UploadFile } from 'antd/es/upload/interface';
import { UploadProps } from 'antd/lib/upload';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { ReactNode } from 'react';

export type Props = {
  onChange: (params: { fileList: UploadFile[] }) => void;
  children?: ReactNode;
  [key: string]: any;
} & UploadProps;

type SortableParams = {
  props: Omit<Props, 'onChange'>;
  onPreview: (file: UploadFile) => void;
  onRemove: (file: UploadFile) => void | boolean;
};
interface UploadFileExtends extends UploadFile {
  imgUrl?: string;
  [key: string]: any;
}
export type SortableItemParams = {
  item: UploadFileExtends;
} & SortableParams;

export type SortableListParams = {
  onChange?: (info: UploadChangeParam) => void;
  items?: UploadFileExtends[];
  [key: string]: any;
} & SortableParams;

export const getBase64 = (file: File | Blob | undefined): Promise<string> => {
  if (!file) return Promise.reject(new Error('no file'));
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

{
  /* <Upload
        ref={mapRef}
        listType="picture-card"
        fileList={imgList}
        onRemove={(f) => {
          Remove(f);
        }}
        customRequest={(op) => uploads(op)}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {imgList.length >= max ? null : uploadButton}
      </Upload> */
}
