import { useEffect } from 'react'

const DEFAULT_TITLE =
  'ULTA CX Ltd — Customer Experience Solutions | Outsourced Support from Rwanda'

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title])
}

export { DEFAULT_TITLE }
