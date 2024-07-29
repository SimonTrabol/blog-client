"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import router from 'next/router';

type PostDetail = {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
};


export default  function detail({
  params,
}: Readonly<{ params: { id: number } }>){

  const id = params.id;
  const [post, setPost] = useState<PostDetail | null>(null);
  const [code, setCode] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        //const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`, {
          method: 'GET',
          cache: 'no-store',
        });
        const data = await res.json();
        setPost(data);
        setCode(res.status);
        console.log(data);
      } catch (error) {
        setError('Error fetching posts: ' + error);
      }
    }
    fetchPosts();
  }, []);

  if (!post) return <div>Loading...111</div>;
  if (code == 404)  redirect("/not-found");
  if (error != null) return <div>error en servidor...</div>;

  return (
    <div className='w-full text-center'>
      <h1 className='text-3xl font-bold my-8'>{post?.title}</h1>
      <Card className='w-full max-w-3xl mx-auto'>
        <CardHeader className='bg-gray-100 p-4 rounded-t-lg'>
          <CardTitle className='text-lg font-semibold text-gray-800'>Título: {post?.title}</CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <p className='text-gray-600 mb-2'>{post?.content}</p>
          <p className='text-gray-500'>Autor: <span className='font-medium'>{post?.author}</span></p>
          <p className='text-gray-500'>Creado el: <span className='font-medium'>{post?.created_at?.toLocaleString()}</span></p>
          <Link href={`/posts/`}>
                <Button className='bg-blue-500 text-white hover:bg-blue-700 mb-4'>
                  Volver a lista posts
                </Button>
              </Link>
        </CardContent>
      </Card>
    </div>
  );
}
