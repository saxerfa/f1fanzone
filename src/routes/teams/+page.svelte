<script lang="ts">
    export let data: { teams: Team[] };
    let search = "";
    let motorFilter = "";

    interface Team {
        name: string;
        land: string;
        teamchef: string;
        chassis: string;
        motor: string;
        bild: string;
    }

    // Liste der einzigartigen Motorenhersteller extrahieren
    $: motorenhersteller = [...new Set(data.teams.map((t: Team) => t.motor))];

    function handleImgError(event: Event) {
        (event.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Kein+Bild';
    }
</script>

<main class="container py-4">
    <h1 class="mb-4 text-danger">🏎️ Teams</h1>

    <div class="mb-4">
        <input type="text" class="form-control mb-2" placeholder="🔍 Suche nach Teamname" bind:value={search} />
        <select class="form-select" bind:value={motorFilter}>
            <option value="">Alle Motorenhersteller</option>
            {#each motorenhersteller as motor}
                <option value={motor}>{motor}</option>
            {/each}
        </select>
    </div>

    <div class="row">
        {#each data.teams.filter(t =>
            (!search || t.name.toLowerCase().includes(search.toLowerCase())) &&
            (!motorFilter || t.motor === motorFilter)
        ) as t}
            <div class="col-md-4">
                <div class="card h-100 shadow-sm">
                    <img src={t.bild} class="card-img-top" alt={"Bild von " + t.name} on:error={handleImgError} />
                    <div class="card-body">
                        <h5 class="card-title">{t.name}</h5>
                        <p class="card-text">
                            <strong>Land:</strong> {t.land}<br>
                            <strong>Teamchef:</strong> {t.teamchef}<br>
                            <strong>Chassis:</strong> {t.chassis}<br>
                            <strong>Motor:</strong> {t.motor}
                        </p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    .card {
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
    .card-img-top {
        object-fit: contain;
        height: 150px;
        padding: 10px;
    }
</style>
