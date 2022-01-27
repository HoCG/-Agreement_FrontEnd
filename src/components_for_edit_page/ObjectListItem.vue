<template>
    <div>
        <ol
            style="width:100%;"
            v-for="Object in ObjectArr"
            :key="Object.id">
            {{
                Object.title
            }}
        </ol>
    </div>
</template>
<script>
    export default {
        props: {
            ObjectArr: Array
        }
    }
</script>