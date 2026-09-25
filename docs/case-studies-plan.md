# Case Studies & Audit Portfolio — Implementation Plan

Status: **Deferred** — implement after core positioning PRs (Hero, Services, Pricing Tabs, About/Process) are merged and reviewed.

## Overview

Add an "Audits & Improvements" subsection to the Selected Work section, showcasing real audit case studies alongside the existing 4 build projects.

## Case Studies Ready to Implement

### 1. HÉROS (Shopify + Klaviyo) — Campaign Cleanup (~$1,200)

- **Problem:** Test content and overlapping email forms covering the product hero on a featured collection page
- **Issues:** Test form label ("footer") and button text ("…") visible to customers, two "GET ON THE LIST" modals appearing simultaneously
- **Impact:** Cleaner first impression, improved product visibility

### 2. La Cucucina Silviana (GoHighLevel) — Full Site Audit + Fixes (~$2,500–$3,500)

- **Problem:** Small pastry business with ecommerce issues affecting orders and support
- **Issues:** Contradictory pickup addresses (92123 vs 92111), typo in customer service email ("silvanapastryhef" missing 'c'), inconsistent refund policies, duplicate pricing
- **Impact:** Fewer misdirected inquiries, improved trust

### 3. The Peruvian Spot — (details to be added)

### 4. Mujer Divina Brunch Café (Custom/GoDaddy) — Website Optimization (~$4,500–$6,500)

- **Problem:** Strong brand & reviews but broken mobile experience and missing conversion infrastructure
- **Issues:** Broken mobile carousel, missing privacy policy, no email signup form, no conversion tracking, weak CTA hierarchy, no catering lead funnel
- **Impact:** Improved mobile experience for Instagram traffic, captured catering leads

### 5. Mama G's Kitchen & Sauces — Technical + Business Opportunity Audit (~$2,000–$3,500)

- **Problem:** CRITICAL: Homepage returns 502 Bad Gateway while Google/listings actively send customers
- **Issues:** Website down/intermittent, weak discoverability, inconsistent hours across platforms, unclaimed Tripadvisor, bottled sauce business underleveraged
- **Pitch:** "Your website is currently returning server errors while Google and review sites are sending customers to you."

### 6. Château de Lésigny (Wix) — Premium Venue / Bilingual Website Polish (~€700–€4,000+)

- **Problem:** Spectacular property but unfinished/published editor content + inconsistent bilingual pricing
- **Issues:** Live Wix placeholder text ("Add a general description..."), €550 pricing discrepancy between French/English, stale galleries (2021-2022 vs 2024-2026 awards)
- **Pitch:** "Your château communicates elegance and detail. The website should too."

## Card Template Structure

Each audit case study card should include:

1. **Business name** + platform (Shopify, Squarespace, GoHighLevel, Wix, etc.)
2. **Tag:** e.g. "Website Audit · Restaurant" or "Campaign Cleanup · Ecommerce"
3. **One-line problem summary**
4. **Key issues found** (2–4 bullets)
5. **Service tier + price range**

## Design Considerations

- Reuse the existing `.work-card` component pattern
- Add a tab or subsection toggle: "Custom Builds" / "Audits & Improvements"
- Audit cards should NOT link to client sites (privacy) — instead show a before/after description or redacted screenshot
- Consider adding a "Types of issues I find" summary above the cards

## Implementation Notes

- Keep existing 4 build projects exactly as they are
- Audit cards go in a separate grid or tab within the Work section
- No screenshots of client sites without explicit permission
- Platform badges (Shopify, Wix, GoHighLevel) add credibility
