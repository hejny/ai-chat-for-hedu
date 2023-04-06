import { useEffect } from 'react';
import { Converter } from 'showdown';
import showdownHighlight from 'showdown-highlight';
import spaceTrim from 'spacetrim';
import { speak } from '../../sections/60-Journal/utils/speak';
import { emojifyHtml } from '../../utils/content/emojifyHtml';
import { linkMarkdown } from '../../utils/content/linkMarkdown';
import { normalizeDashes } from '../../utils/content/normalizeDashes';
import { removeMarkdownFormatting } from '../../utils/content/removeMarkdownFormatting';
import { Html } from '../Html/Html';
import styles from './Article.module.css';

interface IArticleProps {
    /**
     * Source markdown
     */
    content: string;

    /**
     * Make for each heading in markdown unique id and scroll to hash
     */
    isSpoken?: boolean;

    /**
     * Is enhanced by adding links, normalize dashes and emojify
     */
    isEnhanced?: boolean;
}

export function Article(props: IArticleProps) {
    const { content, isSpoken, isEnhanced } = props;

    let markdown = spaceTrim(content || '');

    if (isEnhanced) {
        markdown = linkMarkdown(markdown);
        markdown = normalizeDashes(markdown);
    }

    converter.setFlavor('github');
    let html = converter.makeHtml(markdown);

    useEffect(() => {
        if (!isSpoken) {
            return;
        }

        /* not await BUT maybe should be */ speak(removeMarkdownFormatting(markdown), 'cs');
        return () => {};
    }, [markdown, isSpoken]);

    if (html === '') {
        // Note: Do not make empty div for empty article
        return <></>;
    }

    if (isEnhanced) {
        html = emojifyHtml(html);
    }

    // TODO: [0] If not using hash, remove IDs from html

    // [0] const currentSubsection = hash.substring(1);

    return (
        <>
            <Html
                className={styles.Article}
                {...{ html }}

                /*
                [0]
                ref={(element) => {
                    if (!element) {
                        return;
                    }

                    if (currentSubsection) {
                        const section = element.querySelector(`#${currentSubsection}`);

                        if (section) {
                            section.scrollIntoView(true);
                        }
                    }
                }}
                */
            />
            {/*
            TODO: <style> can not be in <div> because of AMP

            <style>
                 [0] !currentSubsection
                    ? ``
                    : `
                        #${currentSubsection}{
                          color: #1b73f7;
                        }

                        /*
                        TODO: Also all items to the next heading
                        #${currentSubsection} + * {
                          color: red;
                        }
                        * /

                `
            </style>
            */}
        </>
    );
}

const converter = new Converter({
    extensions: [
        showdownHighlight({
            // Whether to add the classes to the <pre> tag, default is false
            pre: true,
            // Whether to use hljs' auto language detection, default is true
            auto_detection: true,
        }),
    ],
});

/**
 * TODO:[0] Use has if isHashUsed is true
 * TODO: Maybe rename to <Content/> or <MarkdownContent/> or <Markdown/>
 */
