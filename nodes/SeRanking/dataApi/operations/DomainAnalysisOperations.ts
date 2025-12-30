import { IExecuteFunctions } from 'n8n-workflow';
import { apiRequest } from '../../utils/apiRequest';
import { validateDomain, validateSource } from '../../utils/validators';

export async function DomainAnalysisOperations(
	this: IExecuteFunctions,
	index: number
): Promise<any> {
	const operation = this.getNodeParameter('operation', index) as string;
	
	let endpoint = '';
	const params: any = {};
	const method = 'GET';

	switch (operation) {
		case 'getOverviewDb': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/domain/overview/db';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);
			params.with_subdomains = additionalFields.withSubdomains ? 1 : 0;
			break;
		}

		case 'getOverviewWorldwide': {
			const domain = this.getNodeParameter('domain', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/domain/overview/worldwide';
			params.domain = validateDomain(domain);
			
			if (additionalFields.currency) params.currency = additionalFields.currency;
			if (additionalFields.fields) params.fields = additionalFields.fields.join(',');
			if (additionalFields.showZonesList !== undefined) {
				params.show_zones_list = additionalFields.showZonesList ? 1 : 0;
			}
			
			// Make API request
			const response = await apiRequest.call(this, method, endpoint, {}, params, index);
			
			// Add domain to response for identification
			if (Array.isArray(response)) {
				return response.map(item => ({
					...item,
					_domain: validateDomain(domain)
				}));
			} else if (typeof response === 'object' && response !== null) {
				return {
					...response,
					_domain: validateDomain(domain)
				};
			}
			
			return response;
		}

		case 'getWorldwideAggregateUrl': {
			const url = this.getNodeParameter('url', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			if (!url || url.trim() === '') {
				throw new Error('URL cannot be empty');
			}
			if (!url.match(/^https?:\/\//i)) {
				throw new Error('URL must include http:// or https://');
			}
			
			endpoint = '/domain/overview/worldwide/url';
			params.url = url.trim();
			
			if (additionalFields.fields) params.fields = additionalFields.fields.join(',');
			break;
		}

		case 'getDomainPages': {
			const target = this.getNodeParameter('target', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			const scope = this.getNodeParameter('scope', index, 'base_domain') as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/domain/pages';
			params.target = validateDomain(target);
			params.source = validateSource(source);
			params.type = type;
			params.scope = scope;
			
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.orderField) params.order_field = additionalFields.orderField;
			if (additionalFields.orderType) params.order_type = additionalFields.orderType;
			
			// Filters
			if (additionalFields.filterDomainUrl) params['filter[domain_url]'] = additionalFields.filterDomainUrl;
			if (additionalFields.trafficPercentFrom) params['filter[domain_traffic_percent][from]'] = additionalFields.trafficPercentFrom;
			if (additionalFields.trafficPercentTo) params['filter[domain_traffic_percent][to]'] = additionalFields.trafficPercentTo;
			if (additionalFields.keywordsCountFrom) params['filter[keywords_count][from]'] = additionalFields.keywordsCountFrom;
			if (additionalFields.keywordsCountTo) params['filter[keywords_count][to]'] = additionalFields.keywordsCountTo;
			if (additionalFields.trafficSumFrom) params['filter[traffic_sum][from]'] = additionalFields.trafficSumFrom;
			if (additionalFields.trafficSumTo) params['filter[traffic_sum][to]'] = additionalFields.trafficSumTo;
			if (additionalFields.priceSumFrom) params['filter[price_sum][from]'] = additionalFields.priceSumFrom;
			if (additionalFields.priceSumTo) params['filter[price_sum][to]'] = additionalFields.priceSumTo;
			break;
		}

		case 'getDomainSubdomains': {
			const target = this.getNodeParameter('target', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/domain/subdomains';
			params.target = validateDomain(target);
			params.source = validateSource(source);
			params.type = type;
			params.scope = 'base_domain'; // Subdomains only works with base_domain
			
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.orderField) params.order_field = additionalFields.orderField;
			if (additionalFields.orderType) params.order_type = additionalFields.orderType;
			
			// Filters
			if (additionalFields.filterDomainUrl) params['filter[domain_url]'] = additionalFields.filterDomainUrl;
			if (additionalFields.trafficPercentFrom) params['filter[domain_traffic_percent][from]'] = additionalFields.trafficPercentFrom;
			if (additionalFields.trafficPercentTo) params['filter[domain_traffic_percent][to]'] = additionalFields.trafficPercentTo;
			if (additionalFields.keywordsCountFrom) params['filter[keywords_count][from]'] = additionalFields.keywordsCountFrom;
			if (additionalFields.keywordsCountTo) params['filter[keywords_count][to]'] = additionalFields.keywordsCountTo;
			if (additionalFields.trafficSumFrom) params['filter[traffic_sum][from]'] = additionalFields.trafficSumFrom;
			if (additionalFields.trafficSumTo) params['filter[traffic_sum][to]'] = additionalFields.trafficSumTo;
			if (additionalFields.priceSumFrom) params['filter[price_sum][from]'] = additionalFields.priceSumFrom;
			if (additionalFields.priceSumTo) params['filter[price_sum][to]'] = additionalFields.priceSumTo;
			break;
		}

		case 'getOverviewHistory': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index, 'organic') as string;
			
			endpoint = '/domain/overview/history';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);
			params.type = type;
			break;
		}

		case 'getKeywords': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/domain/keywords';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);
			params.type = type;
			
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.withSubdomains !== undefined) {
				params.with_subdomains = additionalFields.withSubdomains ? 1 : 0;
			}
			if (additionalFields.cols) params.cols = additionalFields.cols.join(',');
			if (additionalFields.orderField) params.order_field = additionalFields.orderField;
			if (additionalFields.orderType) params.order_type = additionalFields.orderType;
			
			// Filters
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;
			if (additionalFields.positionFrom) params['filter[position][from]'] = additionalFields.positionFrom;
			if (additionalFields.positionTo) params['filter[position][to]'] = additionalFields.positionTo;
			if (additionalFields.cpcFrom) params['filter[cpc][from]'] = additionalFields.cpcFrom;
			if (additionalFields.cpcTo) params['filter[cpc][to]'] = additionalFields.cpcTo;
			break;
		}

		case 'getKeywordsComparison': {
			const domain = this.getNodeParameter('domain', index) as string;
			const compareDomain = this.getNodeParameter('compareDomain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/domain/keywords/comparison';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);
			params.compare = validateDomain(compareDomain);  
			params.type = type;
			
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.offset) params.offset = additionalFields.offset;
			if (additionalFields.cols) params.cols = additionalFields.cols.join(',');
			if (additionalFields.orderField) params.order_field = additionalFields.orderField;
			if (additionalFields.orderType) params.order_type = additionalFields.orderType;
			
			// Filters
			if (additionalFields.volumeFrom) params['filter[volume][from]'] = additionalFields.volumeFrom;
			if (additionalFields.volumeTo) params['filter[volume][to]'] = additionalFields.volumeTo;
			break;
		}

		case 'getCompetitors': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const type = this.getNodeParameter('type', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			endpoint = '/domain/competitors';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);
			params.type = type;
			
			if (additionalFields.limit) params.limit = additionalFields.limit;
			if (additionalFields.stats !== undefined) {
				params.stats = additionalFields.stats ? 1 : 0;
			}
			if (additionalFields.excludeLeaders !== undefined) {
				params.exclude_leaders = additionalFields.excludeLeaders ? 1 : 0;
			}
			break;
		}

		case 'getAdsForKeyword': {
			const keyword = this.getNodeParameter('keyword', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			if (!keyword || keyword.trim() === '') {
				throw new Error('Keyword cannot be empty');
			}
			
			
			endpoint = '/domain/ads';
			params.source = validateSource(source);
			params.keyword = keyword.trim();
			
			if (additionalFields.from) params.from = additionalFields.from;
			if (additionalFields.to) params.to = additionalFields.to;
			if (additionalFields.page) params.page = additionalFields.page;
			if (additionalFields.limit) params.limit = additionalFields.limit;
			break;
		}

		case 'getAdsForDomain': {
			const domain = this.getNodeParameter('domain', index) as string;
			const source = this.getNodeParameter('source', index) as string;
			const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
			
			
			endpoint = '/domain/ads';
			params.source = validateSource(source);
			params.domain = validateDomain(domain);
			
			if (additionalFields.from) params.from = additionalFields.from;
			if (additionalFields.to) params.to = additionalFields.to;
			if (additionalFields.page) params.page = additionalFields.page;
			if (additionalFields.limit) params.limit = additionalFields.limit;
			break;
		}

		default:
			throw new Error(`Unknown Domain Analysis operation: ${operation}`);
	}

	return await apiRequest.call(this, method, endpoint, {}, params, index);
}