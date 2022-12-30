import React from 'react';
import { Popup } from 'react-vant';

interface RemarkModelProps {
  showClose: boolean;
  handleShowClose: (show: boolean) => void;
  children: any;
}

const RemarkModel: React.FC<RemarkModelProps> = ({ showClose, handleShowClose, children }) => {
  return (
    <>
      <Popup title="商家备注" safeAreaInsetBottom closeable round visible={showClose} style={{ height: '70%' }} position="bottom" onClose={() => handleShowClose(false)}>
        {children}
      </Popup>
    </>
  );
};

export default RemarkModel;
