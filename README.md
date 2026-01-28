# Web-Whisper Dashboard

An enterprise-grade, AI-powered website builder dashboard built with React.js.  
Web-Whisper is designed as a production-ready, tool-first application with a strict dark design system, fixed navigation, and functional AI-driven features.

---


## Objective

Deliver a premium, enterprise-grade dashboard that:

- Maximizes user productivity
- Uses fixed navigation with clear information hierarchy
- Provides functional AI tools, especially Voice Builder
- Maintains performance, accessibility, and responsiveness
- Requires no explanation to use

---

## Core Features

### Authentication
- Signup and Login pages
- Form validation and error handling
- Loading states
- Redirect to Dashboard on success
- Protected routes for all dashboard pages

### Navigation
- Fixed sidebar and top bar
- Responsive behavior across all breakpoints
- Sidebar active state indicators
- Mobile drawer navigation

### Dashboard Sections (7)
1. Overview – Welcome message, CTA, stat cards
2. Projects – Website list or card view with empty states
3. Voice Builder – Speech-to-text commands, dynamic UI generation, undo support
4. Content AI – Text input, AI generation, output preview
5. Analytics – Stat cards, animated charts, dummy metrics
6. Integrations – Domain, SEO, third-party tools with locked indicators
7. Settings – Profile, preferences, logout

---

## Design System (Strict)

### Color Palette
- Background Base: `#030014`
- Primary Accent: `#7350FF`
- Gradient Accent: `linear-gradient(135deg, #B638FF, #863AFF)`
- Primary Text: `#FFFFFF`
- Opacity levels only: `100%`, `70%`, `50%`, `30%`

### Typography
- Headings (H1–H4): Plus Jakarta Sans
- Body and UI text: Poppins

| Type | Size | Weight |
|----|----|----|
| H1 | 32–36px | Semibold |
| H2 | 24–28px | Semibold |
| H3 | 20–22px | Medium |
| H4 | 16–18px | Medium |
| Body | 14–16px | Regular |
| Labels | 13–14px | Medium |

---

## Layout Architecture

### Sidebar
- Fixed left, 100vh height
- Desktop width: 260px
- Tablet (640–1024px): icons only
- Mobile (<640px): hidden, drawer navigation

### Top Bar
- Fixed top, 64px height
- Full width minus sidebar
- Centered search input  
  Placeholder: `Search projects, pages, tools…`
- Right side:
  - Notifications icon
  - User avatar dropdown (Profile, Settings, Logout)

### Main Content
- Only scrollable area
- Offset below top bar and beside sidebar
- No body scrolling
- No horizontal scrolling

---

## Responsive Breakpoints

- Mobile: <640px
- Tablet: 640–1024px
- Desktop: ≥1024px

Mobile behavior:
- Sidebar hidden as drawer
- Search becomes icon opening full-width modal
- Cards stack vertically
- Reduced motion

---

## Animation Guidelines

- Duration: 150–250ms
- Easing: ease-out
- CSS transitions preferred
- Framer Motion used only when necessary

### Animations Implemented
- Sidebar active indicator slide
- Sidebar hover shift
- Top bar search focus glow
- Dropdown fade and slide
- Staggered card fade-in
- Button hover scale
- Analytics count-up numbers
- Chart draw animations
- Voice Builder mic pulse
- Section fade-in and slide-up

---

## Tech Stack

- React.js
- Tailwind CSS
- Component-based architecture
- Web Speech API
- Framer Motion (limited use)
- No over-engineering

---

## Development Principles

- Mobile-first responsive design
- Accessibility-focused UI
- Performance-first mindset
- Strict adherence to the design system
- Clean, maintainable, production-ready code

---

## Outcome

Web-Whisper delivers a tool-first, enterprise dashboard experience with fixed navigation, clear visual hierarchy, and functional AI-powered features.

Built for scale. Built for real users.
