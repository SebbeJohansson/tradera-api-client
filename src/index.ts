// Export all types
export * from './generated/search/index.js';

// Optional: Create a convenience wrapper
import { createClientAsync, type SearchClient } from './generated/search/client.js';

export class TraderaSearchClient {
  private client: SearchClient | null = null;
  private wsdlUrl = 'http://api.tradera.com/v3/SearchService.asmx?WSDL';

  private async initialize() {
    if (!this.client) {
      this.client = await createClientAsync(this.wsdlUrl);
    }
    return this.client;
  }

  async search(params: Parameters<SearchClient['Search']>[0]) {
    const client = await this.initialize();
    return client.Search(params);
  }
}

// Export a singleton instance
export const traderaSearch = new TraderaSearchClient();