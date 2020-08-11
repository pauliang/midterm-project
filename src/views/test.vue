<template>
  <div>
      <div>
          <h1>这是一个编辑器</h1>
      </div>
    <Editor></Editor>
  </div>
</template>

<script>
// @ is an alias to /src
import Editor from '@/components/Editor.vue'

export default {
  name: 'test',
  components: {
    Editor
  }
}
</script>