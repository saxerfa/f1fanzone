<script>
    import { page } from '$app/stores';
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-danger">
    <div class="container">
        <a class="navbar-brand" href="/">🏁 F1 Fanzone</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/">Start</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/saisons">Saisons</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/rennen">Rennen</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/teams">Teams</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/fahrer">Fahrer</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<slot />
