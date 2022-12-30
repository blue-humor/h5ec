import React, { useState } from 'react';
import { Cell, Field, Stepper, Form, Switch, Radio, hooks } from 'react-vant';
import type { FloatingBallProps } from 'react-vant';
import Bubble from './bubble';
import Menu from './menu';
import './index.less';

export default () => {
  const [form] = Form.useForm();
  const [formUpdated, setFormUpdated] = useState(0);
  const [config, updateConfig] = useState<FloatingBallProps & Record<string, unknown>>({});

  const handleFormChange = () => setFormUpdated(v => v + 1);

  hooks.useUpdateEffect(() => {
    const getValue = async () => {
      const values = await form.getFieldsValue();
      if (!values.adsorb_show) values.adsorb = false;

      delete values.adsorb_show;
      updateConfig(values);
    };
    getValue();
  }, [formUpdated]);

  return <div className="demo-floating-box">{config.type === 1 ? <Menu {...config} /> : <Bubble {...config} />}</div>;
};
