

    export interface Self {
        href: string;
    }

    export interface Links {
        self: Self;
    }

    export interface Key {
        href: string;
    }

    export interface Season {
        key: Key;
        id: number;
    }



    export interface KeystoneAffix {
        key: Key;
        name: string;
        id: number;
    }


    export interface Realm {
        key: Key;
        id: number;
        slug: string;
    }

    export interface Character {
        name: string;
        id: number;
        realm: Realm;
    }



    export interface Specialization {
        key: Key;
        name: string;
        id: number;
    }



    export interface Race {
        key: Key;
        name: string;
        id: number;
    }

    export interface Member {
        character: Character;
        specialization: Specialization;
        race: Race;
        equipped_item_level: number;
    }



    export interface Dungeon {
        key: Key;
        name: string;
        id: number;
        media: string;
    }

    export interface Color {
        r: number;
        g: number;
        b: number;
        a: number;
    }

    export interface MythicRating {
        color: Color;
        rating: number;
    }



    export interface MapRating {
        color: Color;
        rating: number;
    }

    export interface BestRun {
        completed_timestamp: any;
        duration: string;
        keystone_level: number;
        keystone_affixes: KeystoneAffix[];
        members: Member[];
        dungeon: Dungeon;
        is_completed_within_time: boolean;
        mythic_rating: MythicRating;
        map_rating: MapRating;
    }



    export interface DungeonsProfile {
        _links: Links;
        season: Season;
        best_runs: BestRun[];
        character: Character;
        mythic_rating: MythicRating;
    }



