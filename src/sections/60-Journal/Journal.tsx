import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Article } from '../../components/Article/Article';
import { Chat, ChatMessage } from '../../components/Chat/Chat';
import { Section } from '../../components/Section/Section';
import styles from './Journal.module.css';
import { speak } from './utils/speech';

export function JournalSection() {
    const { t } = useTranslation();

    // TODO: Make custom hook - event sourced
    const [messages, setMessages] = useState<Array<ChatMessage>>([
        {
            date: new Date(),
            from: 'JOURNAL',
            content: `Jaký máš cíl dnešní hodiny matematiky?`,
        },
    ]);

    return (
        <Section id="Journal" className={styles.JournalSection}>
            <h2>
                <Article content={t('title')} />
            </h2>

            <Chat
                messages={messages}
                onMessage={async (messageContent) => {
                    const myMessage: ChatMessage = {
                        date: new Date(),
                        from: 'TEACHER',
                        content: messageContent,
                    };

                    const replyMessage: ChatMessage = {
                        date: new Date(),
                        from: 'JOURNAL',
                        content: `Odpovídám na ${messageContent}`,
                    };

                    setMessages([...messages, myMessage, replyMessage]);
                    /* not await BUT maybe should be */ speak(
                        replyMessage.content,
                        'cs',
                    ) /* <- TODO: !!! Do speech here or inside <Chat/> component */;
                }}
            />
            {/*<RecordForm/>*/}
        </Section>
    );
}

/**
 * TODO: !!! Pick a voice
 * TODO: !!! Voice is working with markdown
 * TODO: !!! Highlite during a speech
 * TODO: !!! Allow to listen
 * TODO: !!! Imitate conversation
 * TODO: !!! Use momentjs for dates
 * TODO: !!! (How) Should be initial message spokem?
 */
/*

TODO:



Omezujeme se v prototypu na hodiny matematiky a jednu třídu
V databázi máme relace 
třída: učitel - žáci
ník: záznam (učitel, žák (volitelně), txt) 

—
před hodinou:
AI (ideálně voiceover): Jaký máš cíl dnešní hodiny matematiky?
Průvodce: přepsaná odpověď zaznamenána do deníku (databáze) s časovým razítkem v původní podobě + AI přeformulovaná odpověď ve smyslu odpovědi na otázku “Co bylo cílem dnešní hodiny matematiky učitele?” + typ “cíle hodiny”
AI: Jaké úlohy plánuješ dnes zadat žákům z učebnice?
P: záznam typu “primární učební materiál”
AI: Co s nimi plánuješ dělat dál mimo učebnici?
P: záznam typu “sekundární učební materiál”
AI: Zkus se dnes soustředit více na žáka X
—
po hodině:
AI: Dneska jsi měl za cíl/e xy. Jak s Ti ho podařilo naplnit? (v případě, že se nepodaří cíl jasně zanalizovat, může být jen obecná otázka jak se podařilo dnešní cíle naplnit)
AI: Stihl jsi vsechno co sis naplánoval?
(if ne): proč jsi to nestihl?
(if rozpoznám že stihl): AI: Super (a na obrazovce se objeví palec nahoru)
(else): Dobře.
AI: Zařadil jsi něco navíc?
(když neřekne protože) AI: Proč?
AI: co Tě na hodině překvapilo?
P: (pokud zmíní žáka, přiřadí v db záznam i k žákovi)
AI: Jak si vedl žák X?
P: záznam si k sobě dá i žáka
AI: Chceš si ještě něco k této hodině zaznamenat?

Rozhraní:
Seznam dnů kdy je nějaký záznam v deníku s proklikem na strukturovaný zápis deníku z daného dne
Seznam žáků s prokliky: chronologický zápis, “slovní hodnocení” - v čem je dobrý, na čem by potřeboval zapracovat, ideálně kdyby to dokázalo zanalyzovat zápisy učitele a zjistit, o s žák učil 




*/
