# Solutions Monorepo

This project was generated using [Nx](https://nx.dev).

## Library Structure [Code Organization]

### libs

- __app1__

  (_basic_)

  > assets
  >
  > styles

  (_user interface examples_)
  
  > ui-themes

  (_util examples_)
  
  > util-config
  >
  > util-lang
  >
  > util-environments

- __app2__

   > ( ... )

- __shared__

  (_basic_)

  > assets
  >
  > styles

  (_data examples_)

  > data-access-core
  >
  > data-access-models
  >
  > data-access-fake-api
  
  (_feature examples_)
  
  > feature-auth
  >
  > feature-material
  >
  > feature-ngbootstrap
  >
  > feature-ecommerce
  >
  > feature-builder
  >
  > feature-crud
  >
  > feature-dashboard
  >
  > feature-email
  >
  > feature-user-management
  >
  > feature-wizards
  >
  > feature-material
  
  (_user interface examples_)

  > ui-general
  >
  > ui-formatters
  >
  > ui-partials
  >
  > ui-portlets
  >
  > ui-pages
  >
  > ui-widgets

  (_utility examples_)

  > util-directives
  >
  > util-dictionaries
  >
  > util-services
  >
  > util-environments

---

## How to share assets between apps

### Configuration instructions

Goal of this section is to demonstrate how to set up assets sharing between multiple apps.

We are going to generate two demo apps and configure assets sharing.

#### Generate demo apps

Run `nx generate @nrwl/web:application --name=demo1 --no-interactive` to generate a first demo app. You can also use Nx Console for this task.

Run `nx generate @nrwl/web:application --name=demo2 --no-interactive` to generate second demo app.

#### Configure Asset Sharing

In `workspace.json` under `projects.demo1app.architect.build.options.assets` array, add following settings as a custom object notation (since targeted location is outside of the root directory of this app).

```bash
{
  "options": "libs/shared/assets/images",
  "glob": "**/*",
  "output": "assets"
}
```

You can add, as many as you need, config objects. Repeat process for the second app.

#### Configure Dependencies

In `nx.json` under `projects.demo1app` array, add following property.

```bash
"implicitDependencies": ["shared-assets"],
```

Do same for second app. To test it run `nx dep-graph`.

#### Configure Sharing Boundaries

To restrict which library can depend on which other kinds of libraries use tags and lint rules.

In `nx.json` under `projects.shared-assets.tags` array add:

```bash
"tags": ["type:assets"],
```

In `nx.json` under `projects.demo1app.tags` array add:

```bash
"tags": ["type:frontend-app"],
```

In `tslint.json` under `"nx-enforce-module-boundaries"` array under `depConstrains` rule add another restriction:

```bash
[
  true,
  {
    "allow": [],
    "depConstrains": [
      {
        "sourceTag": "type:assets",
        "onlyDependOnLibsWithTags": ["type:frontend-app"]
      },
      {
        "sourceTag": "*",
        "onlyDependOnLibsWithTags": ["*"]
      }
    ]
  }
]
```

If you are going to try to import assets from demo2app, a linting error will occur.

##### Sources

[Shared assets library and nx.json - Nx Workspaces Course, by Nrwl](https://www.youtube.com/watch?v=LYjX2V-eQa8)
