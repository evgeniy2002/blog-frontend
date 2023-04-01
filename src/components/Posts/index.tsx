import axios from 'axios';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from 'react-query';
import instance from '../../axios';
import { useAppSelector } from '../../redux/hooks';
import { IPost } from '../../types/types';
import { ibg } from '../../utils/ibg';
import { Post } from './Post';

import s from './Posts.module.scss';

async function fetchPosts() {
  try {
    const data = await instance.get('/posts');

    if (data.status === 500) {
      throw new Error('No tasks found');
    } else {
    }
    return data.data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
}

export const Posts: React.FC = () => {
  const user = useAppSelector((state) => state.auth.data);

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery('posts', fetchPosts, {
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });

  const ToasterBox = ({ toastOptions }: any) => {
    return <Toaster toastOptions={toastOptions} />;
  };

  return (
    <section className={s.posts}>
      {isError ? (
        // <Toaster toastOptions={toast.success('asd')}/>
        <ToasterBox toastOptions={toast.error('Network Error')} />
      ) : (
        <div className={s.posts_row}>
          {posts?.map((el: any) => (
            <Post {...el} isLoading={isLoading} key={el._id} isOwner={user?._id === el.user?._id} />
          ))}
        </div>
      )}
    </section>
  );
};
