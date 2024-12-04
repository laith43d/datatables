<script lang="ts">let { table, field, children } = $props();
const sort = table.createSort(field);
export {};
</script>

<th onclick={() => sort.set()} class:active={sort.isActive}>
    <div class="flex">
        <strong>
            {@render children()}
        </strong>
        <span
            class:asc={sort.direction === 'asc'}
            class:desc={sort.direction === 'desc'}>
        </span>
    </div>
</th>
