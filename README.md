# Link Normaliser

## Description
This simple application helps you to retrieve and normalise web links from a text. See description of the task in `src/public/url-scanner-assignment-v1.2.2.pdf`.

In short, the requirements are:
 - the application should be a web service with `POST api/normalise` API endpoint;
 - `POST api/normalise` endpoint should receive a plain text via POST request with `Content-Type: text/plain`;
 - `POST api/normalise` endpoint should return a list of links retrieved from the text;
 - Links should be normalised links compliant with RFC.

The assignment is open-ended, and some choices are remained to be made by the developer, namely, me. Some of these choices:
- According to the [RFC 3986](https://en.wikipedia.org/wiki/URI_normalization), an empty path should be converted to a `/` path, e.g. 
`http://example.com` -> `http://example.com/`; 
In the assignment example from `src/public/url-scanner-assignment-v1.2.2.pdf`, this is not done. 
I decided to follow [RFC 3986](https://en.wikipedia.org/wiki/URI_normalization) convention and in this application, this is implemented.
- In the assignment example, `http://` scheme is added for the links without it in the beginning of the link.
In this application, a more secure extension scheme `https://` is added;
- To distinguish between a file (e.g. `cat.png` and a website (e.g. `flickr.com`), a regex was used
with a finite set of file extension. However, this would not allow us to distinguish between a website
`flickr.com` and a file `flickr.com`, since `.com` is also a valid file extension. Hence, these rules would need to be optimized according to the business needs.

## Testing
An application is tested with unit tests that verify multiple url cases. To run unit tests locally, run 
```shell
npm run test
```

To be able to run the tests, you should have `node` installed on your machine.

## Usage
### Run the application locally
To run the application locally on your machine, run
```shell
npm run start
```
from the root directory. The logs would display that the service is running
```shell
Server is running on port 8000
```

### Run the application in docker
To run the application in docker, build an image by running the following command in the root directory
```shell
docker build -t link-normaliser-app .
```
and run the container
```shell
docker run -p 8000:8000 --rm -d link-normaliser-app
```

### Use the application
Once the application is started with docker or locally, you can start sending the requests, e.g. with Postman or curl. E.g.

request
```shell
curl -X POST http://localhost:8000/api/normalise -H "Content-Type: text/plain" -d "Here is some-link.com"
```
response
```shell
["https://ddd.com/"]
```

request
```shell
curl -X POST http://localhost:8000/api/normalise -H "Content-Type: text/plain" -d "Visit photo hosting sites such as www.flickr.com, 500px.com?q=gsgsg&qq=we, www.freeimagehosting.net and
https://postimage.io, and upload these two image files, picture.dog.png and picture.cat.jpeg,
there. After that share their links at https://www.facebook.com/ and http://🍕.ws."
```

response
```shell
["https://www.flickr.com/","https://500px.com/?q=gsgsg&qq=we","https://www.freeimagehosting.net/","https://postimage.io/","https://www.facebook.com/","http://xn--vi8h.ws/"]
```


