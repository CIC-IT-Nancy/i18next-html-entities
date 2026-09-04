/**
 * @packageDocumentation
 * Adds an i18next post-processor that decodes HTML entities in translated strings
 * using the {@link entities.decodeHTML | entities} library.
 *
 * This is useful when your translation resources contain HTML character references
 * such as `&amp;`, `&eacute;`, `&#233;`, or `&#xE9;` and you want them to be decoded
 * into their corresponding Unicode characters at runtime.
 *
 * @example Basic registration (ESM)
 * ```ts
 * import i18next from 'i18next';
 * import htmlEntities from '@cic-it-nancy/i18next-html-entities';
 *
 * i18next
 *   .use(htmlEntities)
 *   .init({
 *     // ... your config
 *     postProcess: ['I18NextHTMLEntities'],
 *   });
 * ```
 *
 * @example Configure decoding mode
 * ```ts
 * import { DecodingMode } from 'entities';
 * import htmlEntities from '@cic-it-nancy/i18next-html-entities';
 *
 * htmlEntities.setOptions({
 *   mode: DecodingMode.Legacy, // default; choose another if desired
 * });
 * ```
 *
 * @remarks
 * - The post-processor registers under the name `I18NextHTMLEntities`.
 * - Decoding is performed via `entities.decodeHTML`.
 * - See README for full examples and details.
 *
 * @since 1.0.0
 */
import { decodeHTML, DecodingMode } from 'entities';

import type { I18NextHTMLEntitiesOptions, I18NextHTMLEntities } from '../types';

/**
 * HTML entities decoding post-processor for i18next.
 *
 * Implements the i18next {@link I18NextHTMLEntities} interface and exposes a
 * `setOptions` method to control decoding behaviour.
 *
 * @public
 */
class HtmlEntities implements I18NextHTMLEntities {
    /**
     * i18next post-processor type discriminator.
     * @public
     */
    public readonly type: 'postProcessor';

    /**
     * The registration name of the post-processor: `I18NextHTMLEntities`.
     * Use this in i18next config via `postProcess: ['I18NextHTMLEntities']`.
     * @public
     */
    public readonly name: string;

    /**
     * Current effective options. Defaults to `{ mode: DecodingMode.Legacy }`.
     * @internal
     */
    private options: Required<I18NextHTMLEntitiesOptions>;

    /**
     * Creates a new HTML entities post-processor instance with default options.
     * @since 1.0.0
     */
    public constructor() {
        this.type = 'postProcessor';
        this.name = 'I18NextHTMLEntities';

        this.options = {
            mode: DecodingMode.Legacy,
        };
    }

    /**
     * Updates the decoding options.
     *
     * Unknown or omitted properties retain their previous values.
     *
     * @param options - Partial options to merge with the current configuration.
     * @example
     * ```ts
     * import { DecodingMode } from 'entities';
     * htmlEntities.setOptions({ mode: DecodingMode.Strict });
     * ```
     * @public
     */
    public setOptions(options: I18NextHTMLEntitiesOptions): void {
        this.options = { ...this.options, ...options };
    }

    /**
     * Decodes HTML entities in the provided value according to the configured mode.
     *
     * This method is invoked by i18next during post-processing.
     *
     * @param value - The string to decode.
     * @returns The decoded string.
     * @public
     */
    public process(value: string): string {
        return decodeHTML(value, this.options.mode);
    }
}

/**
 * The default singleton instance of the HTML entities post-processor.
 *
 * Register this instance with i18next using `.use(htmlEntities)`.
 *
 * @example
 * ```ts
 * import i18next from 'i18next';
 * import htmlEntities from '@cic-it-nancy/i18next-html-entities';
 * i18next.use(htmlEntities).init({ postProcess: ['I18NextHTMLEntities'] });
 * ```
 *
 * @public
 */
const htmlEntities = new HtmlEntities();

export default htmlEntities;
