# Flowtypus

Flowtypus is a small module usefull to make transitions between pages of a static website with all the grace of a platypus.

## Why use Flowtypus?

For a static website, the transitions between the pages feel abrupt. The purpose of this project is to add some fluidity when go to another page, and it work with multiples elements:

1. You can have the control between the transitions of the page with a system of templating and so add specific transitions from one page to another.
2. The next page is prefetched when a link is focus or mouse enter. Like this the next page is faster to load!
3. History is updated like this next/previous navigator buttons still work and transitions work too.
4. A cache is set to gain speed when come back to a page previously visited (cache can be full cleared or partialy with the URL given)
5. An event system is set to know advancement of the transition
6. Replace the `<head>` elements and the view. Like this titles, description, ... are updated. Scripts already loaded and keeped during transition are not reloaded except if asked
7. Replace the content selected with `data-flowtypus-view` attribute

## Init

To init the Flowtypus it's easy!

1. Install the project: `npm i @keienla/flowtypus`
2. Import it:

```typescript
import flowtypus from '@keienla/flowtypus'
const Flowtypus = flowtypus()
```

And that's all. Somes methods are added to add transitions of clear cache for example.

## Methods

### `setTransition`

Add a transition between pages. The method has 4 parameters:

-   `key`: `"string => string" | "string <= string" | "string <=> string"`<br>
    _Note: replace each "string" word by the name of a template or "\*" caracter. "\*" mean "all"_<br>
    It's the name of the transition. The default transition is set with key = `* <=> *`.
-   `out`: `TransitionFnOut`<br> The transition applied on the view that will be removed.
-   `in`: `TransitionFnIn`<br> The transition applied on the view that will be added.
-   `reducedMotion?`: `boolean`<br> If the transition will be played when reducedMotion is on. Else no animation will be played

```typescript
import flowtypus from '@keienla/flowtypus'
const Flowtypus = flowtypus()

// This is the default animation set given as exemple
// If you want to keep this animation don't rewrite it
Flowtypus.setTransition(
    '* <=> *',
    async (params) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

        const animation = params.from.view?.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200,
            iterations: 1,
            fill: 'forwards',
            easing: 'ease-out',
        })

        animation?.play()
        return animation?.finished || Promise.resolve()
    },
    async (params) => {
        if (params.from.view) params.from.view.style.position = 'absolute'

        const animation = params.to.view?.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200,
            iterations: 1,
            fill: 'forwards',
            easing: 'ease-in',
        })

        animation?.play()
        return animation?.finished || Promise.resolve()
    }
)
```

Note that transitions have an order.
If two transitions are set, one with the key `from => to` and the other with key `from <=> to`, during transition when have to change from template "from" to template "to", it will always choose `from => to`. When trying to find the possible transition, will select the first possible in this orderer array:

1. `from => to`
2. `to <= from`
3. `from <=> to`
4. `to <=> from`
5. `from => *`
6. `* <= from`
7. `from <=> *`
8. `* <=> from`
9. `* => to`
10. `to <= *`
11. `* <=> to`
12. `to <=> *`
13. `* => *`
14. `* <= *`
15. `* <=> *`

That's why a default transition is set with key `* <=> *`, it's the lowest possible.

### `back`

Same as if click on arrow back of the navigator. (work only if history api is supported).

```typescript
import flowtypus from '@keienla/flowtypus'
const Flowtypus = flowtypus()

Flowtypus.back()
```

### `forward`

Same as if click on arrow forward of the navigator. (work only if history api is supported).

```typescript
import flowtypus from '@keienla/flowtypus'
const Flowtypus = flowtypus()

Flowtypus.forward()
```

### `goToPage`

Switch from the current page to new page. This method has 2 arguments:

-   `url`: `string|URL|null`<br> The destination url
-   `template?`: `string|null`<br> The destination template to have better transition

If can go to the asked url will return `true`, else if can't switch page will return `false`

```typescript
import flowtypus from '@keienla/flowtypus'
const Flowtypus = flowtypus()

Flowtypus.goToPage('/infos')
```

### `rerunScript`

This function can be usefull to rerun a specific script with no `data-flowtypus-reload` attribute. This method has 1 argument:

-   `oldScript`: `HTMLScriptElement`<br> The script balise that contain the script to reload

```typescript
import flowtypus from '@keienla/flowtypus'
const Flowtypus = flowtypus()

const scriptToRerun = document.querySelector('script')
Flowtypus.rerunScript(scriptToRerun)
```

### `rerunScripts`

This function can be usefull to rerun all `<script>` with attributes `data-flowtypus-reload`

```typescript
import flowtypus from '@keienla/flowtypus'
const Flowtypus = flowtypus()

Flowtypus.rerunScripts()
```

### `clearAllCache`

Will remove all entries in cache. Like this while switching page all pages will be loaded again.

```typescript
import flowtypus from '@keienla/flowtypus'
const Flowtypus = flowtypus()

Flowtypus.clearAllCache()
```

### `clearCacheForUrl`

Will remove the cache for a specific url. The method has one argument:

-   `url`: `string|URL|null`

Will return `true` if cache is deleted or if cache doesn't contain the url. Return `false` if not deleted.

```typescript
import flowtypus from '@keienla/flowtypus'
const Flowtypus = flowtypus()

Flowtypus.clearCacheForUrl('/')
```

## Attributes

### `[data-flowtypus-container]`

The `[data-flowtypus-container]` is the attribute for the container of the views. It will not change between the transitions of each page, it's the view block inside that is updated.

The container doesn't take any value.

```html
<div data-flowtypus-container>
    <div data-flowtypus-view>My Content that will be changed</div>
</div>
```

### `[data-flowtypus-view]`

The `[data-flowtypus-view]` must be direct child of `[data-flowtypus-container]`. The block is replaced by the new view in each transition.

This attribue can have a value. It's used to get the "from" template name to do the animation.

```html
<div data-flowtypus-container>
    <div data-flowtypus-view="my-template-name">My Content that will be changed</div>
</div>
```

When updating page, the view that will be destroyed has the attribute `[data-flowtypus-old-view]` and the view added has the attribute `[data-flowtypus-new-view]`. Those two attributes are removed when the animation is done.

### `[data-flowtypus-reload]`

This attribute is used on `<script>` elements. When the transition between the pages is made, if the two pages contain the same `<script>` (in head or content) the balise will not be recreated. If you want that the script be played each time a new page is set so add this attribute in the balise will play it each time a transition is done.

```html
<!-- Will be an alert with 'Hello' is script is keeped during transition -->
<script data-flowtypus-reload>
    alert('Hello')
</script>
<!-- Will be an alert with 'Only once' only one time if script is keeped during transition -->
<script>
    alert('Only once')
</script>
```

### `[data-flowtypus-target-template]`

This attribute is used on `<a>` elements. With it will get the destination template name to do a better transition (i.e the destion have `data-flowtypus-view="same-name"`)

```html
<a href="/infos" data-flowtypus-target-template="infos-template"
    >Go to infos page where view have data-flowtypus-view="infos-template"</a
>
```

### `[data-flowtypus-disabled]`

This attributes is used on `<a>`. It's usefull when you doesn't want that a transition is set when click on a specific link.

```html
<a href="/legal" data-flowtypus-disabled>Will not do a transition so normal loading</a>
```

## Events

### `flow:transition:out`

type: `TransitionOutEvent`

Event fire when out animation start (i.e at the same time that fetching the page).

```typescript
window.addEventListener('flow:transition:out', (event: TransitionOutEvent) => {
    // code here
})
```

### `flow:transition:in`

type: `TransitionInEvent`

Event fire when in animation start (i.e when fetching and out animation are finished).<br>
If an error occur while fetching page this event will not be fired.

```typescript
window.addEventListener('flow:transition:in', (event: TransitionInEvent) => {
    // code here
})
```

### `flow:transition:end`

type: `TransitionEndEvent`

Event fire when all animation out/in are finished.<br>
If an error occur while fetching page, `event.error` will not be `null`

```typescript
window.addEventListener('flow:transition:end', (event: TransitionEndEvent) => {
    // code here
})
```

### `flow:loading:progress`

type: `LoadingProgressEvent`

Event fire when fetching a page. Can have the size loading of the page, if come from cache...

```typescript
window.addEventListener('flow:loading:progress', (event: LoadingProgressEvent) => {
    // code here
})
```
