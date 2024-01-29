// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Place any custom tags you want to include in the <head> here */}
          {/* For example, external stylesheet links, favicons, etc. */}
        </Head>
        <body>
          {/* This is where the main app will be rendered */}
          <Main />
          {/* Scripts from Next.js and your pages will be injected here */}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
