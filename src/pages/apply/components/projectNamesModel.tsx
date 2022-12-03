import React from 'react';

import { Cell, Popup, Input } from 'react-vant';

interface ProjectNamesModelProps {
  showClose: boolean;
  handleShowClose: (show: boolean) => void;
  children: any;
}

const ProjectNamesModel: React.FC<ProjectNamesModelProps> = ({ children, showClose, handleShowClose }) => {
  return (
    <>
      <Popup title="商家备注" safeAreaInsetBottom closeable round visible={showClose} style={{ height: '70%' }} position="bottom" onClose={() => handleShowClose(false)}>
        {children}
      </Popup>
    </>
  );
};

export default ProjectNamesModel;
