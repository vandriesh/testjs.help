import mdx from '@mdx-js/rollup';
import { reactRouter } from '@react-router/dev/vite';
import { type SentryReactRouterBuildOptions, sentryReactRouter } from '@sentry/react-router';
import tailwindcss from '@tailwindcss/vite';
import { reactRouterDevTools } from 'react-router-devtools';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { defineConfig } from 'vite';
import { envOnlyMacros } from 'vite-env-only';
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet';

// Custom rehype plugin to add copy buttons to code blocks
function rehypeCopyButton() {
    return (tree: any) => {
        const visit = (node: any) => {
            if (node.type === 'element' && node.tagName === 'pre') {
                // Find the code element inside pre
                const codeElement = node.children?.find(
                    (child: any) => child.type === 'element' && child.tagName === 'code',
                );

                if (codeElement) {
                    // Extract the code text
                    const codeText = extractTextFromNode(codeElement);

                    // Add copy button as a sibling to the pre element
                    const copyButton = {
                        type: 'element',
                        tagName: 'button',
                        properties: {
                            className: ['copy-code-button'],
                            'data-code': codeText,
                            title: 'Copy code',
                        },
                        children: [
                            {
                                type: 'element',
                                tagName: 'svg',
                                properties: {
                                    className: ['copy-icon'],
                                    width: '16',
                                    height: '16',
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    strokeWidth: '2',
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                },
                                children: [
                                    {
                                        type: 'element',
                                        tagName: 'rect',
                                        properties: {
                                            width: '14',
                                            height: '14',
                                            x: '8',
                                            y: '8',
                                            rx: '2',
                                            ry: '2',
                                        },
                                    },
                                    {
                                        type: 'element',
                                        tagName: 'path',
                                        properties: {
                                            d: 'm4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2',
                                        },
                                    },
                                ],
                            },
                            {
                                type: 'element',
                                tagName: 'svg',
                                properties: {
                                    className: ['check-icon', 'hidden'],
                                    width: '16',
                                    height: '16',
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    strokeWidth: '2',
                                    strokeLinecap: 'round',
                                    strokeLinejoin: 'round',
                                },
                                children: [
                                    {
                                        type: 'element',
                                        tagName: 'polyline',
                                        properties: {
                                            points: '20,6 9,17 4,12',
                                        },
                                    },
                                ],
                            },
                        ],
                    };

                    // Wrap pre and button in a container with group class
                    const container = {
                        type: 'element',
                        tagName: 'div',
                        properties: {
                            className: ['code-block-container', 'group'],
                        },
                        children: [node, copyButton],
                    };

                    // Replace the original node with the container
                    return container;
                }
            }

            if (node.children) {
                node.children = node.children.map(visit);
            }

            return node;
        };

        visit(tree);
    };
}

function extractTextFromNode(node: any): string {
    if (node.type === 'text') {
        return node.value;
    }
    if (node.children) {
        return node.children.map(extractTextFromNode).join('');
    }
    return '';
}

const MODE = process.env.NODE_ENV;

export default defineConfig((config) => ({
    build: {
        target: 'es2022',
        cssMinify: MODE === 'production',

        rollupOptions: {
            external: [/node:.*/, 'fsevents'],
        },

        assetsInlineLimit: (source: string) => {
            if (source.endsWith('favicon.svg') || source.endsWith('apple-touch-icon.png')) {
                return false;
            }
        },

        sourcemap: true,
    },
    server: {
        watch: {
            ignored: ['**/playwright-report/**'],
        },
    },
    sentryConfig,
    plugins: [
        mdx({
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeRaw, rehypeCopyButton],
        }),
        envOnlyMacros(),
        tailwindcss(),
        reactRouterDevTools(),

        iconsSpritesheet({
            inputDir: './other/svg-icons',
            outputDir: './app/components/ui/icons',
            fileName: 'sprite.svg',
            withTypes: true,
            iconNameTransformer: (name) => name,
        }),
        // it would be really nice to have this enabled in tests, but we'll have to
        // wait until https://github.com/remix-run/remix/issues/9871 is fixed
        MODE === 'test' ? null : reactRouter(),
        MODE === 'production' && process.env.SENTRY_AUTH_TOKEN ? sentryReactRouter(sentryConfig, config) : null,
    ],
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
    test: {
        include: ['./app/**/*.test.{ts,tsx}'],
        setupFiles: ['./tests/setup/setup-test-env.ts'],
        globalSetup: ['./tests/setup/global-setup.ts'],
        restoreMocks: true,
        watch: false,
        coverage: {
            include: ['app/**/*.{ts,tsx}'],
            all: true,
        },
    },
}));

const sentryConfig: SentryReactRouterBuildOptions = {
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,

    unstable_sentryVitePluginOptions: {
        release: {
            name: process.env.COMMIT_SHA,
            setCommits: {
                auto: true,
            },
        },
        sourcemaps: {
            filesToDeleteAfterUpload: ['./build/**/*.map', '.server-build/**/*.map'],
        },
    },
};
