# Project-Wide Animation Enhancement — GSAP + React

## Role
Act as a Senior Frontend Animation Engineer specializing in GSAP, React, TypeScript, modern UI/UX, web performance, accessibility, and production-grade animation architecture.

## 1. Mandatory Skill Usage

Before making any changes, read and thoroughly understand the complete skill file:

`E:\AlMasaed-AlMubtakira\gsap-react\SKILL.md`

- Treat this skill as the primary source of implementation guidelines for GSAP and React.
- Follow its instructions, patterns, constraints, and best practices strictly.
- Inspect any additional files or references explicitly required by the skill.
- Do not skip the skill or replace its guidance with generic GSAP knowledge.
- If the skill conflicts with the existing project architecture, resolve the conflict with the smallest safe change while preserving the project's established conventions.

## 2. Main Objective

Enhance the entire existing website with subtle, elegant, modern, and visually appealing animations.

The goal is to make the website feel polished, responsive, premium, and enjoyable to use — NOT overly animated, distracting, or unnecessarily complex.

**The website must remain fully functional, visually consistent, fast, accessible, and responsive.**

This is an enhancement of the existing website, not a redesign or rewrite.

## 3. Mandatory Project Audit

Before implementation:

1. Inspect the complete project structure and identify its framework, routing, layout system, styling approach, and existing animation libraries.
2. Inspect all routes, pages, shared layouts, reusable components, navigation elements, forms, dialogs, cards, sections, and interactive elements.
3. Identify existing animations, transitions, scroll effects, and potential conflicts.
4. Identify components that should be animated once, components that should animate on every relevant interaction, and elements that should remain static.
5. Read `package.json` and reuse existing dependencies wherever appropriate.
6. Create a route-by-route animation implementation plan before modifying files.

Do not start by adding animations to only the homepage. The entire website must be audited and covered.

## 4. Animation Design Principles

Follow these principles throughout the project:

- Prefer subtle movement, smooth easing, and short-to-moderate durations.
- Prioritize visual hierarchy, usability, and meaningful feedback.
- Avoid excessive motion, unnecessary effects, and animations that slow down navigation.
- Preserve the existing design system, brand identity, typography, colors, spacing, and layout.
- Use consistent animation timing, easing, stagger intervals, and reveal patterns.
- Avoid animating every element independently when a parent-level animation is sufficient.
- Never introduce animations simply to demonstrate technical capability.
- Keep all existing content, features, routes, and business logic intact.

## 5. Required Animation Coverage

Apply animations selectively and consistently across all applicable areas.

### A. Page Transitions
- Add subtle transitions between routes where appropriate.
- Avoid blocking navigation while animations play.
- Prevent blank screens, layout flashes, and unnecessary loading delays.
- Handle browser back/forward navigation correctly.
- Ensure transitions work with the existing routing system.

### B. Scroll-Triggered Reveals
- Use tasteful fade-in and small vertical movement for important sections.
- Reveal headings, descriptions, images, and content blocks progressively.
- Use restrained stagger effects for repeated cards and lists.
- Trigger animations at appropriate viewport positions.
- Avoid hiding essential content indefinitely if JavaScript fails or animations cannot initialize.

### C. Hero Sections
- Add a refined entrance animation to hero headings, supporting text, CTAs, and visual elements.
- Use a subtle stagger sequence rather than animating everything simultaneously.
- Preserve the existing hero composition and loading performance.
- Avoid excessive parallax or continuous movement.

### D. Cards, Grids, and Content Sections
- Add subtle hover feedback where appropriate.
- Use restrained image scaling or movement only when it improves the interaction.
- Introduce staggered reveals for repeated items.
- Ensure touch devices do not depend on hover effects.

### E. Buttons and Interactive Controls
- Add subtle hover, focus, and pressed-state feedback.
- Preserve existing click behavior, keyboard navigation, and accessible focus indicators.
- Avoid exaggerated scaling, bouncing, or distracting effects.
- Do not interfere with form submission or navigation.

### F. Navigation and Menus
- Enhance dropdowns, mobile menus, tabs, accordions, and overlays with appropriate transitions.
- Ensure menus remain responsive and accessible.
- Correctly handle repeated opening and closing, rapid interactions, and route changes.

### G. Images and Media
- Use subtle entrance effects or restrained reveal transitions where appropriate.
- Avoid unnecessary movement of large images.
- Prevent layout shifts by preserving image dimensions and aspect ratios.
- Do not delay image visibility unnecessarily.

### H. Forms, Dialogs, and Feedback
- Add subtle transitions to dialogs, notifications, validation feedback, and expandable content.
- Preserve immediate interaction feedback and existing validation logic.
- Ensure animations do not interfere with focus management or screen readers.

### I. Loading, Empty, and Error States
- Enhance existing states only when it provides a meaningful UX improvement.
- Do not add artificial loading delays.
- Keep loading and error indicators clear and accessible.

## 6. GSAP and React Implementation Rules

Follow the `gsap-react` skill precisely.

- Use the appropriate React integration recommended by the skill, including `useGSAP` if specified and supported by the installed version.
- Scope animations to their component or container.
- Ensure animations and ScrollTriggers are cleaned up correctly when components unmount or routes change.
- Prevent duplicate timelines, duplicated ScrollTriggers, and memory leaks.
- Handle React Strict Mode correctly.
- Avoid direct DOM manipulation that conflicts with React rendering.
- Do not create global animations that unintentionally affect unrelated components.
- Use reusable animation utilities or hooks only when they genuinely reduce duplication and complexity.
- Keep animation configuration centralized where this improves consistency.
- Avoid creating an oversized animation framework for a small set of effects.
- Respect the existing architecture and naming conventions.
- Do not install additional dependencies unless they are necessary and justified.
- Do not mix multiple animation libraries without a clear technical reason.
- Avoid unnecessary React re-renders caused by animation state updates.

## 7. Performance Requirements

Performance is a first-class requirement.

- Prefer transforms and opacity for animations whenever possible.
- Avoid animating layout-heavy properties such as width, height, top, and left unless necessary.
- Avoid excessive ScrollTrigger instances and expensive scroll handlers.
- Avoid continuous animations that consume resources without adding meaningful value.
- Prevent layout shifts, flickering, flashing, and content jumping.
- Use `will-change` sparingly and only when justified.
- Avoid animating large numbers of DOM elements simultaneously.
- Test performance on mobile devices and slower hardware.
- Preserve smooth scrolling and immediate user interactions.
- Never sacrifice application functionality or rendering performance for decorative effects.

## 8. Accessibility and Reduced Motion

- Respect `prefers-reduced-motion`.
- Follow the skill's recommended approach for disabling or simplifying animations.
- Provide reduced-motion alternatives for users who prefer less movement.
- Ensure all content remains accessible when animations are disabled.
- Avoid flashing, disorienting motion, and excessive parallax.
- Preserve keyboard accessibility, semantic HTML, and visible focus states.

## 9. Responsive Behavior

Validate the animation experience on:

- Mobile phones.
- Tablets.
- Desktop screens.
- Large displays.

Adjust animation distance, stagger, timing, and complexity when appropriate for smaller screens or touch devices.

Do not assume that desktop hover behavior works on mobile.

## 10. Strict Implementation Workflow

Execute the task phase by phase.

**Phase 1 — Audit**
- Read the skill.
- Inspect the codebase.
- Map all routes and reusable components.
- Document existing animation conflicts and performance risks.

**Phase 2 — Animation System**
- Define a consistent set of reusable timing, easing, reveal, and interaction patterns.
- Establish reduced-motion behavior.
- Integrate GSAP using the project's existing conventions.

**Phase 3 — Shared Components**
- Implement the common patterns in shared layouts and reusable components first.
- Verify cleanup and lifecycle behavior.

**Phase 4 — Page-by-Page Implementation**
- Apply the animation system to every applicable route and section.
- Keep each page consistent with the site's existing visual identity.
- Avoid duplicating animations already provided by parent components.

**Phase 5 — Interaction and Responsive Validation**
- Test route changes, menus, forms, dialogs, scrolling, and repeated interactions.
- Validate mobile, tablet, and desktop behavior.
- Verify that reduced-motion preferences work correctly.

**Phase 6 — Performance and Quality Assurance**
- Run the existing build, type checks, and lint commands.
- Fix any errors introduced by the implementation.
- Inspect for animation leaks, duplicate triggers, layout shifts, and console errors.
- Verify that essential content remains visible and usable if animations fail to initialize.

**Phase 7 — Final Audit**
- Revisit every route and verify animation coverage.
- Identify any inconsistent, excessive, or missing animations.
- Refine the implementation until the complete site feels cohesive and polished.

Complete each phase before proceeding to the next. Do not stop after writing the plan or implementing a homepage prototype.

## 11. Strict Constraints

- Do not rebuild the website.
- Do not redesign existing pages.
- Do not change business logic, API integrations, authentication, database schemas, or routing behavior unnecessarily.
- Do not remove existing features.
- Do not introduce placeholder content.
- Do not animate every element indiscriminately.
- Do not add unnecessary packages.
- Do not leave unfinished TODOs or broken animations.
- Do not claim a test passed unless it was actually executed.
- Do not conceal build errors or pre-existing issues; distinguish them clearly from newly introduced problems.

## 12. Final Deliverables

When the implementation is complete, provide:

1. A summary of the animation system implemented.
2. A list of routes and components enhanced.
3. The shared hooks, utilities, and components created or modified.
4. Any dependencies added or removed, with justification.
5. Build, lint, and type-check results.
6. Any remaining issues or limitations.
7. A concise explanation of how reduced motion, responsive behavior, and animation cleanup are handled.

## Final Quality Standard

The result should feel like a professionally crafted modern website: elegant, smooth, responsive, and engaging, with subtle motion that supports the content rather than competing with it.

**Read the skill first, audit the entire codebase, implement systematically, validate everything, and optimize for real-world performance.**