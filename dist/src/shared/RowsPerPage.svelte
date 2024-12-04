<script lang="ts">let { table, options = [5, 10, 20, 50, 100] } = $props();
export {};
</script>

<aside>
    {#if table.clientWidth > 600}
        <span>{table.i18n.show}</span>
    {/if}
    <select bind:value={table.rowsPerPage} onchange={() => table.setPage(1)}>
        {#each options as option}
            <option value={option}>
                {option}
            </option>
        {/each}
    </select>
    {#if table.clientWidth > 600}
        <span>{table.i18n.entries}</span>
    {/if}
</aside>
