<script lang="ts">let { table } = $props();
const search = table.createSearch();
export {};
</script>

<input
    bind:value={search.value}
    oninput={() => search.set()}
    placeholder={table.i18n.search}
    spellcheck="false"
/>
