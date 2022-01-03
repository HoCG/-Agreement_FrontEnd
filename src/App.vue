<template>
<div data-app>
    <DragAndDropFile/>
</div>
</template>

<script>
import DragAndDropFile from './views/DragAndDropFile.vue';

export default {
  name: 'App',

  components: {
    DragAndDropFile
  },

  data: () => ({
    //
  }),
};
</script>
