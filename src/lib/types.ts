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

export type Fahrer = {
    _id: string;
    name: string;
    team: string;
    nationalität: string;
    startnummer: number;
    bild: string;
};
