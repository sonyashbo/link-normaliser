export default class Parser {
  private urlRegex = /([^\s\.]+(\.[a-z&A-Z&0-9&_&~&\-]{2,}){1,})(\/([A-Z&a-z&0-9])*)*((\#[a-zA-Z0-9]+)|(\?[^\s\.\,]{1,}\=[^\s\.\,]{1,})*)*/gm;

  private fileNameRegex = /^[a-z0-9_.@()-]+\.txt|png|jpg|jpeg$/i;

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
