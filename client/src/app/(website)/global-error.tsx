'use client'
 
export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <h3>
          {error.digest ?? error.message ?? error.name ?? error.stack ?? error.toString()}
        </h3>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}