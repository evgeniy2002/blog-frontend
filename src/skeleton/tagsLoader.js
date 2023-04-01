import React from 'react';
import ContentLoader from 'react-content-loader';

const TagsLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height="280%"
    viewBox="0 0 300 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="10" ry="10" width="300" height="280" />
  </ContentLoader>
);

export default TagsLoader;
