<template>
    <div>
        <ol
            style="width:100%; height: 40px; line-height: 40px; font-weight: bold"
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