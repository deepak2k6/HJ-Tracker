import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/lib/theme';
import { AuthProvider, useAuth } from '@/lib/auth-context';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Activity,
  Heart,
  Weight,
  Thermometer,
  Plus,
  Calendar,
  Clock,
  Trash2,
} from 'lucide-react';
import type { SymptomLog, MedicalRecord } from '@/lib/types';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="health-journal-theme">
      <AuthProvider>
        <Router>
          <div className="relative min-h-screen bg-background font-sans antialiased">
            <Header />
            <main className="container py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signin" element={<SignIn />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/symptoms"
                  element={
                    <ProtectedRoute>
                      <Symptoms />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/records"
                  element={
                    <ProtectedRoute>
                      <Records />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}

function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-12">
      {/* Hero Section with Animation */}
      <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl">
        <div className="relative">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Track Your Health Journey
          </h1>
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        </div>
        
        <p className="text-xl max-w-[700px] text-gray-500 dark:text-gray-400 leading-relaxed">
          Your personal health companion that empowers you to take control of your well-being journey. 
          Record symptoms, track medical history, and gain insights about your health.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {user ? (
            <Link to="/dashboard">
              <Button size="lg" className="px-8 py-6 text-lg shadow-lg transition-transform hover:scale-105">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/signin">
              <Button size="lg" className="px-8 py-6 text-lg shadow-lg transition-transform hover:scale-105">
                Get Started
              </Button>
            </Link>
          )}
          <Link to="/about">
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg transition-transform hover:scale-105">
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-16">
        <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-background border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md">
          <div className="p-3 rounded-full bg-primary/10">
            <Activity className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Track Symptoms</h3>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Log your symptoms with detailed notes and track patterns over time.
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-background border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md">
          <div className="p-3 rounded-full bg-primary/10">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Health Metrics</h3>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Monitor vital metrics to better understand your overall health trends.
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-background border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md">
          <div className="p-3 rounded-full bg-primary/10">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Medical Records</h3>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Keep all your medical history in one secure, easy-to-access place.
          </p>
        </div>
      </div>
      
      {/* Testimonial */}
      <div className="w-full max-w-4xl mt-16 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-1.5 rounded-full bg-primary/10">
            <div className="rounded-full overflow-hidden h-16 w-16">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5OqGqTy9jmkLsThhvM6i2pURQ8coZxn0FPQ&s" alt="User" className="h-full w-full object-cover" />
            </div>
          </div>
          <p className="italic text-lg text-gray-600 dark:text-gray-300">
            "This health journal has transformed how I manage my chronic condition. Now I can easily share patterns with my doctor and take control of my health journey."
          </p>
          <p className="font-medium">Deepak L., Health Journal User</p>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="w-full max-w-5xl py-12 px-8 bg-primary/5 rounded-2xl text-center border border-primary/10">
        <h2 className="text-3xl font-bold mb-4">Begin Your Health Journey Today</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Join thousands of users who are taking control of their health with our intuitive tracking tools.
        </p>
        {user ? (
          <Link to="/dashboard">
            <Button size="lg" className="px-8 shadow-lg transition-all hover:shadow-xl">
              Access Your Dashboard
            </Button>
          </Link>
        ) : (
          <Link to="/signin">
            <Button size="lg" className="px-8 shadow-lg transition-all hover:shadow-xl">
              Start Tracking Now
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">About Health Journal</h1>
        <div className="h-1 w-24 bg-primary/50 mx-auto rounded-full"></div>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Your comprehensive personal health tracking companion, designed with care to help you maintain 
          a detailed record of your health journey and empower you to take control of your wellbeing.
        </p>
      </div>
      
      {/* Mission Statement */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="relative z-10 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto italic">
            "To empower individuals with the tools they need to understand their health patterns, 
            make informed decisions, and communicate effectively with healthcare providers."
          </p>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Why Choose Health Journal?</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 rounded-full bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Comprehensive Tracking</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Record symptoms with detailed severity levels, track trends over time, and identify patterns 
                  that might be affecting your health.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 rounded-full bg-primary/10">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Health Metrics Dashboard</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Visualize your vital health metrics with our intuitive dashboard, making it easy to monitor
                  progress and understand changes in your wellbeing.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Medical History Management</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Keep a detailed record of your medical history, including conditions, medications,
                  procedures, and vaccinations for easy reference.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Appointment Tracking</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Never miss a healthcare appointment with our integrated scheduling system, complete
                  with reminders and rescheduling capabilities.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 rounded-full bg-primary/10">
                  <Weight className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Customizable Health Goals</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Set and track personalized health goals that align with your unique health journey
                  and celebrate your progress along the way.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="p-2 rounded-full bg-primary/10">
                  <Thermometer className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Responsive Design</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Access your health data from any device with our fully responsive design that adapts
                  seamlessly to desktops, tablets, and mobile phones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Privacy & Security */}
      <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3 flex justify-center">
            <div className="p-6 rounded-full bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We understand that your health data is deeply personal. That's why we've implemented 
              industry-leading security measures to ensure your information remains protected.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>End-to-end encryption for all your health records</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Complete control over your data with export and deletion options</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>No third-party sharing without your explicit consent</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span>Regular security audits and compliance with healthcare regulations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Team or Get Started CTA */}
      <div className="text-center space-y-6 py-8">
        <h2 className="text-3xl font-semibold">Ready to Take Control of Your Health?</h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Join thousands of users who are already managing their health journey with confidence.
        </p>
        <Link to="/signin">
          <Button size="lg" className="px-8 py-6 text-lg shadow-lg transition-transform hover:scale-105 mt-4">
            Start Your Health Journal
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Have questions or need support? We're here to help. Fill out the form
        below, and we'll get back to you as soon as possible.
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="How can we help?"
            className="min-h-[150px]"
            required
          />
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        {/* Card with subtle shadow and border */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header with accent background */}
          <div className="relative h-24 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('/api/placeholder/400/100')] opacity-10 bg-cover bg-center"></div>
            {/* App icon/logo placeholder */}
            <div className="h-16 w-16 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center border-4 border-white dark:border-gray-900">
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Welcome text */}
          <div className="text-center px-6 pt-8 pb-4">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sign in to continue your health journey
            </p>
          </div>

          {/* Form section */}
          <div className="px-6 pb-8 pt-4">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary" 
                    required 
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary" 
                    required 
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full py-5 font-medium text-base transition-all shadow-md hover:shadow-lg" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : 'Sign In'}
                </Button>
              </div>
            </form>
            
            {/* Optional divider and social login placeholders */}
            <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const recentSymptoms = [
    {
      date: '2024-03-21',
      symptom: 'Headache',
      severity: 'mild',
      time: '09:30 AM'
    },
    {
      date: '2024-03-20',
      symptom: 'Fatigue',
      severity: 'moderate',
      time: '02:15 PM'
    }
  ];

  const upcomingAppointments = [
    {
      date: '2024-03-25',
      doctor: 'Dr. Sarah Johnson',
      type: 'Regular Checkup',
      time: '10:00 AM'
    },
    {
      date: '2024-04-02',
      doctor: 'Dr. Michael Chen',
      type: 'Dental Cleaning',
      time: '02:30 PM'
    }
  ];

  const healthMetrics = [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: '72 bpm',
      change: '+2 from last week',
      color: 'text-red-500',
    },
    {
      icon: Weight,
      label: 'Weight',
      value: '68 kg',
      change: '-0.5 from last week',
      color: 'text-blue-500',
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: '36.6°C',
      change: 'Normal',
      color: 'text-green-500',
    },
    {
      icon: Activity,
      label: 'Activity',
      value: '8,432 steps',
      change: '85% of daily goal',
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Here's your health overview</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Measurement
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {healthMetrics.map((metric) => (
          <Card key={metric.label} className="p-6">
            <div className="flex items-center space-x-4">
              <metric.icon className={`h-8 w-8 ${metric.color}`} />
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
                <p className="text-sm text-muted-foreground">{metric.change}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-xl font-semibold">Recent Symptoms</h3>
          <div className="space-y-4">
            {recentSymptoms.map((symptom, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{symptom.symptom}</p>
                  <p className="text-sm text-muted-foreground">
                    <Calendar className="mr-1 inline-block h-4 w-4" />
                    {symptom.date}
                    <Clock className="ml-2 mr-1 inline-block h-4 w-4" />
                    {symptom.time}
                  </p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  symptom.severity === 'mild' ? 'bg-green-100 text-green-800' :
                  symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {symptom.severity}
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="mb-4 text-xl font-semibold">Upcoming Appointments</h3>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{appointment.type}</p>
                  <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                  <p className="text-sm text-muted-foreground">
                    <Calendar className="mr-1 inline-block h-4 w-4" />
                    {appointment.date}
                    <Clock className="ml-2 mr-1 inline-block h-4 w-4" />
                    {appointment.time}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Symptoms() {
  const [symptoms, setSymptoms] = useState<SymptomLog[]>([
    {
      id: '1',
      userId: 'user1',
      date: '2024-03-21',
      symptoms: ['Headache', 'Fatigue'],
      severity: 'moderate',
      notes: 'Started in the morning, persisted throughout the day',
      createdAt: '2024-03-21T08:00:00Z',
    },
    {
      id: '2',
      userId: 'user1',
      date: '2024-03-20',
      symptoms: ['Fever', 'Cough'],
      severity: 'severe',
      notes: 'High temperature of 39°C, dry cough',
      createdAt: '2024-03-20T15:30:00Z',
    },
    {
      id: '3',
      userId: 'user1',
      date: '2024-03-19',
      symptoms: ['Nausea'],
      severity: 'mild',
      notes: 'Slight discomfort after meals',
      createdAt: '2024-03-19T20:15:00Z',
    },
    {
      id: '4',
      userId: 'user1',
      date: '2024-03-18',
      symptoms: ['Joint Pain'],
      severity: 'moderate',
      notes: 'Pain in knee and ankle joints, worse in the morning',
      createdAt: '2024-03-18T09:30:00Z',
    },
    {
      id: '5',
      userId: 'user1',
      date: '2024-03-17',
      symptoms: ['Dizziness', 'Blurred Vision'],
      severity: 'severe',
      notes: 'Experienced vertigo and difficulty focusing',
      createdAt: '2024-03-17T14:45:00Z',
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newSymptom: SymptomLog = {
      id: (symptoms.length + 1).toString(),
      userId: 'user1',
      date: (form.elements.namedItem('date') as HTMLInputElement).value,
      symptoms: [(form.elements.namedItem('symptoms') as HTMLInputElement).value],
      severity: (form.elements.namedItem('severity') as HTMLSelectElement).value as 'mild' | 'moderate' | 'severe',
      notes: (form.elements.namedItem('notes') as HTMLTextAreaElement).value,
      createdAt: new Date().toISOString(),
    };
    setSymptoms([newSymptom, ...symptoms]);
    form.reset();
    toast.success('Symptom logged successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Symptoms Tracker</h1>
      </div>

      <Card className="p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Input
                id="symptoms"
                name="symptoms"
                placeholder="Enter symptoms (e.g., headache, fever)"
                required
              />
            </div>
            <div className="w-[200px] space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select name="severity" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[200px] space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Add any additional notes or observations"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Save Symptom Log
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">Symptom History</h3>
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Symptoms</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {symptoms.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.symptoms.join(', ')}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        log.severity === 'severe'
                          ? 'bg-red-100 text-red-800'
                          : log.severity === 'moderate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {log.severity}
                    </span>
                  </TableCell>
                  <TableCell>{log.notes}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSymptoms(symptoms.filter((s) => s.id !== log.id));
                        toast.success('Symptom log deleted');
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function Records() {
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      userId: 'user1',
      date: '2024-03-15',
      type: 'condition',
      title: 'Seasonal Allergies',
      description: 'Diagnosed with seasonal rhinitis. Prescribed antihistamines.',
      provider: 'Dr. Sarah Johnson',
      createdAt: '2024-03-15T14:30:00Z',
    },
    {
      id: '2',
      userId: 'user1',
      date: '2024-02-28',
      type: 'vaccination',
      title: 'Flu Vaccine',
      description: 'Annual influenza vaccination',
      provider: 'City Health Clinic',
      createdAt: '2024-02-28T10:15:00Z',
    },
    {
      id: '3',
      userId: 'user1',
      date: '2024-01-20',
      type: 'procedure',
      title: 'Dental Cleaning',
      description: 'Routine dental cleaning and check-up',
      provider: 'Dr. Michael Chen, DDS',
      createdAt: '2024-01-20T09:00:00Z',
    },
    {
      id: '4',
      userId: 'user1',
      date: '2024-01-10',
      type: 'medication',
      title: 'Vitamin D Supplement',
      description: 'Started daily vitamin D supplementation',
      provider: 'Dr. Emily Williams',
      createdAt: '2024-01-10T16:45:00Z',
    },
    {
      id: '5',
      userId: 'user1',
      date: '2024-03-05',
      type: 'procedure',
      title: 'Blood Test',
      description: 'Complete blood count and metabolic panel',
      provider: 'Central Lab Services',
      createdAt: '2024-03-05T11:30:00Z',
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const newRecord: MedicalRecord = {
      id: (records.length + 1).toString(),
      userId: 'user1',
      date: (form.elements.namedItem('date') as HTMLInputElement).value,
      type: (form.elements.namedItem('type') as HTMLSelectElement).value as 'condition' | 'medication' | 'procedure' | 'vaccination',
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      provider: (form.elements.namedItem('provider') as HTMLInputElement).value,
      createdAt: new Date().toISOString(),
    };
    setRecords([newRecord, ...records]);
    form.reset();
    toast.success('Medical record added successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Medical Records</h1>
      </div>

      <Card className="p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-end gap-4">
            <div className="w-[200px] space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="condition">Condition</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="procedure">Procedure</SelectItem>
                  <SelectItem value="vaccination">Vaccination</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter title" required />
            </div>
            <div className="w-[200px] space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add detailed information about the record"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="provider">Healthcare Provider</Label>
            <Input
              id="provider"
              name="provider"
              placeholder="Enter healthcare provider's name"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Save Record
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">Record History</h3>
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        record.type === 'condition'
                          ? 'bg-blue-100 text-blue-800'
                          : record.type === 'medication'
                          ? 'bg-purple-100 text-purple-800'
                          : record.type === 'procedure'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {record.type}
                    </span>
                  </TableCell>
                  <TableCell>{record.title}</TableCell>
                  <TableCell>{record.provider}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setRecords(records.filter((r) => r.id !== record.id));
                        toast.success('Medical record deleted');
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

export default App;