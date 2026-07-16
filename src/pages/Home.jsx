import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import Problem from '../sections/Problem'
import Programs from '../sections/Programs'
import Impact from '../sections/Impact'
import ArticlesTeaser from '../sections/ArticlesTeaser'
import Help from '../sections/Help'
import { useSmoothScroll } from '../context/SmoothScroll'

export default function Home() {
  const location = useLocation()
  const { scrollTo } = useSmoothScroll()

  // Arriving from another page via a section link (nav or footer): scroll to
  // the requested section once the page has painted.
  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return
    window.history.replaceState({}, '')
    requestAnimationFrame(() => scrollTo(target))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Hero />
      <Problem />
      <Programs />
      <Impact />
      <ArticlesTeaser />
      <Help />
    </>
  )
}
