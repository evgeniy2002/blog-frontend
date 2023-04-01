import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { ibg } from '../utils/ibg';
import { useQuery } from 'react-query';
import axios from 'axios';
import { IPost } from '../types/types';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import instance from '../axios';
import { getDate } from '../utils/getDate';

async function fetchPage(id: string | undefined) {
  try {
    const { data } = await instance.get(`/posts/${id}`);

    return data;
  } catch (error) {
    alert(error);
  }
}

export const FullPost: React.FC = () => {
  const theme = useAppSelector((state) => state.app.theme);

  const { id } = useParams();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data, isLoading, error } = useQuery(['fullPost', id], () => fetchPage(id), {
    enabled: !!id,
  });
  if (isLoading) {
    return <h1>Идет загрузка...</h1>;
  }
  if (error) {
    alert(error);
  }

  // React.useEffect(() => {
  //   ibg();
  // });

  // console.log(data);
  return (
    <div
      className={classNames('fullPost-wrapper', 'animate', {
        dark: theme === 'dark',
      })}>
      <div className="fullPost">
        <div className="fullPost-row">
          <header className="post__header fullPost-header">
            {data?.tags.map((item: any) => (
              <Link to={`/category/${item}`}># {item}</Link>
            ))}
            <svg
              className="clock"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="14"
              height="14">
              <path d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-22C6.486,2,2,6.486,2,12s4.486,10,10,10,10-4.486,10-10S17.514,2,12,2Zm5,10c0-.553-.447-1-1-1h-3V6c0-.553-.448-1-1-1s-1,.447-1,1v6c0,.553,.448,1,1,1h4c.553,0,1-.447,1-1Z" />
            </svg>
            <span>{getDate(data.createdAt)}</span>
            {/* <span>{}</span> */}
          </header>
          <h1 className="post__title fullPost-title">{data?.title}</h1>
          {data.imageUrl ? (
            <div className="fullPost-img ">
              <img src={`http://localhost:4444${data?.imageUrl}`} alt="" />
            </div>
          ) : (
            ''
          )}

          <ReactMarkdown className="post__text fullPost-text markdown" remarkPlugins={[gfm]}>
            {data?.text}
          </ReactMarkdown>
          <div className="post__info fullPost-info">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
              <g id="_01_align_center" data-name="01 align center">
                <path d="M23.821,11.181v0C22.943,9.261,19.5,3,12,3S1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64C1.057,14.739,4.5,21,12,21s10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM12,19c-6.307,0-9.25-5.366-10-6.989C2.75,10.366,5.693,5,12,5c6.292,0,9.236,5.343,10,7C21.236,13.657,18.292,19,12,19Z" />
                <path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" />
              </g>
            </svg>

            <span>{data?.viewsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
