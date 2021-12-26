import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ErrorLogTable_DataTable from './components/error_log_table--data_table'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Devbite Trial Work</title>
        <meta name="description" content="Devbite Trial Work -  Matias Espina" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <ErrorLogTable_DataTable />
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
