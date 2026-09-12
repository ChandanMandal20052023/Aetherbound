import type { Metadata } from 'next';
import { Rubik, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aetherbound Life RPG — Neo-Brutalist Gamified Life System',
  description:
    'Turn daily habits and tasks into an immersive sci-fi RPG questing saga. Level up your discipline, claim legendary gear, and conquer the void.',
  icons: {
    icon: '/avatars/Rise.jpg',
    apple: '/avatars/Rise.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${plusJakartaSans.variable} dark`}
    >
      <head>
        <link rel="icon" href="/avatars/Rise.jpg" type="image/jpeg" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
