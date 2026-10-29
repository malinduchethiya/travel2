import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Cloud,
  ExternalLink,
  Image as ImageIcon,
  Lock,
  LogOut,
  RotateCcw,
  Save,
  Search,
  ShieldCheck,
  Sliders,
  Upload,
  UserCheck,
} from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut } from '../firebase';
import {
  DEFAULT_SITE_TEXTS,
  DEMO_IMAGE_SLOTS,
  SITE_TEXT_SECTIONS,
  useSiteContent,
} from '../content/siteContent';

const DEMO_ADMIN_SESSION_KEY = '4me_demo_admin_session_v1';

export default function AdminPanel() {
  const {
    texts,
    demoImages,
    user,
    saving,
    lastSavedAt,
    updateText,
    saveChanges,
    resetSectionToDefault,
    resetAllToDefault,
    setDemoImage,
  } = useSiteContent();

  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(() => {
    try {
      return (
        sessionStorage.getItem(DEMO_ADMIN_SESSION_KEY) === 'true' ||
        localStorage.getItem(DEMO_ADMIN_SESSION_KEY) === 'true'
      );
    } catch {
      return false;
    }
  });

  const [demoEmail, setDemoEmail] = useState('admin@4melankatours.com');
  const [demoPass, setDemoPass] = useState('4melanka2026');
  const [activeTab, setActiveTab] = useState<string>('creative');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusBanner, setStatusBanner] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const isAuthenticated = isDemoAdmin || Boolean(user);

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sessionStorage.setItem(DEMO_ADMIN_SESSION_KEY, 'true');
      localStorage.setItem(DEMO_ADMIN_SESSION_KEY, 'true');
    } catch {
      // ignore
    }
    setIsDemoAdmin(true);
    setAuthError(null);
  };

  const handleGoogleLogin = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      try {
        sessionStorage.setItem(DEMO_ADMIN_SESSION_KEY, 'true');
        localStorage.setItem(DEMO_ADMIN_SESSION_KEY, 'true');
      } catch {
        // ignore
      }
      setIsDemoAdmin(true);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Google Sign-In failed');
    }
  };

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem(DEMO_ADMIN_SESSION_KEY);
      localStorage.removeItem(DEMO_ADMIN_SESSION_KEY);
    } catch {
      // ignore
    }
    setIsDemoAdmin(false);
    if (user) {
      await signOut(auth);
    }
  };

  const handleSave = async () => {
    try {
      const res = await saveChanges();
      if (res.savedCloud) {
        setStatusBanner('Saved all text changes to Firebase Firestore & Local Storage.');
      } else {
        setStatusBanner('Saved all text changes locally (instant live update on homepage).');
      }
      setTimeout(() => setStatusBanner(null), 4000);
    } catch (err) {
      setStatusBanner(
        err instanceof Error ? `Saved locally. Cloud note: ${err.message}` : 'Saved locally.'
      );
      setTimeout(() => setStatusBanner(null), 5000);
    }
  };

  const handleDemoFileChange = (slotId: string, file: File | null) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setDemoImage(slotId, previewUrl);
    setStatusBanner(
      `Demo image loaded for "${slotId}" (Browser preview only — not uploaded to Firestore).`
    );
    setTimeout(() => setStatusBanner(null), 4000);
  };

  const currentSection = useMemo(
    () => SITE_TEXT_SECTIONS.find((s) => s.id === activeTab) || SITE_TEXT_SECTIONS[0],
    [activeTab]
  );

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return [currentSection];
    const q = searchQuery.toLowerCase();
    return SITE_TEXT_SECTIONS.map((sec) => ({
      ...sec,
      fields: sec.fields.filter(
        (f) =>
          f.label.toLowerCase().includes(q) ||
          f.key.toLowerCase().includes(q) ||
          (texts[f.key] || '').toLowerCase().includes(q)
      ),
    })).filter((sec) => sec.fields.length > 0);
  }, [searchQuery, currentSection, texts]);

  const sectionImageSlots = useMemo(() => {
    if (activeTab === 'all_media') return DEMO_IMAGE_SLOTS;
    return DEMO_IMAGE_SLOTS.filter((slot) => slot.sectionId === activeTab);
  }, [activeTab]);

  if (!isAuthenticated) {
    return (
      <div className="admin-auth-page">
        <div className="admin-auth-card">
          <div className="admin-auth-head">
            <div>
              <span className="admin-kicker">4Me Lanka Tours · CMS</span>
              <h1 className="admin-auth-title">Admin Portal</h1>
            </div>
            <div className="admin-auth-icon">
              <Lock size={20} />
            </div>
          </div>

          <form onSubmit={handleDemoLogin}>
            <div className="admin-form-group">
              <label className="admin-label">Admin Identifier</label>
              <input
                type="text"
                value={demoEmail}
                onChange={(e) => setDemoEmail(e.target.value)}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Demo Passkey</label>
              <input
                type="password"
                value={demoPass}
                onChange={(e) => setDemoPass(e.target.value)}
                className="admin-input"
              />
            </div>

            <button type="submit" className="admin-btn admin-btn--gold admin-btn--full">
              <UserCheck size={16} />
              Demo Login as Admin (Instant Access)
            </button>
          </form>

          <div className="admin-divider">
            <div className="admin-divider__line" />
            <span className="admin-divider__text">Or Firebase Cloud Auth</span>
            <div className="admin-divider__line" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="admin-btn admin-btn--outline admin-btn--full"
          >
            <Cloud size={15} />
            Sign in with Google (Firestore Sync)
          </button>

          {authError && (
            <p className="mt-4 text-xs text-amber-300 border border-amber-500/40 bg-amber-950/40 p-3">
              {authError}
            </p>
          )}

          <div className="admin-auth-foot">
            <span>Route: /admin</span>
            <Link to="/" className="admin-link">
              Back to Homepage <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Top Admin Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar__brand">
          <div className="admin-topbar__monogram">4M</div>
          <div>
            <div className="admin-topbar__title-row">
              <h1 className="admin-topbar__title">4Me Lanka Tours · Admin CMS</h1>
              <span className="admin-badge">
                {user ? `Cloud Admin (${user.email})` : 'Demo Admin Mode'}
              </span>
            </div>
            <p className="admin-topbar__sub">
              Edit Island Journal content, tour information, contact details, and images · Image previews remain local
            </p>
          </div>
        </div>

        <div className="admin-topbar__actions">
          {!user && (
            <button type="button" onClick={handleGoogleLogin} className="admin-btn admin-btn--ghost">
              <Cloud size={14} />
              Connect Google for Firestore Sync
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="admin-btn admin-btn--gold"
          >
            <Save size={14} />
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>

          <Link to="/" className="admin-btn admin-btn--outline">
            View Live Site <ExternalLink size={13} />
          </Link>

          <button type="button" onClick={handleLogout} className="admin-btn admin-btn--danger">
            <LogOut size={13} />
            Logout
          </button>
        </div>
      </header>

      {statusBanner && (
        <div className="admin-banner">
          <span className="inline-flex items-center gap-2">
            <Check size={15} />
            {statusBanner}
          </span>
          {lastSavedAt && <span>Last saved: {lastSavedAt}</span>}
        </div>
      )}

      {/* Main Layout */}
      <div className="admin-workspace">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div>
            <label className="admin-label">Search Any Site Text</label>
            <div className="admin-search-wrap">
              <Search size={14} className="admin-search-icon" />
              <input
                type="text"
                placeholder="Filter by word, title, or section..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-search-input"
              />
            </div>
          </div>

          <div>
            <div className="admin-field-head">
              <span className="admin-label">Website Sections (12)</span>
              <Sliders size={12} />
            </div>
            <nav className="admin-nav-list">
              {SITE_TEXT_SECTIONS.map((sec) => {
                const isActive = activeTab === sec.id && !searchQuery.trim();
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveTab(sec.id);
                    }}
                    className={`admin-nav-btn ${isActive ? 'is-active' : ''}`}
                  >
                    <span className="truncate">{sec.title}</span>
                    <span className="admin-nav-count">{sec.fields.length}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all_media');
                }}
                className={`admin-nav-btn admin-nav-btn--media ${
                  activeTab === 'all_media' && !searchQuery.trim() ? 'is-active' : ''
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <ImageIcon size={13} />
                  Demo Image Upload Slots
                </span>
                <span className="admin-nav-count">{DEMO_IMAGE_SLOTS.length}</span>
              </button>
            </nav>
          </div>

          <div className="admin-sidebar__foot">
            <button
              type="button"
              onClick={resetAllToDefault}
              className="admin-btn admin-btn--ghost admin-btn--full"
            >
              <RotateCcw size={13} />
              Reset Entire Site to Default
            </button>
          </div>
        </aside>

        {/* Editor Content */}
        <main className="admin-main">
          {/* Demo Image Upload Panel */}
          {sectionImageSlots.length > 0 && !searchQuery.trim() && (
            <section className="admin-panel-card">
              <div className="admin-panel-head">
                <div>
                  <span className="admin-kicker">
                    <ShieldCheck size={13} className="admin-kicker-icon" />
                    Demo Only · Local Browser Image Preview (Never Uploaded to Firestore)
                  </span>
                  <h2 className="admin-panel-title">
                    {activeTab === 'all_media'
                      ? 'All Site Image Upload Places (Demo Mode)'
                      : `${currentSection.title} — Image Upload Slots (Demo)`}
                  </h2>
                </div>
              </div>

              <div className="admin-media-grid">
                {sectionImageSlots.map((slot) => {
                  const activePreview = demoImages[slot.id];
                  const displaySrc = activePreview || slot.defaultSrc;
                  return (
                    <div key={slot.id} className="admin-media-card">
                      <div>
                        <div className="admin-media-thumb">
                          <img src={displaySrc} alt={slot.label} />
                          <span className={`admin-media-tag ${activePreview ? 'is-demo' : ''}`}>
                            {activePreview ? 'Demo Preview Active' : 'Local Project File'}
                          </span>
                        </div>
                        <h3 className="admin-media-title">{slot.label}</h3>
                        <p className="admin-media-meta">
                          Recommended: {slot.dimensionsHint} · Slot ID: {slot.id}
                        </p>
                      </div>

                      <div className="admin-topbar__actions">
                        <label className="admin-btn admin-btn--outline admin-btn--flex1">
                          <Upload size={13} />
                          Choose Demo Image
                          <input
                            type="file"
                            accept="image/*"
                            className="admin-file-hidden"
                            onChange={(e) =>
                              handleDemoFileChange(slot.id, e.target.files?.[0] || null)
                            }
                          />
                        </label>
                        {activePreview && (
                          <button
                            type="button"
                            onClick={() => setDemoImage(slot.id, null)}
                            className="admin-btn admin-btn--ghost"
                            title="Restore original local file"
                          >
                            <RotateCcw size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Text Fields Editor */}
          {activeTab !== 'all_media' &&
            filteredSections.map((sec) => (
              <section key={sec.id} className="admin-panel-card">
                <div className="admin-panel-head">
                  <div>
                    <span className="admin-kicker">
                      Live Text Editor · {sec.fields.length} Editable Fields
                    </span>
                    <h2 className="admin-panel-title">{sec.title}</h2>
                    <p className="admin-panel-sub">{sec.subtitle}</p>
                  </div>

                  <div className="admin-topbar__actions">
                    <button
                      type="button"
                      onClick={() => resetSectionToDefault(sec.id)}
                      className="admin-btn admin-btn--ghost"
                    >
                      <RotateCcw size={13} />
                      Reset Section
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="admin-btn admin-btn--gold"
                    >
                      <Save size={13} />
                      Save Section
                    </button>
                  </div>
                </div>

                <div className="admin-fields-grid">
                  {sec.fields.map((field) => {
                    const currentVal = texts[field.key] ?? '';
                    const defaultVal = DEFAULT_SITE_TEXTS[field.key] ?? '';
                    const isModified = currentVal !== defaultVal;

                    return (
                      <div
                        key={field.key}
                        className={`admin-field-card ${
                          field.multiline ? 'admin-field-card--wide' : ''
                        } ${isModified ? 'is-modified' : ''}`}
                      >
                        <div className="admin-field-head">
                          <label htmlFor={`field-${field.key}`} className="admin-label admin-label--inline">
                            {field.label}
                          </label>
                          <div className="admin-topbar__actions">
                            <span className="admin-field-key">{field.key}</span>
                            {isModified && (
                              <button
                                type="button"
                                onClick={() => updateText(field.key, defaultVal)}
                                className="admin-restore-btn"
                              >
                                Restore Default
                              </button>
                            )}
                          </div>
                        </div>

                        {field.multiline ? (
                          <textarea
                            id={`field-${field.key}`}
                            rows={3}
                            value={currentVal}
                            onChange={(e) => updateText(field.key, e.target.value)}
                            className="admin-textarea"
                          />
                        ) : (
                          <input
                            id={`field-${field.key}`}
                            type="text"
                            value={currentVal}
                            onChange={(e) => updateText(field.key, e.target.value)}
                            className="admin-input"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
        </main>
      </div>
    </div>
  );
}
