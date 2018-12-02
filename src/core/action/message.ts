import {RandomGenerator} from '../RandomGenerator';
import villagers from 'src/data/villagers';

export class MessagesGenerators {
  static generators: any;

  static pick(type: any, messageLevel: any) {
    if (!this.generators) {
      this.createGenerators();
    }
    return this.generators[type][messageLevel].pick();
  }

  private static createGenerators() {
    this.generators = {};
    Object.keys(villagers.villagers).forEach(type => {
      this.generators[type] = {};
      Object.keys(villagers.villagers[type]).forEach(level => {
        this.generators[type][level] = new RandomGenerator(villagers.villagers[type][level]);
      });
    });
  }
}
