import axios from 'axios';
import React from 'react';

import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { IPost } from '../types/types';
import instance from '../axios';
import { useAppSelector } from '../redux/hooks';
import classNames from 'classnames';

async function fetchCategory(name: string | undefined) {
  try {
    const { data } = await instance.get(`/category/${name}`);
    console.log(data);
    return data;
  } catch (error) {}
}

export const Category: React.FC = () => {
  const { name } = useParams();

  const theme = useAppSelector((state) => state.app.theme);

  const { data } = useQuery<IPost[]>(['category', name], () => fetchCategory(name), {
    enabled: !!name,
  });

  return (
    <section
      className={classNames('category', {
        dark: theme === 'dark',
      })}>
      <h1 className="category-name">#{name}</h1>
      <div className="category-row animate">
        {data?.map((item) => (
          <div className="category-columns">
            <div className="category-item">
              {item.imageUrl ? (
                <Link to={`/post/${item._id}`} className="category-img">
                  <img src={`http://localhost:4444${item.imageUrl}`} alt="" />
                </Link>
              ) : (
                ''
              )}

              <div className="category-body">
                <h3>
                  <Link to={`/post/${item._id}`}>{item.title}</Link>
                </h3>
                <ReactMarkdown className="category-text markdown" remarkPlugins={[gfm]}>
                  {item.text}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
