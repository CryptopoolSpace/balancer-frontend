<template>
    <div class="message">
        A port of Balancer live on Arbitrum testnet.
        <br />
        <a
            href="https://portal.arbitrum.io/"
            target="_blank"
        >
            More dApps
        </a>
        &nbsp;
        &nbsp;
        <a
            href="https://faucet.arbitrum.io/"
            target="_blank"
        >
            Faucet
        </a>
    </div>
</template>

<script>
    
</script>

<style scoped>
.message {
    width: 385px;
    margin: 10px;
    padding: 20px 40px;
    border: 1px solid var(--info);
    border-radius: var(--border-radius-large);
    color: var(--info);
}

.message > a {
    color: var(--info);
}

@media only screen and (max-width: 768px) {
    .message {
        width: initial;
    }
}
</style>
