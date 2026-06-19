# Contact Form Plan

## Goal

Add a UI-only contact form to the existing React/Tailwind app without backend submission or external service integration.

## Context

- The app is a single-page Vite React app.
- Current app shell renders only the hero: `src/App.tsx`.
- The hero uses `motion/react`, `lucide-react`, Tailwind CSS, and the existing minimal gray/white visual style.
- Tailwind is configured through `src/index.css` with the custom Helvetica font.

## Decisions

1. **Submission behavior:** UI-only.
   - No network request.
   - No backend endpoint dependency.
   - Form submission should show a local success state after client-side validation passes.

2. **Placement:** current page.
   - Add the contact section below the existing hero content within the current single-page view.
   - Do not create a separate route/page.
   - Do not convert the existing Book Demo button into a modal.

3. **Fields:** full inquiry fields.
   - Name
   - Email
   - Phone
   - Subject
   - Message

4. **Visual style:** match existing style.
   - Minimal white/gray palette.
   - Rounded cards.
   - Subtle shadows.
   - Helvetica/Tailwind typography.
   - Responsive layout compatible with the existing hero container.

## Implementation Tasks

1. Create a reusable contact form component, likely `src/components/ContactForm.tsx`.
2. Add the component below the existing hero content in `src/App.tsx`.
3. Implement controlled form state for all fields.
4. Implement client-side validation:
   - Required: name, email, subject, message.
   - Email must be syntactically valid.
   - Phone can be optional, but if entered it should reject obviously invalid input.
5. Add form behavior:
   - Prevent default form submission.
   - Clear or surface validation errors inline.
   - Show a local success message after valid submission.
   - Reset the form after successful UI-only submission.
6. Keep styling consistent with existing components:
   - Use Tailwind utility classes.
   - Avoid adding unrelated global CSS unless necessary.
   - Use `motion/react` only if it matches existing interaction patterns and does not add unnecessary complexity.
7. Preserve accessibility:
   - Use semantic `form`, `label`, `input`, `select`, and `textarea` elements.
   - Associate labels with inputs through `htmlFor` and `id`.
   - Add `aria-describedby` for error text.
   - Ensure focus and hover states are visible.
8. Run validation commands:
   - `npm run build`
   - `npm run lint`

## Validation Criteria

- The contact form appears below the hero on the current page.
- All required fields validate before the local success state appears.
- Invalid email and invalid phone values show inline errors.
- Submitting a valid form shows a local success message and resets the fields.
- The UI remains responsive on mobile and desktop.
- The build and lint commands pass.

## Out of Scope

- Backend submission.
- Email delivery.
- Captcha or spam protection.
- Routing changes.
- Separate contact page.
- Modal behavior for the existing Book Demo button.
