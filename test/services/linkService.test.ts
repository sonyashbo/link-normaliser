import LinkService from "../../src/services/linkService";

describe('linkService', () => {
    const service = new LinkService();
    it('getLinks', () => {
        const rawText = 'Visit photo hosting sites such as www.flickr.com, 500px.com, www.freeimagehosting.net and\n' +
            'https://postimage.io, and upload these two image files, picture.dog.png and picture.cat.jpeg,\n' +
            'there. After that share their links at https://www.facebook.com/ and http://🍕.ws';
        const result = service.getLinks(rawText);
        expect(result).toEqual([
            "https://www.flickr.com/",
            "https://500px.com/",
            "https://www.freeimagehosting.net/",
            "https://postimage.io/",
            "https://www.facebook.com/",
            "http://xn--vi8h.ws/"
        ]);
    })
})
