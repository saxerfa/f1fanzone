<script context="module" lang="ts">
    export type Saison = {
        _id: string;
        jahr: number;
        gewinner_fahrer: string;
        runnerup_fahrer: string;
        gewinner_team: string;
        runnerup_team: string;
        kurzzusammenfassungjahr: string;
        beschreibung: string;
    };
</script>

<script lang="ts">
    export let data: { saisons: Saison[] };
    let search = "";
    let sortAscending = false;
    let blockFilter = "";

    // Alle Jahre extrahieren & sortieren
    let jahre: number[] = Array.from(new Set(data.saisons.map((s: Saison) => s.jahr))).sort((a, b) => a - b);

    // 5-Jahres-Blöcke erstellen
    let bloecke: string[] = [];
    if (jahre.length) {
        const min = Math.min(...jahre);
        const max = Math.max(...jahre);
        for (let start = min; start <= max; start += 5) {
            let end = Math.min(start + 4, max);
            bloecke.push(`${start}-${end}`);
        }
    }

    // Gefilterte + sortierte Liste
    $: gefiltert = data.saisons
        .filter((s: Saison) => {
            let blockOk = true;
            if (blockFilter) {
                const [start, end] = blockFilter.split('-').map(Number);
                blockOk = s.jahr >= start && s.jahr <= end;
            }
            const searchOk =
                !search ||
                s.gewinner_fahrer.toLowerCase().includes(search.toLowerCase()) ||
                s.jahr.toString().includes(search);
            return blockOk && searchOk;
        })
        .sort((a: Saison, b: Saison) => (sortAscending ? a.jahr - b.jahr : b.jahr - a.jahr));

    function toggleDetails(id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.toggle('d-none');
        }
    }
</script>

<main class="container py-4">
    <h1 class="mb-4 text-danger">📅 Vergangene Saisons</h1>

    <div class="mb-4 row g-2">
        <div class="col-md-4">
            <input type="text" class="form-control" placeholder="🔍 Suche nach Fahrer oder Jahr" bind:value={search} />
        </div>
        <div class="col-md-4">
            <select class="form-select" bind:value={blockFilter}>
                <option value="">Alle 5-Jahres-Blöcke</option>
                {#each bloecke as block}
                    <option value={block}>{block}</option>
                {/each}
            </select>
            
        </div>
        <div class="col-md-4">
            <button class="btn btn-outline-secondary w-100" on:click={() => (sortAscending = !sortAscending)}>
                Jahre {sortAscending ? 'aufsteigend' : 'absteigend'} sortieren
            </button>
        </div>
    </div>
<p class="text-muted fst-italic small">die Saisondaten, sowie die Zusammenfassungen wurden von ChatGPT zusammengetragen und generiert. Die Daten wurden nur Stichprobenartig auf die Korrektheit geprüft </p>
    <ul class="list-group">
        {#each gefiltert as saison}
            <li class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{saison.jahr}</strong>: {saison.gewinner_fahrer}
                    </div>
                    <button class="btn btn-sm btn-outline-secondary" on:click={() => toggleDetails('details-' + saison._id)}>
                        Details
                    </button>
                </div>
                <div id={'details-' + saison._id} class="mt-2 d-none">
                    <p><strong>Runner-up Fahrer:</strong> {saison.runnerup_fahrer}</p>
                    <p><strong>Gewinner Team:</strong> {saison.gewinner_team}</p>
                    <p><strong>Runner-up Team:</strong> {saison.runnerup_team}</p>
                    <p><strong>Kurz-Zusammenfassung:</strong> {saison.kurzzusammenfassungjahr}</p>
                    <p><strong>Beschreibung:</strong> {saison.beschreibung}</p>
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
    button {
        white-space: nowrap;
    }
</style>
