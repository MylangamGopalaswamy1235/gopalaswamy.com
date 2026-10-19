/* ============================================
   PORTFOLIO SCRIPT — MYLANGAM GOPALASWAMY
   ============================================ */

/* ── CUSTOM DOT CURSOR ── */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

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

const SYSTEM_PROMPT = `You are Dexter, a friendly portfolio assistant. You may answer questions about Gopalaswamy, what he does, and the six projects listed below. Use only the facts in this profile and project list; do not answer other topics or invent details. For anything outside these topics, reply exactly: "That's an interesting question! 😊 I'm Dexter, Gopalaswamy's portfolio guide, so I specialize in his projects and experience. For more details or other inquiries, please contact: 📧 gm5840@srmist.edu.in"

PROFILE
Mylangam Gopalaswamy is an SRMIST student ('28) and an innovative developer focused on AI/ML systems and web development. He builds practical applications, especially healthcare-related systems, productivity tools, and intelligent knowledge and medical management systems.

PROJECTS
1. Image Caption Generator (May 2025): Generates descriptive captions from uploaded images using AI/deep learning and computer vision. Python.
2. Syndrome Detector (Aug-Nov 2025): Analyzes symptoms from manual input, sensor data, and camera to predict possible medical causes. Python, Django.
3. Doctor Performance Evaluation System (Jan-Mar 2026): Measures doctor performance based on treatment quality, clarity, and efficiency.
4. AI Notes App (Jan-Mar 2026): Generates and organizes notes with dynamic folders, task reminders with alarms, and duplicate-content analysis. Python, AI.
5. Djkstar Algorithm (March 2026): Uses Djkstar's method to find an optimal network root node by calculating minimum total shortest-path distances. Django, Python.
6. Teximo (October 2026): Full-stack campus placement and career management system that unifies drive coordination, student tracking, resume building, and AI coaching, connecting campus recruitment with real-time tech jobs and personalized student preparation.`;

const NON_PROJECT_REPLY = "That's an interesting question! 😊 I'm Dexter, Gopalaswamy's portfolio guide, so I specialize in his projects and experience. For more details or other inquiries, please contact: 📧 gm5840@srmist.edu.in";
const RESUME_DOWNLOAD_REPLY = "<a href='Gopalaswamy_Resume.pdf' download='Gopalaswamy_Resume.pdf'>Download Resume</a>";
const PROJECT_KEYWORDS = [
  'image caption', 'syndrome', 'doctor', 'notes', 'smartnotes',
  'djkstar', 'dijkstra', 'algorithm', 'teximo'
];
const GOPALASWAMY_REPLY = "Mylangam Gopalaswamy is an SRMIST student ('28) and an innovative developer focused on AI/ML systems and web development. He builds practical applications, especially healthcare-related systems, productivity tools, and intelligent knowledge and medical management systems.";

function isProjectQuestion(userMessage) {
  const msg = userMessage.toLowerCase();
  return /\bprojects?\b/.test(msg) || PROJECT_KEYWORDS.some(keyword => msg.includes(keyword));
}

function isGopalaswamyQuestion(userMessage) {
  const msg = userMessage.toLowerCase();
  return /\b(who is|who he is|who's|tell me about|about|what does|what is|what's|what he is doing)\b/.test(msg) &&
    /\b(gopalaswamy|mylangam|he|him)\b/.test(msg);
}

function isResumeQuestion(userMessage) {
  return /\b(resume|cv)\b/i.test(userMessage);
}

async function callDexter(userMessage) {
  const namedProjectQuestion = PROJECT_KEYWORDS.some(keyword =>
    userMessage.toLowerCase().includes(keyword)
  );
  if (isResumeQuestion(userMessage) && !namedProjectQuestion) {
    return RESUME_DOWNLOAD_REPLY;
  }
  if (isGopalaswamyQuestion(userMessage) && !isProjectQuestion(userMessage)) {
    return GOPALASWAMY_REPLY;
  }
  if (!isProjectQuestion(userMessage)) {
    return isResumeQuestion(userMessage) ? RESUME_DOWNLOAD_REPLY : NON_PROJECT_REPLY;
  }

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
  
  if (msg.includes('image caption')) 
    return "📸 Image Caption Generator (May 2025) uses AI/deep learning to automatically generate descriptive captions from uploaded images using Python and Computer Vision techniques.";
  
  if (msg.includes('syndrome')) 
    return "🏥 Syndrome Detector (Aug 2025 - Nov 2025) is a medical AI system analyzing symptoms from multiple sources (text, sensors, camera) to predict possible medical causes. Built with Python and Django.";
  
  if (msg.includes('doctor')) 
    return "📊 Doctor Performance Evaluation System (Jan 2026 - March 2026) measures doctor performance based on treatment quality, clarity, and efficiency to improve healthcare standards.";
  
  if (msg.includes('notes')) 
    return "📝 AI Notes App (Jan 2026 - March 2026) automatically generates and organizes notes using AI! Features: dynamic folders, task reminders with alarms, and duplicate content analysis.";
  
  if (msg.includes('algorithm') || msg.includes('djkstar') || msg.includes('dijkstra')) 
    return "📚 Djkstar Algorithm project (March 2026) visually implements Djkstar's method to determine optimal network paths and node reachability. Built with Django and Python.";
  
  if (msg.includes('teximo')) 
    return "🎓 Teximo (October 2026) is a full-stack, enterprise-grade campus placement and career management system. It unifies drive coordination, student tracking, resume building, and AI coaching, connecting campus recruitment with real-time tech jobs and personalized student preparation.";
  
  if (msg.includes('project')) 
    return "🚀 Gopalaswamy has 6 projects: 1) Image Caption Generator, 2) Syndrome Detector, 3) Doctor Performance Evaluation System, 4) AI Notes App, 5) Djkstar Algorithm, 6) Teximo. Ask about any specific one!";
  return NON_PROJECT_REPLY;
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
