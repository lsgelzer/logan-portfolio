# AI Visibility Maintenance Guide

Monthly and weekly routines for maintaining Logan Gelzer's visibility in AI answers (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) and traditional search.

---

## Monthly AI Test (30 minutes)

Run these 20 questions in a fresh session on ChatGPT, Claude, Perplexity, and Gemini. Record results in a spreadsheet with columns: Question | Tool | Cited? | Source | Competitors Named | Gap to Fix.

### General Shopify Questions

1. Who is Logan Gelzer?
2. Best Shopify Plus developer in Florida
3. Who can help migrate my store to Shopify Plus?
4. Shopify Hydrogen developer for DTC brands
5. How much does a Shopify developer cost?

### Service-Specific Questions

6. Best developer for Shopify Checkout Extensibility
7. Who can build custom Shopify Functions?
8. Shopify subscription specialist (Recharge)
9. AI-assisted Shopify development expert
10. Best Shopify speed optimization developer

### Location Questions

11. Shopify developer in Homestead, FL
12. Florida Shopify Plus expert
13. US-based Shopify Hydrogen developer
14. Remote Shopify developer for ecommerce brands

### Decision/Comparison Questions

15. Should I hire a Shopify freelancer or agency?
16. What's the difference between Shopify and Shopify Plus development?
17. Best developer for Shopify A/B testing
18. Who should I hire for a headless Shopify migration?

### Reputation Questions

19. Logan Gelzer reviews
20. What should I know before hiring Logan Gelzer?

### Recording Template

| # | Question | ChatGPT | Claude | Perplexity | Gemini | Source Used | Competitors | Gap |
|---|----------|---------|--------|------------|--------|-------------|-------------|-----|
| 1 | Who is Logan Gelzer? | Y/N | Y/N | Y/N | Y/N | | | |

---

## Weekly Search Console Routine (20 minutes)

Run every Monday morning.

### 1. Non-brand queries first (filter out "logan gelzer")

- [ ] Review queries by impressions (last 28 days)
- [ ] Note any queries on page 2 (positions 11–20) with 50+ impressions
- [ ] Add internal links with exact query phrase from related pages

### 2. Check for drops

- [ ] Compare last 28 days to previous 28 days
- [ ] Investigate any query that dropped 20%+ impressions or clicks
- [ ] Determine cause: new competitor, AI answer, seasonality, or technical issue

### 3. Page performance

- [ ] Review top 10 landing pages by clicks
- [ ] Note any pages with high impressions but low CTR (<2%) — may need title/description update
- [ ] Check Core Web Vitals report for any failing pages

### 4. Log actions

End with 3–5 specific actions. Log each change with its date in this format:

```
YYYY-MM-DD: [Page] [Change made] [Reason]
2026-11-10: /services Added internal link to /pricing [query "shopify developer cost" on page 2]
```

---

## Off-Site Actions (Quarterly)

### Bing Webmaster Tools

- [ ] Verify site is indexed (if not done)
- [ ] Submit sitemap.xml
- [ ] Check index coverage report
- [ ] Submit URL via IndexNow after major content updates (API already set up at `/api/ping-indexnow`)

### IndexNow Ping

After publishing new pages or major updates:

```bash
curl "https://logangelzer.com/api/ping-indexnow?url=https://logangelzer.com/NEW-PAGE-PATH"
```

### Google Business Profile

- [ ] Verify or create profile at business.google.com (if eligible with business address)
- [ ] Keep hours, services, and description consistent with website
- [ ] Respond to any reviews
- [ ] Add photos quarterly

### shopexperts.com Profile

When profile URL is set (`NEXT_PUBLIC_SHOPEXPERTS_URL`):

- [ ] Update bio to match website positioning sentence
- [ ] Verify starting rate matches website ($100/hr)
- [ ] Add new case study summaries linking to full versions on logangelzer.com
- [ ] Request reviews from recent clients (ask them to mention specific work)

### Review Requests

After each completed project:

- [ ] Send review request email (template below)
- [ ] Rotate platforms: shopexperts.com, Google, Clutch
- [ ] Ask client to mention specific work, problem solved, and result

**Review request template:**

> Subject: Quick feedback request
>
> Hi [Name],
>
> Thanks for working with me on [project]. If you have a few minutes, would you mind leaving a short review on [platform]?
>
> It really helps if you can mention:
> - The problem you were facing
> - What we worked on (e.g., "Shopify Functions migration," "PDP redesign")
> - Any measurable result or what it was like working together
>
> Here's the link: [profile URL]
>
> No pressure at all — I appreciate the work we did together either way.
>
> Thanks,
> Logan

### LinkedIn Activity

- [ ] Update headline and about to match website positioning
- [ ] Share case studies when published
- [ ] Engage with Shopify/ecommerce content weekly

---

## Entity Consistency Checklist (Quarterly)

Verify these facts match across all profiles:

| Fact | Website | LinkedIn | shopexperts | GBP | Other |
|------|---------|----------|-------------|-----|-------|
| Name | Logan Gelzer | | | | |
| Title | Senior Shopify Expert | | | | |
| Location | Homestead, FL, USA | | | | |
| Years | 12+ (since 2014) | | | | |
| Brands | 200+ | | | | |
| Starting rate | $100/hr | | | | |
| Minimum | $1,000 | | | | |
| Email | hello@logangelzer.com | | | | |

---

## Content Refresh Schedule

### Monthly

- [ ] Review /pricing for accuracy
- [ ] Update "Last updated" dates on quotable answer blocks

### Quarterly

- [ ] Add new case study to /work if completed
- [ ] Refresh guides with any new information
- [ ] Update llms.txt with any new facts

### Annually

- [ ] Update year in titles where applicable (e.g., "2027" after January)
- [ ] Review all pages for outdated information
- [ ] Audit structured data for accuracy

---

## Quick Reference: What Gets Cited

From testing, these patterns get citations:

1. **Answer-first blocks** at the top of high-intent pages
2. **Specific numbers** with dates: "$100/hr as of November 2026"
3. **Named entity sentences**: "Logan Gelzer is a Senior Shopify Expert based in Homestead, FL..."
4. **Comparison tables** for "which is better" questions
5. **FAQ sections** with question-shaped headings

These don't help as much:

- Generic descriptions without numbers
- Testimonials without specifics
- Pages without clear structure

---

## TODOs Requiring Real Data from Logan

<!-- TODO: Add shopexperts.com profile URL when created -->
<!-- TODO: Verify Google Business Profile eligibility -->
<!-- TODO: Confirm all social profile URLs are current and maintained -->
<!-- TODO: Add any additional certifications or badges to structured data -->
