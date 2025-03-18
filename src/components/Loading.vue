<template>
    <div>
        <span class="loader "></span>
    </div>
</template>

<style scoped>
.loader {
    width: 25px;
    height: 25px;
    background: white;
    border: 1px solid var(--colors-green-500);
    border-radius: 50%;
    display: inline-block;
    position: relative;
    animation: rotation 1s linear infinite;
}

.loader::after {
    content: "";
    position: absolute;
    left: -3%;
    top: 0;
    width: 5px;
    height: 5px;
    color: var(--colors-green-300);
    background: currentColor;
    border-radius: 50%;
    box-shadow: 25px 15px, 10px 15px;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
