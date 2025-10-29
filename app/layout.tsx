import Script from 'next/script'

export const metadata = {
  title: 'Jeremy Edwards — CV',
  description: 'Information technology professional with 15 years of experience delivering digital products and programs for large organisations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        {children}
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
