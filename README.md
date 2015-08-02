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
*	**link** — optional, link
*	**order** — optional, order of items
*	**items** — the same as tree items

#### create
##### request
*	**slug** — item path in tree, like "tree/item/newitem"
*	the rest as item object

##### response
* 	db response

#### update
##### request
*	**id** — item path
*	**to**
	-	slug — new slug
	-	title — title
	- 	link — link
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
renders template stored in `/templates/trees/` folder under tree slug name, if template not found will try to render "trees.html" template.

`{% tree "slug" %}`
