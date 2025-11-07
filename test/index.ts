import t from 'tap'
import { MiniLRU } from '../src/index.js'

t.test('basic operation', t => {
  const cache = new MiniLRU<string, number>({ max: 10 })
  t.equal(cache.size, 0)
  cache.set('a', 1)
  t.equal(cache.size, 1)
  t.equal(cache.has('a'), true)
  t.equal(cache.delete('b'), false)
  t.equal(cache.size, 1)
  t.equal(cache.get('a'), 1)
  cache.set('b', 2)
  cache.set('c', 3)
  cache.set('d', 4)
  cache.set('e', 5)
  cache.set('f', 6)
  cache.set('g', 7)
  cache.set('a', 8)
  t.equal(cache.size, 7)
  t.strictSame([...cache.keys()], ['b', 'c', 'd', 'e', 'f', 'g', 'a'])
  cache.set('h', 9)
  t.equal(cache.size, 8)
  cache.set('i', 10)
  t.equal(cache.size, 9)
  cache.set('j', 11)
  t.equal(cache.size, 10)
  t.strictSame(
    [...cache.keys()],
    ['b', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'i', 'j'],
  )
  cache.set('k', 12)
  t.equal(cache.size, 10)
  cache.set('l', 13)
  t.equal(cache.size, 10)
  t.equal(cache.delete('b'), false)
  t.strictSame(
    [...cache.keys()],
    ['d', 'e', 'f', 'g', 'a', 'h', 'i', 'j', 'k', 'l'],
  )
  t.equal(cache.delete('h'), true)
  t.equal(cache.size, 9)
  t.strictSame(
    [...cache.keys()],
    ['d', 'e', 'f', 'g', 'a', 'i', 'j', 'k', 'l'],
  )
  cache.set('z', 99)
  t.equal(cache.size, 10)
  t.strictSame(
    [...cache.keys()],
    ['d', 'e', 'f', 'g', 'a', 'i', 'j', 'k', 'l', 'z'],
  )
  t.equal(cache.get('e'), 5)
  t.strictSame(
    [...cache.keys()],
    ['d', 'f', 'g', 'a', 'i', 'j', 'k', 'l', 'z', 'e'],
  )
  t.strictSame(
    [...cache],
    [
      ['d', 4],
      ['f', 6],
      ['g', 7],
      ['a', 8],
      ['i', 10],
      ['j', 11],
      ['k', 12],
      ['l', 13],
      ['z', 99],
      ['e', 5],
    ],
  )
  t.end()
})
