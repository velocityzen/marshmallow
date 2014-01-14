# Sweets
Next Web builder toolkit

## Marshmallow
**Sweet for tree structures**

## Object structure

### "trees" table

```js
{
	slug: "slug",
	order: ["item1", "item2"],
	items: {
		item1: {
			title: {en: "En title", ru: "Ru title"}
		},
		item2: {
			title: {en: "En title", ru: "Ru title"}
		}
	}
}
```

## API
There are two resources: /tree and /tree/item - the second one is a wrapper to access tree items - slugs for it look like "tree slug"/"item slug". Get request returns resource objects, which are described below, and is only available for /tree resource. Other request objects for both resources are similar:

#### GET
```js
{slug: "slug"}
```

#### CREATE
```js
{resource object}
```

#### UPDATE
```js
{
	slug: "slug", 
	to: {resource object}
}
```

#### DELETE
```js
{slug: "slug"}
```

## Tags
One tag is currently supported: {% tree "slug" %} - render template is up to you and should be stored in /templates/tree/ folder under tree slug name.