import { useState } from 'react'
import { ImageOff } from 'lucide-react'

/**
 * Image with a graceful failure state.
 *
 * Remote photos can 404 (a stock provider pulls an asset, a URL rots). Without
 * this, the browser renders raw alt text over the layout, which looks broken on
 * a client site. On error we swap in a quiet brand-tinted panel instead.
 */
export default function SmartImage({ src, alt, className = '', wrapperClassName = '', ...props }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={[
          'flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900',
          className,
          wrapperClassName,
        ].join(' ')}
      >
        <ImageOff className="h-8 w-8 text-white/25" strokeWidth={1.5} aria-hidden="true" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      {...props}
    />
  )
}
