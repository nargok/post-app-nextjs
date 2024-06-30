import React from 'react';

type Post = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
};

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

const PostList: React.FC<PostListProps> = ({posts}) => {
  return (
    <div className='max-w-2xl mx-auto'>
      {posts.map((post) => (
        <PostItem key={post.id} post={post}/>
      ))}
    </div>
  );
};

export default PostList;
