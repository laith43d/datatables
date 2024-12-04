<script lang="ts">import { Search, RowsPerPage, RowCount, Pagination } from './';
let { table, children, basic = false, headless = false, header = undefined, footer = undefined } = $props();
table.on('change', () => table.element ? table.element.scrollTop = 0 : '');
</script>

<section bind:clientWidth={table.clientWidth} class:svelte-simple-datatable={!headless}>

    <header>
        {#if header}
            {@render header()}
        {:else if basic === true}
            <Search {table}/>
            <RowsPerPage {table}/>
        {/if}
    </header>

    <article bind:this={table.element} class="thin-scrollbar">
        {@render children()}
    </article>

    <footer class:divider={basic}>
        {#if footer}
            {@render footer()}
        {:else if basic === true}
            <RowCount {table}/>
            <Pagination {table}/>
        {/if}
    </footer>

</section>
