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

## Caveats and Performance

Because this is basically a thin wrapper around a JavaScript
`Map`, it has some caveats.

First of all, you can't put more than `2**22` (`4_194_304`) items
in this cache, or else it blows up. So the `max` option is capped
at that value.

Second, you really wouldn't _want_ to put that many objects in
it, because JavaScript `Map` objects are really tuned for best
performance with relatively small numbers of entries, like on the
order of thousands, not millions.

Basically, this is a good choice if your max is somewhere in the
neighborhood of `2**10` to `2**12`, where this library will be
about as fast as anything else you can get in JS. After that,
especially when you get around `2**18` or so, the performance
falls off a cliff, _badly_.

If you need to store more things, I recommend using something
that does its own memory management, like
[lru-cache](http://npm.im/lru-cache).
