# Sweets
Flexible declarative web framework for real-time projects

## Marshmallow
**Tree structures**

---

###tree

#### Structure
#####box: "trees"
#####object
*	**id** — uuid
*	**slug** — tree slug
*	**order** — array of items slugs
*	**items** — items

#### get
##### request
*	**id** — tree slug;

##### response
*   **tree object**

#### create
##### request
*	**slug** — tree slug
*	**order** — array of items slugs
*	**items** — object with items

##### response
* 	**[id]** — uuid, new tree id

#### update
##### request
*	**id** — tree slug
*	**to**
	-	slug — new slug
	-	order - items order

##### response
* 	db response

#### del
##### request
*	**id** — tree slug;

##### response
*	db response

---

###tree/item

#### Structure
#####object
*	**title** — title
*	**href** — optional, href
*	**order** — optional, order of items
*	**items** — the same as tree items

#### create

**New items will be added to the beginning of the tree (prepend to `order`)**

##### request
*	**slug** — item path in the tree, like "tree/item/newitem"
*	the rest is as in the item object

##### response
* 	db response

#### update
##### request
*	**id** — item path
*	**to**
	-	slug — new slug
	-	title — title
	- 	href — href
	-	order - items order

##### response
* 	db response

#### del
##### request
*	**id** — item path

##### response
*	db response

---

### Tags
#### tree
renders the template stored in `/templates/trees/` folder under the tree slug name, if template is not found, renders "trees.html" template instead.

`{% tree "slug" %}`
