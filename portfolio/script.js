/* ============================================
   PORTFOLIO SCRIPT — MYLANGAM GOPALASWAMY
   ============================================ */

/* ── CUSTOM DOT CURSOR ── */
(function () {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    rx += (e.clientX - rx) * 0.18;
    ry += (e.clientY - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  });

  // Smooth ring follow
  function followRing() {
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(followRing);
  }
  followRing();

  document.querySelectorAll('a, button, [onclick], .link-pill, .place-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
})();

/* ── AOS (Animate on Scroll) ── */
(function () {
  const els = document.querySelectorAll('[data-aos]');
  function check() {
    els.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 50) {
        el.classList.add('aos-animate');
      }
    });
  }
  window.addEventListener('scroll', check, { passive: true });
  setTimeout(check, 120);
})();

/* ── CERTIFICATES LOADER ── */
// Add cert image filenames here as you add them to portfolio/certificates/
const CERT_FILES = [
  'CODE FOR CHANGE.jpg',
  'codealpha.jpg',
  'codsoft.jpg',
  'GFG.jpg',
  'GREAT LEARNING.jpg',
  'hackerank.jpg',
  'HADOOP.jpg',
  'HP.jpg',
  'IBM.jpg',
  'infosys springboard.jpg',
  'mind luster.jpg',
  'SRM international webminar.jpg'
];

(function () {
  const gallery = document.getElementById('cert-gallery');
  if (!gallery) return;
  if (CERT_FILES.length === 0) return; // show placeholder
  gallery.innerHTML = '';
  CERT_FILES.forEach(filename => {
    const card = document.createElement('div');
    card.className = 'cert-img-card';
    const name = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    card.innerHTML = `
      <img src="certificates/${filename}" alt="${name}" />
      <p>${name}</p>
    `;
    
    // Make certificate clickable - opens in preview modal
    card.style.cursor = 'pointer';
    card.onclick = (e) => {
      e.preventDefault();
      // Set preview modal content
      document.getElementById('cert-preview-img').src = `certificates/${filename}`;
      document.getElementById('cert-preview-name').textContent = name;
      // Open preview modal
      openModal('cert-preview-modal');
    };
    
    // Handle image load errors
    const img = card.querySelector('img');
    img.addEventListener('error', () => {
      img.style.opacity = '0.3';
      img.title = 'Image not found';
    });
    
    gallery.appendChild(card);
  });
})();

/* ── MODAL HELPERS ── */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
  return false;
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
function closeModalOverlay(e, id) {
  if (e.target === e.currentTarget) closeModal(id);
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

/* ── DEXTER CHATBOT ── */

const SYSTEM_PROMPT = `You are Dexter, a friendly and enthusiastic AI portfolio assistant for MYLANGAM GOPALASWAMY, a developer specializing in AI and Medical Systems at SRMIST (graduating 2028).

═══ ABOUT GOPALASWAMY ═══
Name: MYLANGAM GOPALASWAMY
Education: SRMIST (SRM Institute of Science and Technology), graduating in 2028
Specialization: AI & ML Systems, Medical Technology
Focus: Building real-world problem-solving applications combining AI and Web Development
Interests: Medical AI, Healthcare technology, Automation, Smart decision-making systems

═══ PROJECTS ═══
1. IMAGE CAPTION GENERATOR (May 2025) — AI/deep learning model generating descriptive captions from images. Python, Computer Vision.

2. SYNDROME DETECTOR (Aug 2025 - Nov 2025) — Medical AI system analyzing symptoms from multiple sources (text, sensors, camera) to predict medical causes. Python, Django.

3. DOCTOR PERFORMANCE EVALUATION SYSTEM (Jan 2026 - March 2026) — Measures doctor performance on treatment quality, clarity, and efficiency.

4. AI NOTES APP (Jan 2026 - March 2026) — Auto-generates and organizes notes. Features: dynamic folders, task reminders with alarms, duplicate content analysis. Python.

5. DJKSTAR ALGORITHM (March 2026) — Advanced graph algorithm implementation using Djkstar's method to determine optimal network root node by calculating minimum total shortest-path distances. Django, Python.

═══ SKILLS & LANGUAGES ═══
Languages: C, C++, Python, Java, SQL, Kotlin, XML, UML
Tools: VS Code, GitHub, Android Studio
Database: MySQL

═══ CERTIFICATES ═══
CODE FOR CHANGE, CodAlpha, CodSoft, GFG, Great Learning, HackerRank, Hadoop, HP, IBM, Infosys Springboard, Mind Luster, SRM International Webinar

═══ SOCIAL MEDIA & PLATFORMS ═══
• LeetCode: https://leetcode.com/u/7789bWxk1v
• CodeChef: https://www.codechef.com/users/gopa4637
• HackerRank: https://www.hackerrank.com/profile/gm5840
• LinkedIn: https://www.linkedin.com/in/m-b-gopala-swamy-72607a324
• GitHub: https://github.com/MylangamGopalaswamy1235
• Email: gm5840@srmist.edu.in

═══ TRAVELS & INTERESTS ═══
Hill Stations: Munnar, Ooty, Kodaikanal, Coimbatore, Bangalore
Temples: Sri Rangam Tirupati, Meenakshi Amman, Srisailam, Udupi, Murudeshwar, Shirdi, Pandharpur
Loves: Nature, exploring new places, traveling for experiences

═══ FOCUS & PHILOSOPHY ═══
• Build real-world problem-solving apps, not just academic demos
• Combine AI + Web Development for practical use cases
• Focus on automation and smart decision-making systems
• Work on healthcare-related AI solutions for impact
• Build modular and scalable applications
• Create tools that reduce manual effort using AI

═══ FREE TIME ═══
Visits hill stations and temples, explores nature, travels to gain new experiences and perspectives.

You are Gopalaswamy's AI portfolio guide. Answer ALL questions about the portfolio, projects, skills, travels, certificates, social media, education, goals, interests, and personality. Be friendly, knowledgeable, and conversational. Use occasional emojis. Keep responses concise (under 150 words). If asked something completely unrelated to the portfolio, gently redirect: "That's interesting, but I'm here to tell you about Gopalaswamy's work and passions! 😊"`;

async function callDexter(userMessage) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      console.error('API Response Error:', response.status, response.statusText);
      throw new Error(`API error ${response.status}`);
    }

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (err) {
    console.error('Dexter Error:', err);
    // Fallback to local knowledge base if API fails
    return generateDexterResponse(userMessage);
  }
}

// Local fallback knowledge base
function generateDexterResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  // Comprehensive keyword matching for all portfolio topics
  if (msg.includes('who') || msg.includes('about')) 
    return "I'm Dexter, Gopalaswamy's AI portfolio guide! 👋 Gopalaswamy is a developer specializing in AI and Medical Systems at SRMIST (graduating 2028). He builds real-world solutions combining AI with web development for maximum impact.";
  
  if (msg.includes('image caption')) 
    return "📸 Image Caption Generator (May 2025) uses AI/deep learning to automatically generate descriptive captions from uploaded images using Python and Computer Vision techniques.";
  
  if (msg.includes('syndrome')) 
    return "🏥 Syndrome Detector (Aug 2025 - Nov 2025) is a medical AI system analyzing symptoms from multiple sources (text, sensors, camera) to predict possible medical causes. Built with Python and Django.";
  
  if (msg.includes('doctor')) 
    return "📊 Doctor Performance Evaluation System (Jan 2026 - March 2026) measures doctor performance based on treatment quality, clarity, and efficiency to improve healthcare standards.";
  
  if (msg.includes('notes')) 
    return "📝 AI Notes App (Jan 2026 - March 2026) automatically generates and organizes notes using AI! Features: dynamic folders, task reminders with alarms, and duplicate content analysis.";
  
  if (msg.includes('algorithm') || msg.includes('djkstar')) 
    return "📚 Djkstar Algorithm project (March 2026) visually implements Djkstar's method to determine optimal network paths and node reachability. Built with Django and Python.";
  
  if (msg.includes('project')) 
    return "🚀 Gopalaswamy has 5 projects: 1) Image Caption Generator, 2) Syndrome Detector, 3) Doctor Performance Evaluation System, 4) AI Notes App, 5) Djkstar Algorithm. Ask about any specific one!";
  
  if (msg.includes('skill') || msg.includes('tech') || msg.includes('language')) 
    return "⚙️ Languages: C, C++, Python, Java, SQL, Kotlin, XML, UML | Tools: VS Code, GitHub, Android Studio | Database: MySQL";
  
  if (msg.includes('certificate') || msg.includes('cert')) 
    return "🏆 Certificates: CODE FOR CHANGE, CodAlpha, CodSoft, GFG, Great Learning, HackerRank, Hadoop, HP, IBM, Infosys Springboard, Mind Luster, SRM International Webinar";
  
  if (msg.includes('travel') || msg.includes('place')) 
    return "🌍 Hill Stations: Munnar, Ooty, Kodaikanal, Coimbatore, Bangalore | Temples: Sri Rangam Tirupati, Meenakshi Amman, Srisailam, Udupi, Murudeshwar, Shirdi, Pandharpur";
  
  if (msg.includes('connect') || msg.includes('social') || msg.includes('linkedin') || msg.includes('github') || msg.includes('contact')) 
    return "📱 LinkedIn: https://www.linkedin.com/in/m-b-gopala-swamy-72607a324 | GitHub: https://github.com/MylangamGopalaswamy1235 | Email: gm5840@srmist.edu.in | LeetCode, CodeChef, HackerRank profiles available!";
  
  if (msg.includes('goal') || msg.includes('focus')) 
    return "🎯 Goals: Build real-world problem-solving apps, combine AI+Web Development, focus on healthcare-related AI solutions, create modular scalable applications, automate manual tasks.";
  
  if (msg.includes('free') || msg.includes('hobby')) 
    return "🎨 Free time: Visiting hill stations and temples, exploring nature, traveling for new experiences and perspectives.";
  
  if (msg.includes('education') || msg.includes('srmist')) 
    return "🎓 Studying at SRMIST (SRM Institute of Science and Technology), graduating in 2028. Specializing in AI & ML Systems and Medical Technology.";
  
  if (msg.includes('specialize')) 
    return "🏥 Specializes in AI & ML Systems with a focus on Medical Technology. Builds intelligent applications that solve real-world healthcare problems.";
  
  if (msg.includes('resume') || msg.includes('cv') || msg.includes('download')) 
    return "📄 You can view and download Gopalaswamy's resume right here: <br><br><a href='Gopalaswamy_Resume.pdf' target='_blank' style='color:var(--accent-2); font-weight:bold; text-decoration:underline;'>Download Resume</a>";

  // Default response for non-portfolio questions
  return "That's an interesting question! 😊 I'm Dexter, Gopalaswamy's portfolio guide, so I specialize in his projects and experience. For more details or other inquiries, please contact: 📧 gm5840@srmist.edu.in";
}

function addMsg(html, isBot) {
  const msgs = document.getElementById('chatMessages');
  const div  = document.createElement('div');
  div.className = `msg ${isBot ? 'msg-bot' : 'msg-user'}`;
  const p = document.createElement('p');
  p.innerHTML = html;
  div.appendChild(p);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function setTyping(show) {
  const t = document.getElementById('typingIndicator');
  if (t) t.style.display = show ? 'flex' : 'none';
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const text  = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg(text, false);
  setTyping(true);

  try {
    const reply = await callDexter(text);
    setTyping(false);
    if (reply && reply.length > 0) {
      addMsg(reply, true);
    } else {
      addMsg("I'm thinking... 🤔 Please try again!", true);
    }
  } catch (err) {
    console.error('Send Message Error:', err);
    setTyping(false);
    addMsg("Got it! Let me tell you about Gopalaswamy. What would you like to know? 😊", true);
  }
}

function quickAsk(q) {
  document.getElementById('chatInput').value = q;
  sendMessage();
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function toggleChat() {
  const win = document.getElementById('chatWindow');
  win.classList.toggle('active');
  if (win.classList.contains('active')) {
    setTimeout(() => document.getElementById('chatInput').focus(), 350);
  }
}
