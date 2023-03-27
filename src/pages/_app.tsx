import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { DEBUG } from '../../config';
import '../styles/config.css';
import '../styles/globals.css';
import '../styles/reset.css';

export const DebugContext = createContext<typeof DEBUG>(DEBUG);

function App({ Component, pageProps }: AppProps) {
    return (
        <DebugContext.Provider value={DEBUG}>
            <Component {...pageProps} />
        </DebugContext.Provider>
    );
}

export default appWithTranslation(App);
