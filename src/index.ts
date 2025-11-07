export type MiniLRUOptions = {
  max: number
}
export const MAP_MAX = 2**22
export class MiniLRU<K, V> extends Map<K, V> {
  #max: number
  #size: number
  constructor(options: MiniLRUOptions, entries: [K, V][] = []) {
    super(entries)
    this.#size = entries.length
    this.#max = Math.min(options.max, MAP_MAX)
  }
  get size() {
    return this.#size
  }
  set(key: K, val: V) {
    if (this.#size >= this.#max) {
      for (const key of this.keys()) {
        super.delete(key)
        if (--this.#size < this.#max) break
      }
    }
    if (!super.delete(key)) this.#size++
    return super.set(key, val)
  }
  get(key: K) {
    const val = super.get(key)
    if (super.delete(key)) super.set(key, val as V)
    return val
  }
  delete(key: K) {
    const has = super.delete(key)
    if (has) this.#size--
    return has
  }
}
