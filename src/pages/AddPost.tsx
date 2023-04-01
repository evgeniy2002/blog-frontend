import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Button } from '../components/Button';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import instance from '../axios';
import { useMutation } from 'react-query';
import { useAppSelector } from '../redux/hooks';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

async function fetchPostCreate(params: any) {
  try {
    const { data } = await instance.post('/posts', params);
    return data;
  } catch (error) {
    console.warn(error);
    alert('Ошибка при создании статьи');
  }
}

export const AddPost: React.FC = () => {
  const mutation = useMutation((newPost) => fetchPostCreate(newPost), {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { id } = useParams();
  const isAuth = useAppSelector((state) => !!state.auth.data);
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [tags, setTags] = React.useState('');
  const [text, setText] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const inputFileRef = React.useRef<any>(null);
  const isEditing = Boolean(id);

  const changeValue = React.useCallback((val: string) => {
    setText(val);
  }, []);
  const handleChangeFile = async (event: any) => {
    try {
      console.log(event.target.files[0].name);
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await instance.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const options = React.useMemo(
    () =>
      ({
        spellChecker: false,
        maxHeight: '400px',
        autofocus: true,
        placeholder: 'Введите текст...',
        status: false,
        autosave: {
          enabled: true,
          delay: 1000,
        },
      } as any),
    [],
  );

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };

      const { data } = isEditing
        ? await instance.patch(`/posts/${id}`, fields)
        : await instance.post('/posts', fields);

      // const { data } = await instance.post('/posts', fields);
      // mutation.mutate(fields);
      console.log(data);

      const _id = isEditing ? id : data._id;

      navigate(`/post/${_id}`);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании статьи');
    }
  };

  React.useEffect(() => {
    if (id) {
      instance
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(','));
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении статьи!');
        });
    }
  }, []);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div className="addPost">
      <div className="addPost-preview">
        <div onClick={() => inputFileRef.current.click()} style={{ display: 'inline-block' }}>
          <Button variant="outlined">Загрузить превью</Button>
        </div>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      </div>
      {imageUrl && (
        <>
          <button className="addPost-remove" onClick={onClickRemoveImage}>
            Удалить
          </button>
          <img className="addPost-image" src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}

      <div className="addPost-title">
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок статьи..."
        />
      </div>
      <div className="addPost-tags">
        <input placeholder="Теги" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <SimpleMDE value={text} onChange={changeValue} options={options} className="editor" />
      <div className="addPost-btn">
        <div onClick={onSubmit} style={{ display: 'inline-block' }}>
          <Button>{isEditing ? 'Сохранить' : 'Опубликовать'}</Button>
        </div>
        <a href="/">Отмена</a>
      </div>
    </div>
  );
};

type SimpleEditor = {
  spellChecker: boolean;
  maxHeight: string;
  autofocus: boolean;
  placeholder: string;
  status: boolean;
  autosave: AutoSave;
};

type AutoSave = {
  enabled: boolean;
  delay: number;
};
