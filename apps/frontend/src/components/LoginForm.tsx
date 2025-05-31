import { Login, loginSchema } from '@/lib/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'

function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>()
    const navigate = useNavigate()

    const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      password: ""
    }
  });

  const onSubmit = async (data : Login) => {
    // setIsSubmitting(true)
    const res = await fetch ("http://localhost:3000/employees/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"},
        credentials: 'include'
    })
        
    const response: { errors?: { field: "name" | "password" | "root"; message: string }[]; message?: string } = await res.json()
    if(!res.ok){
    if (response.errors) {
    response.errors.forEach((error: { field: "name" | "password" | "root"; message: string }) => {
      form.setError(error.field , {
        type: "manual",
        message: error.message,
      })
    })
  }else {
      form.setError("root", { message: response.message || "Login failed" });
    }
    }

    // redirect('/employees')
    navigate('/employees')
    
    setIsSubmitting(false)
  };

  return (
    <div className=''>
    <Card className='w-72 bg-background '>
        <CardHeader>
            <CardTitle className='text-center text-md'>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage className='text-nowrap -mb-10'/>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage className='text-nowrap -mb-10'/>
                        </FormItem>
                    )}
                    />
                    <Button disabled={isSubmitting} type="submit" className=' text-secondary disabled:bg-muted-foreground w-full'>{isSubmitting? "submitting..." : "Submit"}</Button>
                    {form.formState.errors.root && (
                        <p className="text-sm font-medium text-destructive -mt-5 opacity-80">
                            {`| ${form.formState.errors.root.message}`}
                        </p>
                     )} 
                </form>
            </Form>
        </CardContent>
    </Card>
    </div>
  )
}

export default LoginForm

