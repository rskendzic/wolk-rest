![coverage-lines-badge](https://img.shields.io/badge/Lines-81.45%25%20%28417%2F512%29-yellow.svg)
![coverage-statements-badge](https://img.shields.io/badge/Statements-81.73%25%20%28483%2F591%29-yellow.svg)
![coverage-functions-badge](https://img.shields.io/badge/Functions-85.5%25%20%28112%2F131%29-brightgreen.svg)
![coverage-branches-badge](https://img.shields.io/badge/Branches-63.83%25%20%2830%2F47%29-yellow.svg)
![Local Coverage-shield-badge-1](https://img.shields.io/badge/Local%20Coverage-100%25-brightgreen.svg)

# WolkAbout SDK

Node.js/Web client library for using [WolkAbout REST APIs](https://restapi.wolkabout.com/).

## Getting Started

### Installation

This library is distributed on `npm`. In order to add it as a dependency, run the following command:

`$ npm install wolk-rest`

### First example

Create a new instance of the WolkREST with your baseURL and [SessionStorageConfig](src/model/SessionStorageConfig.ts) [optional].

```typescript
const wolkREST = new WolkREST({
  baseURL: 'https://api-verification3.wolksense.com'
});

// Or use Browser's local storage for saving sessions
const wolkRESTBrowser = new WolkREST(
  baseURL: 'https://api-verification3.wolksense.com',
  {
    type: 'LOCAL_STORAGE'
  }
);

// continue by signing in
async () => {
  const user = await wolkRest.auth().emailSignIn({
    username: 'YOUR_EMAIL',
    password: 'YOUR_PASSWORD'
  });
};
```

### Samples
There are several **samples**. If you're trying to figure out how to use an API ... look there first! If there's a sample you need missing, feel free to file an **issue**.

### Reference API
This library provides generated [Reference API documentation](https://wolkabout.github.io/wolk-rest).

## Contributing

Contributions are always welcome! Before submitting a Pull Request, it's always good to start with a new issue first. To learn more, see **CONTRIBUTING**.

## License

This library is licensed under [Apache 2.0](LICENSE.md).
