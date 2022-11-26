export default class Parser {
  private urlRegex = /([^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;

  private fileNameRegex = /^[a-z0-9_.@()-]+\.txt$/i;

  private excludeFiles(links: string[]): string[] {
    return links.filter(link => {
      const isFile = this.fileNameRegex.test(link);
      return !isFile;
    });
  }

  public parse(rawText: string): string[] {
    const matched = rawText.matchAll(this.urlRegex);
    const links = [...matched].map(match => match[0]);
    return this.excludeFiles(links);
  }
}
