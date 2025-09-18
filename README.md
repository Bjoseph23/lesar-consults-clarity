# Lesar Consults Website

A professional consulting firm website with comprehensive contact page built with React, TypeScript, and Tailwind CSS.

## Project info

**URL**: https://lovable.dev/projects/347d8fc5-f65c-4639-911e-26a053a35b94

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/347d8fc5-f65c-4639-911e-26a053a35b94) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/347d8fc5-f65c-4639-911e-26a053a35b94) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Contact Page Configuration

### Calendly Integration

To add your Calendly booking widget to the contact page:

1. Open `src/components/contact/CalendlyEmbed.tsx`
2. Find the comment `// TODO: Paste your Calendly embed script or iframe here`
3. Replace the placeholder with your actual Calendly embed code

Example Calendly embed:
```tsx
<div 
  className="calendly-inline-widget" 
  data-url="https://calendly.com/your-username/consultation" 
  style={{minWidth:'320px',height:'630px'}}
></div>
<script 
  type="text/javascript" 
  src="https://assets.calendly.com/assets/external/widget.js" 
  async
></script>
```

### Contact Information

Update contact details in `src/data/contact-seed.ts`:

- Email address
- Phone number
- Office address
- Office hours
- Social media links

### Privacy Policy

Update the privacy policy link in the contact form:

1. Open `src/components/contact/ContactForm.tsx`
2. Find the privacy policy link in the consent checkbox
3. Replace `href="#"` with your actual privacy policy URL

## Contact Form Features

- **Real-time Validation**: Inline error messages and field validation
- **File Upload**: Support for PDF and DOCX files up to 20MB
- **Multi-select Services**: Choose from 7 predefined services
- **Responsive Design**: Works on all device sizes
- **Accessibility**: Full keyboard navigation and screen reader support
- **Success State**: Confirmation page with submission summary
- **URL Prefilling**: Support for ?service= and ?source= query parameters

## Form Fields

### Required Fields
- Full Name
- Organization/Institution
- Email Address
- Phone Number
- Services of Interest
- Project Description
- Consent Checkbox

### Optional Fields
- Role/Job Title
- Estimated Budget (KSh ranges)
- Proposed Timeframe
- File Upload (PDF/DOCX, max 20MB)
