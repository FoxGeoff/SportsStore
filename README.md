# SportsStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### Task Add commands to install packages

```typescript
cd SportsStore
npm install bootstrap@5.2.3
npm install @fortawesome/fontawesome-free@6.2.1
npm install --save-dev json-server@0.17.3
npm install --save-dev jsonwebtoken@8.5.1
```

### Listing 5.2. Changing the application configuration using PowerShell

```typescript
ng config projects.SportsStore.architect.build.options.styles `
'[""src/styles.css"",
""node_modules/@fortawesome/fontawesome-free/css/all.min.css"",
""node_modules/bootstrap/dist/css/bootstrap.min.css""]'
```

Check

```typescript
C:\Users\foxge\Github\SportsStore>ng config projects.SportsStore.architect.build.options.styles
[
  "src/styles.css",
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
]
```

### 5.1.2 Preparing the RESTful web service

I added the json-server package to the project in the previous section. This is an excellent package for creating web services from JSON data or JavaScript code. Add the statement shown in listing 5.4 to the scripts section of the `package.json` file so that the json-server package can be started from the command line.

```json
...
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "ng test",
  "json": "json-server data.js -p 3500 -m authMiddleware.js"        
},
...

```

### Listing 5.5. The contents of the data.js file in the SportsStore folder

```Typescript

module.exports = function () {
  return { 
      products: [
          { id: 1, name: "Kayak", category: "Watersports", 
              description: "A boat for one person", price: 275 },
          { id: 2, name: "Lifejacket", category: "Watersports", 
              description: "Protective and fashionable", price: 48.95 },
          { id: 3, name: "Soccer Ball", category: "Soccer", 
              description: "FIFA-approved size and weight", 
              price: 19.50 },
          { id: 4, name: "Corner Flags", category: "Soccer", 
              description: "Give your playing field a professional touch", 
              price: 34.95 },
          { id: 5, name: "Stadium", category: "Soccer", 
              description: "Flat-packed 35,000-seat stadium", 
              price: 79500 },
          { id: 6, name: "Thinking Cap", category: "Chess", 
              description: "Improve brain efficiency by 75%", price: 16 },
          { id: 7, name: "Unsteady Chair", category: "Chess", 
              description: "Secretly give your opponent a disadvantage", 
              price: 29.95 },
          { id: 8, name: "Human Chess Board", category: "Chess", 
              description: "A fun game for the family", price: 75 },
          { id: 9, name: "Bling King", category: "Chess", 
              description: "Gold-plated, diamond-studded King", 
              price: 1200 }
      ],
      orders: []
  }
}
```

### Listing 5.6. The contents of the authMiddleware.js file in the SportsStore folder

```typescript

const jwt = require("jsonwebtoken");

const APP_SECRET = "myappsecret"; // TODO for production
const USERNAME = "admin"; // TODO for production
const PASSWORD = "secret"; // TODO for production

const mappings = {
    get: ["/api/orders", "/orders"],
    post: ["/api/products", "/products", "/api/categories", "/categories"]
}

function requiresAuth(method, url) {
    return (mappings[method.toLowerCase()] || [])
        .find(p => url.startsWith(p)) !== undefined;
}

module.exports = function (req, res, next) {
    if (req.url.endsWith("/login") && req.method == "POST") {
        if (req.body && req.body.name == USERNAME
              && req.body.password == PASSWORD) {
            let token = jwt.sign({ data: USERNAME, expiresIn: "1h" },
              APP_SECRET);
            res.json({ success: true, token: token });
        } else {
            res.json({ success: false });
        }
        res.end();
        return;
    } else if (requiresAuth(req.method, req.url)) {
        let token = req.headers["authorization"] || "";
        if (token.startsWith("Bearer<")) {
            token = token.substring(7, token.length - 1);
            try {
                jwt.verify(token, APP_SECRET);
                next();
                return;
            } catch (err) { }
        }
        res.statusCode = 401;
        res.end();
        return;
    }
    next();
}
```
