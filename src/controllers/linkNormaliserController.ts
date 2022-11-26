import LinkService from "../services/linkService";

export default class LinkNormaliserController {
    public async post(rawText: string): Promise<string[]> {
        const linkService = new LinkService();
         return linkService.getLinks(rawText);
    }
}
