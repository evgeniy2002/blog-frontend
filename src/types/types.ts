export type ThemeProps = {
  theme: string | null
}

export interface IPost  {
  _id: string,
  createdAt: string,
  imageUrl: string,
  tags: string[],
  text: string,
  title: string,
  updatedAt: string,
  viewsCount: number

}

export interface IUser {
  data:{

    _id: string,
    fullName: string,
    email: string,
    createdAt: string,
    avatarUrl: string,
    updatedAt: string,
  }

}