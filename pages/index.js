import Caraousel from '@/components/caraousel'
import Head from 'next/head'
import Intro from '@/components/intro'

export default function Home() {

  return (
    <>
      <Head>
        <title>Aum Yoga</title>
        <meta name="description" content="Find yoga classes and mindful practices with Aum Yoga." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Caraousel />
      <Intro />

    </>
  )
}
