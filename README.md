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

### Listing 5.7. Preparing the index.html file in the src folder

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>SportsStore</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body class="p-2">
  <app>SportsStore Will Go Here</app>
</body>
</html>
```

### Table 5.1. The additional folders required for the SportsStore project

```text

Folder                        Description
SportsStore/src/app/model     This folder will contain the code for the data model.
SportsStore/src/app/store     This folder will contain the functionality for basic shopping.
SportsStore/src/app/admin     This folder will contain the functionality for administration. 
```

### 5.1.5 Running the example application

1. RUN `http://localhost:3500/products/1`
2. `npm run json`

### 5.2 Preparing the Angular project features

### 5.2.1 Updating the root component

1. Listing 5.8. Replacing the contents of the app.component.ts file in the src/app folder

```Typescript
import { Component } from "@angular/core";
 
@Component({
  selector: "app",
  template: `<div class="bg-success p-2 text-center text-white">
                This is SportsStore
             </div>`
})
export class AppComponent { }
```

### 5.2.2 Inspecting the root module

There are two types of Angular modules: feature modules and the root module. Feature modules are used to group related application functionality to make the application easier to manage. I create feature modules for each major functional area of the application, including the data model, the store interface presented to users, and the administration interface.

### Listing 5.9. The initial contents of the app.module.ts file in the src/app folder

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from './app.component';
 
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 5.3 Starting the data model

The best place to start any new project is the data model. I want to get to the point where you can see some Angular features at work, so rather than define the data model from end to end, I am going to put some basic functionality in place using dummy data. I’ll use this data to create user-facing features and then return to the data model to wire it up to the RESTful web service in chapter 6.

### 5.3.1 Creating the model classes

1. Listing 5.11. The contents of the product.model.ts file in the src/app/model folder

```typescript
export class Product {
 
    constructor(
        public id?: number,
        public name?: string,
        public category?: string,
        public description?: string,
        public price?: number) { }
}
```

### 5.3.2 Creating the dummy data source

1. Listing 5.12. The contents of the static.datasource.ts file in the src/app/model folder

```typescript
import { Injectable, Signal, signal } from "@angular/core";
import { Product } from "./product.model";
 
@Injectable()
export class StaticDataSource {
    private data: Product[] = [
        new Product(1, "Product 1", "Category 1", 
            "Product 1 (Category 1)", 100),
        new Product(2, "Product 2", "Category 1", 
            "Product 2 (Category 1)", 100),
        new Product(3, "Product 3", "Category 1", 
            "Product 3 (Category 1)", 100),
        new Product(4, "Product 4", "Category 1", 
            "Product 4 (Category 1)", 100),
        new Product(5, "Product 5", "Category 1", 
            "Product 5 (Category 1)", 100),
        new Product(6, "Product 6", "Category 2", 
            "Product 6 (Category 2)", 100),
        new Product(7, "Product 7", "Category 2", 
            "Product 7 (Category 2)", 100),
        new Product(8, "Product 8", "Category 2", 
            "Product 8 (Category 2)", 100),
        new Product(9, "Product 9", "Category 2", 
            "Product 9 (Category 2)", 100),
        new Product(10, "Product 10", "Category 2", 
            "Product 10 (Category 2)", 100),
        new Product(11, "Product 11", "Category 3", 
            "Product 11 (Category 3)", 100),
        new Product(12, "Product 12", "Category 3", 
            "Product 12 (Category 3)", 100),
        new Product(13, "Product 13", "Category 3", 
            "Product 13 (Category 3)", 100),
        new Product(14, "Product 14", "Category 3", 
            "Product 14 (Category 3)", 100),
        new Product(15, "Product 15", "Category 3", 
            "Product 15 (Category 3)", 100),
    ];
 
    products: Signal<Product[]> = signal<Product[]>(this.data)
}
```

The StaticDataSource class defines a property named products, which returns the dummy data. The type of the value returned by the products property is a Signal<Product[]>, which is an example of a signal. Signals are the headline addition to Angular 16 and they are used to describe the relationships between the data values used by an application, which helps Angular update the HTML content it presents to the user as efficiently as possible. Signals are included in Angular 16 as a preview, which means the API may change in Angular 17 and that the signal features are not yet fully integrated into the rest of the Angular API.

Signals are created with the signal<T> function, where T is the type of data contained by the signal. In this case, the type is an array of Product objects. As you will see shortly, signals of this type are used to create derived data values that are updated efficiently, as I explain in detail in part 2.

### 5.3.3 Creating the model repository

### Listing 5.13. The contents of the product.repository.ts file in the src/app/model folder

```typescript
import { Injectable, Signal, computed } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";
 
@Injectable()
export class ProductRepository {
    products: Signal<Product[]>;
    categories: Signal<string[]>;
 
    constructor(private dataSource: StaticDataSource) {
        this.products = dataSource.products;
        this.categories = computed(() => {
            return this.dataSource.products()
                .map(p => p.category ?? "(None)")
                .filter((c, index, array) => 
                    array.indexOf(c) == index).sort();
        })
    }
 
    getProduct(id: number): Product | undefined {
        return this.dataSource.products().find(p => p.id == id);
    }
}

```
