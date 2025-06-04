<script lang="ts">
    export let data;
    let search = "";
    let teamFilter = "";

    // Liste der einzigartigen Teams extrahieren
    $: teams = [...new Set(data.fahrer.map(f => f.team))];

    function handleImgError(event: Event) {
        (event.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Kein+Bild';
    }
</script>

<main class="container py-4">
    <h1 class="mb-4 text-danger">👨‍✈️ Fahrer</h1>

    <div class="mb-4">
        <input type="text" class="form-control mb-2" placeholder="🔍 Suche nach Fahrername" bind:value={search} />
        <select class="form-select" bind:value={teamFilter}>
            <option value="">Alle Teams</option>
            {#each teams as team}
                <option value={team}>{team}</option>
            {/each}
        </select>
    </div>

    <div class="row">
        {#each data.fahrer.filter(f =>
            (!search || f.name.toLowerCase().includes(search.toLowerCase())) &&
            (!teamFilter || f.team === teamFilter)
        ) as f}
            <div class="col-md-4">
                <div class="card h-100 shadow-sm">
                    <img src={f.bild} class="card-img-top" alt={"Bild von " + f.name} on:error={handleImgError} />
                    <div class="card-body">
                        <h5 class="card-title">{f.name}</h5>
                        <p class="card-text">
                            <strong>Team:</strong> {f.team}<br>
                            <strong>Nationalität:</strong> {f.nationalität}<br>
                            <strong>Startnummer:</strong> {f.startnummer}
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
        object-fit: cover;
        height: 300px;
    }
</style>
