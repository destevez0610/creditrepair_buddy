import React, { useState } from 'react';
import { AuthProvider } from './components/auth/AuthProvider';
import { AuthModal } from './components/auth/AuthModal';
import { Shield, Bot, CreditCard, BarChart3, Mail, Bell, Target, MessageSquare, TrendingUp, Star, ChevronRight } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function TestimonialCard({ name, role, content, image }: {
  name: string,
  role: string,
  content: string,
  image: string
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 italic leading-relaxed">"{content}"</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string, label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-indigo-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-indigo-600" />
                <span className="font-bold text-xl text-gray-900">CreditBuddy</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
                <button 
                  onClick={() => openAuthModal('signup')}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full text-indigo-700 font-medium text-sm mb-8">
                <Bot className="h-4 w-4" />
                AI-Powered Credit Repair
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                A Smarter Way to
                <span className="text-indigo-600"> Manage Your Credit</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Your AI-powered assistant for credit repair, combining smart technology
                and legal expertise to help you achieve your financial goals faster than ever.
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => openAuthModal('signup')}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-200"
                >
                  Start Free Trial
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold border border-gray-200 hover:border-gray-300 transition-colors flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  See How It Works
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 border border-gray-100">
              <StatCard number="50k+" label="Active Users" />
              <StatCard number="120+" label="Average Score Increase" />
              <StatCard number="98%" label="Success Rate" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" id="features">
          <div className="text-center mb-16">
            <div className="text-indigo-600 font-semibold mb-2">Features</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Improve Your Credit
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              CreditBuddy combines AI technology with proven credit repair strategies
              to help you achieve your financial goals faster.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Bot}
              title="AI Credit Assistant"
              description="Chat with your personal AI assistant that guides you through the credit repair process with clear, actionable advice."
            />
            <FeatureCard
              icon={CreditCard}
              title="Credit Monitoring"
              description="Get instant access to your credit reports and scores, with real-time monitoring and alerts for any changes."
            />
            <FeatureCard
              icon={BarChart3}
              title="Smart Analysis"
              description="Receive personalized insights and recommendations based on your unique credit situation and goals."
            />
            <FeatureCard
              icon={Mail}
              title="AI-Powered Letters"
              description="Generate effective dispute letters using our advanced AI system, backed by real legal expertise and success data."
            />
            <FeatureCard
              icon={Bell}
              title="Progress Tracking"
              description="Stay updated with smart notifications and progress tracking to ensure you're always moving forward."
            />
            <FeatureCard
              icon={Target}
              title="Goal-Based Planning"
              description="Get a customized action plan designed specifically for your credit improvement goals and timeline."
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 py-24" id="testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="text-indigo-600 font-semibold mb-2">Testimonials</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Real Results from Real People
              </h2>
              <p className="text-gray-600">
                Join thousands of satisfied users who have improved their credit with CreditBuddy
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TestimonialCard
                name="Sarah Johnson"
                role="First-time Homebuyer"
                content="CreditBuddy helped me raise my credit score by 120 points in just 6 months. The AI assistant made everything so clear and simple. I finally got approved for my dream home!"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
              />
              <TestimonialCard
                name="Michael Chen"
                role="Small Business Owner"
                content="The AI-powered dispute letters were a game-changer. They helped me remove several incorrect items from my report, and the process was incredibly smooth."
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
              />
              <TestimonialCard
                name="Lisa Rodriguez"
                role="Recent Graduate"
                content="The personalized guidance made credit repair so much easier to understand. I feel much more confident about my financial future now."
                image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Credit Journey?
              </h2>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied users who have improved their credit scores
                with CreditBuddy's AI-powered assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => openAuthModal('signup')}
                  className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <TrendingUp className="h-5 w-5" />
                </button>
                <button className="bg-indigo-500 bg-opacity-30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-40 transition-colors inline-flex items-center justify-center gap-2">
                  Schedule Demo
                  <MessageSquare className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: '30px 30px'
              }}></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-6 w-6 text-indigo-600" />
                  <span className="font-bold text-lg text-gray-900">CreditBuddy</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Your AI-powered credit repair assistant, helping you achieve your financial goals.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Success Stories</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} CreditBuddy. All rights reserved.
            </div>
          </div>
        </footer>

        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
        />
      </div>
    </AuthProvider>
  );
}

export default App;