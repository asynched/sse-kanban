type ShowProps = {
  when: boolean
  fallback?: React.ReactNode
  children: React.ReactNode
}

export default function Show({ children, when, fallback }: ShowProps) {
  return when ? <>{children}</> : <>{fallback}</>
}
