import React, { useState } from 'react';
import { Clock, User, Tag, Zap } from 'lucide-react';

// Import MDX content
import ReactBasicTesting from '../content/react/basic-testing.mdx';
import ReactComponentTesting from '../content/react/component-testing.mdx';
import ReactHooksTesting from '../content/react/hooks-testing.mdx';

interface Framework {
    id: string;
    name: string;
    available: boolean;
    color: string;
}

interface BlogPost {
    id: string;
    title: string;
    description: string;
    component: React.ComponentType;
    readTime: string;
    tags: string[];
    date: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    frameworks: Framework[];
    defaultFramework: string;
}

const allFrameworks: [Framework, Framework, Framework] = [
    { id: 'react', name: 'React', available: true, color: 'from-blue-500 to-cyan-500' },
    { id: 'vue', name: 'Vue', available: false, color: 'from-green-500 to-emerald-500' },
    { id: 'angular', name: 'Angular', available: false, color: 'from-red-500 to-pink-500' },
];

const blogPosts: BlogPost[] = [
    {
        id: 'basic-testing',
        title: 'Getting Started with React Testing',
        description: 'Learn the fundamentals of testing React applications with Vitest and Testing Library.',
        component: ReactBasicTesting,
        readTime: '5 min',
        tags: ['Basics', 'Vitest', 'Testing Library'],
        date: '2024-01-15',
        difficulty: 'Beginner',
        frameworks: [allFrameworks[0]], // Only React
        defaultFramework: 'react',
    },
    /*{
    id: 'component-testing',
    title: 'Testing React Components',
    description: 'Deep dive into testing React components with props, state, and user interactions.',
    component: ReactComponentTesting,
    readTime: '8 min',
    tags: ['Components', 'Props', 'State'],
    date: '2024-01-10',
    difficulty: 'Intermediate',
    frameworks: [allFrameworks[0]], // Only React
    defaultFramework: 'react',
  },
  {
    id: 'hooks-testing',
    title: 'Testing Custom React Hooks',
    description: 'Master the art of testing custom hooks with practical examples and best practices.',
    component: ReactHooksTesting,
    readTime: '6 min',
    tags: ['Hooks', 'Custom Hooks', 'Advanced'],
    date: '2024-01-05',
    difficulty: 'Advanced',
    frameworks: allFrameworks, // All frameworks (to demonstrate multi-framework support)
    defaultFramework: 'react',
  },*/
];

const difficultyColors = {
    Beginner: 'from-green-500 to-emerald-500',
    Intermediate: 'from-yellow-500 to-orange-500',
    Advanced: 'from-red-500 to-pink-500',
};

interface ArticleTabsProps {
    frameworks: Framework[];
    activeFramework: string;
    onFrameworkChange: (framework: string) => void;
}

function ArticleTabs({ frameworks, activeFramework, onFrameworkChange }: ArticleTabsProps) {
    if (frameworks.length <= 1) {
        return null; // Don't show tabs if there's only one framework
    }

    return (
        <div className="flex">
            {frameworks.map((framework, index) => {
                const isActive = activeFramework === framework.id;
                const isFirst = index === 0;
                const isLast = index === frameworks.length - 1;

                return (
                    <button
                        key={framework.id}
                        onClick={() => framework.available && onFrameworkChange(framework.id)}
                        disabled={!framework.available}
                        className={`relative px-6 py-3 text-sm font-semibold transition-all duration-300 ${isFirst ? 'rounded-tl-2xl' : ''} ${isLast ? 'rounded-tr-2xl' : ''} ${
                            isActive
                                ? `bg-gradient-to-r ${framework.color} border-b-2 border-transparent text-white shadow-lg`
                                : framework.available
                                  ? 'border-b-2 border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                  : 'cursor-not-allowed border-b-2 border-gray-700 bg-gray-800 text-gray-500'
                        } `}
                    >
                        {framework.name}
                        {!framework.available && (
                            <span className="ml-2 rounded-full bg-gray-700 px-2 py-1 text-xs text-gray-400">Soon</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export function BlogContent() {
    const [activeFrameworks, setActiveFrameworks] = useState<Record<string, string>>(
        blogPosts.reduce(
            (acc, post) => {
                acc[post.id] = post.defaultFramework;
                return acc;
            },
            {} as Record<string, string>,
        ),
    );

    const handleFrameworkChange = (postId: string, framework: string) => {
        setActiveFrameworks((prev) => ({
            ...prev,
            [postId]: framework,
        }));
    };

    return (
        <div className="space-y-8">
            {blogPosts.map((post, index) => {
                const Component = post.component;
                // const activeFramework = activeFrameworks[post.id];

                return (
                    <article
                        key={post.id}
                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                    >
                        {/* Tabs integrated with card border */}
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <ArticleTabs
                                frameworks={post.frameworks}
                                activeFramework="React"
                                onFrameworkChange={(framework) => handleFrameworkChange(post.id, framework)}
                            />
                        </div>

                        <div className="border-b border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-6 flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="mb-4 flex items-center space-x-3">
                                        <span
                                            className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold ${difficultyColors[post.difficulty]} text-white`}
                                        >
                                            {post.difficulty}
                                        </span>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Clock className="h-4 w-4" />
                                            <span>{post.readTime} read</span>
                                        </div>
                                    </div>

                                    <h2 className="mb-3 text-3xl font-bold text-gray-900 transition-colors duration-200 hover:text-blue-400 dark:text-white">
                                        {post.title}
                                    </h2>
                                    <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center space-x-2">
                                            <User className="h-4 w-4" />
                                            <span>TestJS Team</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-6xl font-bold text-gray-300 opacity-50 dark:text-gray-700">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Tag className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-gray-300 bg-gray-200 px-3 py-1.5 text-xs text-gray-700 transition-colors duration-200 hover:bg-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg prose-invert max-w-none p-8">
                            <Component />
                        </div>
                    </article>
                );
            })}

            {/* Coming Soon Section */}
            <div className="py-20 text-center">
                <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-12 dark:border-gray-700 dark:bg-gray-800">
                    <div className="mx-auto mb-6 w-fit rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 p-4">
                        <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">More Content Coming Soon!</h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                        We're working on comprehensive testing guides for Vue, Angular, and more advanced React
                        patterns. Check back soon for new articles and examples.
                    </p>
                    <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                        Want to be notified? Follow us for updates!
                    </div>
                </div>
            </div>
        </div>
    );
}
