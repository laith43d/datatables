<script lang="ts">let { table } = $props();
export {};
</script>

<section>
    {#if table.pages === undefined}
        {@render nopage()}
    {:else if table.clientWidth < 600}
        {@render small()}
    {:else}
        {@render ellipsis()}
    {/if}
</section>



{#snippet nopage()}
    <button type="button" class="small" class:disabled={table.currentPage === 1} onclick={() => table.setPage('previous')}>
        &#10094;
    </button>
    <button type="button" class="page">Page <b>{table.currentPage}</b></button>
    <button type="button" class="small" onclick={() => table.setPage('next')}>
        &#10095;
    </button>
{/snippet}



{#snippet small()}
    <button type="button" class="small" class:disabled={table.currentPage === 1} onclick={() => table.setPage(1)}>
        &#10092;&#10092;
    </button>
    <button type="button" class:disabled={table.currentPage === 1} onclick={() => table.setPage('previous')}>
        &#10094;
    </button>
    <button type="button" class:disabled={table.currentPage === table.pageCount} onclick={() => table.setPage('next')}>
        &#10095;
    </button>
    <button type="button" class="small" class:disabled={table.currentPage === table.pageCount} onclick={() => table.setPage('last')}>
        &#10093;&#10093;
    </button>
{/snippet}



{#snippet ellipsis()}
    <button type="button" class:disabled={table.currentPage === 1} onclick={() => table.setPage('previous')}>
        {@html table.i18n.previous}
    </button>
    {#each table.pagesWithEllipsis as page}
        <button type="button"
            class="bg-darken-active"
            class:active={table.currentPage === page}
            class:ellipse={page === null}
            onclick={() => table.setPage(page)}
        >
            {page ?? '...'}
        </button>
    {/each}
    <button type="button" class:disabled={table.currentPage === table.pageCount} onclick={() => table.setPage('next')}>
        {@html table.i18n.next}
    </button>
{/snippet}

