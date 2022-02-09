<template>
    <div v-if="!this.toggle">
        <svg 
        width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.50023 12.924L0.490234 6.914L1.90423 5.499L6.50423 10.099L11.1042 5.499L12.5102 6.914L6.50123 12.924H6.50023ZM6.50023 7.5L0.490234 1.489L1.90423 0.0749969L6.50423 4.675L11.1042 0.0749969L12.5102 1.489L6.50123 7.499L6.50023 7.5Z" fill="#5C5C5C"/>
        </svg>
    </div>

    <div v-else>
        <svg 
        width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.90323 12.925L0.490234 11.51L6.50023 5.499L12.5102 11.51L11.0972 12.923L6.49723 8.323L1.89723 12.923L1.90323 12.925ZM1.90323 7.501L0.490234 6.085L6.50023 0.0750008L12.5102 6.085L11.0972 7.499L6.49723 2.899L1.89723 7.499L1.90323 7.501Z" fill="#2E3A59"/>
        </svg>
    </div>
</template>

<script>
    export default {
        props: ["toggle"]
    }
</script>

<style lang="scss" scoped>
    svg:hover{
        cursor: pointer;
    }
</style>