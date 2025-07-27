
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, CreditCard, PiggyBank, Receipt, Users } from 'lucide-react';
import Logo from '@/components/layout/Logo';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Logo />
          </div>
          <nav className="hidden space-x-4 md:flex">
            <Link to="/features" className="text-sm font-medium text-gray-700 hover:text-splitease-primary">
              Features
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-700 hover:text-splitease-primary">
              Pricing
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-splitease-primary">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link to="/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-splitease-soft-purple to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                Split expenses <span className="text-splitease-primary">easily</span> with friends
              </h1>
              <p className="text-lg text-gray-700 md:text-xl">
                Track shared expenses, settle debts, and simplify your financial relationships. The easiest way to split bills with roommates, friends, and travel companions.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Log in to your account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/placeholder.svg" 
                alt="SplitEase App" 
                className="rounded-lg shadow-xl"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Everything you need to split expenses</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              SplitEase provides all the tools to track, manage, and settle shared expenses between friends, roommates, or travel companions.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-6">
              <div className="mb-4 rounded-full bg-splitease-soft-purple p-3 w-fit">
                <Users className="h-6 w-6 text-splitease-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Group Expenses</h3>
              <p className="text-gray-600">Create groups for roommates, trips, or events to organize expenses.</p>
            </div>
            
            <div className="rounded-lg border p-6">
              <div className="mb-4 rounded-full bg-splitease-soft-green p-3 w-fit">
                <Receipt className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Split Bills</h3>
              <p className="text-gray-600">Split expenses evenly or with custom amounts among group members.</p>
            </div>
            
            <div className="rounded-lg border p-6">
              <div className="mb-4 rounded-full bg-splitease-soft-orange p-3 w-fit">
                <PiggyBank className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Track Balances</h3>
              <p className="text-gray-600">See who owes what and settle debts with clear balances.</p>
            </div>
            
            <div className="rounded-lg border p-6">
              <div className="mb-4 rounded-full bg-blue-100 p-3 w-fit">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Record Payments</h3>
              <p className="text-gray-600">Log when debts are settled to keep everyone on the same page.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-splitease-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to simplify expense splitting?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/90">
            Join thousands of users who use SplitEase to manage shared expenses and maintain friendships.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Sign up for free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Logo />
              <p className="mt-4 text-sm text-gray-600">
                Simplifying shared finances since 2023.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/features" className="text-gray-600 hover:text-splitease-primary">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-600 hover:text-splitease-primary">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-600 hover:text-splitease-primary">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-splitease-primary">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="text-gray-600 hover:text-splitease-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-splitease-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} SplitEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
