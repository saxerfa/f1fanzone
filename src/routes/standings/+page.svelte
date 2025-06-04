<script lang="ts">
    export let data;

    async function updatePunkte(
        collection: "fahrer" | "teams",
        id: string,
        punkte: number,
    ) {
        try {
            const res = await fetch("/standings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ collection, id, punkte }),
            });

            if (!res.ok) {
                alert("Fehler beim Speichern der Punkte");
            }
        } catch (err) {
            console.error("Fehler:", err);
            alert("Netzwerkfehler beim Speichern");
        }
    }
</script>

<main class="container py-4">
    <h1 class="mb-4 text-danger">🏁 Aktuelle Standings 2025</h1>

    <div class="mb-3">
        <button class="btn btn-danger" on:click={() => location.reload()}>
            🔄 Aktualisieren
        </button>
    </div>

    <div class="row mb-5">
        <div class="col-md-6">
            <h2>🏎️ Fahrerwertung</h2>
            <ul class="list-group">
                {#each data.fahrer as fahrer, i}
                    <li class="list-group-item d-flex align-items-center">
                        <span class="me-3 fw-bold">{i + 1}.</span>
                        <img
                            src={fahrer.bild}
                            alt="Fahrerbild"
                            width="40"
                            height="40"
                            class="me-3 rounded"
                            on:error={(e) =>
                                ((e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/40")}
                        />
                        <div class="flex-grow-1">
                            {fahrer.name} <br />
                            <small class="text-muted">{fahrer.team}</small>
                        </div>
                        <input
                            type="number"
                            class="form-control form-control-sm w-25 text-end"
                            bind:value={fahrer.punkte}
                            on:change={() =>
                                updatePunkte(
                                    "fahrer",
                                    fahrer._id,
                                    +fahrer.punkte,
                                )}
                        />
                    </li>
                {/each}
            </ul>
        </div>

        <div class="col-md-6">
            <h2>🏢 Teamwertung</h2>
            <ul class="list-group">
                {#each data.teams as team, i}
                    <li class="list-group-item d-flex align-items-center">
                        <span class="me-3 fw-bold">{i + 1}.</span>
                        <img
                            src={team.bild}
                            alt="Teambild"
                            width="40"
                            height="40"
                            class="me-3 rounded"
                            on:error={(e) =>
                                ((e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/40")}
                        />
                        <div class="flex-grow-1">{team.name}</div>
                        <input
                            type="number"
                            class="form-control form-control-sm w-25 text-end"
                            bind:value={team.punkte}
                            on:change={() =>
                                updatePunkte("teams", team._id, +team.punkte)}
                        />
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</main>

<style>
    img {
        object-fit: cover;
    }
</style>
