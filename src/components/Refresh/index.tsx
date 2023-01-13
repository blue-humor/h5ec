import React, { useState } from 'react';

import { Toast, PullRefresh, List, Divider } from 'react-vant';

interface IndexProps {
  handleList: (params: { current: number; pageSize: number; id?: number }) => Promise<any>;
  setList: any;
  setSwiperList?: any;
}

const Index: React.FC<IndexProps> = ({ handleList, setList, children, setSwiperList }) => {
  const [current, setCurrent] = useState<number>(1);

  const [finished, setFinished] = useState<boolean>(false);

  const [total, setTotal] = useState<number>(0);

  //刷新
  const handleOnRefresh = async (params: boolean, current = 1) => {
    if (params) {
      const res = await handleList({ pageSize: 15, current });
      if (res?.code === 200) {
        setList(res.data.list);
      }
    }
  };

  // 分页
  const handleOnLoad = async () => {
    const res = await handleList({ current, pageSize: 15 });
    if (res?.code === 200) {
      const { list, total, imageList } = res?.data;
      imageList ? setSwiperList(imageList) : null;
      setList((v: any) => [...v, ...list]);
      setTotal(total);
      setCurrent(v => v + 1);
    }

    if (setList.length >= total) {
      setFinished(true);
      return;
    }
  };

  return (
    <PullRefresh onRefresh={async () => handleOnRefresh(true)} onRefreshEnd={() => console.log('onRefreshEnd')} successText="刷新成功">
      <List finished={finished} key="list" onLoad={async () => handleOnLoad()} finishedText={<Divider style={{ paddingBottom: '100px' }}>到底啦～</Divider>}>
        {children}
      </List>
    </PullRefresh>
  );
};

export default Index;
