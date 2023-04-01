import React from 'react';
import { Posts } from '../components/Posts';
import { Tags } from '../components/Tags';
import { ThemeProps } from '../types/types';

const MainPage: React.FC = () => {
  return (
    <div data-testid="main-page" className="main-page">
      {/* <Tags /> */}
      <Posts />
      <Tags />
    </div>
  );
};

export default MainPage;
