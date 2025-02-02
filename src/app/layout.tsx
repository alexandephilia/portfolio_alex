import { BlogModalProvider } from '../contexts/BlogModalContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BlogModalProvider>
            {children}
          </BlogModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 