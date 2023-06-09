/*
TODO:
export class ChatThread{
    // TODO: !!! Extract ChatMessage to separate file
    // TODO: threadId: string /*_uuid* /;

   public get messages(): Array<ChatMessage>{

   }
}
*/

import { map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import spaceTrim from 'spacetrim';

// TODO: !!! Better name
interface Prombservable<T> {
    asObservable(): Observable<T>;
    asPromise(): Promise<T>;
    asCurrentValue(): null | T;
}

/**
 * Class representing a chat message ⁘
 */
export class ChatMessage {
    // TODO: !!! Extract ChatMessage to separate file

    constructor(
        // TODO: public readonly thread: ChatThread;
        public readonly parentMessage: null | ChatMessage,
        public readonly from: 'TEACHER' | 'JOURNAL',
        private readonly contentAsObservable: Observable<string /*_markdown*/>,
    ) {
        // TODO: Separate util observableToPrombservable
        const self = this;
        this.contentLastValue = null;
        this.contentAsPromise = new Promise((resolve, reject) => {
            // TODO: Unsubscribe logic
            contentAsObservable.subscribe({
                next(value) {
                    self.contentLastValue = value;
                },
                complete() {
                    if (self.contentLastValue === null) {
                        reject(new Error(`Content must contain at least one value before complete`));
                    } else {
                        resolve(self.contentLastValue);
                    }
                },
                error(error) {
                    reject(error);
                },
            });
        });
    }

    public get content(): Prombservable<string> & { asBoolean(): Promise<boolean> } {
        const self = this;
        return {
            asObservable() {
                return self.contentAsObservable;
            },
            asPromise(): Promise<string> {
                return self.contentAsPromise;
            },
            asCurrentValue(): null | string {
                return self.contentLastValue;
            },
            async asBoolean(): Promise<boolean> {
                return Math.random() > 0.5 /* <- !!! Implement */;
            },
        };
    }

    private contentLastValue: null | string;
    private contentAsPromise: Promise<string>;

    public modifyContent(modifier: (content: string) => string): ChatMessage {
        return new ChatMessage(this.parentMessage, this.from, this.contentAsObservable.pipe(map(modifier)));
    }
}

/**
 * Interface representing utility methods for use in a Scenario ⁘
 */
export interface ScenarioUtils {
    // TODO: !!! Extract ScenarioUtils to separate file

    /**
     * @@@
     */
    say(message: ChatMessage | string): Promise<void>;

    /**
     * @@@
     */
    ask(message: ChatMessage | string): Promise<ChatMessage>;

    /**
     * @@@
     */
    askOptions<optionKey extends string>(
        question: ChatMessage | string,
        options: Record<optionKey, ChatMessage | string>,
    ): Promise<optionKey>;

    /**
     * @@@
     */
    gptAsk(...contents: Array<string>): ChatMessage;

    /**
     * @@@
     */
    gptRewrite(messageOrContent: ChatMessage | string): ChatMessage;

    /**
     * @@@
     */
    gptSummarize(messageOrContent: ChatMessage | string): ChatMessage;

    /**
     * @@@
     */
    load(
        ...keys: Array<string>
    ): Promise<
        Record<string, ChatMessage | null> /* <- TODO: Better generic typing same as requesting systems in Collboard */
    >;

    /**
     * @@@
     */
    save(messages: Record<string, ChatMessage>): Promise<void>;
}

export interface Scenario {
    (utils: ScenarioUtils): Promise<void | Scenario>;
}

export function toChatMessage(chatMessage: ChatMessage | string): ChatMessage {
    if (typeof chatMessage === 'string') {
        return stringToChatMessage(chatMessage);
    } else {
        return chatMessage;
    }
}

export function stringToChatMessage(chatMessageContent: string): ChatMessage {
    return new ChatMessage(null /* <- !!! allow to pass parent */, 'JOURNAL', of(spaceTrim(chatMessageContent)));
}

/**
 * TODO: !!! Break into files
 * TODO: [🧶]
 * TODO: Ask askOptions + askOpenOptions (as variant of askBoolean (which will be internally using askOptions))
 * TODO: Maybe integrate rewrite into ask + integrate spaceTrim
 * TODO: Maybe integrate ask and save
 * TODO: [🥽] It is but ugly-prectise to name summarize and rewrite by same name as standalone functions and also a methods of ScenarioUtils - figure out two sets of unique names
 */
