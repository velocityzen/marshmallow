# Sweets
Next Web builder toolkit

## Marshmallow
**Sweet for tree structures**

## Object structure

### Table "trees"

```js
{
	slug: "slug",
	order: ["item1", "item2"],
	items: {
		item1: {
			title: "Home"
		},
		item2: {
			title: "Sweets", 
			link: "http://swts.me"
		}
	}
}
```

## Api
There are two resources: /tree and /tree/item - the second one is a wrapper to access tree items - slugs for it look like "tree slug"/"item slug". Get request returns resource objects, which are described below, and is only available for /tree resource. Other request objects for both resources are similar:

#### Get
```js
{slug: "slug"}
```

#### Create
```js
{resource object}
```

#### Update
```js
{
	slug: "slug", 
	to: {resource object}
}
```

#### Delete
```js
{slug: "slug"}
```

## Tags
One tag is currently supported: {% tree "slug" %} - render template is up to you and should be stored in /templates/trees/ folder under tree slug name.
