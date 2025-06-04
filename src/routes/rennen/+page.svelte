<script lang="ts">
    export let data;
    export let form;
    
    function toggleDetails(id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.toggle('d-none');
        }
    }
</script>

<main class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="text-danger">🏁 Rennen der Saison 2025</h1>
        <a href="/rennen/neu" class="btn btn-success">
            ➕ Neues Resultat
        </a>
    </div>

    {#if form?.success}
        <div class="alert alert-success">{form.success}</div>
    {/if}

    <p class="text-muted fst-italic small">NC = Not Classified (DNF, DNS, DNQ)</p>

    <ul class="list-group">
        {#each data.rennen as rennen}
            <li class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{rennen._id.rennen_name}</strong>
                        ({new Date(rennen._id.datum).toLocaleDateString()}) – {rennen._id.ort}
                    </div>
                    <button class="btn btn-sm btn-outline-secondary" on:click={() => toggleDetails('details-' + rennen._id.rennen_name.replace(/\s+/g, '-'))}>
                        Resultate anzeigen
                    </button>
                </div>

                <div id={'details-' + rennen._id.rennen_name.replace(/\s+/g, '-')} class="mt-2 d-none">
                    <table class="table table-sm table-striped mt-2">
                        <thead>
                            <tr>
                                <th>Platz</th>
                                <th>Fahrer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each rennen.resultate
                                .sort((a: { platz: number }, b: { platz: number }) => (a.platz === 0 ? 1 : b.platz === 0 ? -1 : a.platz - b.platz))
                                as res}
                                <tr class={res.platz === 0 ? 'table-secondary' : ''}>
                                    <td>{res.platz === 0 ? 'NC' : res.platz}</td>
                                    <td>{res.fahrer}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>

                    <form method="POST" action="?/delete" class="mt-2 text-end" on:submit|preventDefault={async (e) => {
                        if (confirm('Bist du sicher, dass du alle Resultate für dieses Rennen löschen möchtest?')) {
                            if (e.target) (e.target as HTMLFormElement).submit();
                        }
                    }}>
                        <input type="hidden" name="rennen_name" value={rennen._id.rennen_name} />
                        <button type="submit" class="btn btn-sm btn-outline-danger">Rennen löschen</button>
                    </form>
                </div>
            </li>
        {/each}
    </ul>
</main>

<style>
    .list-group-item {
        transition: background-color 0.2s ease;
    }
    .list-group-item:hover {
        background-color: #f8f9fa;
    }
    table {
        font-size: 0.85rem;
    }
</style>
