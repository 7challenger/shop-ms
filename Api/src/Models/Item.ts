import { Model, DataTypes, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';


export interface ItemAttributes {
  id: number;
  image: string;
  siteUrl: string;

  name: string;
  description: string;

  currentPrice: string;
  initialPrice: string;
}

export interface ItemAttributesJSON {
  image: string;
  siteUrl: string;

  info: {
    name: string;
    description: string;
  };

  // price
  price: {
    currentPrice: string;
    initialPrice: string;
  };
}

interface ItemCreationAttributes extends Optional<ItemAttributes, 'id'> {}

export class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
  public id!: number

  public image: string;
  public siteUrl: string;

  public name: string;
  public description: string;

  public currentPrice: string;
  public initialPrice: string;
}

const initializeItemModel = (sequelize: Sequelize, dt: typeof DataTypes): typeof Item => {
  Item.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: dt.INTEGER,
      allowNull: false,
    },

    image: dt.STRING,
    siteUrl: dt.STRING,

    // info
    name: dt.STRING,
    description: dt.STRING,

    // price
    currentPrice: dt.STRING,
    initialPrice: dt.STRING,
  }, {
    sequelize,
    modelName: 'Item',
    updatedAt: false,
    createdAt: false,
  });

  return Item;
};

export default initializeItemModel;

