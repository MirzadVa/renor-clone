import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/global.css"
import Head from "next/head"
import { AppWrapper } from "../components/appcontext"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <Head>
          <title>PROGRAMMA VAN EISEN</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link href='https://fonts.googleapis.com/css?family=Mulish|PT+Sans|Jaldi' rel='stylesheet' />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'></link>
        </Head>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

// style={{
//   display: "flex",
//   minHeight: "100vh",
//   justifyContent: "space-between",
//   flexDirection: "column",
// }}
export default MyApp
