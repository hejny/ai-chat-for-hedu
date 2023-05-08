import { Oswald } from '@next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Vector } from 'xyzt';
import { DebugGrid } from '../components/DebugGrid/DebugGrid';
import { AppHead } from '../sections/AppHead/AppHead';
import { FooterSection } from '../sections/Footer/Footer';
import { RecordsSection } from '../sections/Records/Records';
import styles from '../styles/common.module.css';
import { classNames } from '../utils/classNames';

const oswaltFont = Oswald({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

export default function IndexPage({ lang }: any) {
    return (
        <>
            <AppHead />

            <div className={classNames(styles.page, oswaltFont.className)}>
                <DebugGrid size={new Vector(3, 5)} />

                <main>
                    <RecordsSection />
                </main>

                <footer>
                    <FooterSection />
                </footer>
            </div>
        </>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

/**
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: [🪒] Can be fonts shared between all pages?
 * TODO: Some linting rule not to use:
 *       NOT> import { useTranslation } from 'react-i18next';
 *       BUT
 *       YES> import { useTranslation } from 'next-i18next';
 */
