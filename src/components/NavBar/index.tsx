import React from 'react';
import { history } from 'umi'

import { NavBar } from 'react-vant';

interface IndexProps {
    title: string
}

const Index: React.FC<IndexProps> = ({ title }) => {
    return (
        <>
            <NavBar
                placeholder
                fixed
                safeAreaInsetTop
                title={title}
                // leftText="返回"
                onClickLeft={() => history.goBack()}
            />
        </>
    );
};

export default Index;
