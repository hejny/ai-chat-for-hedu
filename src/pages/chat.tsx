import { Oswald } from '@next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Vector } from 'xyzt';
import { DebugGrid } from '../components/DebugGrid/DebugGrid';
import { JournalSection } from '../sections/Journal/Journal';
import { AppHead } from '../sections/AppHead/AppHead';
import { FooterSection } from '../sections/Footer/Footer';
import styles from '../styles/common.module.css';
import { classNames } from '../utils/classNames';

const oswaltFont = Oswald({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

export default function ChatPage({ lang }: any) {
    return (
        <>
            <AppHead />

            <div className={classNames(styles.page, oswaltFont.className)}>
                <DebugGrid size={new Vector(3, 5)} />

                <main>
                    <JournalSection />
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
