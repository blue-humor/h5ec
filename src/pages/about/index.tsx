import React, { useEffect, useState } from 'react';

import { reqAbouts } from '@/services/about';
import { Form, Input, Image } from 'react-vant';

import calssNames from './index.less';

type Props = {};

const index = (props: Props) => {
  const [info, setInfo] = useState<any>({});
  const [form] = Form.useForm();
  form.setFieldsValue({
    concatperson: info?.concatperson,
    intro: info?.intro,
    concattel: info?.concattel,
  });

  const handleAbouts = async () => {
    const res = await reqAbouts({});
    if (res.code === 200) {
      setInfo(res?.data);
    }
  };

  useEffect(() => {
    handleAbouts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Image src={info?.thumb} round radius={8} fit="cover" />
      <div className={calssNames.homeInfo}>
        <span>关于我们</span>
        <br />
        <span>联系人：{info?.concatperson}</span>
        <br />
        <span>
          联系电话：<a href={`tel:${info?.concattel}`}>{info?.concattel}</a>{' '}
        </span>
        <br />
        <span style={{ color: '#999', fontSize: '12px' }}>{info?.intro}</span>
        <br />
      </div>
    </div>
  );
};

export default index;
