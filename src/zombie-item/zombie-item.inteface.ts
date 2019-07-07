export interface ZombieItemInterface {
  id: number;
  name: string;
  price: number;
  isActive?: boolean;
}

export interface ZombieItemsDtoInterface {
  timestamp: number,
  items: ZombieItemInterface[],
}

export interface ZombieItemProcessorInterface {
  updateZombieItems(): Promise<void>;
}