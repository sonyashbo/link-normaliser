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

    it('finds links with query string', () => {
        const linksWithQueryString  = ['example.com?color=black', 'example.com?color=black&size=small'];
        const rawText = `Here are some links with query string: ${linksWithQueryString[0]} and also ${linksWithQueryString[1]}`;
        const result = parser.parse(rawText);
        expect(result).toEqual(linksWithQueryString);
    });

    it('finds www links with query string', () => {
        const linksWithQueryString  = ['www.example.com?color=black', 'www.example.com?color=black&size=small'];
        const rawText = `Here are some www links with query string: ${linksWithQueryString[0]} and also ${linksWithQueryString[1]}`;
        const result = parser.parse(rawText);
        expect(result).toEqual(linksWithQueryString);
    });

    it('finds https links with query string', () => {
        const linksWithQueryString  = ['https://www.example.com?color=black', 'https://www.example.com?color=black&size=small'];
        const rawText = `Here are some https links with query string: ${linksWithQueryString[0]} and also ${linksWithQueryString[1]}`;
        const result = parser.parse(rawText);
        expect(result).toEqual(linksWithQueryString);
    });

    it('finds www links with anchors', () => {
        const linksWithAnchors = ['www.example.com/#here', 'www.example.com/over#there'];
        const rawText = `Here are some www links with anchors: ${linksWithAnchors[0]} and also ${linksWithAnchors[1]}`;
        const result = parser.parse(rawText);
        expect(result).toEqual(linksWithAnchors);
    });

    it('finds https links with anchors', () => {
        const linksWithAnchors = ['https://www.example.com/#here', 'https://www.example.com/over#there'];
        const rawText = `Here are some https links with anchors: ${linksWithAnchors[0]} and also ${linksWithAnchors[1]}`;
        const result = parser.parse(rawText);
        expect(result).toEqual(linksWithAnchors);
    });

    it('finds links with anchors', () => {
        const linksWithAnchors = ['example.com/#here', 'example.com/over#there'];
        const rawText = `Here are some links with anchors: ${linksWithAnchors[0]} and also ${linksWithAnchors[1]}`;
        const result = parser.parse(rawText);
        expect(result).toEqual(linksWithAnchors);
    });

    it('exclude files', () => {
        const website = 'www.freeimagehosting.net';
        const links = [website, 'picture.cat.jpeg', 'picture.dog.png', 'picture.dog.jpg'];
        const rawText = `This is a website: ${links[0]}. And here are some files: ${links[1]} and also ${links[2]} and ${links[3]}.`;
        const result = parser.parse(rawText);
        expect(result).toEqual([website]);
    });

    it('Does not parse non-links', () => {
        const rawText = 'Here are some confusing combinations... Like/this/or/this... Or add something else!../the end/.';
        const result = parser.parse(rawText);
        expect(result).toEqual([]);
    })
})
