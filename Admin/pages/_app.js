// import node module libraries
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react';
import { userService } from 'service/user.service';
// import theme style scss file
import 'styles/theme.scss';

// import default layouts
import DefaultDashboardLayout from 'layouts/DefaultDashboardLayout';

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
 
    userService.SetUserStorage(localStorage.getItem('ust') ? localStorage.getItem('ust') : null)
 
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    router.events.on('routeChangeComplete', authCheck)

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

  }, []);


  function authCheck(url) {
    setUser(localStorage.getItem('ust') ? localStorage.getItem('ust') : null);
    const publicPaths = ['/authentication/sign-in'];
    const privatePaths = ['/dashboard' , '/settings' , '/MutualFunds' , '/payment-history' , '/support-ticket' , '/users'];
    const path = url.split('?')[0];
    if((localStorage.getItem('ust') === null || localStorage.getItem('ust') === undefined) && path === '/') {
      setAuthorized(false);
      router.push({
        pathname: '/authentication/sign-in'
      });
    }
    else if(localStorage.getItem('ust') && path === '/') {
      setAuthorized(true);
      router.push({
        pathname: '/dashboard'
      });
    }

    if ((localStorage.getItem('ust') === null || localStorage.getItem('ust') === undefined) && privatePaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/authentication/sign-in'
      });
    }
    else if(localStorage.getItem('ust') && publicPaths.includes(path)) {
      setAuthorized(true);
      router.push({
        pathname: '/dashboard'
      });
    } 
    else if(localStorage.getItem('ust') === null || localStorage.getItem('ust') === undefined){
      setAuthorized(false);
    }
    else {
      setAuthorized(true);
    }
  }

  const pageURL = process.env.baseURL + router.pathname;
  const title = "Fintrix";
  const description = "Fintrix"
  const keywords = "Fintrix"

  // Identify the layout, which will be applied conditionally
  const Layout = Component.Layout || (router.pathname.includes('dashboard') ? 
  (router.pathname.includes('instructor') || router.pathname.includes('student') ? 
  DefaultDashboardLayout : DefaultDashboardLayout) : DefaultDashboardLayout)
  
  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: process.env.siteName
        }}
      />
        {
          router.pathname === '/' || router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/reset' || router.pathname === '/forgot' || router.pathname === '/reset/[slug]' ?
          <Component {...pageProps} />
          :
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>}
    </SSRProvider>
  )
}

export default MyApp
