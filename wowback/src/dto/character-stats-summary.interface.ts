/* eslint-disable prettier/prettier */

import { Link } from "./core/link";



export interface PowerType {
  key: any;
  name: string;
  id: number;
}

export interface Speed {
  rating: number;
  rating_bonus: number;
}

export interface Strength {
  base: number;
  effective: number;
}

export interface Agility {
  base: number;
  effective: number;
}

export interface Intellect {
  base: number;
  effective: number;
}

export interface Stamina {
  base: number;
  effective: number;
}

export interface MeleeCrit {
  rating: number;
  rating_bonus: number;
  value: number;
}

export interface MeleeHaste {
  rating: number;
  rating_bonus: number;
  value: number;
}

export interface Mastery {
  rating: number;
  rating_bonus: number;
  value: number;
}

export interface Lifesteal {
  rating: number;
  rating_bonus: number;
  value: number;
}

export interface Avoidance {
  rating: number;
  rating_bonus: number;
}

export interface SpellCrit {
  rating: number;
  rating_bonus: number;
  value: number;
}

export interface Armor {
  base: number;
  effective: number;
}

export interface Dodge {
  rating: number;
  rating_bonus: number;
  value: number;
}

export interface Parry {
  rating: number;
  rating_bonus: number;
  value: number;
}

export interface Block {
  rating: number;
  rating_bonus: number;
  value: number;
}

export interface RangedCrit {
  rating: number;
  rating_bonus: number;
  value: number;
}

export interface RangedHaste {
  rating: number;
  rating_bonus: number;
  value: number;
}

export interface SpellHaste {
  rating: number;
  rating_bonus: number;
  value: number;
}

export interface Key2 {
  href: string;
}

export interface Key3 {
  href: string;
}

export interface Realm {
  key: Key3;
  name: string;
  id: number;
  slug: string;
}

export interface Character {
  key: Key2;
  name: string;
  id: number;
  realm: Realm;
}

export interface Stats {
  _links: Link;
  health: number;
  power: number;
  power_type: PowerType;
  speed: Speed;
  strength: Strength;
  agility: Agility;
  intellect: Intellect;
  stamina: Stamina;
  melee_crit: MeleeCrit;
  melee_haste: MeleeHaste;
  mastery: Mastery;
  bonus_armor: number;
  lifesteal: Lifesteal;
  versatility: number;
  versatility_damage_done_bonus: number;
  versatility_healing_done_bonus: number;
  versatility_damage_taken_bonus: number;
  avoidance: Avoidance;
  attack_power: number;
  main_hand_damage_min: number;
  main_hand_damage_max: number;
  main_hand_speed: number;
  main_hand_dps: number;
  off_hand_damage_min: number;
  off_hand_damage_max: number;
  off_hand_speed: number;
  off_hand_dps: number;
  spell_power: number;
  spell_penetration: number;
  spell_crit: SpellCrit;
  mana_regen: number;
  mana_regen_combat: number;
  armor: Armor;
  dodge: Dodge;
  parry: Parry;
  block: Block;
  ranged_crit: RangedCrit;
  ranged_haste: RangedHaste;
  spell_haste: SpellHaste;
  character: Character;
}
