import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabase'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  console.log('MyApp called')

  const { push, pathname } = useRouter()

  const validateSession = async () => {
    console.log('validateSession called')

    const user = supabase.auth.user()
    console.log(user)

    if (user && pathname === '/') {
      push('/notes')
    } else if (!user && pathname !== '/') {
      await push('/')
    }
  }

  supabase.auth.onAuthStateChange((event, _) => {
    console.log('onAuthStateChange')
    console.log(event)
    console.log(pathname)

    if (event === 'SIGNED_IN' && pathname === '/') {
      push('/notes')
    }
    if (event === 'SIGNED_OUT') {
      push('/')
    }
  })

  useEffect(() => {
    console.log('_appの useEffect called')
    validateSession()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
