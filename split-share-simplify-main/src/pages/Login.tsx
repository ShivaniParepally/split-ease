
import React from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/layout/Logo';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const Login: React.FC = () => {
  const { login } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      // Error is handled in the AuthContext
      console.error('Login failed:', error);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto flex max-w-[1024px] flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px] space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Logo />
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-gray-500">
              Enter your credentials to log in to your account
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Logging in...' : 'Log in'}
              </Button>
            </form>
          </Form>
          
          <div className="text-center text-sm">
            <p className="text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-splitease-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">
              &larr; Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
