<script lang="ts">let { table, selection = false } = $props();
const { start, end, total, selected } = $derived(table.rowCount);
export {};
</script>

<aside>
    {#if selection}
        {@render selectedRows()}
    {:else if table.clientWidth < 640}
        {@render small()}
    {:else}
        {@render rowCount()}
    {/if}
</aside>



{#snippet selectedRows()}
    <b>{selected}</b>
    {#if total}
        of <b>{total}</b>
    {/if}
    row(s) selected.
    {#if selected > 0}
        <button type="button" onclick={() => table.clearSelection()}>❌ Clear</button>
    {/if}
{/snippet}



{#snippet small()}
    {#if total > 0}
        <b>{start}</b>-
        <b>{end}</b>/
        <b>{total}</b>
    {:else}
        {table.i18n.noRows}
    {/if}
{/snippet}



{#snippet rowCount()}
    {#if total > 0}
        {@html table.i18n.rowCount
            .replace('{start}', `<b>${start}</b>`)
            .replace('{end}', `<b>${end}</b>`)
            .replace('{total}', `<b>${total}</b>`)}
    {:else}
        {table.i18n.noRows}
    {/if}
{/snippet}


