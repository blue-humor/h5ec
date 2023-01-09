import React from 'react';
import { Popup, ActionBar } from 'react-vant';

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
        <ActionBar safeAreaInsetBottom>
          <ActionBar.Button color="#1f22e3" text="确认" onClick={() => handleShowClose(false)} />
        </ActionBar>
      </Popup>
    </>
  );
};

export default RemarkModel;
