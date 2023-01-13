import Bubble from './bubble';
import Menu from './infoBall';
import './index.less';

export default ({ type }: any) => {
  return <div className="demo-floating-box">{type === 1 ? <Menu /> : <Bubble />}</div>;
};
