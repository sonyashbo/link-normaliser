import { URL } from 'url';

export default class LinkNormaliser {
  private links: string[] = [];

  public normaliseUrls(links: string[]): string[] {
    this.links = links;
    this.ensureHttps();
    this.normalise();
    return this.links;
  }

  private ensureHttps() {
    this.links = this.links.map(link => {
      if (link.startsWith('http') || link.startsWith('https')) {
        return link;
      }
      return `https://${link}`;
    });
  }

  private normalise() {
    this.links = this.links.map(link => (new URL(link).href));
  }
}
