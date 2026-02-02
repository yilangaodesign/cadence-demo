'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Grid,
  Column,
  Button,
  Heading,
  Tag,
  Link,
  Stack,
  Tile,
  ClickableTile,
  Accordion,
  AccordionItem,
} from '@carbon/react';
import {
  ArrowRight,
  Checkmark,
  Time,
  Security,
  Analytics,
  UserMultiple,
  DocumentMultiple_02,
  ChartLineData,
  Partnership,
  Email,
  Phone,
  Location,
  ArrowUpRight,
} from '@carbon/icons-react';
import styles from './taxai.module.scss';

// Navigation sections for scroll spy
const navSections = ['services', 'how-it-works', 'about', 'faq'];

export default function TaxAILandingPage() {
  const [activeSection, setActiveSection] = useState<string>('');

  // Scroll spy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for nav height + buffer

      for (const sectionId of navSections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      
      // If above all sections, clear active state
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll with Carbon's productive easing
  // Duration: 500ms - elegant and purposeful for UHNW brand
  // Easing: easeOutQuart - smooth deceleration
  const smoothScrollTo = useCallback((targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const navHeight = 80; // Account for fixed nav
    const distance = targetPosition - startPosition - navHeight;
    const duration = 500; // Slightly longer for elegant feel
    let startTime: number | null = null;

    // Carbon productive easing: cubic-bezier(0.2, 0, 0.38, 0.9)
    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <div className={styles.landingPage}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>◆</span>
              <span className={styles.logoText}>TaxAI</span>
            </div>
            <div className={styles.navLinks}>
              <Link 
                href="#services" 
                className={`${styles.navLink} ${activeSection === 'services' ? styles.navLinkActive : ''}`}
                onClick={(e) => handleNavClick(e, 'services')}
              >
                Services
              </Link>
              <Link 
                href="#how-it-works" 
                className={`${styles.navLink} ${activeSection === 'how-it-works' ? styles.navLinkActive : ''}`}
                onClick={(e) => handleNavClick(e, 'how-it-works')}
              >
                How It Works
              </Link>
              <Link 
                href="#about" 
                className={`${styles.navLink} ${activeSection === 'about' ? styles.navLinkActive : ''}`}
                onClick={(e) => handleNavClick(e, 'about')}
              >
                About
              </Link>
              <Link 
                href="#faq" 
                className={`${styles.navLink} ${activeSection === 'faq' ? styles.navLinkActive : ''}`}
                onClick={(e) => handleNavClick(e, 'faq')}
              >
                FAQ
              </Link>
            </div>
            <div className={styles.navActions}>
              <Button kind="ghost" size="md">Sign In</Button>
              <Button size="md">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <Grid narrow>
            <Column lg={10} md={8} sm={4}>
              <Stack gap={6}>
                <div className={styles.heroBadge}>
                  <Tag type="blue" size="md">
                    AI-Powered Tax Intelligence
                  </Tag>
                </div>
                <h1 className={styles.heroTitle}>
                  Tax strategy for those who&apos;ve built extraordinary wealth
                </h1>
                <p className={styles.heroSubtitle}>
                  Our AI-native platform delivers comprehensive tax optimization for ultra high net worth 
                  individuals. Complete your income tax filings 10x faster with institutional-grade accuracy 
                  and personalized strategies that preserve your legacy.
                </p>
                <Stack orientation="horizontal" gap={4}>
                  <Button size="lg" renderIcon={ArrowRight}>
                    Schedule Consultation
                  </Button>
                  <Button kind="tertiary" size="lg" onClick={() => smoothScrollTo('how-it-works')}>
                    See How It Works
                  </Button>
                </Stack>
                <div className={styles.heroStats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>$50B+</span>
                    <span className={styles.statLabel}>Assets Under Advisory</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>10x</span>
                    <span className={styles.statLabel}>Faster Filing</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>99.9%</span>
                    <span className={styles.statLabel}>Accuracy Rate</span>
                  </div>
                </div>
              </Stack>
            </Column>
          </Grid>
        </div>
      </section>

      {/* Trust Banner */}
      <section className={styles.trustBanner}>
        <div className={styles.container}>
          <p className={styles.trustText}>Trusted by leading family offices and wealth managers</p>
          <div className={styles.trustLogos}>
            <span>Goldman Sachs</span>
            <span>Morgan Stanley</span>
            <span>UBS</span>
            <span>J.P. Morgan</span>
            <span>Fidelity</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={styles.services}>
        <div className={styles.container}>
          <Grid narrow>
            <Column lg={16} md={8} sm={4}>
              <div className={styles.sectionHeader}>
                <Tag type="gray" size="sm">Our Services</Tag>
                <h2 className={styles.sectionTitle}>
                  Comprehensive tax solutions for complex wealth
                </h2>
                <p className={styles.sectionSubtitle}>
                  From multi-entity structures to international holdings, our AI platform handles 
                  the complexity so you can focus on what matters.
                </p>
              </div>
            </Column>
          </Grid>
          
          <Grid narrow className={styles.servicesGrid}>
            <Column lg={4} md={4} sm={4}>
              <Tile className={styles.serviceTile}>
                <DocumentMultiple_02 size={32} className={styles.serviceIcon} />
                <h3 className={styles.serviceTitle}>Income Tax Filing</h3>
                <p className={styles.serviceDescription}>
                  AI-accelerated preparation of federal and state returns for individuals, 
                  trusts, partnerships, and private foundations.
                </p>
                <ul className={styles.serviceFeatures}>
                  <li><Checkmark size={16} /> Multi-state filings</li>
                  <li><Checkmark size={16} /> K-1 processing</li>
                  <li><Checkmark size={16} /> Estimated payments</li>
                </ul>
              </Tile>
            </Column>
            
            <Column lg={4} md={4} sm={4}>
              <Tile className={styles.serviceTile}>
                <ChartLineData size={32} className={styles.serviceIcon} />
                <h3 className={styles.serviceTitle}>Tax Optimization</h3>
                <p className={styles.serviceDescription}>
                  Proactive strategies to minimize tax liability while maintaining 
                  compliance across all jurisdictions.
                </p>
                <ul className={styles.serviceFeatures}>
                  <li><Checkmark size={16} /> Loss harvesting</li>
                  <li><Checkmark size={16} /> Charitable planning</li>
                  <li><Checkmark size={16} /> Entity structuring</li>
                </ul>
              </Tile>
            </Column>
            
            <Column lg={4} md={4} sm={4}>
              <Tile className={styles.serviceTile}>
                <Analytics size={32} className={styles.serviceIcon} />
                <h3 className={styles.serviceTitle}>Wealth Analytics</h3>
                <p className={styles.serviceDescription}>
                  Real-time dashboards and projections that give you complete visibility 
                  into your tax position year-round.
                </p>
                <ul className={styles.serviceFeatures}>
                  <li><Checkmark size={16} /> Tax projections</li>
                  <li><Checkmark size={16} /> Scenario modeling</li>
                  <li><Checkmark size={16} /> Performance tracking</li>
                </ul>
              </Tile>
            </Column>
            
            <Column lg={4} md={4} sm={4}>
              <Tile className={styles.serviceTile}>
                <Partnership size={32} className={styles.serviceIcon} />
                <h3 className={styles.serviceTitle}>Estate Planning</h3>
                <p className={styles.serviceDescription}>
                  Integrated tax strategies that work alongside your estate plan to 
                  preserve and transfer wealth efficiently.
                </p>
                <ul className={styles.serviceFeatures}>
                  <li><Checkmark size={16} /> Gift tax planning</li>
                  <li><Checkmark size={16} /> Trust taxation</li>
                  <li><Checkmark size={16} /> Succession strategy</li>
                </ul>
              </Tile>
            </Column>
          </Grid>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={styles.howItWorks}>
        <div className={styles.container}>
          <Grid narrow>
            <Column lg={16} md={8} sm={4}>
              <div className={styles.sectionHeader}>
                <Tag type="gray" size="sm">How It Works</Tag>
                <h2 className={styles.sectionTitle}>
                  From complexity to clarity in three steps
                </h2>
              </div>
            </Column>
          </Grid>
          
          <Grid narrow className={styles.stepsGrid}>
            <Column lg={5} md={4} sm={4}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>01</div>
                <h3 className={styles.stepTitle}>Connect Your Data</h3>
                <p className={styles.stepDescription}>
                  Securely link your financial accounts, documents, and existing records. 
                  Our AI ingests and organizes everything automatically.
                </p>
              </div>
            </Column>
            
            <Column lg={5} md={4} sm={4}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>02</div>
                <h3 className={styles.stepTitle}>AI Analysis</h3>
                <p className={styles.stepDescription}>
                  Our models analyze your complete financial picture, identifying 
                  optimization opportunities and preparing your returns with precision.
                </p>
              </div>
            </Column>
            
            <Column lg={5} md={4} sm={4}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>03</div>
                <h3 className={styles.stepTitle}>Expert Review & File</h3>
                <p className={styles.stepDescription}>
                  Your dedicated tax advisor reviews everything, answers your questions, 
                  and files on your behalf. You&apos;re always in control.
                </p>
              </div>
            </Column>
          </Grid>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className={styles.features}>
        <div className={styles.container}>
          <Grid narrow>
            <Column lg={8} md={4} sm={4}>
              <div className={styles.featureContent}>
                <Tag type="blue" size="sm">Why TaxAI</Tag>
                <h2 className={styles.featureTitle}>
                  Built for the complexity of significant wealth
                </h2>
                <p className={styles.featureSubtitle}>
                  Traditional tax software wasn&apos;t designed for portfolios with hundreds of 
                  positions, multiple entities, and international exposure. TaxAI was.
                </p>
                
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <Time size={24} />
                    </div>
                    <div>
                      <h4>10x Faster Processing</h4>
                      <p>What takes traditional firms weeks, we complete in days. AI automation handles 
                         the heavy lifting while maintaining institutional accuracy.</p>
                    </div>
                  </div>
                  
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <Security size={24} />
                    </div>
                    <div>
                      <h4>Bank-Grade Security</h4>
                      <p>SOC 2 Type II certified with end-to-end encryption. Your data is protected 
                         with the same standards used by major financial institutions.</p>
                    </div>
                  </div>
                  
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <UserMultiple size={24} />
                    </div>
                    <div>
                      <h4>Dedicated Advisory Team</h4>
                      <p>AI handles the computation, but you always have access to experienced CPAs 
                         and tax attorneys who understand UHNW needs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Column>
            
            <Column lg={8} md={4} sm={4}>
              <div className={styles.featureVisual}>
                <Tile className={styles.dashboardPreview}>
                  <div className={styles.previewHeader}>
                    <span className={styles.previewDot}></span>
                    <span className={styles.previewDot}></span>
                    <span className={styles.previewDot}></span>
                  </div>
                  <div className={styles.previewContent}>
                    <div className={styles.previewMetric}>
                      <span className={styles.previewLabel}>Estimated Tax Liability</span>
                      <span className={styles.previewValue}>$4,234,567</span>
                      <span className={styles.previewChange}>↓ $892,340 optimized</span>
                    </div>
                    <div className={styles.previewChart}>
                      <div className={styles.chartBar} style={{ height: '60%' }}></div>
                      <div className={styles.chartBar} style={{ height: '80%' }}></div>
                      <div className={styles.chartBar} style={{ height: '45%' }}></div>
                      <div className={styles.chartBar} style={{ height: '90%' }}></div>
                      <div className={styles.chartBar} style={{ height: '70%' }}></div>
                      <div className={styles.chartBar} style={{ height: '55%' }}></div>
                    </div>
                  </div>
                </Tile>
              </div>
            </Column>
          </Grid>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className={styles.testimonial}>
        <div className={styles.container}>
          <Grid narrow>
            <Column lg={12} md={8} sm={4}>
              <div className={styles.testimonialContent}>
                <blockquote className={styles.quote}>
                  &ldquo;TaxAI transformed how we handle our family office taxes. What used to take 
                  three months now takes three weeks, and the optimization strategies have saved 
                  us millions. The combination of AI efficiency and expert oversight is exactly 
                  what complex wealth requires.&rdquo;
                </blockquote>
                <div className={styles.quoteAuthor}>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>Michael Chen</span>
                    <span className={styles.authorRole}>Principal, Chen Family Office</span>
                  </div>
                </div>
              </div>
            </Column>
          </Grid>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={styles.faq}>
        <div className={styles.container}>
          <Grid narrow>
            <Column lg={8} md={8} sm={4}>
              <div className={styles.sectionHeader}>
                <Tag type="gray" size="sm">FAQ</Tag>
                <h2 className={styles.sectionTitle}>
                  Common questions
                </h2>
              </div>
              
              <Accordion>
                <AccordionItem title="What is the minimum asset threshold to work with TaxAI?">
                  <p>
                    We work with clients who have a minimum of $10 million in investable assets. 
                    Our platform is specifically designed for the complexity that comes with 
                    significant wealth, including multiple entities, alternative investments, 
                    and multi-jurisdictional tax obligations.
                  </p>
                </AccordionItem>
                <AccordionItem title="How does AI improve the tax preparation process?">
                  <p>
                    Our AI models are trained on millions of tax scenarios and can process complex 
                    financial data in minutes rather than days. This includes automatic K-1 extraction, 
                    cost basis reconciliation, and optimization modeling. Human experts review all 
                    AI-generated work before filing.
                  </p>
                </AccordionItem>
                <AccordionItem title="Is my financial data secure?">
                  <p>
                    Absolutely. We maintain SOC 2 Type II certification, use 256-bit AES encryption 
                    for all data at rest and in transit, and follow the same security protocols as 
                    major financial institutions. We never sell or share your data.
                  </p>
                </AccordionItem>
                <AccordionItem title="Can you handle international tax obligations?">
                  <p>
                    Yes. Our platform supports FBAR filing, FATCA compliance, foreign tax credits, 
                    and treaty-based positions. We have expertise in cross-border tax planning for 
                    clients with global assets and residency considerations.
                  </p>
                </AccordionItem>
                <AccordionItem title="What if I have questions during the process?">
                  <p>
                    Every client is assigned a dedicated tax advisor who serves as your primary point 
                    of contact. You can schedule calls, send secure messages, and get answers whenever 
                    you need them. We&apos;re here to provide white-glove service.
                  </p>
                </AccordionItem>
              </Accordion>
            </Column>
          </Grid>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <Grid narrow>
            <Column lg={12} md={8} sm={4}>
              <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>
                  Ready to transform your tax experience?
                </h2>
                <p className={styles.ctaSubtitle}>
                  Schedule a confidential consultation to see how TaxAI can optimize your 
                  tax strategy and simplify your financial life.
                </p>
                <Stack orientation="horizontal" gap={4} className={styles.ctaButtons}>
                  <Button size="lg" kind="secondary" renderIcon={ArrowRight}>
                    Schedule Consultation
                  </Button>
                  <Button size="lg" kind="ghost">
                    Contact Us
                  </Button>
                </Stack>
              </div>
            </Column>
          </Grid>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <Grid narrow>
            <Column lg={4} md={4} sm={4}>
              <div className={styles.footerBrand}>
                <div className={styles.logo}>
                  <span className={styles.logoIcon}>◆</span>
                  <span className={styles.logoText}>TaxAI</span>
                </div>
                <p className={styles.footerTagline}>
                  AI-native tax intelligence for ultra high net worth individuals.
                </p>
              </div>
            </Column>
            
            <Column lg={3} md={2} sm={4}>
              <div className={styles.footerLinks}>
                <h4>Services</h4>
                <Link href="#">Income Tax Filing</Link>
                <Link href="#">Tax Optimization</Link>
                <Link href="#">Wealth Analytics</Link>
                <Link href="#">Estate Planning</Link>
              </div>
            </Column>
            
            <Column lg={3} md={2} sm={4}>
              <div className={styles.footerLinks}>
                <h4>Company</h4>
                <Link href="#">About Us</Link>
                <Link href="#">Careers</Link>
                <Link href="#">Press</Link>
                <Link href="#">Security</Link>
              </div>
            </Column>
            
            <Column lg={3} md={2} sm={4}>
              <div className={styles.footerLinks}>
                <h4>Resources</h4>
                <Link href="#">Blog</Link>
                <Link href="#">Tax Guides</Link>
                <Link href="#">Webinars</Link>
                <Link href="#">FAQ</Link>
              </div>
            </Column>
            
            <Column lg={3} md={2} sm={4}>
              <div className={styles.footerLinks}>
                <h4>Contact</h4>
                <Link href="mailto:hello@taxai.com">
                  <Email size={16} /> hello@taxai.com
                </Link>
                <Link href="tel:+18005551234">
                  <Phone size={16} /> 1-800-555-1234
                </Link>
                <p className={styles.footerAddress}>
                  <Location size={16} /> 
                  535 Mission St, San Francisco, CA 94105
                </p>
              </div>
            </Column>
          </Grid>
          
          <div className={styles.footerBottom}>
            <p>&copy; 2026 TaxAI. All rights reserved.</p>
            <div className={styles.footerLegal}>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
