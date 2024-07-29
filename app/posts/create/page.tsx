"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast, useToast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"

const FormSchema = z.object({
    title: z.string().min(2, {
        message: "El título debe tener al menos 2 caracteres.",
    }),
    content: z.string().min(10, {
        message: "El contenido debe tener al menos 10 caracteres.",
    }),
    author: z.string().min(2, {
        message: "El autor debe tener al menos 2 caracteres.",
    }),
})


export default function PostForm() {
    const { toast } = useToast()
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            content: "",
            author: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error('Error al crear el post');
            }

            const responseData = await res.json();
            console.log(responseData);

            toast({
                variant: "destructive",
                title: "Post creado con éxito",
                description: "Tu post ha sido creado exitosamente.",
            });

            // Redirigir a la lista de posts después de una breve demora
            setTimeout(() => {
                router.push('/posts');
            }, 2000);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error';
            toast({
                title: "Error al crear el post",
                description: errorMessage,
                variant: "destructive",
            })
        }
    }

    return (
        <div className='w-full text-center'>
            <h1 className='text-3xl font-bold my-8'>Crear Post</h1>
            <Card className='w-full max-w-3xl mx-auto'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mx-auto">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Título del post" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contenido</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Contenido del post" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Autor</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre del autor" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-700">Crear post</Button>
                    </form>
                </Form>
                <Link href="/posts">
                    <Button className="mt-4 bg-purple-500 text-white hover:bg-purple-700">Volver a lista de posts</Button>
                </Link>
            </Card>
        </div>
    )
}
