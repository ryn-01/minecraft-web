
import './ctaSection.css'

type CtaSectionProps = {
  mediaSrc?: string
  mediaAlt?: string
  mediaType?: 'image' | 'video'
  actionHref?: string
}

function isVideoSource(source: string) {
  return /\.(webm|mp4|ogg)(?:$|[?#])/i.test(source)
}

export default function CtaSection({
  mediaSrc = 'videos/footer/chicken.webm',
  mediaAlt = 'A Minecraft chicken ready for adventure',
  mediaType,
  actionHref = '/download',
}: CtaSectionProps) {
  const resolvedMediaType = mediaType ?? (isVideoSource(mediaSrc) ? 'video' : 'image')

  return (
    <section className="cta-section" id="cta" aria-labelledby="cta-title">
      <div className="cta-section__content">
        <div className="cta-section__copy">
          <p className="cta-section__eyebrow">Your next adventure starts here</p>
          <h2 id="cta-title">A new world is waiting for you</h2>
          <p className="cta-section__description">
            Join our Minecraft world today and begin your journey through endless exploration, creative building, and unforgettable adventures with friends.
          </p>
          <a className="cta-section__button" href={actionHref}>
            Download now
          </a>
        </div>
        <div className="cta-section__media" aria-label={resolvedMediaType === 'image' ? mediaAlt : undefined}>
          {resolvedMediaType === 'video' ? (
            <video autoPlay muted loop playsInline aria-label={mediaAlt}>
              <source src={mediaSrc} type="video/webm" />
            </video>
          ) : (
            <img src={mediaSrc} alt={mediaAlt} />
          )}
        </div>
      </div>
    </section>
  )
}
