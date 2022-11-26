import request from 'supertest';
import serverRoutes from '../../src/routes/routes'
import app from '../../src/app'

app.use("/", serverRoutes);

describe("testing-server-routes", () => {
    describe('GET', () => {
        describe('/', () => {
            it("success", async () => {
                const res = await request(app).get("/ping");
                expect(res.status).toEqual(200);
                expect(res.body).toEqual({message: 'pong'});
            });
        });
        describe('/nonexistend', () => {
            it("not found", async () => {
                const res = await request(app).get("/nonexistent");
                expect(res.status).toEqual(404);
            });
        })
    });

    describe('POST', () => {
        describe('/', () => {
            const sendText = async (text: string) => {
                return request(app).post("/").set({
                    'Content-Type': 'text/plain',
                    Accept: '*/*',
                    'Cache-Control': 'no-cache',
                    'Accept-Encoding': 'gzip, deflate',
                    'Content-Length': Buffer.byteLength(text),
                    Connection: 'keep-alive',
                }).send(text);
            }
            it("success", async () => {
                const text = 'Visit photo hosting sites such as www.flickr.com, 500px.com, www.freeimagehosting.net and\n' +
                    'https://postimage.io, and upload these two image files, picture.dog.png and picture.cat.jpeg,\n' +
                    'there. After that share their links at https://www.facebook.com/ and http://🍕.ws';
                const res = await sendText(text);
                expect(res.status).toEqual(200);
                expect(res.body).toEqual([
                    "https://www.flickr.com,/",
                    "https://500px.com,/",
                    "https://www.freeimagehosting.net/",
                    "https://postimage.io,/",
                    "https://picture.dog.png/",
                    "https://picture.cat.jpeg,/",
                    "https://www.facebook.com/",
                    "http://xn--vi8h.ws/"
                ]);
            });

            it('returns empty list if no links exist', async() => {
                const text = 'Visit photo hosting sites! Google, Flickr, Postimage, Facebook and others';
                const res = await sendText(text);
                expect(res.status).toEqual(200);
                expect(res.body).toEqual([]);
            })
        })
    })
});
