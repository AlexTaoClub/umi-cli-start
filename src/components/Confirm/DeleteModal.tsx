/**
 * @file 弹窗提示框
 * @author liujintao
 */
import * as React from 'react';
import { Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ModalProps } from 'antd/lib/modal/Modal';
import './DeleteModal.less';

class Props {
  /**类型 */
  type?: string = 'delete';
  /** 弹窗标题 */
  title?: string = '删除';

  /** 自定义类名 */
  className? = '';

  /** 宽度 */
  width? = 396;

  /** 挂载的元素 */
  getContainer?: ModalProps['getContainer'] = () => document.body;

  /** 弹窗说明 */
  description?: React.ReactNode =
    '您确定要删除这条数据吗？ 删除后数据不能恢复!';

  /** 是否可见 */
  visible = false;

  /** 确认按钮是否loading */
  confirmLoading? = false;

  /** 底部内容 */
  footer?: ModalProps['footer'];

  /** 确认文字 */
  okText?: React.ReactNode = '确认';

  /** 取消文字 */
  cancelText?: React.ReactNode = '取消';

  /** 点击确认按钮的回调 */
  onOk?: () => void;

  /** 点击取消按钮的回调 */
  onCancel?: () => void;
}

class DeleteModal extends React.Component<Props, any> {
  static defaultProps = new Props();

  render() {
    const {
      width,
      visible,
      description,
      title,
      getContainer,
      okText,
      cancelText,
      footer,
      className,
      type,
    } = this.props;

    return (
      <Modal
        title={title}
        wrapClassName="common-delete-modal"
        width={width}
        visible={visible}
        maskClosable={false}
        getContainer={getContainer}
        cancelText={cancelText}
        okText={okText}
        footer={footer}
        className={className}
        onCancel={this.props.onCancel}
        onOk={this.props.onOk}
        confirmLoading={this.props.confirmLoading}
      >
        <div className="confirm-delete-wrapper">
          {type === 'delete' && <CloseCircleOutlined />}
          <div>{description}</div>
        </div>
      </Modal>
    );
  }
}

export default DeleteModal;
