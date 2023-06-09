import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import styles from './Footer.module.css';

export function FooterSection() {
    const { t } = useTranslation();

    return (
        <div className={styles.FooterSection}>
            <ul>
                <li>© {new Date().getFullYear()}</li>

                {/*
                <li>
                    <Link href="https://pavolhejny.com">Pavol Hejný</Link>
                </li>
                */}

                <li>
                    <Link href="/">{t('Footer.home')}</Link>
                </li>

                {/*
                <li>
                    <Link href="https://blog.pavolhejny.com">Blog</Link>
                </li>
                */}

                <li>
                    <Link href="/contact">{t('Footer.contact')}</Link>
                </li>

                <li>
                    <Link href="/about">{t('Footer.technical-details')}</Link>
                </li>

                <li>
                    <a href="https://h-edu.org/">H-edu</a>
                </li>

                <li>
                    <a href="https://collboard.com/">Collboard</a>
                </li>

                {/*
                <li>
                    <a href="https://github.com/hejny/ai-chat-for-hedu/">v{VERSION}</a>
                </li>
                */}
            </ul>
        </div>
    );
}

/**
 * TODO: !! All Pavolhejny signature
 * TODO: !! Add all legal stuff
 *       @see https://www.inizio.cz/blog/povinne-udaje-webu/
 *       @see https://techheaven.org/org
 *       Also in Collboard AND other projects
 *       Ask if sídlo firmy is nessesary?
 * TODO: !! Google analytics
 * TODO: !! Smartlook
 * TODO: !! Cookies bar
 * TODO: Use meaningfully OR remove </DisplayOn> OR 👀 remake to classes .desktop .mobile .tablet ...

 * TODO: Link to MidJourney + * generated with MidJourney
 * TODO: Link to GitHub
 */
