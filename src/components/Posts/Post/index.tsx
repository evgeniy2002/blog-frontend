import React from 'react';

import s from './Post.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import eye from '../../../assets/icons/eye.svg';
import { ibg } from '../../../utils/ibg';
import { useAppSelector } from '../../../redux/hooks';

import pencil from '../../../assets/icons/pencil.svg';

import classNames from 'classnames';
import { IPost } from '../../../types/types';
import Loader from '../../../skeleton/skeleton';
import { Link } from 'react-router-dom';
import instance from '../../../axios';
import { useMutation } from 'react-query';
import { getDate } from '../../../utils/getDate';

async function fetchRemovePost(id: string) {
  try {
    return await instance.delete(`/posts/${id}`);
  } catch (error) {
    console.warn(error);
    alert('Не удалось удалить пост');
  }
}

export const Post: React.FC<IPost & { isLoading: boolean; isOwner: boolean }> = ({
  _id,
  title,
  text,
  imageUrl,
  tags,
  createdAt,
  updatedAt,
  viewsCount,
  isLoading,
  isOwner,
}) => {
  const theme = useAppSelector((state) => state.app.theme);

  const mutation = useMutation(
    (id: string) => {
      return instance.delete(`/posts/${id}`);
    },
    {
      onSuccess: () => {
        alert('Пост успешно удален');
      },
      onError: ({ message }) => {
        console.log(message);
        alert('Произошла ошибка при удалениe статьи');
      },
    },
  );

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      mutation.mutate(_id);
    }
  };

  return (
    <div
      className={classNames(s.post, 'animate  ', {
        dark: theme === 'dark',
      })}>
      {isLoading ? (
        <h1>231</h1>
      ) : (
        <div className={classNames(s.post_item, 'post')}>
          <header className={s.post_item__header + ' ' + 'post__header'}>
            <span># {tags[0]}</span>
            <svg
              className="clock"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="14"
              height="14">
              <path d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-22C6.486,2,2,6.486,2,12s4.486,10,10,10,10-4.486,10-10S17.514,2,12,2Zm5,10c0-.553-.447-1-1-1h-3V6c0-.553-.448-1-1-1s-1,.447-1,1v6c0,.553,.448,1,1,1h4c.553,0,1-.447,1-1Z" />
            </svg>

            <span>{getDate(createdAt)}</span>

            {isOwner && (
              <div className={s.post_item__header_edit}>
                <Link to={`/post/${_id}/edit`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={s.pencil}
                    id="Outline"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22">
                    <path d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z" />
                  </svg>
                </Link>
                <svg
                  onClick={onClickRemove}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  className={s.delete}>
                  <g id="_01_align_center" data-name="01 align center">
                    <path d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z" />
                    <rect x="9" y="10" width="2" height="8" />
                    <rect x="13" y="10" width="2" height="8" />
                  </g>
                </svg>
              </div>
            )}

            {/* <span>{newDate.parse(createdAt)}</span> */}
          </header>

          <h1 className={s.post_item__title + ' ' + 'post__title'}>
            <Link to={`/post/${_id}`}>{title}</Link>
          </h1>
          {imageUrl ? (
            <div className={s.post_item__img}>
              <img src={`http://localhost:4444${imageUrl}`} alt="" />
            </div>
          ) : (
            ''
          )}

          <ReactMarkdown
            className={classNames(s.post_item__text, 'post__text', 'markdown')}
            remarkPlugins={[gfm]}>
            {text}
          </ReactMarkdown>
          {/* <p className={s.post_item__text + ' ' + 'post__text'}>{text}</p> */}

          <div className={s.post_item__info + ' ' + 'post__info'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17">
              <g id="_01_align_center" data-name="01 align center">
                <path d="M23.821,11.181v0C22.943,9.261,19.5,3,12,3S1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64C1.057,14.739,4.5,21,12,21s10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM12,19c-6.307,0-9.25-5.366-10-6.989C2.75,10.366,5.693,5,12,5c6.292,0,9.236,5.343,10,7C21.236,13.657,18.292,19,12,19Z" />
                <path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" />
              </g>
            </svg>

            <span>{viewsCount}</span>
          </div>
        </div>
      )}
    </div>
  );
};
