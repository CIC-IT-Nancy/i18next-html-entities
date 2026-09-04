/**
 * @packageDocumentation
 * Public type definitions for `@cic-it-nancy/i18next-html-entities`.
 *
 * These types describe the options and the post-processor interface exposed by
 * the library. See the `src/` implementation for detailed TSDoc and examples.
 */
import type { DecodingMode } from 'entities';
import type { PostProcessorModule } from 'i18next';

/**
 * Options for the HTML entities post-processor.
 *
 * @property mode - Decoding strategy used by `entities.decodeHTML`. Defaults to
 * {@link entities.DecodingMode.Legacy | DecodingMode.Legacy} when omitted.
 *
 * @since 1.0.0
 * @public
 */
export interface I18NextHTMLEntitiesOptions {
    /** Decoding strategy passed to `entities.decodeHTML`. */
    mode?: DecodingMode;
}

/**
 * i18next post-processor interface implemented by this library.
 *
 * The instance registers under the name `I18NextHTMLEntities` and exposes
 * {@link I18NextHTMLEntities.setOptions | setOptions} to configure decoding.
 *
 * @since 1.0.0
 * @public
 */
export interface I18NextHTMLEntities extends PostProcessorModule {
    /**
     * Updates the decoding options. Unknown properties are ignored.
     * @param options - Partial options to merge with current configuration.
     */
    setOptions: (options: I18NextHTMLEntitiesOptions) => void;
}

/**
 * Default export: the singleton instance of the post-processor.
 *
 * Register it with i18next using `.use(htmlEntities)` and enable it via
 * `postProcess: ['I18NextHTMLEntities']` in your i18next config.
 *
 * @public
 */
declare const htmlEntities: I18NextHTMLEntities;

export default htmlEntities;
