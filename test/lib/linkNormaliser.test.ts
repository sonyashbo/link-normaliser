import LinkNormaliser from "../../src/lib/linkNormaliser";

describe('linkNormaliser', () => {
    const linkNormaliser = new LinkNormaliser();

    it('adds http protocol if necessary', () => {
        // in the assignment example, http protocol is added in case it is missing
        // however, it would be safer to add https
        const linksToNormalise  = ['www.flickr.com/', 'https://www.google.com/'];
        const normalisedLinks = linkNormaliser.normaliseUrls(linksToNormalise);
        expect(normalisedLinks).toEqual(['https://www.flickr.com/', 'https://www.google.com/']);
    });

    it('removes dot segments', () => {
        const linkWithDotSegment = 'https://example.com/bla/././bla'
        const normalisedLinks = linkNormaliser.normaliseUrls([linkWithDotSegment]);
        expect(normalisedLinks).toEqual(['https://example.com/bla/bla']);
    })

    it('adds a trailing "/" to a non-empty path', () => {
        const link = 'https://www.google.com';
        const normalisedLinks = linkNormaliser.normaliseUrls([link]);
        expect(normalisedLinks).toEqual([`${link}/`]);
    })
})
