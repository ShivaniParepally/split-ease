
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
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const Register: React.FC = () => {
  const { register } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await register(values.name, values.email, values.password);
    } catch (error) {
      // Error is handled in the AuthContext
      console.error('Registration failed:', error);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto flex max-w-[1024px] flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px] space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Logo />
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-gray-500">
              Sign up to start splitting expenses with friends
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </Form>
          
          <div className="text-center text-sm">
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-splitease-primary hover:underline">
                Log in
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

export default Register;
