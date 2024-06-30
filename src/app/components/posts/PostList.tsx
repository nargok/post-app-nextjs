'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type Post = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
};

const postSchema = z.object({
  content: z.string().min(1, "投稿を入力してください").max(140, "140文字以内で入力してください"),
});

type PostFormData = z.infer<typeof postSchema>;

type PostListProps = {
  posts: Post[];
};

const PostItem: React.FC<{post: Post}> = ({post}) => (
  <div>
    <p className="border-b border-gray-200 p4">{post.author}</p>
    <p>{post.content}</p>
    <p className="text-sm text-gray-500">{post.createdAt}</p>
  </div>
);

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    { id: '1', content: 'これは最初の投稿です', author: 'ユーザー1', createdAt: '2024-06-30 10:00:00' },
    { id: '2', content: '二番目の投稿です', author: 'ユーザー2', createdAt: '2024-06-30 11:00:00' },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content: data.content,
      author: 'current user',
      createdAt: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
    reset();
  };

  const contentWatch = watch("content");

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <textarea
          {...register("content")}
          className="w-full p-2 border rounded text-gray-500"
          rows={3}
          placeholder="新しい投稿を書く..."
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
        <div className="mt-2 flex justiry-between items-center">
          <span className="tex-sm text-gray-500">
            {contentWatch ? contentWatch.length : 0} / 140
          </span>
          <button 
            type="submit"
            className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
            投稿する
          </button>
        </div>

      </form>
      <div className='max-w-2xl mx-auto'>
        {posts.map((post) => (
          <PostItem key={post.id} post={post}/>
        ))}
      </div>
    </div>
  );
};

export default PostList;
