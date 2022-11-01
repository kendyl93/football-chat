interface Team {
    name: string;
}

export interface Match {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
}