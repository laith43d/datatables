<script lang="ts">let { table, field, check = undefined } = $props();
const filter = table.createFilter(field, check);
export {};
</script>

<th>
    <input
        type="text"
        placeholder={table.i18n.filter}
        spellcheck="false"
        bind:value={filter.value}
        oninput={() => filter.set()}
    />
</th>
