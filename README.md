# minilru

A very minimal LRU cache implementation, with hardly any features
and very little code.

This implementation is basically just a JavaScript `Map` object
that relies on the fact that insertion order matches iteration
order, to prune the least recently used items out when it hits a
certain size.

There is no support for TTL, async fetching,
stale-while-revalidate, storing to a back end, or anything else
fancy. If you're interested in those types of features, I'd
recommend checking out [lru-cache](http://npm.im/lru-cache) or
[@isaacs/ttlcache](http://npm.im/@isaacs/ttlcache).

## USAGE

```ts
import { MiniLRU } from 'minilru'

// MiniLRU<K, V> just like Map<K, V>
const cache = new MiniLRU<string, number>({ max: 100 })
// you can also seed it with stuff if you want
const cacheSeeded = new MiniLRU<string, number>({ max: 100 }, [
  ['key', 123],
  ['otherkey', 234],
])

// Iteration order is based on use recency
// As new items are added, old ones are removed if needed,
// to stay below the size limit.
```
