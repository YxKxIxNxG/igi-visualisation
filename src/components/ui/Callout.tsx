import type { ReactNode } from 'react'

type CalloutProps = {
  title?: string
  children: ReactNode
  variant?: 'default' | 'technical'
}

export function Callout({ title, children, variant = 'default' }: CalloutProps) {
  const label = title ?? (variant === 'technical' ? 'Technical note' : undefined)

  return (
    <aside className="mt-4 border-l border-border pl-4">
      {label && (
        <p className="mb-1 text-xs text-text-subtle">{label}</p>
      )}
      <div className="text-sm text-text-muted">{children}</div>
    </aside>
  )
}
