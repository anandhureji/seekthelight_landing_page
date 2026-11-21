/**
 * ============================================================
 *  SEEK THE LIGHT — Custom Multi-Step Form
 *
 *  Renders a branded 5-step form matching the Google Form
 *  and submits in the background to Google Forms.
 * ============================================================
 */

/* ── Submission endpoint (Google Forms action URL) ─────────── */
const FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLScFaWmabosviWpVfzsIX2c4RCvpjXCtiay1XCJBFGyPV_99GA/formResponse';

/* ── Form schema ────────────────────────────────────────────── */
const STEPS = [
  {
    title: 'SECTION 1 — ABOUT YOU',
    subtitle: "Help us understand who we're designing for.",
    fields: [
      {
        id: 'entry.603986773',
        label: 'Name',
        hint: 'Optional',
        type: 'text',
        required: false,
        placeholder: 'Your name',
      },
      {
        id: 'entry.801150847',
        label: 'Which age group do you belong to?',
        type: 'radio',
        required: true,
        options: ['Under 18', '18–24', '25–30', '31–35', '36–45', 'Above 45'],
      },
      {
        id: 'entry.1392927831',
        label: 'Sex',
        hint: 'Optional',
        type: 'radio',
        required: false,
        options: ['Male', 'Female', 'Prefer not to say', 'Other'],
        hasOther: true,
      },
      {
        id: 'entry.929803418',
        label: 'What is your current occupation?',
        type: 'radio',
        required: true,
        options: ['Student', 'Working professional', 'Business / self-employed', 'Freelancer', 'Other'],
        hasOther: true,
      },
      {
        id: 'entry.1391941207',
        label: 'Which district are you currently based in?',
        type: 'dropdown',
        required: true,
        placeholder: 'Select your district…',
        options: [
          'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha',
          'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad',
          'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod',
          'Other / Outside Kerala',
        ],
      },
    ],
  },

  {
    title: 'SECTION 2 — T-SHIRT SHOPPING BEHAVIOUR',
    subtitle: 'Tell us about your style and shopping habits.',
    fields: [
      {
        id: 'entry.1898789881',
        label: 'Which of the following best reflects your interests and lifestyle?',
        hint: 'Optional',
        type: 'radio',
        required: false,
        options: [
          'Sports & Fitness',
          'Art & Creativity',
          'Fashion & Styling',
          'Music & Entertainment',
          'Travel & Exploration',
          'Technology & Gaming',
          'Business & Entrepreneurship',
          'A mix of different interests',
        ],
      },
      {
        id: 'entry.1731138509',
        label: 'How often do you buy T-shirts?',
        type: 'radio',
        required: true,
        options: [
          'More than once a month',
          'Once a month',
          'Once every 2–3 months',
          'Once every 4–6 months',
          'Rarely',
        ],
      },
      {
        id: 'entry.988806588',
        label: 'How much do you typically spend on one T-shirt?',
        type: 'radio',
        required: true,
        options: [
          'Below ₹500',
          '₹500–₹799',
          '₹800–₹999',
          '₹1,000–₹1,499',
          '₹1,500–₹1,999',
          '₹2,000 or more',
        ],
      },
      {
        id: 'entry.155074726',
        label: 'Where do you usually buy T-shirts?',
        hint: 'Select all that apply.',
        type: 'checkbox',
        required: true,
        options: [
          'Brand websites (Official online stores)',
          'Online marketplaces (Myntra, Ajio, Amazon, etc.)',
          'Instagram / social media stores',
          'Malls / retail stores',
          'Local shops / street markets',
          'Other',
        ],
        hasOther: true,
      },
      {
        id: 'entry.224987114',
        label: 'Which T-shirt or clothing brands have you purchased from recently?',
        hint: 'Type any brands you remember. Leave blank if none.',
        type: 'text',
        required: false,
        placeholder: 'e.g. Zara, H&M, Snitch, Bewakoof…',
      },
    ],
  },

  {
    title: 'SECTION 3 — DESIGN, COLOURS & PRINT PREFERENCES',
    subtitle: "Help us create designs you'll actually want to wear.",
    fields: [
      {
        id: 'entry.739911614',
        label: 'Which T-Shirt design style do you prefer?',
        hint: 'Optional',
        type: 'radio',
        required: false,
        options: [
          'Minimal & subtle',
          'Bold  & statement',
          'Vintage & Retro',
          'Artistic &illustrated',
          'Typography-based',
          'A mix of styles',
        ],
      },
      {
        id: 'entry.596003593',
        label: 'Which T-shirt design categories attract you the most?',
        hint: 'Select up to 3.',
        type: 'checkbox',
        required: true,
        maxSelect: 3,
        options: [
          'Nature & Wildlife',
          'Art & Illustration',
          'Culture & Heritage',
          'Mythological & History',
          'Celestial & Cosmic',
          'Abstract & Geometric',
          'Dark & Gothic',
          'Automotive & Sport',
          'Music & Pop Culture',
          'Other',
        ],
        hasOther: true,
      },
      {
        id: 'entry.1137595705',
        label: 'Where do you prefer the main design to be placed?',
        hint: 'Optional',
        type: 'radio',
        required: false,
        options: [
          'Small front chest',
          'Large front graphic',
          'Center back graphic',
          'Small front + large back',
          'Sleeve detail',
          'Minimal / no graphic',
          'No preference',
        ],
      },
      {
        id: 'entry.1360660877',
        label: 'Which T-shirt colours would you most likely buy?',
        hint: 'Select up to 4.',
        type: 'checkbox',
        required: true,
        maxSelect: 4,
        options: [
          'Black',
          'White / off-white',
          'Grey',
          'Beige / cream',
          'Navy',
          'Earth tones',
          'Pastels',
          'Bright colours',
          'Other',
        ],
        hasOther: true,
      },
      {
        id: 'entry.2051225245',
        label: 'Which visible print or decoration styles do you like?',
        hint: 'Optional — choose based on how it looks.',
        type: 'checkbox',
        required: false,
        options: [
          'Flat / Smooth Print - A flat, printed design',
          'Puff Print - A raised, 3D printed effect',
          'Embroidery',
          'Chenille / Textured patch',
          'Distressed / Vintage print',
          'No preference',
        ],
      },
    ],
  },

  {
    title: 'SECTION 4 — FIT, FABRIC & FINISHING',
    subtitle: 'The details that make a great garment.',
    fields: [
      {
        id: 'entry.1358416048',
        label: 'Which T-shirt fit do you usually prefer?',
        type: 'radio',
        required: true,
        options: [
          'Regular fit',
          'Relaxed fit',
          'Oversized / boxy fit',
          'Slim fit',
          'No fixed preference - Depends on the design or occasion',
        ],
      },
      {
        id: 'entry.977780200',
        label: 'What fabric weight do you prefer?',
        hint: 'Optional',
        type: 'radio',
        required: false,
        options: [
          'Lightweight (around 160–180 GSM)',
          'Medium (around 190–210 GSM)',
          'Mid-heavy (around 220–240 GSM)',
          'Heavyweight (around 250–280 GSM)',
          'Very heavyweight (around 300 GSM or above)',
          'Not sure — show fabric samples / explain with images',
        ],
      },
    ],
  },

  {
    title: 'SECTION 5 — PURCHASE DRIVERS, PRICING & YOUR INPUT',
    subtitle: 'Your voice shapes what we build.',
    fields: [
      {
        id: 'entry.1764931093',
        label: 'What are the three most important factors when choosing a T-shirt?',
        hint: 'Select up to 3.',
        type: 'checkbox',
        required: true,
        maxSelect: 3,
        options: [
          'Design & visual appeal',
          'Fabric quality',
          'Fit & silhouette',
          'Price & value for money',
          'Brand reputation',
          'Print / embroidery quality',
          'Comfort',
          'Durability',
          'Uniqueness & originality',
          'Sustainability / ethical production',
        ],
      },
      {
        id: 'entry.642821210',
        label: 'How much would you be willing to pay for a premium oversized T-shirt from a new brand?',
        hint: 'Optional',
        type: 'radio',
        required: false,
        options: [
          'Below ₹700',
          '₹700–₹899',
          '₹900–₹1,099',
          '₹1,100–₹1,499',
          '₹1,500–₹1,999',
          '₹2,000 or above — if quality and design justify the price',
        ],
      },
      {
        id: 'entry.1364478885',
        label: 'What would you like to see in a new premium T-shirt brand?',
        hint: 'Any designs, colours, fabrics, fits, or features you feel are missing in the market? (Optional)',
        type: 'textarea',
        required: false,
        placeholder: 'Share your thoughts…',
      },
    ],
  },
];

/* ════════════════════════════════════════════════════════════
   MultiStepForm — class
════════════════════════════════════════════════════════════ */
class MultiStepForm {
  constructor(container) {
    this.el   = container;
    this.step = 0;
    this.data = {};  // flat: { entryId: string | string[] }
    this.render();
  }

  /* ── Render the current step ─────────────────────────────── */
  render() {
    const s      = STEPS[this.step];
    const pct    = Math.round(((this.step + 1) / STEPS.length) * 100);
    const isLast = this.step === STEPS.length - 1;

    this.el.innerHTML = `
      <div class="stlf">

        <!-- Progress bar -->
        <div class="stlf__progress-wrap">
          <div class="stlf__progress-track"
               role="progressbar"
               aria-valuenow="${pct}"
               aria-valuemin="0"
               aria-valuemax="100"
               aria-label="Step ${this.step + 1} of ${STEPS.length}">
            <div class="stlf__progress-fill" style="width:${pct}%"></div>
          </div>
          <div class="stlf__progress-meta">
            <span class="stlf__step-count">Step ${this.step + 1} of ${STEPS.length}</span>
            <span class="stlf__step-name">${s.title}</span>
          </div>
        </div>

        <!-- Step header -->
        <div class="stlf__header">
          <h3 class="stlf__title">${s.title}</h3>
          <p class="stlf__subtitle">${s.subtitle}</p>
        </div>

        <!-- Fields -->
        <div class="stlf__fields">
          ${s.fields.map(f => this.fieldHTML(f)).join('')}
        </div>

        <!-- Navigation -->
        <div class="stlf__nav">
          ${this.step > 0
            ? `<button class="btn btn--outline stlf__back" type="button"
                aria-label="Go to previous step">← Back</button>`
            : `<span></span>`}
          <button class="btn btn--gold stlf__advance" type="button"
            aria-label="${isLast ? 'Submit form' : 'Continue to next step'}">
            ${isLast ? 'Submit ✦' : 'Continue →'}
          </button>
        </div>

      </div>`;

    this.attachListeners();
    this.restoreData();
  }

  /* ── Build HTML for a single field ──────────────────────── */
  fieldHTML(f) {
    const idSafe  = f.id.replace(/\./g, '-');
    const reqMark = f.required
      ? `<span class="stlf__req" aria-label="required">*</span>`
      : '';
    const hintHTML = f.hint
      ? `<span class="stlf__hint">${f.hint}</span>`
      : '';

    let control = '';

    switch (f.type) {

      case 'email':
      case 'text':
        control = `
          <input class="stlf__input" type="${f.type}"
            id="f-${idSafe}" name="${f.id}"
            placeholder="${f.placeholder || ''}"
            autocomplete="${f.type === 'email' ? 'email' : 'off'}">`;
        break;

      case 'textarea':
        control = `
          <textarea class="stlf__input stlf__textarea"
            id="f-${idSafe}" name="${f.id}"
            placeholder="${f.placeholder || ''}" rows="4"></textarea>`;
        break;

      case 'dropdown':
        control = `
          <div class="stlf__select-wrap">
            <select class="stlf__select" id="f-${idSafe}" name="${f.id}">
              <option value="" disabled selected>${f.placeholder || 'Select an option…'}</option>
              ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
            </select>
            <span class="stlf__select-arrow" aria-hidden="true">▾</span>
          </div>`;
        break;

      case 'radio':
        control = `
          <div class="stlf__options stlf__options--radio"
               role="radiogroup"
               aria-labelledby="label-${idSafe}">
            ${f.options.map(o => {
              const val = (o === 'Other' && f.hasOther) ? '__other_option__' : o;
              return `
                <label class="stlf__opt">
                  <input class="sr-only" type="radio"
                    name="${f.id}" value="${val}">
                  <span class="stlf__opt-pill">${o}</span>
                </label>`;
            }).join('')}
          </div>
          ${f.hasOther ? `
            <input class="stlf__input stlf__other-input"
              type="text"
              name="${f.id}.other_option_response"
              placeholder="Please specify…"
              aria-label="Other — please specify"
              style="display:none">` : ''}`;
        break;

      case 'checkbox':
        control = `
          ${f.maxSelect ? `
            <p class="stlf__counter" id="counter-${idSafe}" aria-live="polite">
              0 / ${f.maxSelect} selected
            </p>` : ''}
          <div class="stlf__options stlf__options--check"
               role="group"
               aria-labelledby="label-${idSafe}">
            ${f.options.map(o => {
              const val = (o === 'Other' && f.hasOther) ? '__other_option__' : o;
              return `
                <label class="stlf__opt">
                  <input class="sr-only" type="checkbox"
                    name="${f.id}" value="${val}"
                    ${f.maxSelect ? `data-max="${f.maxSelect}"` : ''}>
                  <span class="stlf__opt-pill">${o}</span>
                </label>`;
            }).join('')}
          </div>
          ${f.hasOther ? `
            <input class="stlf__input stlf__other-input"
              type="text"
              name="${f.id}.other_option_response"
              placeholder="Please specify…"
              aria-label="Other — please specify"
              style="display:none">` : ''}`;
        break;
    }

    return `
      <div class="stlf__field" data-field="${f.id}">
        <label class="stlf__label"
          id="label-${idSafe}"
          ${['email','text','textarea','dropdown'].includes(f.type) ? `for="f-${idSafe}"` : ''}>
          ${f.label}${reqMark}${hintHTML}
        </label>
        ${control}
        <p class="stlf__error" role="alert" aria-live="polite"></p>
      </div>`;
  }

  /* ── Restore saved answers into DOM after re-render ─────── */
  restoreData() {
    STEPS[this.step].fields.forEach(f => {
      const val = this.data[f.id];
      if (val === undefined || val === null || val === '' ||
          (Array.isArray(val) && !val.length)) return;

      if (f.type === 'email' || f.type === 'text') {
        const input = this.el.querySelector(`[name="${f.id}"]`);
        if (input) input.value = val;
      }
      if (f.type === 'textarea') {
        const ta = this.el.querySelector(`[name="${f.id}"]`);
        if (ta) ta.value = val;
      }
      if (f.type === 'dropdown') {
        const sel = this.el.querySelector(`[name="${f.id}"]`);
        if (sel) sel.value = val;
      }
      if (f.type === 'radio') {
        const radio = this.el.querySelector(`[name="${f.id}"][value="${val}"]`);
        if (radio) {
          radio.checked = true;
          radio.closest('.stlf__opt').classList.add('selected');
          if (val === '__other_option__') this._showOther(f.id);
        }
        const otherTxt = this.data[`${f.id}.other_option_response`];
        if (otherTxt) {
          const oi = this.el.querySelector(`[name="${f.id}.other_option_response"]`);
          if (oi) { oi.value = otherTxt; oi.style.display = ''; }
        }
      }
      if (f.type === 'checkbox') {
        (Array.isArray(val) ? val : [val]).forEach(v => {
          const cb = this.el.querySelector(`[name="${f.id}"][value="${v}"]`);
          if (cb) {
            cb.checked = true;
            cb.closest('.stlf__opt').classList.add('selected');
          }
        });
        const otherTxt = this.data[`${f.id}.other_option_response`];
        if (otherTxt) {
          const oi = this.el.querySelector(`[name="${f.id}.other_option_response"]`);
          if (oi) { oi.value = otherTxt; oi.style.display = ''; }
        }
        this._updateCounter(f.id, f.maxSelect);
        if (f.maxSelect) this._updateDisabled(f.id, f.maxSelect);
      }
    });
  }

  /* ── Event listeners ────────────────────────────────────── */
  attachListeners() {

    // Advance (Next / Submit)
    this.el.querySelector('.stlf__advance')
      ?.addEventListener('click', () => this._advance());

    // Back
    this.el.querySelector('.stlf__back')
      ?.addEventListener('click', () => this._back());

    // Radio pills
    this.el.querySelectorAll('.stlf__options--radio .stlf__opt input')
      .forEach(input => {
        input.addEventListener('change', () => {
          this.el.querySelectorAll(`[name="${input.name}"]`)
            .forEach(r => r.closest('.stlf__opt').classList.remove('selected'));
          input.closest('.stlf__opt').classList.add('selected');

          if (input.value === '__other_option__') this._showOther(input.name);
          else this._hideOther(input.name);

          this._clearError(input.name);
        });
      });

    // Checkbox pills
    this.el.querySelectorAll('.stlf__options--check .stlf__opt input')
      .forEach(input => {
        input.addEventListener('change', () => {
          const max     = input.dataset.max ? parseInt(input.dataset.max, 10) : Infinity;
          const checked = [...this.el.querySelectorAll(`[name="${input.name}"]:checked`)];

          // Enforce max
          if (input.checked && checked.length > max) {
            input.checked = false;
            input.closest('.stlf__opt').classList.remove('selected');
            return;
          }

          input.closest('.stlf__opt').classList.toggle('selected', input.checked);

          if (input.value === '__other_option__') {
            if (input.checked) this._showOther(input.name);
            else this._hideOther(input.name);
          }

          this._updateCounter(input.name, max === Infinity ? null : max);
          if (max !== Infinity) this._updateDisabled(input.name, max);
          this._clearError(input.name);
        });
      });
  }

  /* ── Helper: show/hide Other text input ─────────────────── */
  _showOther(name) {
    const oi = this.el.querySelector(`[name="${name}.other_option_response"]`);
    if (oi) { oi.style.display = ''; oi.focus(); }
  }
  _hideOther(name) {
    const oi = this.el.querySelector(`[name="${name}.other_option_response"]`);
    if (oi) { oi.style.display = 'none'; oi.value = ''; }
  }

  /* ── Helper: update checkbox counter ────────────────────── */
  _updateCounter(name, max) {
    if (!max) return;
    const idSafe  = name.replace(/\./g, '-');
    const counter = this.el.querySelector(`#counter-${idSafe}`);
    if (!counter) return;
    const count = [...this.el.querySelectorAll(`[name="${name}"]:checked`)].length;
    counter.textContent = `${count} / ${max} selected`;
    counter.classList.toggle('stlf__counter--maxed', count >= max);
  }

  /* ── Helper: disable/enable overflow checkboxes ─────────── */
  _updateDisabled(name, max) {
    const all   = [...this.el.querySelectorAll(`[name="${name}"]`)];
    const count = all.filter(c => c.checked).length;
    all.forEach(cb => {
      const opt = cb.closest('.stlf__opt');
      const lock = !cb.checked && count >= max;
      opt.classList.toggle('disabled', lock);
      lock
        ? cb.setAttribute('aria-disabled', 'true')
        : cb.removeAttribute('aria-disabled');
    });
  }

  /* ── Helper: clear field error ───────────────────────────── */
  _clearError(name) {
    const fieldEl = this.el.querySelector(`[data-field="${name}"]`);
    const errEl   = fieldEl?.querySelector('.stlf__error');
    if (errEl) errEl.textContent = '';
  }

  /* ── Save current step answers to this.data ─────────────── */
  _saveStep() {
    STEPS[this.step].fields.forEach(f => {
      if (f.type === 'radio') {
        const checked = this.el.querySelector(`[name="${f.id}"]:checked`);
        this.data[f.id] = checked ? checked.value : '';
        const oi = this.el.querySelector(`[name="${f.id}.other_option_response"]`);
        if (oi) this.data[`${f.id}.other_option_response`] = oi.value;

      } else if (f.type === 'checkbox') {
        this.data[f.id] = [...this.el.querySelectorAll(`[name="${f.id}"]:checked`)]
          .map(c => c.value);
        const oi = this.el.querySelector(`[name="${f.id}.other_option_response"]`);
        if (oi) this.data[`${f.id}.other_option_response`] = oi.value;

      } else {
        const input = this.el.querySelector(`[name="${f.id}"]`);
        this.data[f.id] = input ? input.value : '';
      }
    });
  }

  /* ── Validate required fields in current step ───────────── */
  _validate() {
    let valid        = true;
    let firstErrEl   = null;

    STEPS[this.step].fields.forEach(f => {
      const fieldEl = this.el.querySelector(`[data-field="${f.id}"]`);
      const errEl   = fieldEl?.querySelector('.stlf__error');
      if (errEl) errEl.textContent = '';   // reset

      // Check required
      if (f.required) {
        let empty = false;
        if (f.type === 'radio') {
          empty = !this.el.querySelector(`[name="${f.id}"]:checked`);
        } else if (f.type === 'checkbox') {
          empty = [...this.el.querySelectorAll(`[name="${f.id}"]:checked`)].length === 0;
        } else {
          empty = !(this.el.querySelector(`[name="${f.id}"]`)?.value || '').trim();
        }
        if (empty) {
          valid = false;
          if (errEl) errEl.textContent = 'This field is required.';
          if (!firstErrEl) firstErrEl = fieldEl;
        }
      }

      // Email format check
      if (f.type === 'email' && !firstErrEl) {
        const emailVal = (this.el.querySelector(`[name="${f.id}"]`)?.value || '').trim();
        if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          valid = false;
          if (errEl) errEl.textContent = 'Please enter a valid email address.';
          if (!firstErrEl) firstErrEl = fieldEl;
        }
      }
    });

    if (firstErrEl) {
      firstErrEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return valid;
  }

  /* ── Navigate forward ────────────────────────────────────── */
  _advance() {
    if (!this._validate()) return;
    this._saveStep();

    if (this.step < STEPS.length - 1) {
      this.step++;
      this.render();
      this.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      this._submit();
    }
  }

  /* ── Navigate backward ───────────────────────────────────── */
  _back() {
    this._saveStep();
    this.step--;
    this.render();
    this.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ── Build payload and POST to Google Forms ──────────────── */
  async _submit() {
    this._showLoading();

    const params = new URLSearchParams();

    for (const [key, val] of Object.entries(this.data)) {
      if (Array.isArray(val)) {
        val.forEach(v => { if (v) params.append(key, v); });
      } else if (val) {
        params.append(key, val);
      }
    }

    // Hidden Google Forms fields required for multi-page forms
    params.append('fvv',         '1');
    params.append('pageHistory', '0,1,2,3,4');
    params.append('fbzx',        String(Math.floor(Math.random() * 1e18)));

    try {
      await fetch(FORM_ACTION, {
        method:  'POST',
        mode:    'no-cors',   // Google Forms doesn't send CORS headers
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    params.toString(),
      });
    } catch (err) {
      console.error('[SEEK THE LIGHT] Submission error:', err);
    }

    this._showSuccess();
  }

  /* ── Loading screen ──────────────────────────────────────── */
  _showLoading() {
    this.el.innerHTML = `
      <div class="stlf stlf--state">
        <div class="stlf__spinner" aria-hidden="true"></div>
        <p class="stlf__state-text">Submitting your response…</p>
      </div>`;
  }

  /* ── Success screen ──────────────────────────────────────── */
  _showSuccess() {
    this.el.innerHTML = `
      <div class="stlf stlf--state stlf--success" aria-live="polite">
        <div class="stlf__success-mark" aria-hidden="true">✦</div>
        <h3 class="stlf__success-title">Thank You</h3>
        <p class="stlf__success-body">
          Your response has been received. You're on our early-access list —
          we'll reach out before launch with your discount and a first look at the collection.
        </p>
        <p class="stlf__success-sub">Seek the light. Wear the journey.</p>
      </div>`;
  }
}

/* ── Public initialiser ─────────────────────────────────────── */
export function initForm() {
  const container = document.getElementById('stl-form');
  if (container) new MultiStepForm(container);
}
