import Parser from "../lib/parser";
import LinkNormaliser from "../lib/linkNormaliser";

export default class LinkService {
    constructor() {
        this.linkNormaliser = new LinkNormaliser();
        this.parser = new Parser();
    }

    private parser: Parser;
    private linkNormaliser: LinkNormaliser;

    public getLinks(rawText: string): string[] {
        try {
            const parsedLinks = this.parser.parse(rawText);
            return this.linkNormaliser.normaliseUrls(parsedLinks);
        }
        catch (e) {
            throw Error(`Something went wrong: ${e}`);
        }
    }
}
