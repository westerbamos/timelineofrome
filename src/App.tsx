import { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { Navigation } from './components/Navigation/Navigation';
import { Timeline } from './components/Timeline/Timeline';
import type { TimelineEvent, EraType } from './types';
import eventsData from './data/events.json';
import styles from './App.module.css';

function App() {
  const [currentEra, setCurrentEra] = useState<EraType | null>(null);
  const events = eventsData.events as TimelineEvent[];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[id^="era-"]');
      let current: EraType | null = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section.id.replace('era-', '') as EraType;
        }
      });

      setCurrentEra(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <Navigation currentEra={currentEra} />

      <section className={styles.seoSection} aria-labelledby="rome-timeline-overview">
        <div className={styles.contentContainer}>
          <h2 id="rome-timeline-overview">Timeline of Rome: major events from 753 BC to 476 AD</h2>
          <p>
            This timeline of Rome is designed for students and casual learners who want a clear path through
            ancient Roman history. It tracks major events in the Roman Kingdom, Roman Republic, and Roman Empire,
            from the legendary founding of Rome to the fall of the Western Empire.
          </p>
          <p>
            Use the era navigation to move between periods, then open event cards for deeper context, people,
            and consequences. Each event includes a short summary to make revision and quick study easier.
          </p>

          <h3>How to read this Roman history timeline</h3>
          <ol className={styles.instructions}>
            <li>Start with the era overview (Kingdom, Republic, Empire) to understand the big picture.</li>
            <li>Scan year labels to place events in sequence before opening details.</li>
            <li>Open cards you want to study to read extended explanations and image notes.</li>
          </ol>
        </div>
      </section>

      <Timeline events={events} />

      <section className={styles.seoSection} aria-labelledby="timeline-faq">
        <div className={styles.contentContainer}>
          <h2 id="timeline-faq">FAQ: ancient Rome timeline</h2>

          <div className={styles.faqList}>
            <article>
              <h3>When does the timeline of Rome begin?</h3>
              <p>
                It begins in 753 BC with the traditional founding of Rome by Romulus.
              </p>
            </article>

            <article>
              <h3>What periods are included?</h3>
              <p>
                The timeline covers the Roman Kingdom, Roman Republic, and Roman Empire up to 476 AD.
              </p>
            </article>

            <article>
              <h3>Which major events in ancient Rome are highlighted?</h3>
              <p>
                Major turning points include the founding of Rome, the creation of the Republic, the rise of
                Augustus, and the fall of the Western Roman Empire.
              </p>
            </article>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            Timeline of Rome — A visual journey through 1,229 years of Roman history
          </p>
          <p className={styles.footerCredits}>
            Images sourced from Wikimedia Commons under Creative Commons and Public Domain licenses
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
