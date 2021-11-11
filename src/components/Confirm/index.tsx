/**
 * @file 弹窗提示框
 * @author liujintao
 */

import React from 'react';
import ReactDOM from 'react-dom';
import DeleteModal from './DeleteModal';

let body: HTMLElement;
let ModalMain: HTMLElement;

interface Props {
  title?: string;
  className?: string;
  content?: string | React.ReactElement;
  okText?: string;
  cancelText?: string;
  onOk?: Function;
  onCancel?: Function;
  [key: string]: any;
}

interface State {
  visible: boolean;
}

class Modal extends React.Component<Props, State> {
  state = {
    visible: true,
  };
  constructor(props: any) {
    super(props);
  }
  show() {
    this.setState({
      visible: true,
    });
  }
  hide() {
    this.setState({
      visible: false,
    });
  }
  render(): React.ReactElement {
    const props = {
      visible: this.state.visible,
      title: this.props.title,
      description: this.props.content,
      okText: this.props.okText,
      cancelText: this.props.cancelText,
      className: this.props.className,
      type: this.props.type,
      onOk: () => {
        this.hide();
        if (this.props.onOk) {
          this.props.onOk();
        }
      },
      onCancel: () => {
        this.hide();
        if (this.props.onCancel) {
          this.props.onCancel();
        }
      },
    };
    return <DeleteModal {...props} />;
  }
}

function Confirm(props?: Props) {
  body = document.querySelector('body');
  ModalMain = document.createElement('div');
  body.appendChild(ModalMain);
  ReactDOM.render(<Modal {...props} />, ModalMain);
}

export default Confirm;
