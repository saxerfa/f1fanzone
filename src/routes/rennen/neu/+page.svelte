<script lang="ts">
    export let form;
</script>

<main class="container py-4">
    <h1 class="mb-4 text-danger">➕ Neues Rennen mit Resultaten erfassen</h1>

    {#if form?.error}
        <div class="alert alert-danger">{form.error}</div>
    {/if}

    <form method="POST">
        <div class="mb-3">
            <label class="form-label">Rennen Name</label>
            <input type="text" name="rennen_name" class="form-control" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Datum</label>
            <input type="date" name="datum" class="form-control" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Ort</label>
            <input type="text" name="ort" class="form-control" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Resultate (ein Fahrer pro Zeile: Platz, Fahrername)</label>
            <textarea name="resultate" class="form-control" rows="8" placeholder="1, Max Verstappen&#10;2, Lando Norris&#10;0, Fernando Alonso" required></textarea>
            <div class="form-text">Platz 0 = NC (Not Classified)</div>
        </div>

        <button type="submit" class="btn btn-primary">Speichern</button>
    </form>
</main>
