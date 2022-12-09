/* eslint-disable prettier/prettier */
import { Link } from './core/link';
import { NamedLink } from './core/named-link';
import { Type } from './core/type';

export interface CharacterEquipmentSummary {
  character: any;
  equipped_items: EquippedItem[];
}

export interface EquippedItem {
  item: Link;
  slot: Type;
  quantity: number;
  context: number;
  bonus_list: number[];
  quality: Type;
  name: string;
  azerite_details: AzeriteDetails;
  media: Link;
  item_class: NamedLink;
  item_subclass: NamedLink;
  inventory_type: Type;
  binding: Type;
  armor: Armor;
  stats: Stat[];
  set: { item_set: { id: number } };
  requirements: Requirements;
  level: Level;
  transmog: Transmog;
  durability: Durability;
  unique_equipped: string;
  spells: SpellOfItem[];
  description: string;
  is_subclass_hidden?: boolean;
  name_description: NameDescription;
  modified_appearance_id?: number;
  sell_price: SellPrice;
  is_corrupted?: boolean;
  sockets: Socket[];
  enchantments: Enchantment[];
  weapon: Weapon;
}

export interface AzeriteDetails {
  selected_powers: SelectedPower[];
  selected_powers_string: string;
  percentage_to_next_level?: number;
  selected_essences: SelectedEssence[];
  level: Level;
}

export interface SelectedPower {
  id: number;
  tier: number;
  spell_tooltip: any;
  is_display_hidden: boolean;
}

export interface SelectedEssence {
  slot: number;
  rank: number;
  main_spell_tooltip: any;
  passive_spell_tooltip: any;
  essence: NamedLink;
  media: Link;
}

export interface Stat {
  type: Type;
  value: number;
  display: Display;
  is_negated?: boolean;
  is_equip_bonus?: boolean;
}

export interface Armor {
  value: number;
  display: Display;
}

export interface Display {
  display_string: string;
  color: any;
}

export interface Requirements {
  level: Level;
  faction: FactionType;
}

export interface FactionType {
  value: Type;
  display_string: string;
}

export interface Transmog {
  item: NamedLink;
  display_string: string;
  item_modified_appearance_id: number;
}

export interface SpellOfItem {
  spell: NamedLink;
  description: string;
  display_color: any;
}

export interface NameDescription {
  display_string: string;
  color: any;
}

export interface SellPrice {
  value: number;
  display_strings: DisplayStrings;
}

export interface DisplayStrings {
  header: string;
  gold: string;
  silver: string;
  copper: string;
}

export interface Socket {
  socket_type: Type;
  item: NamedLink;
  display_string: string;
  media: Link;
}

export interface Enchantment {
  display_string: string;
  source_item: NamedLink;
  enchantment_id: number;
  enchantment_slot: EnchantmentSlot;
}

export interface Damage {
  min_value: number;
  max_value: number;
  display_string: string;
  damage_class: Type;
}

export interface Weapon {
  damage: Damage;
  attack_speed: AttackSpeed;
  dps: Dps;
}

export interface AttackSpeed {
  value: number;
  display_string: string;
}

export interface Dps {
  value: number;
  display_string: string;
}

export interface Level {
  value: number;
  display_string: string;
}

export interface Durability {
  value: number;
  display_string: string;
}

export interface EnchantmentSlot {
  id: number;
  type: string;
}
