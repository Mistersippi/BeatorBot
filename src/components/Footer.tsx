import { Youtube, Twitter, Instagram, Music, Linkedin, Facebook } from 'lucide-react';
import { Link } from './Link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">About the Creator</h3>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
              <div>
                <p className="text-white font-medium">Brent Moreno (Mistersippi)</p>
                <p className="text-sm">Explore the intersection of music, technology, and AI</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Communities</h3>
            <Link href="#" className="text-gray-400 hover:text-white block mb-2">
              Automate Everything Academy
            </Link>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Press</h3>
            <p className="mb-4">Interested in featuring Beat or Bot? We'd love to hear from you.</p>
            <Link 
              href="#" 
              className="inline-flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Contact for Press
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {[Youtube, Twitter, Instagram, Music, Linkedin, Facebook].map((Icon, i) => (
                <Link key={i} href="#" className="text-gray-400 hover:text-white">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <Link href="#" className="text-gray-400 hover:text-white">Accessibility</Link>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>© 2024 Aideations. All rights reserved.</p>
            <p className="mt-2">
              An AI music challenge platform exploring the boundaries between human and machine creativity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}