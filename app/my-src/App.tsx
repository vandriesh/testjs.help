import { FlaskConical } from 'lucide-react';
import React from 'react';
import { Link, Outlet, useLoaderData, useMatches } from 'react-router';
import { EpicProgress } from '#app/components/progress-bar.tsx';
import { SearchBar } from '#app/components/search-bar.tsx';
import { useToast } from '#app/components/toaster.tsx';
import { Button } from '#app/components/ui/button.tsx';
import { EpicToaster } from '#app/components/ui/sonner.tsx';
import { UserDropdown } from '#app/components/user-dropdown.tsx';
import { type loader } from '#app/root.tsx';
import { ThemeSwitch, useTheme } from '#app/routes/resources+/theme-switch.tsx';
import { useOptionalUser } from '#app/utils/user.ts';
import { Header } from '#src/components/Header.tsx';

function App() {
    const data = useLoaderData<typeof loader>();
    const user = useOptionalUser();
    const theme = useTheme();
    const matches = useMatches();
    // const isOnSearchPage = matches.find((m) => m.id === 'routes/users+/index');
    // const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />;
    useToast(data.toast);

    return (
        <div
            className="min-h-screen bg-white transition-colors duration-300 dark:bg-gray-900"
            /* style={{
                backgroundColor: 'var(--bg-color, #ffffff)',
            }}*/
        >
            <div className="flex min-h-screen flex-col justify-between">
                <Header>
                    <div className="ml-auto hidden max-w-sm flex-1 sm:block"></div>
                    <ThemeSwitch userPreference={data.requestInfo.userPrefs.theme} />
                    <div className="flex items-center gap-10">
                        {user ? (
                            <UserDropdown />
                        ) : (
                            <Button asChild variant="default" size="lg">
                                <Link to="/login">Log In</Link>
                            </Button>
                        )}
                    </div>
                    <div className="block w-full sm:hidden"></div>
                </Header>

                <div className="flex flex-1 flex-col">
                    <Outlet />
                </div>

                <div className="container flex justify-between pb-5">
                    <Logo />
                </div>
            </div>
            <EpicToaster closeButton position="top-center" theme={theme} />
            <EpicProgress />
        </div>
    );
}

function Logo() {
    return (
        <Link to="/" className="group grid leading-snug">
            <span className="font-light transition group-hover:-translate-x-1">TestJS</span>
            <span className="font-bold transition group-hover:translate-x-1">.help</span>
        </Link>
    );
}

export default App;
