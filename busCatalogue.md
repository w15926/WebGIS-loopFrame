[toc]

# OLMap

- 监听地图加载完成

```js
this.$bus.$emit('mapOut', {
	from: this.$options.name,
	to: null,
	methods: 'loadedMap',
  triggerIds: ' ',
	data: { page: JSON.parse(JSON.stringify(this.BusFrom)) } // 简单字符串可以用这种方式拷贝
})
```

