# TabBar(标签页)

简介（可写可不写）

## 使用方式

```js

<template>
     <TabBar
        @tab-change="tabChange"
        :tabs="data"
    />
</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    name: 'hello', // 标签名
                },
                {
                    icon: 'ios-list', // 标签以图标显示，注意：icon和name只能生效一个，icon优先级高于name
                    iconSize: '1rem' // 图标大小
                }
            ]
        }
    },
    methods: {
        tabChange(item) {}
    }
}
</script>

```

## 参数

| 名称      | 类型      | 描述      |
| :----------: | :----------: | :----------: |
| noBg | Boolean \| String | 取消背景颜色，等于不使用默认样式 |
| tabs | Array | 源数据 |
| borderColor | String | 边框颜色 |

## 事件

| 名称      | 类型      | 描述      |
| :----------: | :----------: | :----------: |
| tab-change | Function | 选中的回调事件，参数为选中项 |