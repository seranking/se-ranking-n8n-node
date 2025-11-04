# SE Ranking Domain Analysis Workflows

Automatically transform SE Ranking API responses into structured, Google Sheets-ready data with intelligent type detection and multi-domain comparison capabilities.

## Overview

This collection includes two workflows for processing SE Ranking domain analysis data:

1. **Domain Analysis Data Processor & Multi-Sheet Exporter** - Processes various SE Ranking domain analysis data types and exports them to Google Sheets with automatic categorization, timestamps, and formatting
2. **Domain Traffic & Competitor Analysis** - Multi-domain comparison with worldwide and regional traffic data for easy analysis and dashboard creation

---

## Workflow 1: Domain Analysis Data Processor & Multi-Sheet Exporter

### What This Workflow Does

- Fetches Domain Analysis Data from SE Ranking API (regional, keywords, competitors, etc.)
- Detects Data Type automatically based on API response structure
- Transforms Data into flat, analysis-ready format
- Adds Metadata: Timestamps and data type labels
- Exports to Google Sheets with proper column mapping
- Creates Multiple Sheets for different data types (optional)

### Data Types Processed

#### Regional Performance
Multi-country organic and paid metrics across 200+ regions

- **Fields**: Region, organic keywords, paid keywords, organic traffic, paid traffic, avg position
- **Use Case**: Compare performance across different countries/languages

#### Domain Summary
Aggregated organic vs. paid keyword distribution and traffic

- **Fields**: Total keywords (organic/paid), estimated traffic, visibility score
- **Use Case**: High-level domain health dashboard

#### Keywords Analysis
Individual keyword positions, volume, difficulty, and traffic data

- **Fields**: Keyword, position, search volume, CPC, difficulty, traffic, URL
- **Use Case**: Keyword-level performance tracking and optimization

#### Competitor Insights
Keyword overlap, gaps, and opportunity analysis

- **Fields**: Competitor domain, common keywords, unique keywords, traffic comparison
- **Use Case**: Competitive intelligence and gap analysis

### Benefits

✅ Universal Processor: Handles all SE Ranking response formats automatically
✅ Smart Detection: No manual configuration - auto-identifies data structure
✅ Historical Tracking: Timestamps all records for trend analysis
✅ Easy Filtering: Data type labels for instant pivot tables and charts
✅ Scalable: Process thousands of keywords and regions in one run

### Setup Instructions - Workflow 1

#### Prerequisites
- SE Ranking API credentials configured in n8n
- Google Sheets account connected to n8n
- A new Google Sheet prepared (create fresh to avoid permission issues)

#### Step-by-Step Setup

1. **Import the workflow**: Download workflow.json and import via n8n UI

2. **Configure SE Ranking node**:
   ```
   Resource: Domain Analysis
   Operation: Choose your operation:
     - Get Regional Database Overview
     - Get Keywords
     - Get Competitors
     - Get Domain Summary
   Domain: yourdomain.com
   Source: us (or your target region)
   ```

3. **Configure Data Processing node (Function/Code node)**:
   - No configuration needed - automatically detects data type
   - Adds date and data_type fields to all records

4. **Configure Google Sheets node**:

   **Method 1: Single Sheet (Recommended for starting)**
   ```
   Operation: Append
   Spreadsheet: Your tracking spreadsheet
   Sheet: "Domain_Data"
   Columns: Auto-mapped from data
   ```

   **Method 2: Multi-Sheet (Advanced)**
   - Add Switch node after data processing
   - Route by data_type field
   - Create separate Google Sheets nodes for each type
   - Sheet names: "Regional", "Keywords", "Competitors", "Summary"

5. **Test the workflow**: Execute to verify data flows correctly

### Configuration Examples - Workflow 1

#### Example 1: Regional Performance Tracking
```
SE Ranking Node:
  Resource: Domain Analysis
  Operation: Get Regional Database Overview
  Domain: example.com
  Source: us

Output Columns:
  date | data_type | region | organic_keywords | paid_keywords | organic_traffic | avg_position
```

#### Example 2: Top Keywords Export
```
SE Ranking Node:
  Resource: Domain Analysis
  Operation: Get Keywords
  Domain: example.com
  Source: us
  Position From: 1
  Position To: 20
  Limit: 100

Output Columns:
  date | data_type | keyword | position | volume | cpc | difficulty | traffic | url
```

#### Example 3: Competitor Analysis
```
SE Ranking Node:
  Resource: Domain Analysis
  Operation: Get Competitors
  Domain: example.com
  Source: us
  Type: organic
  Limit: 10

Output Columns:
  date | data_type | competitor_domain | common_keywords | unique_keywords | traffic_estimate
```

### Output Format - Workflow 1

Each row includes:

- **date**: Timestamp for historical tracking (YYYY-MM-DD HH:MM:SS)
- **data_type**: Category identifier (regional_organic, keyword, competitor, etc.)
- **All Metrics**: Keywords count, traffic, positions, CPC, difficulty, and more

#### Sample Output (Keywords)
```
date                | data_type | keyword    | position | volume | cpc   | difficulty | traffic | url
--------------------|-----------|------------|----------|--------|-------|------------|---------|--------
2025-10-25 14:30:00 | keyword   | seo tools  | 5        | 12000  | 15.30 | 68         | 450     | /tools
2025-10-25 14:30:00 | keyword   | free seo   | 12       | 8500   | 8.20  | 45         | 180     | /free
```

#### Sample Output (Regional)
```
date                | data_type         | region | organic_keywords | paid_keywords | organic_traffic | avg_position
--------------------|-------------------|--------|------------------|---------------|-----------------|-------------
2025-10-25 14:30:00 | regional_organic  | us     | 15420            | 320           | 125000          | 18.3
2025-10-25 14:30:00 | regional_organic  | uk     | 8930             | 150           | 48000           | 22.1
```

---

## Workflow 2: Domain Traffic & Competitor Analysis

### What This Workflow Does

- 🔄 Analyzes **multiple domains simultaneously** for direct comparison
- 🌍 Fetches **Worldwide Traffic Data** across 200+ countries
- 📍 Gets **Regional Traffic Data** for specific markets (US, UK, etc.)
- 🔀 **Merges organic and advertising metrics** into unified view
- 📊 Exports **comparison-ready data** to Google Sheets
- ⚡ One-click execution for instant competitive analysis

### Key Features

- **Multi-Domain Support**: Compare 2+ domains side-by-side
- **Dual Data Sources**: Worldwide overview + regional deep-dive
- **Combined Metrics**: Organic vs Advertising in single rows
- **Auto-Mapping**: Smart column detection and formatting
- **Fresh Sheet Creation**: Avoids Google Sheets permission issues

### Workflow Structure

```
Manual Trigger
    ↓
Configuration (Define domains)
    ↓
    ├─→ Get Worldwide Traffic (for each domain)
    └─→ Get Regional Traffic (for each domain)
         ↓
      Merge (combine results)
         ↓
    Format Data (group by domain + country)
         ↓
    Google Sheets (export)
```

### Setup Instructions - Workflow 2

#### Prerequisites
- SE Ranking API credentials configured in n8n
- Google Sheets account connected to n8n
- **IMPORTANT**: Create a **new, fresh Google Sheet** to avoid permission issues

#### Step-by-Step Setup

1. **Import the workflow**: 
   - Download `Domain Traffic & Competitor Analysis.json`
   - Import via n8n UI: Settings → Import from File

2. **Configure domains in Configuration node**:
   ```javascript
   // Define domains to analyze
   const domains = ["seranking.com", "semrush.com", "ahrefs.com"];
   const source = "us"; // Target market

   // Return array of items, one per domain
   return domains.map(domain => ({
     json: {
       domain: domain,
       source: source
     }
   }));
   ```

3. **Connect SE Ranking API**:
   - Click on "Get Worldwide Traffic" node
   - Add your SE Ranking API credentials
   - Same credentials will be used for "Get Regional Traffic" node

4. **Create fresh Google Sheet**:
   ```
   1. Go to Google Sheets
   2. Create new spreadsheet
   3. Name it: "Domain Traffic & Competitor Analysis"
   4. Add these headers in Row 1:
      domain | source | country | organic_keywords_count | 
      organic_traffic_sum | organic_price_sum | adv_keywords_count | 
      adv_traffic_sum | adv_price_sum
   ```

5. **Configure Google Sheets node**:
   ```
   Operation: Append or Update
   Document: Select your new spreadsheet
   Sheet: Sheet1 (or your sheet name)
   Columns: Auto-map Input Data (it will match headers automatically)
   ```

6. **Test the workflow**: 
   - Click "Execute Workflow"
   - Check output in each node
   - Verify data appears in Google Sheet

### Output Format - Workflow 2

Each row includes combined metrics:

| Field | Description | Example |
|-------|-------------|---------|
| `domain` | Analyzed domain | seranking.com |
| `source` | Country/region code | us, uk, worldwide |
| `country` | Full country name | United States |
| `organic_keywords_count` | Total organic keywords ranking | 113892 |
| `organic_traffic_sum` | Estimated organic visits/month | 39928 |
| `organic_price_sum` | Organic traffic value ($) | 95690.80 |
| `adv_keywords_count` | Total paid keywords | 16 |
| `adv_traffic_sum` | Estimated paid traffic/month | 36 |
| `adv_price_sum` | Paid traffic value ($) | 83.85 |

### Sample Output - Workflow 2

```
domain          | source | country        | organic_keywords | organic_traffic | organic_price | adv_keywords | adv_traffic | adv_price
----------------|--------|----------------|------------------|-----------------|---------------|--------------|-------------|----------
seranking.com   | us     | USA            | 113892          | 39928           | 95690.80      | 16           | 36          | 83.85
seranking.com   | uk     | United Kingdom | 45681           | 27988           | 48420.13      | 311          | 1187        | 2626.73
semrush.com     | us     | USA            | 545984          | 1075102         | 774809.99     | 241          | 457         | 1722.57
semrush.com     | uk     | United Kingdom | 183464          | 224875          | 245954.33     | 2358         | 4324        | 8801.39
```

### Customization - Workflow 2

#### Add More Domains
Edit the Configuration node:
```javascript
const domains = [
  "seranking.com", 
  "semrush.com", 
  "ahrefs.com",
  "moz.com",
  "spyfu.com"
];
```

#### Change Target Market
```javascript
const source = "uk";  // Or: de, fr, es, au, ca, etc.
```

#### Add Calculated Metrics
Add this code before Google Sheets node:
```javascript
// Calculate organic vs paid ratio
const items = $input.all();

items.forEach(item => {
  const organic = item.json.organic_traffic_sum || 0;
  const paid = item.json.adv_traffic_sum || 0;
  const total = organic + paid;
  
  item.json.organic_percentage = total > 0 ? 
    Math.round((organic / total) * 100) : 0;
  
  item.json.paid_percentage = total > 0 ? 
    Math.round((paid / total) * 100) : 0;
  
  item.json.total_traffic = total;
});

return items;
```

#### Filter Specific Countries
Add after Format Data node:
```javascript
// Only include top 10 markets
const topCountries = [
  'worldwide', 'us', 'uk', 'in', 'de', 
  'fr', 'es', 'ca', 'au', 'nl'
];

return $input.all().filter(item => 
  topCountries.includes(item.json.source)
);
```

---

## Advanced Features (Both Workflows)

### Multi-Sheet Export Setup
Add after data processing node:

**Switch Node**: Route by data_type field
```
Route 0: data_type === 'regional_organic' → Regional Sheet
Route 1: data_type === 'keyword' → Keywords Sheet
Route 2: data_type === 'competitor' → Competitors Sheet
Route 3: data_type === 'summary' → Summary Sheet
```

**Google Sheets Nodes** (one per route):
- Each writes to a dedicated sheet
- Maintains clean data separation

### Scheduling
Convert to automated tracking:

```
Schedule Trigger:
  - Daily at 8:00 AM for keyword tracking
  - Weekly on Monday for regional analysis
  - Monthly for competitor updates
```

### Data Retention
Add filtering before Google Sheets:

```javascript
// Keep only last 90 days
const ninetyDaysAgo = new Date();
ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

return items.filter(item => 
  new Date(item.json.date) > ninetyDaysAgo
);
```

---

## Dashboard Ideas

### Google Sheets Pivot Tables

#### Regional Performance Dashboard (Workflow 1):
```
Rows: Region
Columns: Date
Values: Sum of organic_traffic
Filter: data_type = 'regional_organic'
```

#### Keyword Position Tracking (Workflow 1):
```
Rows: Keyword
Columns: Date
Values: Average of position
Filter: data_type = 'keyword'
```

#### Domain Comparison Dashboard (Workflow 2):
```
Rows: Domain
Columns: Country
Values: Sum of organic_traffic_sum
Show: Top 20 countries by traffic
```

#### Organic vs Paid Analysis (Workflow 2):
```
Rows: Domain
Values: 
  - Sum of organic_traffic_sum
  - Sum of adv_traffic_sum
  - Calculated: Organic % = organic / (organic + paid)
```

---

## Troubleshooting

### Data Not Appearing in Sheets

**Problem**: Google Sheets node executes but no data appears

**Solutions**:
1. ✅ **Create a fresh Google Sheet** - Old sheets may have permission issues
2. ✅ Check n8n output tab - verify data is present before Google Sheets node
3. ✅ Verify column mapping in Google Sheets node
4. ✅ Use "Append or Update" instead of "Append" operation
5. ✅ Ensure Google account has Edit permissions (not just View)

### Type Detection Failing

**Problem**: All data gets same data_type

**Solution**: Update detection logic in Function node to match your API response structure

### Rate Limiting

**Problem**: API returns 429 for large data requests

**Solution**: 
- Add pagination with Limit parameter
- Use multiple runs with Wait nodes between
- Reduce number of domains in Workflow 2

### Missing Columns

**Problem**: Some expected fields are blank

**Solution**: 
- SE Ranking returns different fields based on operation
- Update column mapping to handle optional fields
- Use default values: `item.json.field || 0`

### Google Sheets Permission Error

**Problem**: "Access denied" or "Permission denied"

**Solutions**:
1. Create a **completely new Google Sheet**
2. Re-authenticate your Google Sheets connection in n8n
3. Check that the Google account has edit access
4. Avoid using shared sheets - use personal sheets first

### Merge Node Issues (Workflow 2)

**Problem**: Data from one source missing

**Solution**:
- Check both API nodes execute successfully
- Verify Merge node is set to "Combine All"
- Ensure both input branches have data

---

## Customization Ideas

### Add Data Validation
Insert after data processing:

```javascript
// Filter out low-quality keywords
return items.filter(item => 
  item.json.volume > 100 && 
  item.json.difficulty < 70
);
```

### Calculate Custom Metrics
Add before Google Sheets:

```javascript
// Add traffic value estimate
items.forEach(item => {
  if (item.json.traffic && item.json.cpc) {
    item.json.traffic_value = item.json.traffic * item.json.cpc * 0.3;
  }
});
return items;
```

### Merge with External Data
Add HTTP Request node after SE Ranking:

- Enrich keywords with your internal conversion data
- Add content quality scores from your CMS
- Merge with Google Analytics traffic data

---

## Performance Tips

- **Batch Processing**: Use Limit and pagination for large datasets (>1000 records)
- **Column Reduction**: Only map columns you need in Google Sheets
- **Split Operations**: Run regional and keyword tracking as separate workflows
- **Cache Results**: Store processed data in n8n database for re-processing
- **Fresh Sheets**: Create new Google Sheets monthly to avoid size/permission issues

---

## Comparison: Which Workflow to Use?

| Feature | Workflow 1: Data Processor & Multi-Sheet Exporter | Workflow 2: Multi-Domain Analysis |
|---------|---------------------------------------------------|-----------------------------------|
| **Best For** | Single domain deep analysis | Competitive comparison |
| **Data Types** | Keywords, competitors, summary | Traffic & regional metrics |
| **Domains** | One domain | Multiple domains |
| **Complexity** | Moderate | Simple |
| **Output** | Multiple data types | Unified comparison table |
| **Use Case** | SEO tracking & optimization | Competitive intelligence |

**Use Both?** Absolutely! 
- Run Workflow 2 for monthly competitive reports
- Run Workflow 1 for daily keyword tracking on your main domain

---

## Additional Resources

- [SE Ranking Domain Analysis API](https://seranking.com/api/)
- [n8n Function Node Guide](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.function/)
- [Google Sheets Advanced Mapping](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)
- [n8n Schedule Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/)

---

## License

These workflows are provided as-is for demonstration purposes. Customize freely for your needs.

**Perfect for building automated SEO dashboards and long-term performance databases!**

---

## Quick Start Checklist

### For Workflow 1:
- [ ] SE Ranking API credentials added to n8n
- [ ] Google Sheets account connected
- [ ] New Google Sheet created with headers
- [ ] Domain configured in SE Ranking node
- [ ] Test execution successful

### For Workflow 2:
- [ ] SE Ranking API credentials added to n8n
- [ ] Google Sheets account connected
- [ ] Fresh Google Sheet created (important!)
- [ ] Domains list configured in Configuration node
- [ ] Both API nodes have credentials
- [ ] Merge node combines data correctly
- [ ] Test execution shows data in sheet

**Need help?** Check the Troubleshooting section above!