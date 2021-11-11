import React, {
  CSSProperties,
  memo,
  useState,
  useRef,
  useEffect,
  forwardRef,
} from 'react';
import { Modal, Upload, Form, message } from 'antd';
import { postUploadFile } from '@/services/api';
import UploadList from 'antd/es/upload/UploadList';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
  SortEnd,
} from 'react-sortable-hoc';
import { getBase64, SortableItemParams, SortableListParams } from './types';
import './index.less';
const itemStyle: CSSProperties = {
  width: 104,
  height: 104,
  margin: 4,
  cursor: 'grab',
};
const SortableItem = SortableElement((params: SortableItemParams) => (
  <div style={itemStyle}>
    <UploadList
      locale={{ previewFile: '预览图片', removeFile: '删除图片' }}
      showDownloadIcon={false}
      listType="picture-card"
      onPreview={params.onPreview}
      onRemove={params.onRemove}
      items={[params.item]}
    />
  </div>
));

const listStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: '100%',
};
const SortableList = SortableContainer((params: SortableListParams) => {
  const [loading, setLoading] = useState(false);
  const paramsProps = params.props;
  const paramsItems = params.items || [];
  const { max = 1, fileType = ['image/png', 'image/jpg', 'image/jpeg'] } =
    paramsProps;
  useEffect(() => {
    setLoading(false);
  }, []);

  const uploads = (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    let size = file.size;
    let uid = file.uid;
    let name = file.name;
    let fileT = file.type;
    if (!fileType.includes(fileT)) {
      console.error(fileT);
      message.error('只能上传 JPG, PNG ！');
      setLoading(false);
      return false;
    }
    if (size > 1048576 * 3) {
      message.error('图片太大，请上传小于3M图片');
      setLoading(false);
      return;
    }
    let formData = new FormData();
    formData.append('file', file);
    postUploadFile(formData).then((res: any) => {
      const { success, data } = res;
      if (success) {
        const imgItem: any = {
          uid, // 注意，这个uid一定不能少，否则上传失败
          name,
          status: 'done',
          url: data.imgPath, // url 是展示在页面上的绝对链接
          imgUrl: data.imgPath, // imgUrl 是存到 db 里的相对链接
        };
        if (paramsItems.length < max) {
          // 没有到到最大，，继续push
          paramsItems.push(imgItem);
        }
        paramsProps.setList(paramsItems);
      } else {
        message.error(`${name} ${res.message}`);
      }
      setLoading(false);
    });
  };
  // 文件变化
  const handleChange = (info: any) => {
    const { status } = info.file;
    if (status === 'uploading') {
      // message.success(`${info.file.name} 图片上传中`);
      setLoading(true);
    }
    if (status === 'done') {
      // message.success(`${info.file.name} 图片上传成功`);
      setLoading(false);
    } else if (status === 'error') {
      setLoading(false);
      message.error(`${info.file.name} 图片上传失败`);
    }
  };
  const uploadButton = (
    <div className="grid-upload">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">上传</div>
    </div>
  );

  return (
    <div style={listStyle}>
      {paramsItems.map((item: any, index) => (
        <SortableItem
          key={`${item.uid}`}
          index={index}
          item={item}
          props={params.props}
          onPreview={params.onPreview}
          onRemove={params.onRemove}
        />
      ))}
      <Upload
        {...params.props}
        showUploadList={false}
        onChange={handleChange}
        customRequest={(op) => uploads(op)}
      >
        {paramsItems.length >= max ? null : uploadButton}
      </Upload>
    </div>
  );
});

interface ImgItem {
  uid: any; // 注意，这个uid一定不能少，否则上传失败
  name: string;
  status: string;
  url: string; // url 是展示在页面上的绝对链接
  imgUrl: string;
}
const UpLodaImg = (props: any) => {
  let { picList = [], onRemove } = props;
  const [imgList, setImgList] = useState<any[]>([]);
  const [previewVisible, setpreviewVisible] = useState(false);
  const [previewImage, setpreviewImage] = useState('');
  const mapRef: React.MutableRefObject<any> = useRef();

  useEffect(() => {
    if (picList.length > 0) {
      let picL: any[] = [];
      picList.forEach((e: any, i: number) => {
        const imgItem = {
          uid: new Date().getTime() + i, // 注意，这个uid一定不能少，否则上传失败
          name: 'img',
          status: 'done',
          url: e, // url 是展示在页面上的绝对链接
          imgUrl: e, // imgUrl 是存到 db 里的相对链接
          // response: '{"status": "success"}',
        };
        picL.push(imgItem);
      });
      setImgList(picL);
    } else {
      setImgList([]);
    }
  }, [picList]);
  const Remove = (f: any) => {
    const imgListFilter = imgList.filter((e: any) => e.imgUrl !== f.imgUrl);
    props.setList([...imgListFilter]);
    setImgList([...imgListFilter]);
    if (onRemove) {
      onRemove();
    }
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setpreviewVisible(true);
    setpreviewImage(file.url || file.preview);
  };

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const sortList = arrayMove(imgList, oldIndex, newIndex);
    setImgList(sortList);
    props.setList(sortList);
  };
  return (
    <>
      <SortableList
        ref={mapRef}
        distance={1}
        items={imgList}
        onSortEnd={onSortEnd}
        axis="xy"
        helperClass="SortableHelper"
        props={props}
        onRemove={(f) => {
          Remove(f);
        }}
        onPreview={handlePreview}
        className="sortable-img-list"
      />
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => {
          setpreviewVisible(false);
          setpreviewImage('');
        }}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
export default memo(UpLodaImg);
