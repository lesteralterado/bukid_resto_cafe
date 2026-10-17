import { MessageCircle, Phone } from 'lucide-react';
import { business, telUrl } from '../data/business';
import { track } from '../utils/analytics';

type ContactFallbackProps = {
  source: string;
  lead?: string;
  compact?: boolean;
};

// Direct Call / Messenger buttons. Renders nothing until a phone or Messenger link is configured.
export default function ContactFallback({ source, lead, compact = false }: ContactFallbackProps) {
  if (!telUrl && !business.messengerUrl) return null;

  const button = compact
    ? 'inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs text-[#2d2d2d] ring-1 ring-black/10'
    : 'inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-[#2d2d2d] shadow-sm ring-1 ring-black/10 transition hover:bg-[#f7f7f7]';

  return (
    <div className={compact ? 'mt-3' : 'mt-6'}>
      {lead && <p className="mb-3 text-sm text-[#4f5560]">{lead}</p>}
      <div className={`flex flex-wrap gap-2 ${compact ? '' : 'justify-center'}`}>
        {telUrl && (
          <a href={telUrl} onClick={() => track('call_click', { source })} className={button}>
            <Phone className="h-4 w-4" aria-hidden="true" /> Call us
          </a>
        )}
        {business.messengerUrl && (
          <a
            href={business.messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('messenger_click', { source })}
            className={button}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Message us
          </a>
        )}
      </div>
    </div>
  );
}
