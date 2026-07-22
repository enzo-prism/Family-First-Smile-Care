type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/**
 * Renders a JSON-LD <script> directly into the DOM.
 *
 * We intentionally do NOT route structured data through react-helmet-async: in
 * this app Helmet reliably manages <title>/<meta>, but it does not flush
 * <script type="application/ld+json"> children to the document, so any schema
 * emitted through Helmet never reaches crawlers. A direct node rendered with
 * dangerouslySetInnerHTML is deterministic and is valid anywhere in the
 * document per Google's structured-data guidelines. The node unmounts cleanly
 * on route change, so no stale schema lingers.
 *
 * Only use this on routes that are NOT already covered by the server-side
 * schema injection in server/vite.ts (which always emits LocalBusiness, plus
 * Service/FAQ for /services/invisalign and /technology/itero-digital-scanner),
 * to avoid duplicate structured data.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
