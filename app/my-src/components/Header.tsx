import { Github, Twitter, FlaskConical } from 'lucide-react';
import React, { type PropsWithChildren } from 'react';
import { Link } from 'react-router';

export function Header({ children }: PropsWithChildren<{}>) {
    return (
        <header className="border-b border-gray-200 bg-white transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="rounded-xl bg-gradient-to-br from-purple-500 via-blue-600 to-cyan-500 p-3 shadow-lg">
                                <Link to="/" className="group grid leading-snug">
                                    <FlaskConical className="h-8 w-8 text-white" />
                                </Link>
                            </div>
                            {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                             */}
                        </div>

                        <div>
                            <h1 className="bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                                TestJS.help
                            </h1>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                JavaScript Testing Made Simple
                            </p>
                        </div>
                    </div>
                    {children}

                    {/*<nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium">
              Tutorials
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium">
              Examples
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium">
              Best Practices
            </a>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>

            <a href="#" className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">
              Get Started
            </a>
          </nav>*/}
                </div>
            </div>
        </header>
    );
}
