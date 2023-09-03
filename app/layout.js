import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
export const metadata = {
  title: 'Crisper',
  description: 'Discover and Share Prompts/tweets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <Provider>
          <div className="main">
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
