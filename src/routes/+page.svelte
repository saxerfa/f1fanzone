<script lang="ts">
    // Für diese Seite werden keine lokalen States benötigt
</script>

<main class="container py-5">
    <!-- Titelbild -->
    <section class="text-center mb-5">
        <img src="/images/Titelbild.png" alt="F1 Titelbild" class="img-fluid mb-4" style="max-width: 300px;" />
        <h1 class="text-danger mb-3">🏎️ Willkommen in der F1 Fanzone</h1>
        <p class="lead text-muted">Hier findest du alle Infos zur aktuellen Saison, den Teams, Fahrern und den spannendsten Rennen der Formel 1. Tauche ein!</p>
    </section>

    <!-- Links zur aktuellen Saison -->
    <section class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-5">
        <div class="col">
            <div class="card shadow-sm h-100 text-center">
                <div class="card-body d-flex flex-column align-items-center">
                    <img src="/images/Rennen.png" alt="Rennen Icon" width="60" class="mb-3" />
                    <h3 class="h5 mb-2">Rennen</h3>
                    <p class="text-muted small flex-grow-1">Alle Rennen der aktuellen Saison im Überblick.</p>
                    <a href="/rennen" class="btn btn-outline-danger mt-auto">Zu den Rennen</a>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card shadow-sm h-100 text-center">
                <div class="card-body d-flex flex-column align-items-center">
                    <img src="/images/Teams.png" alt="Teams Icon" width="60" class="mb-3" />
                    <h3 class="h5 mb-2">Teams</h3>
                    <p class="text-muted small flex-grow-1">Lerne die Teams kennen, die um den Titel kämpfen.</p>
                    <a href="/teams" class="btn btn-outline-danger mt-auto">Zu den Teams</a>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card shadow-sm h-100 text-center">
                <div class="card-body d-flex flex-column align-items-center">
                    <img src="/images/Fahrer.png" alt="Fahrer Icon" width="60" class="mb-3" />
                    <h3 class="h5 mb-2">Fahrer</h3>
                    <p class="text-muted small flex-grow-1">Entdecke alle Fahrer der Saison und ihre Statistiken.</p>
                    <a href="/fahrer" class="btn btn-outline-danger mt-auto">Zu den Fahrern</a>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card shadow-sm h-100 text-center">
                <div class="card-body d-flex flex-column align-items-center">
                    <img src="/images/Standings.png" alt="Standings Icon" width="60" class="mb-3" />
                    <h3 class="h5 mb-2">Standings</h3>
                    <p class="text-muted small flex-grow-1">Aktuelle Fahrer- und Konstrukteurswertung auf einen Blick.</p>
                    <a href="/standings" class="btn btn-outline-danger mt-auto">Zu den Standings</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Link zu den vergangenen Saisons -->
    <section class="text-center">
        <a href="/saisons" class="btn btn-danger btn-lg">
            📜 Ergebnisse vergangener Saisons ansehen
        </a>
    </section>
</main>

<style>
    .card {
        border: none;
        border-radius: 0.75rem;
    }
    .card-body {
        padding: 1.5rem;
    }
    .btn {
        min-width: 150px;
    }
</style>