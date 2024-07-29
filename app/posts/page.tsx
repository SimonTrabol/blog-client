"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/`);
        setPosts(response.data);
      } catch (error) {
        setError('Error fetching posts: ' + error);
      }
    }

    fetchPosts();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className='w-full text-center'>
      <h1 className='text-3xl font-bold my-8'>Listado de Posts</h1>
      <Link href={`/posts/create`}>
        <Button variant={'destructive'} className='mb-4'>
          agregar nuevos posts
        </Button>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map(post => (
          <Card key={post.id} className='hover:shadow-xl transition-shadow duration-300'>
            <CardHeader className='bg-gray-100 p-4 rounded-t-lg'>
              <CardTitle className='text-lg font-semibold text-gray-800'>Título: {post.title}</CardTitle>
            </CardHeader>
            <CardContent className='p-4'>
              <Link href={`/posts/${post.id}`}>
                <Button className='bg-blue-500 text-white hover:bg-blue-700 mb-4'>
                  Ver detalles
                </Button>
              </Link>
              <p className='text-gray-600 mb-2'>{post.content.slice(0, 100)}...</p>
              <p className='text-gray-500'>Autor: <span className='font-medium'>{post.author}</span></p>
              <p className='text-gray-500'>Creado el: <span className='font-medium'>{new Date(post.created_at).toLocaleString()}</span></p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}