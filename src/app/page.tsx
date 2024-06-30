import Image from "next/image";
import PostList from '@/app/components/posts/PostList';

export default function Home() {

  const posts = [
    { id: '1', content: '１つ目', author: 'ユーザー1', createdAt: '2024-06-30 10:00:00' },
    { id: '2', content: '2つ目', author: 'ユーザー2', createdAt: '2024-06-30 11:00:00' }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">投稿一覧</h1>
      <PostList posts={posts} />
    </div>
  );
}
