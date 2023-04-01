import axios from 'axios';
import classNames from 'classnames';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import instance from '../../axios';
import { useAppSelector } from '../../redux/hooks';
import TagsLoader from '../../skeleton/tagsLoader';

import s from './Tags.module.scss';

async function fetchTags() {
  try {
    const { data } = await instance.get('/tags');
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Ошибка при получение тегов');
  }
}

export const Tags: React.FC = () => {
  const theme = useAppSelector((state) => state.app.theme);

  const {
    data: tags,
    isLoading,
    isError,
    error,
  } = useQuery<string[], Error>('tags', fetchTags, {
    keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>Идет загрузка...</h1>;
  }
  if (isError) {
    return <h1>Ошибка при получение тегов</h1>;
  }

  return (
    <aside
      className={classNames(s.tags, 'animate', {
        [s.tags_dark]: theme === 'dark',
      })}>
      <div className={s.tags_row}>
        {tags?.map((item) => (
          <div className={s.tags_columns}>
            <Link to={`/category/${item}`} className={s.tags_item}>
              <span># {item}</span>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
};
