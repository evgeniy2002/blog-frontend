import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = () => (
  <ContentLoader
    speed={2}
    width={600}
    height={751}
    viewBox="0 0 600 751"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="30" y="-2" rx="5" ry="5" width="124" height="26" />
    <rect x="171" y="-6" rx="5" ry="5" width="130" height="30" />
    <rect x="31" y="50" rx="5" ry="5" width="517" height="50" />
    <rect x="0" y="143" rx="0" ry="0" width="600" height="320" />
    <rect x="39" y="511" rx="0" ry="0" width="520" height="151" />
    <rect x="40" y="699" rx="5" ry="5" width="72" height="33" />
  </ContentLoader>
);

export default Loader;
