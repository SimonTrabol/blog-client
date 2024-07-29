"use client";

import { Card } from '@/components/ui/card';
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='w-full text-center'>
      <h1 className='text-3xl font-bold my-8'> Not Found</h1>
        <Card className='w-full max-w-3xl mx-auto'>
          <p>Could not find requested resource</p>
          <Link href="/">Return Home</Link>
        </Card>
    </div>

  )
}