'use client';

import {
  Grid,
  Column,
  Button,
  Heading,
  Tag,
  Link,
  Stack,
} from '@carbon/react';
import {
  User,
  Code,
  PaintBrush,
  Search,
  Portfolio,
  Email,
  LogoLinkedin,
  LogoGithub,
} from '@carbon/icons-react';
import './page.module.css';

export default function Home() {
  return (
    <div className="portfolio-page">
      {/* Navigation */}
      <nav className="portfolio-nav">
        <div className="portfolio-container">
          <Grid narrow>
            <Column lg={16} md={8} sm={4}>
              <Stack orientation="horizontal" gap={4}>
                <Heading>Portfolio</Heading>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
                  <Link href="#about">About</Link>
                  <Link href="#skills">Skills</Link>
                  <Link href="#projects">Projects</Link>
                  <Link href="#contact">Contact</Link>
                  <Link href="/tax" style={{ fontWeight: 600 }}>Tax Prototype</Link>
                  <Link href="/taxai" style={{ fontWeight: 600, color: 'var(--cds-link-primary)' }}>TaxAI Landing</Link>
                  <Link href="/concert" style={{ fontWeight: 600, color: 'var(--cds-link-primary)' }}>Concert Dashboard</Link>
                </div>
              </Stack>
            </Column>
          </Grid>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="portfolio-container">
          <Grid narrow>
            <Column lg={10} md={6} sm={4}>
              <Stack gap={6}>
                <Tag type="blue" size="md">
                  UX Designer
                </Tag>
                <Heading style={{ fontSize: '3.5rem', lineHeight: '1.1', fontWeight: 300 }}>
                  Creating meaningful digital experiences through user-centered design
                </Heading>
                <Heading style={{ fontSize: '1.25rem', fontWeight: 400, color: 'var(--cds-text-secondary)' }}>
                  I design and research user experiences that solve real problems and delight users.
                  Specializing in design systems, user research, and product design.
                </Heading>
                <Stack orientation="horizontal" gap={4}>
                  <Button size="lg" href="#projects">
                    View Work
                  </Button>
                  <Button kind="tertiary" size="lg" href="#contact">
                    Get in Touch
                  </Button>
                </Stack>
              </Stack>
            </Column>
          </Grid>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="portfolio-section">
        <div className="portfolio-container">
          <Grid narrow>
            <Column lg={16} md={8} sm={4}>
              <Stack gap={6}>
                <div className="section-title">
                  <Heading style={{ fontSize: '2.5rem', fontWeight: 300 }}>
                    About Me
                  </Heading>
                </div>
                <Grid>
                  <Column lg={8} md={4} sm={4}>
                    <Stack gap={4}>
                      <Heading style={{ fontSize: '1.5rem', fontWeight: 400 }}>
                        Passionate about design and user experience
                      </Heading>
                      <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--cds-text-secondary)' }}>
                        With over 5 years of experience in UX design, I've helped companies create
                        intuitive and engaging digital products. My approach combines user research,
                        data-driven insights, and creative problem-solving to deliver solutions that
                        users love and businesses need.
                      </p>
                      <p style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--cds-text-secondary)' }}>
                        I believe in the power of design to transform businesses and improve people's
                        lives. Whether it's designing a mobile app, a web platform, or a design system,
                        I focus on understanding user needs and creating experiences that are both
                        beautiful and functional.
                      </p>
                    </Stack>
                  </Column>
                  <Column lg={8} md={4} sm={4}>
                    <Stack gap={4}>
                      <Heading style={{ fontSize: '1.5rem', fontWeight: 400 }}>
                        What I bring to the table
                      </Heading>
                      <Stack gap={3}>
                        <div>
                          <Heading style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            User Research & Strategy
                          </Heading>
                          <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                            Conducting user interviews, usability testing, and creating user personas
                            to inform design decisions.
                          </p>
                        </div>
                        <div>
                          <Heading style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            Interface Design
                          </Heading>
                          <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                            Creating wireframes, prototypes, and high-fidelity designs using modern
                            design tools and best practices.
                          </p>
                        </div>
                        <div>
                          <Heading style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            Design Systems
                          </Heading>
                          <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                            Building scalable design systems that ensure consistency and efficiency
                            across products and teams.
                          </p>
                        </div>
                      </Stack>
                    </Stack>
                  </Column>
                </Grid>
              </Stack>
            </Column>
          </Grid>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="portfolio-section" style={{ background: 'var(--cds-layer-01)' }}>
        <div className="portfolio-container">
          <Grid narrow>
            <Column lg={16} md={8} sm={4}>
              <Stack gap={6}>
                <div className="section-title">
                  <Heading style={{ fontSize: '2.5rem', fontWeight: 300 }}>
                    Skills & Expertise
                  </Heading>
                </div>
                <Grid>
                  <Column lg={4} md={4} sm={4}>
                    <Stack gap={4} style={{ alignItems: 'center', textAlign: 'center' }}>
                      <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        borderRadius: '50%', 
                        background: 'var(--cds-background-brand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                      }}>
                        <PaintBrush size={32} />
                      </div>
                      <Heading style={{ fontSize: '1.25rem', fontWeight: 400 }}>
                        UI/UX Design
                      </Heading>
                      <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                        Figma, Sketch, Adobe XD, Prototyping, Wireframing
                      </p>
                    </Stack>
                  </Column>
                  <Column lg={4} md={4} sm={4}>
                    <Stack gap={4} style={{ alignItems: 'center', textAlign: 'center' }}>
                      <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        borderRadius: '50%', 
                        background: 'var(--cds-background-brand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                      }}>
                        <Search size={32} />
                      </div>
                      <Heading style={{ fontSize: '1.25rem', fontWeight: 400 }}>
                        User Research
                      </Heading>
                      <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                        Interviews, Usability Testing, Personas, Journey Mapping
                      </p>
                    </Stack>
                  </Column>
                  <Column lg={4} md={4} sm={4}>
                    <Stack gap={4} style={{ alignItems: 'center', textAlign: 'center' }}>
                      <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        borderRadius: '50%', 
                        background: 'var(--cds-background-brand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                      }}>
                        <Code size={32} />
                      </div>
                      <Heading style={{ fontSize: '1.25rem', fontWeight: 400 }}>
                        Frontend
                      </Heading>
                      <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                        HTML, CSS, React, Design Systems, Component Libraries
                      </p>
                    </Stack>
                  </Column>
                  <Column lg={4} md={4} sm={4}>
                    <Stack gap={4} style={{ alignItems: 'center', textAlign: 'center' }}>
                      <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        borderRadius: '50%', 
                        background: 'var(--cds-background-brand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                      }}>
                        <Portfolio size={32} />
                      </div>
                      <Heading style={{ fontSize: '1.25rem', fontWeight: 400 }}>
                        Strategy
                      </Heading>
                      <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                        Product Strategy, Design Thinking, Workshop Facilitation
                      </p>
                    </Stack>
                  </Column>
                </Grid>
              </Stack>
            </Column>
          </Grid>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="portfolio-section">
        <div className="portfolio-container">
          <Grid narrow>
            <Column lg={16} md={8} sm={4}>
              <Stack gap={6}>
                <div className="section-title">
                  <Heading style={{ fontSize: '2.5rem', fontWeight: 300 }}>
                    Featured Projects
                  </Heading>
                </div>
                <Grid>
                  <Column lg={8} md={4} sm={4}>
                    <div className="project-card" style={{ 
                      background: 'var(--cds-layer-01)', 
                      padding: '2rem',
                      borderRadius: '8px',
                      border: '1px solid var(--cds-border-subtle)'
                    }}>
                      <Stack gap={4}>
                        <Tag type="purple">E-commerce</Tag>
                        <Heading style={{ fontSize: '1.5rem', fontWeight: 400 }}>
                          Shopping Experience Redesign
                        </Heading>
                        <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)', lineHeight: '1.6' }}>
                          Redesigned the checkout flow for a major e-commerce platform, resulting in
                          a 35% increase in conversion rates and improved user satisfaction scores.
                        </p>
                        <Stack orientation="horizontal" gap={2}>
                          <Tag>User Research</Tag>
                          <Tag>Prototyping</Tag>
                          <Tag>Design System</Tag>
                        </Stack>
                        <Button kind="ghost" size="sm">
                          View Case Study →
                        </Button>
                      </Stack>
                    </div>
                  </Column>
                  <Column lg={8} md={4} sm={4}>
                    <div className="project-card" style={{ 
                      background: 'var(--cds-layer-01)', 
                      padding: '2rem',
                      borderRadius: '8px',
                      border: '1px solid var(--cds-border-subtle)'
                    }}>
                      <Stack gap={4}>
                        <Tag type="teal">SaaS Platform</Tag>
                        <Heading style={{ fontSize: '1.5rem', fontWeight: 400 }}>
                          Enterprise Dashboard Design
                        </Heading>
                        <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)', lineHeight: '1.6' }}>
                          Created a comprehensive design system and dashboard interface for a B2B SaaS
                          platform, improving task completion rates by 42%.
                        </p>
                        <Stack orientation="horizontal" gap={2}>
                          <Tag>Design System</Tag>
                          <Tag>Data Visualization</Tag>
                          <Tag>Accessibility</Tag>
                        </Stack>
                        <Button kind="ghost" size="sm">
                          View Case Study →
                        </Button>
                      </Stack>
                    </div>
                  </Column>
                  <Column lg={8} md={4} sm={4}>
                    <div className="project-card" style={{ 
                      background: 'var(--cds-layer-01)', 
                      padding: '2rem',
                      borderRadius: '8px',
                      border: '1px solid var(--cds-border-subtle)'
                    }}>
                      <Stack gap={4}>
                        <Tag type="magenta">Mobile App</Tag>
                        <Heading style={{ fontSize: '1.5rem', fontWeight: 400 }}>
                          Fitness App UX Design
                        </Heading>
                        <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)', lineHeight: '1.6' }}>
                          Designed a mobile-first fitness tracking application with a focus on
                          motivation and habit formation, achieving 4.8 stars in app stores.
                        </p>
                        <Stack orientation="horizontal" gap={2}>
                          <Tag>Mobile Design</Tag>
                          <Tag>User Testing</Tag>
                          <Tag>Prototyping</Tag>
                        </Stack>
                        <Button kind="ghost" size="sm">
                          View Case Study →
                        </Button>
                      </Stack>
                    </div>
                  </Column>
                  <Column lg={8} md={4} sm={4}>
                    <div className="project-card" style={{ 
                      background: 'var(--cds-layer-01)', 
                      padding: '2rem',
                      borderRadius: '8px',
                      border: '1px solid var(--cds-border-subtle)'
                    }}>
                      <Stack gap={4}>
                        <Tag type="cyan">Healthcare</Tag>
                        <Heading style={{ fontSize: '1.5rem', fontWeight: 400 }}>
                          Patient Portal Redesign
                        </Heading>
                        <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)', lineHeight: '1.6' }}>
                          Improved accessibility and usability of a healthcare patient portal,
                          reducing support tickets by 50% and increasing patient engagement.
                        </p>
                        <Stack orientation="horizontal" gap={2}>
                          <Tag>Accessibility</Tag>
                          <Tag>Healthcare UX</Tag>
                          <Tag>User Research</Tag>
                        </Stack>
                        <Button kind="ghost" size="sm">
                          View Case Study →
                        </Button>
                      </Stack>
                    </div>
                  </Column>
                </Grid>
              </Stack>
            </Column>
          </Grid>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="portfolio-section" style={{ background: 'var(--cds-layer-01)' }}>
        <div className="portfolio-container">
          <Grid narrow>
            <Column lg={10} md={6} sm={4}>
              <Stack gap={6}>
                <div className="section-title">
                  <Heading style={{ fontSize: '2.5rem', fontWeight: 300 }}>
                    Let's Work Together
                  </Heading>
                </div>
                <p style={{ fontSize: '1.125rem', lineHeight: '1.6', color: 'var(--cds-text-secondary)' }}>
                  I'm always interested in new opportunities and exciting projects.
                  Whether you have a question or just want to say hi, feel free to reach out.
                </p>
                <Stack orientation="horizontal" gap={4}>
                  <Button size="lg" renderIcon={Email} href="mailto:hello@example.com">
                    Send Email
                  </Button>
                  <Button kind="tertiary" size="lg" renderIcon={LogoLinkedin} href="https://linkedin.com" target="_blank">
                    LinkedIn
                  </Button>
                  <Button kind="tertiary" size="lg" renderIcon={LogoGithub} href="https://github.com" target="_blank">
                    GitHub
                  </Button>
                </Stack>
              </Stack>
            </Column>
          </Grid>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '2rem 0', 
        borderTop: '1px solid var(--cds-border-subtle)',
        marginTop: '4rem'
      }}>
        <div className="portfolio-container">
          <Grid narrow>
            <Column lg={16} md={8} sm={4}>
              <Stack orientation="horizontal" gap={4} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--cds-text-secondary)' }}>
                  © 2024 UX Designer Portfolio. Built with IBM Carbon Design System.
                </p>
                <Stack orientation="horizontal" gap={4}>
                  <Link href="#about" style={{ fontSize: '0.875rem' }}>About</Link>
                  <Link href="#skills" style={{ fontSize: '0.875rem' }}>Skills</Link>
                  <Link href="#projects" style={{ fontSize: '0.875rem' }}>Projects</Link>
                  <Link href="#contact" style={{ fontSize: '0.875rem' }}>Contact</Link>
                </Stack>
              </Stack>
            </Column>
          </Grid>
        </div>
      </footer>
    </div>
  );
}
