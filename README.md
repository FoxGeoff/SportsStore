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

## Project introduction

1. Run `json-server --watch db.json`
2. Ref: <https://livebook.manning.com/book/pro-angular-16>

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

### Notes

When Angular needs to create a new instance of the repository, it will inspect the class and see that it needs a StaticDataSource object to invoke the ProductRepository constructor and create a new object.

The repository uses the signal created by the data source in different ways. The simplest use is to read the data contained in the signal, like this:

```Typescript
...
getProduct(id: number): Product | undefined {
    return this.dataSource.products().find(p => p.id == id);
}
...

```


Signals are read by invoking them like a function, which is a little awkward until you get used to the syntax. The expression this.dataSource.products() returns the array of Product objects managed by the signal, which can then be used like any other array, including calling the find method.

A more complex use is to create a computed signal, like this:

```typescript
...
constructor(private dataSource: StaticDataSource) {
    this.categories = computed(() => {
        return this.dataSource.Products()
            .map(p => p.category ?? "(None)")
            .filter((c, index, array) => 
                array.indexOf(c) == index).sort();
    })
}
...

```

The computed function accepts a function argument that generates a value using one or more other signals. In this case, the argument function reads the value of the products signal and uses the map and filter array methods to generate a string array containing the products categories.

Angular won’t recompute the value of the computed signal unless the underlying signals change. In this case, this means that the mapping and filtering of the products will only be done when the products change. As I explain in part 2, this is a change from the way that Angular has traditionally worked and helps avoid recomputing values that have not changed.

Don’t worry if signals don’t make immediate sense. You will get a better idea of how they work as application features are added and I describe them in more detail in part 2 of this book.

### 5.3.4 Creating the feature module

1. Listing 5.14. The contents of the model.module.ts file in the src/app/model folder

```typescript
import { NgModule } from "@angular/core";
import { ProductRepository } from "./product.repository";
import { StaticDataSource } from "./static.datasource";
 
@NgModule({
    providers: [ProductRepository, StaticDataSource]
})
export class ModelModule { }
```

### 5.4 Starting the store

### 5.4.1 Creating the store component and template

```typescript
//Listing 5.15. The contents of the store.component.ts file in the src/app/store folder
// NOTE: This is  NOY Standalone component - we used standalone
import { Component, Signal } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
 
@Component({
    selector: "store",
    templateUrl: "store.component.html"
})
export class StoreComponent {
    products: Signal<Product[]>;
    categories: Signal<string[]>;
 
    constructor(private repository: ProductRepository) { 
        this.products = repository.products
        this.categories = repository.categories;
    }
}
```

### 5.4.2 Creating the store feature module

```typescript
// Listing 5.17. The contents of the store.module.ts file in the src/app/store folder
// NB we do not use this because StoreComponent is marked standalone
// TDB make lazt loading

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module";
// import { StoreComponent } from "./store.component";
 
@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule],
    declarations: [StoreComponent],
    exports: [StoreComponent]
})
export class StoreModule { }
```

### 5.4.3 Updating the root component and root module

```typescript
import { Component } from "@angular/core";
 
@Component({
    selector: "app",
    template: "<store></store>"
})
export class AppComponent { }
```

### Fix using Signals and Dependency Injection with Standalone Components

1. Ref: Listing 5.14. The contents of the model.module.ts file in the src/app/model folder

### Listing 5.20. Adding elements in the store.component.html file in the src/app/store folder

## Task: 5.5.2 Adding category selection

### Listing 5.21. Category filtering in the store.component.ts file in the src/app/store folder

### Listing 5.22. Adding category buttons in the store.component.html file in the src/app/store folder

## 5.5.3 Adding product pagination

### Listing 5.23. Adding pagination in the store.component.ts file in the src/app/store folder

### Listing 5.24. Adding pagination in the store.component.html file in the src/app/store folder

## 5.5.4 Creating a custom directive

### Listing 5.25. The contents of the counter.directive.ts file in the src/app/store folder

```text
Tip

This directive deletes all the content it has created and starts again when the number of pages changes. This can be an expensive process in more complex directives, and I explain how to improve performance in part 2.
```

### Listing 5.26. Registering the custom directive in the store.module.ts file in the src/app/store folder

1. required for the use of `CounterDirective` ONLY (WIP 1/8/2023)

```typescript
// TBD: Needs to be modified for standalone components
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module";
import { StoreComponent } from "./store.component";
import { CounterDirective } from "./counter.directive";

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule],
    declarations: [StoreComponent, CounterDirective],
    exports: [StoreComponent]
})
export class StoreModule { }
```

```text
Now that the directive has been registered, 
it can be used in the store component’s 
template to replace the ngFor directive, 
as shown in listing 5.27.
```

### Listing 5.27. Replacing the built-in directive in the store.component.html file in the src/app/store folder

```text
***THIS WILL BE COMPLETED LATER***
There is no visual change to the SportsStore application, but this section has demonstrated that it is possible to supplement the built-in Angular functionality with custom code that is tailored to the needs of a specific project.
```

## 6 SportsStore: orders and checkout

1. Ref <https://livebook.manning.com/book/pro-angular-16/chapter-6/v-2>

```text

This chapter covers

    Creating a shopping cart
    Using URLs to navigate within the application
    Creating and storing customer orders
    Using a RESTful web service

```