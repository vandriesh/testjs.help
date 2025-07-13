import { MDXProvider } from '@mdx-js/react';
import React, { useEffect } from 'react';
import { BlogContent } from '#src/components/BlogContent.tsx';
// import { type Route } from './+types/index.ts';
// import { type logos } from './logos/logos.ts';

// export const meta: Route.MetaFunction = () => [{ title: 'Welcome!' }];

const components = {
    code: ({ children, className, ...props }: any) => (
        <code className={`${className} rounded bg-gray-800 px-2 py-1 font-mono text-sm text-purple-300`} {...props}>
            {children}
        </code>
    ),
};

export default function Index() {
    useEffect(() => {
        // Add click handlers for copy buttons after MDX content is rendered
        const handleCopyClick = async (event: Event) => {
            const button = event.currentTarget as HTMLButtonElement;
            const codeText = button.getAttribute('data-code');

            if (codeText) {
                try {
                    await navigator.clipboard.writeText(codeText);
                    button.classList.add('copied');
                    setTimeout(() => {
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code:', err);
                }
            }
        };

        // Attach event listeners to all copy buttons
        const copyButtons = document.querySelectorAll('.copy-code-button');
        copyButtons.forEach((button) => {
            button.addEventListener('click', handleCopyClick);
        });

        // Cleanup event listeners
        return () => {
            copyButtons.forEach((button) => {
                button.removeEventListener('click', handleCopyClick);
            });
        };
    }, []); // Remove dependency on activeFramework since we no longer have global tabs

    return (
        <MDXProvider components={components}>
            <div className="my-16 text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-3xl"></div>
                    <h1 className="relative mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 bg-clip-text py-2 text-6xl leading-tight font-bold text-transparent">
                        Master JavaScript Testing
                    </h1>
                </div>
                <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                    Learn testing best practices with real-world examples for React, Vue, and Angular. From unit tests
                    to integration testing, we've got you covered with modern tools and techniques.
                </p>
                <div className="mt-8 flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                        <span className="text-sm">Always up-to-date</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
                        <span className="text-sm">Production-ready examples</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-purple-400"></div>
                        <span className="text-sm">Best practices included</span>
                    </div>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-4 py-12">
                <BlogContent />
            </main>
        </MDXProvider>
    );
}
