# AI Search Visibility Tracker

Track how often your brand appears in different LLM engines with automated rate limiting and historical tracking.

## Overview

This workflow monitors your brand's presence across ChatGPT and Perplexity storing results in Google Sheets for trend analysis over time.

## What This Workflow Does

1. **Fetches AI Search Overview** for your domain from ChatGPT
2. **Waits 10 seconds** (rate limit protection)
3. **Fetches data from Perplexity**
4. **Merges results** from both engines
5. **Appends to Google Sheets** with timestamp

## Key Metrics Tracked

- **Link Presence**: Number of times your brand appears in AI responses
- **Average Position**: Your brand's average ranking position in AI citations
- **AI Opportunity Traffic**: Estimated traffic potential from AI search
- **Changes**: Period-over-period comparison metrics

## Benefits

✅ **Automated Tracking**: Schedule to run daily/weekly for trend analysis  
✅ **Multi-Engine Comparison**: See performance across ChatGPT and Perplexity  
✅ **Rate Limit Safe**: Built-in wait times prevent API throttling  
✅ **Historical Data**: Track visibility changes over time in Google Sheets  
✅ **Easy Expansion**: Add more engines by duplicating nodes

## Setup Instructions

### Prerequisites

- SE Ranking API credentials configured in n8n
- Google Sheets account connected to n8n
- A Google Sheet prepared with columns: `Date`, `Engine`, `Domain`, `Link_Presence`, `Avg_Position`, `Traffic_Opportunity`

### Step-by-Step Setup

1. **Import the workflow**: Download `AIVisibilityTracker.json` and import via n8n UI

2. **Configure SE Ranking nodes**:
   - Open each SE Ranking node (ChatGPT and Perplexity)
   - Select your SE Ranking credential
   - Update `Domain` field with your website (e.g., `example.com`)
   - Keep `Source: us` or change to your target region

3. **Configure Google Sheets node**:
   - Select your Google Sheets credential
   - Choose your tracking spreadsheet
   - Select the worksheet (or create "AI Visibility Tracker")
   - Map columns: Date, Engine, Domain, Link_Presence, Avg_Position, Traffic_Opportunity

4. **Test the workflow**: Click "Execute Workflow" to verify everything works

### Configuration Options

**SE Ranking Node Settings:**

```
Resource: AI Search
Operation: Get Overview
Domain: yourdomain.com
Engine: chatgpt | perplexity
Source: us (or your target region)
Scope: base_domain
```

**Rate Limiting:**

- Current setup: 2-second delays between API calls
- Adjust "Wait" nodes if you experience rate limiting
- SE Ranking free tier: 100 requests/day

## Scheduling (Optional)

Convert Manual Trigger to Schedule Trigger for automation:

**Recommended Schedule:**

- **Trigger**: Every Monday at 9:00 AM
- **Timezone**: Your local timezone
- **Why Weekly**: AI visibility changes slowly; weekly tracking is sufficient

**Setup:**

1. Delete the "Manual Trigger" node
2. Add "Schedule Trigger" node
3. Configure: Cron Expression `0 9 * * 1` (Every Monday at 9 AM)

This creates an automated weekly AI visibility dashboard!

## Expected Output

### Google Sheets Format

| Date | Engine | Domain | Link_Presence | Avg_Position | Traffic_Opportunity |
|------|--------|--------|---------------|--------------|---------------------|
| 2025-10-25 | chatgpt | example.com | 47 | 3.2 | 1250 |
| 2025-10-25 | perplexity | example.com | 23 | 4.1 | 680 |

### Data Analysis Tips

- **Trend Tracking**: Create charts showing link presence over time per engine
- **Engine Comparison**: Compare which AI platform shows your brand most
- **Traffic Opportunity**: Sum traffic potential across all engines
- **Position Monitoring**: Alert when average position drops significantly

## Troubleshooting

### Rate Limit Errors

- **Problem**: API returns 429 errors
- **Solution**: Increase wait time between nodes to 5-10 seconds

### Missing Data

- **Problem**: Some engines return no data
- **Solution**: Verify domain is indexed; AI engines may not have data for all domains

### Duplicate Entries

- **Problem**: Multiple runs create duplicate rows
- **Solution**: Add a "Remove Duplicates" node before Google Sheets, or use "Update" instead of "Append"

## Customization Ideas

### Add More Engines

When SE Ranking adds support for additional engines, duplicate the node pattern:

1. Copy any SE Ranking node
2. Change `Engine` parameter to the new engine
3. Add Wait node after it (2 seconds)
4. Connect to Merge node

### Add Alerts

Add a Slack/Email node after Merge:

- Trigger when Link_Presence drops >20%
- Notify when new engine shows your brand

### Regional Tracking

Duplicate entire workflow for different regions:

- Change `Source` parameter (us, uk, de, etc.)
- Create separate Google Sheets tabs per region

## Additional Resources

- [SE Ranking API Documentation - AI Search](https://seranking.com/api/data/ai-search)
- [n8n Schedule Trigger Docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/)
- [Google Sheets Node Docs](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)

## License

This workflow is provided as-is for demonstration purposes. Customize freely for your needs.

---

# Competitor Topic Gap Analysis

Identify content opportunities by analyzing where competitors outrank you in AI search engines and traditional SEO.

## Overview

This advanced workflow performs comprehensive competitive analysis across AI search engines (ChatGPT, Perplexity, Gemini) and traditional SEO metrics to find high-value content gaps and keyword opportunities.

## What This Workflow Does

1. **Fetches AI visibility data** for your domain and competitor across 3 engines
2. **Calculates AI visibility gaps** with opportunity scoring
3. **Extracts competitor's top-performing content** (AI prompts and SEO keywords)
4. **Analyzes competitor's backlink authority**
5. **Gets detailed keyword metrics** for gap opportunities
6. **Prioritizes opportunities** with actionable recommendations
7. **Exports to Google Sheets** for strategic planning

## Key Metrics Tracked

### AI Visibility Gaps
- **Link Presence Gap**: How many more times competitor appears in AI responses
- **Position Gap**: Competitor's average position vs yours
- **Traffic Gap**: Estimated traffic difference from AI search

### Keyword Opportunities
- **Search Volume**: Monthly search traffic potential
- **Keyword Difficulty**: How hard to rank (0-100)
- **CPC**: Commercial value indicator
- **Estimated Traffic**: Projected visits if you rank #1

### Competitor Intelligence
- **Domain Authority**: Competitor's backlink strength
- **Top AI Prompts**: Questions triggering competitor citations
- **Top Keywords**: High-traffic terms they rank for

## Benefits

✅ **Strategic Content Planning**: Know exactly what content to create  
✅ **AI + SEO Combined**: Gaps across traditional and AI search  
✅ **Opportunity Scoring**: Automatically prioritizes HIGH/MEDIUM/LOW  
✅ **Competitive Context**: See competitor's authority and backlink profile  
✅ **Actionable Insights**: Specific recommendations for each gap  
✅ **Export Ready**: Results formatted for team collaboration

## Setup Instructions

### Prerequisites

- SE Ranking API credentials configured in n8n
- Google Sheets account connected to n8n
- A Google Sheet prepared with appropriate columns (auto-mapped by workflow)

### Step-by-Step Setup

1. **Import the workflow**: Download `SERanking-CompetitorTopicGapAnalysis.json` and import via n8n UI

2. **Configure the "Configuration" node**:
   ```
   your_domain: yourdomain.com
   competitor_domain: competitor.com
   source: us (or your target region)
   scope: base_domain
   ```

3. **Configure SE Ranking credentials**: All SE Ranking nodes should use the same credential

4. **Configure Google Sheets node**:
   - Select your Google Sheets credential
   - Choose your tracking spreadsheet
   - Select worksheet for gap analysis results
   - Columns are auto-mapped from workflow output

5. **Test the workflow**: Click "Execute Workflow" to verify (takes ~30-45 seconds due to rate limiting)

### Configuration Options

**Your Domain vs Competitor:**
- `your_domain`: Your website to analyze
- `competitor_domain`: Direct competitor to compare against
- `source`: Target region (us, uk, de, etc.)
- `scope`: base_domain (includes www) or exact_domain

**AI Engines Analyzed:**
- ChatGPT
- Perplexity
- Gemini

**Rate Limiting:**
- 3-second delays between API calls (prevents throttling)
- Total execution time: ~30-45 seconds
- Adjust "Wait" nodes if experiencing rate limits

## Expected Output

### Google Sheets Format

| rank | analysis_date | your_domain | competitor_domain | type | priority | opportunity_score | action |
|------|---------------|-------------|-------------------|------|----------|-------------------|--------|
| 1 | 2025-11-04 | example.com | competitor.com | KEYWORD_GAP | HIGH | 8,450 | Quick Win: Create optimized content |
| 2 | 2025-11-04 | example.com | competitor.com | AI_VISIBILITY_GAP | HIGH | 125 | URGENT: Create AI-optimized content |
| 3 | 2025-11-04 | example.com | competitor.com | KEYWORD_GAP | MEDIUM | 3,200 | Long-term: Build authority |

### Additional Columns Include:
- **For AI Gaps**: engine, metric, your_value, comp_value, gap
- **For Keyword Gaps**: keyword, volume, difficulty, cpc, estimated_traffic
- **Competitor Context**: competitor_authority, competitor_backlinks, competitor_ref_domains

## Understanding Opportunity Scores

### AI Visibility Gaps
```
Score = (Link Presence Gap × 0.4) + 
        (Position Gap × 0.3) + 
        (Traffic Gap × 0.3)
```
- **>100**: HIGH priority - Immediate action needed
- **50-100**: MEDIUM priority - Important but not urgent
- **<50**: LOW priority - Long-term consideration

### Keyword Gaps
```
Score = (Volume × 0.5) + 
        ((100 - Difficulty) × 0.3) + 
        (CPC × 10)
```
- **>5000**: HIGH priority - High-value opportunity
- **2000-5000**: MEDIUM priority - Good potential
- **<2000**: LOW priority - Lower ROI

## Workflow Logic

### Phase 1: AI Visibility Analysis (Parallel)
- Fetch overview for **your domain** from ChatGPT, Perplexity, Gemini
- Fetch overview for **competitor** from same engines
- Calculate gaps and opportunity scores

### Phase 2: Competitor Intelligence (Sequential)
- Extract top AI prompts triggering competitor
- Get competitor's top-ranking keywords (volume >500, position 1-20)
- Analyze competitor's backlink authority

### Phase 3: Keyword Research
- Combine AI prompts + SEO keywords
- Filter inappropriate/spam terms
- Get full keyword metrics (volume, difficulty, CPC)

### Phase 4: Opportunity Scoring
- Merge all data sources
- Calculate unified opportunity scores
- Prioritize by potential impact
- Generate actionable recommendations

## Troubleshooting

### Rate Limit Errors

- **Problem**: API returns 429 errors
- **Solution**: Increase wait times to 5 seconds in all "Wait (Rate Limit)" nodes

### No AI Visibility Data

- **Problem**: Some engines return no data for domains
- **Solution**: Normal for newer/smaller sites. Focus on keyword gaps instead.

### Inappropriate Keywords in Results

- **Problem**: Adult/spam keywords appear in gap analysis
- **Solution**: The workflow includes filtering, but you can add more terms to the `inappropriateTerms` array in the "Code in JavaScript" node

### Workflow Takes Too Long

- **Problem**: Execution exceeds 60 seconds
- **Solution**: Reduce limits in keyword nodes or split into multiple workflows

## Customization Ideas

### Analyze Multiple Competitors

1. Duplicate the competitor branch (ChatGPT → Perplexity → Gemini nodes)
2. Add second competitor in Configuration node
3. Merge all results before "Calculate AI Gaps"

### Focus on Specific Content Types

Modify "Extract Top Keywords" filters:
```javascript
// Only long-tail keywords (content opportunities)
.filter(k => k.keyword.split(' ').length >= 3)

// Only question-based keywords
.filter(k => k.keyword.startsWith('how') || 
             k.keyword.startsWith('what') ||
             k.keyword.startsWith('why'))
```

### Regional Gap Analysis

- Change `source` parameter to different regions (uk, de, fr, es)
- Run workflow for each region
- Compare regional opportunities

### Add Alerting

Insert a conditional node after "Final Opportunity Scoring":
```
IF opportunity_score > 5000 AND priority = 'HIGH'
THEN send Slack/Email notification
```

## Best Practices

### Running Frequency
- **Weekly**: For established sites tracking major competitors
- **Bi-weekly**: For growing sites with limited API quota
- **Monthly**: For enterprise analysis with multiple competitors

### Selecting Competitors
1. **Direct competitors**: Same niche, similar audience
2. **Authority leaders**: Top-ranking domains in your space
3. **Rising competitors**: Fast-growing sites threatening your position

### Acting on Results
1. **HIGH priority AI gaps**: Create comprehensive, citation-worthy content
2. **HIGH priority keyword gaps**: Target with dedicated landing pages
3. **MEDIUM opportunities**: Add to quarterly content calendar
4. **LOW opportunities**: Keep in backlog for future consideration

## Integration Ideas

### Content Calendar Automation
- Export opportunities to Notion/Airtable
- Auto-create content briefs from high-priority gaps
- Assign to content team via Slack integration

### Competitive Monitoring Dashboard
- Connect to Google Data Studio / Looker
- Create trend charts showing gap changes over time
- Set up automated reporting

### SEO Tool Integration
- Feed keyword gaps into Ahrefs/SEMrush for deeper analysis
- Export backlink data for outreach campaigns
- Sync with rank tracking tools

## Additional Resources

- [SE Ranking API Documentation - AI Search](https://seranking.com/api/data/ai-search)
- [SE Ranking API Documentation - Keyword Research](https://seranking.com/api/data/keyword-research)
- [SE Ranking API Documentation - Backlinks](https://seranking.com/api/data/backlinks)
- [n8n Code Node Documentation](https://docs.n8n.io/code-examples/)

## License

This workflow is provided as-is for demonstration purposes. Customize freely for your needs.