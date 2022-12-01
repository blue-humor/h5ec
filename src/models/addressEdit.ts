import { useState, useCallback } from 'react';

import { history } from 'umi';

export default () => {
  // const [editRow, setEditRow] = useState<any>(null);

  const handleClickEdit = (params: any) => {
    history.push({
      pathname: '/address/editor',
      query: {
        id: params?.id,
        info: params,
      },
    });
  };

  return {
    handleClickEdit,
  };
};
