'use client';

export default function HomePage() {
  return (
    <main className="page" role="main">
      <header className="header" aria-label="header">
        <h1>Jeremy Edwards</h1>
        <div className="contact">
          <a href="tel:+61413381514">0413&nbsp;381&nbsp;514</a> |{' '}
          <a href="mailto:jeremy.stewart.edwards@gmail.com">jeremy.stewart.edwards@gmail.com</a>
        </div>
      </header>
      
      <section className="two-col" aria-label="Main content with sidebar">
        <aside className="chat-sidebar">
          <div className="chat-container" aria-label="Chat Feature">
            <div className="chat-header">
              <h3>💬 Interview Jeremy now!</h3>
              <p className="chat-subtitle">AI Jeremy will answer your interview questions</p>
            </div>
            
            <div className="chat-messages" id="chatMessages">
              <div className="message bot-message">
                <div className="message-content">
                  <p>👋 Hi! I'm an AI version of Jeremy Edwards'. Ask me anything about my background, skills, or even personal questions.</p>
                  <div className="suggested-questions">
                    <button className="suggestion-btn" data-question="Tell me about your product management experience">Product Management</button>
                    <button className="suggestion-btn" data-question="What's your biggest achievement?">Key Achievements</button>
                    <button className="suggestion-btn" data-question="What AI experience do you have?">AI Experience</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="chat-input-area">
              <div className="chat-mode-selector">
                <label className="mode-option">
                  <input type="radio" name="chatMode" value="search-find" defaultChecked />
                  <span>Quick Answer</span>
                </label>
                <label className="mode-option">
                  <input type="radio" name="chatMode" value="find-summarise" />
                  <span>Detailed</span>
                </label>
              </div>
              
              <div className="chat-input-group">
                <textarea 
                  id="chatInput" 
                  placeholder="Ask about Jeremy's experience..."
                  rows={2}
                  maxLength={500}
                />
                <button id="sendButton" className="send-btn" disabled>
                  <span className="send-icon">📤</span>
                </button>
              </div>
              
              <div className="chat-footer">
                <small id="questionCounter">Questions remaining: 5/5</small>
              </div>
            </div>
            
            <div className="chat-loading" id="chatLoading" style={{display: 'none'}}>
              <div className="loading-dots">
                <span></span><span></span><span></span>
              </div>
              <p>Jeremy is thinking...</p>
            </div>
          </div>
        </aside>

        <div className="cv-content">
          <section className="section" aria-label="About">
            <h2>About</h2>
            <p className="tagline">
              Information technology professional with 15 years of experience delivering digital products and programs for large organisations. Experienced in collaborating with cross-functional teams to discover, design, and implement solutions that enhance digital experiences for customers, partners, and staff. Expertise in product development, feature delivery, and process optimisation across CMS, CRM, marketing tech, e-commerce, and API development.
            </p>
          </section>

          <section className="section" aria-label="Knowledge and Expertise">
            <h2>Knowledge & Expertise</h2>
            <ul className="list">
              <li>Solid understanding of AI concepts: machine learning, large language models, natural language processing, and automation.</li>
              <li>Driving data-informed decisions via systems that capture and structure information for real-time insights, continuous improvement, and strategic planning.</li>
              <li>E-commerce domain knowledge: inventory management, payments, fulfilment, and error handling to ensure product availability, reduce transaction failures, and improve conversion.</li>
              <li>Translating business objectives into product requirements and prioritised roadmaps aligned to strategy.</li>
              <li>Collaborating with BAs, engineers, architects, and SMEs to design and deliver solutions that grow revenue and improve operational efficiency.</li>
              <li>Showcasing outcomes and business value to senior leadership through data storytelling and outcome-based reporting.</li>
              <li>Leading discovery and journey mapping to inform personalisation, A/B testing, CRO, and CRM capabilities.</li>
            </ul>
          </section>

          <section className="section" aria-label="Education">
            <h2>Education</h2>
            <p><strong>University of Central Florida</strong><br/>
               Bachelor of Science in Business Administration (Marketing; Minor in Finance)<br/>
               Orlando, FL — May 2010
            </p>
          </section>

          <section className="section" aria-label="Employment History">
            <h2>Employment History</h2>

            <article className="role">
              <h3>Digital Product Owner - Contract</h3>
              <div className="meta">
                <span className="employer">People First Bank</span> — Brisbane, QLD
                <span className="split">• June 2025 – Nov 2025</span>
              </div>
              <div className="responsibilities">
                <h4>Responsibilities</h4>
                <ul className="list">
                  <li>Product owner for the merger of Peoples Choice and Heritage Bank websites and martech systems supporting marketing, member acquisition, and regulated disclosures.</li>
                  <li>Implemented agile delivery practices and a post-merger roadmap of continuous improvement and feature development.</li>
                </ul>
              </div>
              <div className="achievements">
                <h4>Achievements</h4>
                <ul className="list">
                  <li>Led a proof-of-concept "Help & Support" Retrieval-Augmented Generation (RAG) system demonstrating natural-language self-service powered by contextual content.</li>
                </ul>
              </div>
            </article>

            <article className="role section">
              <h3>Digital Product Owner / Agile Delivery Lead — Digital Carting</h3>
              <div className="meta">
                <span className="employer">Flight Centre Travel Group</span> — Brisbane, QLD
                <span className="split">• Feb 2023 – Jun 2025</span>
              </div>
              <div className="responsibilities">
                <h4>Responsibilities</h4>
                <ul className="list">
                  <li>Oversaw agile delivery for Digital Carting & Omni Integration, aligning work to engineering roadmaps and product/business OKRs.</li>
                  <li>Scoped e-commerce platforms, micro-services, and integrations enabling shopping, booking, fulfilment, and in-store/online management of travel products.</li>
                  <li>Co-ordinated dependencies, removed blockers, and prioritised deliverables across technical and product teams.</li>
                </ul>
              </div>
              <div className="achievements">
                <h4>Achievements</h4>
                <ul className="list">
                  <li>Technical product management for a unified carting system underpinning Stays/DIY/Flights checkout and future cross/upsell opportunities.</li>
                  <li>Contributed to booking orchestration replacing the Flights payment app, increasing payment options, improving observability, and reducing booking failures.</li>
                  <li>Owned initial managed-booking capability for self-serve cancellation/refund quotes, reducing call centre demand.</li>
                </ul>
              </div>
            </article>

            <article className="role section">
              <h3>Digital Product Owner — Customer Experience</h3>
              <div className="meta">
                <span className="employer">Lendlease LLC</span> — Sydney, Australia / International
                <span className="split">• Jul 2018 – Jan 2023</span>
              </div>
              <div className="responsibilities">
                <h4>Responsibilities</h4>
                <ul className="list">
                  <li>Managed a portfolio of 50+ websites and integrated platforms (Sitecore, Optimizely, GA, MuleSoft, Salesforce, Yardi).</li>
                  <li>Produced product roadmaps and MVPs decomposed into achievable deliverables.</li>
                  <li>Developed solution designs and implementation options aligned to OKRs.</li>
                  <li>Maintained backlog and agile rituals; led a CX squad and coached 5 direct reports.</li>
                </ul>
              </div>
              <div className="achievements">
                <h4>Achievements</h4>
                <ul className="list">
                  <li>Re-platformed CMS and design system: improved SEO, conversions, authoring efficiency; reduced TCO by 70% over 5 years.</li>
                  <li>Owned UX/UI and content for retail centre sites, including tenant API powering kiosks and maps.</li>
                  <li>Delivered residential sales/leasing integrations to surface inventory via APIs to owned and third-party sites.</li>
                  <li>Owned e-commerce & CRM initiative enabling online property reservations to reduce transaction costs.</li>
                  <li>Conceived and implemented a no-code design system reducing redundant engineering effort.</li>
                </ul>
              </div>
            </article>

            <article className="role section">
              <h3>Digital Product Manager</h3>
              <div className="meta">
                <span className="employer">Perpetual Ltd</span> — Sydney, NSW
                <span className="split">• Jan 2015 – Jul 2018</span>
              </div>
              <div className="responsibilities">
                <h4>Responsibilities</h4>
                <ul className="list">
                  <li>Aligned digital programs for funds management, advice, and corporate trust with the enterprise roadmap.</li>
                  <li>Managed secure/external websites plus broader martech and IT initiatives.</li>
                </ul>
              </div>
              <div className="achievements">
                <h4>Achievements</h4>
                <ul className="list">
                  <li>Co-implemented Salesforce Marketing Cloud and cross-channel data integration (web/email/SMS).</li>
                  <li>Built streaming analytics dashboards (Power BI) for KPIs and campaign effectiveness.</li>
                  <li>Defined requirements for redesign and re-platform of Perpetual.com.au (+$2m capex).</li>
                  <li>Led IA/UX/UI improvements for fund performance content across asset classes and products.</li>
                  <li>Introduced personalisation/segmentation, lifting engagement by 40% on key campaigns.</li>
                </ul>
              </div>
            </article>

            <article className="role section">
              <h3>Digital Producer</h3>
              <div className="meta">
                <span className="employer">Perpetual Ltd</span> — Sydney, NSW
                <span className="split">• Oct 2013 – Jan 2015</span>
              </div>
              <div className="responsibilities">
                <h4>Responsibilities</h4>
                <ul className="list">
                  <li>Operational management and CMS enhancements supporting martech, IR, and regulatory functions.</li>
                </ul>
              </div>
              <div className="achievements">
                <h4>Achievements</h4>
                <ul className="list">
                  <li>Delivered PEIC LIC website and IR services facilitating a $250m IPO.</li>
                  <li>Key contributor to 2014 & 2015 Perpetual Loyal Sydney to Hobart digital campaigns.</li>
                </ul>
              </div>
            </article>

            <article className="role section">
              <h3>Digital Producer / Project Manager</h3>
              <div className="meta">
                <span className="employer">Elastic Digital</span> — Sydney, NSW
                <span className="split">• Nov 2011 – Oct 2013</span>
              </div>
              <ul className="list">
                <li>Oversaw delivery of websites, animations, applications, and eLearning portals for brands including Optus, Cisco, and VMware.</li>
              </ul>
            </article>

            <article className="role section">
              <h3>Digital / Web Producer</h3>
              <div className="meta">
                <span className="employer">The Walt Disney Company</span> — Orlando, FL
                <span className="split">• Sep 2010 – Jul 2011</span>
              </div>
              <ul className="list">
                <li>Member of Scrum team maintaining CMS, websites, and apps for Disney Vacation Club and Disney Cruise Line (EN & JP sites).</li>
              </ul>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}
