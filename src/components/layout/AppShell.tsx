import { Link } from '@tanstack/react-router'

type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border">
        <div className="mx-auto flex h-12 max-w-3xl items-center justify-between px-6">
          <Link to="/" className="text-sm font-medium tracking-tight">
            Concept Lab
          </Link>

          <nav className="flex items-center gap-6">
            <NavLink to="/topics">Topics</NavLink>
            <NavLink to="/topics/data-orchestration">Data</NavLink>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-32 border-t border-border">
        <p className="mx-auto max-w-3xl px-6 py-8 text-sm text-text-subtle">
          Interactive explainers for grant reviewers and engineers.
        </p>
      </footer>
    </div>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-sm text-text-muted transition-colors hover:text-text"
      activeProps={{ className: 'text-sm text-text' }}
    >
      {children}
    </Link>
  )
}
