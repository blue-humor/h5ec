import React, { useState, useEffect } from 'react';

import { history } from 'umi';

import { Image, Cell, Typography, Divider, Sticky } from 'react-vant';

import NavBar from '@/components/NavBar';
import Bubble from '@/components/Ball/bubble';
import XGPlayer from '@/components/XGPlayer';

import { reqArticle } from '@/services/sports/details';

import styles from './index.less';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const { query } = history.location;

  const [article, setArticle] = useState<any>({});

  const handleArticle = async () => {
    const res = await reqArticle(query);
    if (res?.code === 200) {
      setArticle(res?.data);
    }
  };

  useEffect(() => {
    handleArticle();

    return () => {};
  }, []);

  return (
    <>
      <NavBar title="赛事新闻" />
      <Typography.Title level={3} className={styles.detailsTitle}>
        {article?.title}
      </Typography.Title>
      <Cell
        center
        className={styles.userInfo}
        title={article?.member?.username}
        rightIcon={
          <>
            <Typography.Text>{article?.createtime}</Typography.Text>
          </>
        }
        icon={<Image width={44} height={44} src={article?.member?.headimg} round />}
      />
      {article?.video ? (
        <div className={styles.newsPlary}>
          <XGPlayer url={article?.video} poster={article?.thumb} />
        </div>
      ) : (
        <Image width={'100%'} src={article?.thumb} />
      )}

      <p className={styles.sportsDetailsText}>{article?.content}</p>
      <Divider></Divider>
      <Bubble articleId={query?.id} like={article?.like} />
    </>
  );
};

export default Index;
