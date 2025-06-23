import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { loginSchema, Login } from './../lib/types';

function LoginForm() {
  
  const {accessToken} = useAuth()
    const [isSubmitting, setIsSubmitting] = useState<boolean>()
    const navigate = useNavigate()
    const { login } = useAuth()
    

    const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      password: ""
    }
  });

  const onSubmit = async (data : Login) => {
    setIsSubmitting(true)
    const res = await login(data)
            
    if(!res){
      navigate('/employees', { replace: true })
      return
    }
    else if (res) {
      form.setError(res.field , {
        type: "manual",
        message: res.message,
      })
    }
    else {
      form.setError("root", { message: res || "Login failed" });
    }
    setIsSubmitting(false)
    }

  // Redirect if already logged in
  if (accessToken) {
    navigate('/employees', { replace: true });
    return null; // Prevent rendering the form if already logged in
  }
  return (
    <div className=''>
    <Card className='w-80 h-96 flex justify-center bg-background '>
        <CardHeader>
            <CardTitle className='text-center text-md relative bottom-3'>Sign In</CardTitle>
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

