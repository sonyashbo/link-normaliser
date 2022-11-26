import Parser from "../../src/lib/parser";

describe('parser', () => {
    const parser = new Parser();
    it('finds links starting with https', () => {
        const httpsLinks = ['https://postimage.io', 'https://www.facebook.com/'];
        const rawText = `Here are some https links: ${httpsLinks[0]} and ${httpsLinks[1]}`;
        const result = parser.parse(rawText);
        expect(result).toEqual(httpsLinks);
    });

    it('finds links starting with http', () => {
        const httpLinks = ['http://postimage.io', 'http://🍕.ws'];
        const rawText = `Here are some http links: ${httpLinks[0]} and ${httpLinks[1]}`;
        const result = parser.parse(rawText);
        expect(result).toEqual(httpLinks);
    });

    it('finds links starting with www', () => {
        const wwwLinks = ['www.flickr.com', 'www.google.com'];
        const rawText = `Here are some www links: ${wwwLinks[0]} and ${wwwLinks[1]}`;
        const result = parser.parse(rawText);
        expect(result).toEqual(wwwLinks);
    });

    it('exclude files', () => {
        const fileNameRegex = /^[a-z0-9_.@()-]+\.txt|png|jpg|jpeg$/i;
        const links = ['www.freeimagehosting.net', 'picture.cat.jpeg', 'picture.dog.png', 'picture.dog.jpg'];
        const filesExcluded = links.filter((link) => {
            const isFile = fileNameRegex.test(link);
            return !isFile;
        })
        expect(filesExcluded).toEqual(['www.freeimagehosting.net']);
    });
})
