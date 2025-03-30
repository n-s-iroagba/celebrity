import { Cart, CartAttributes, CartCreationAttribute } from "../models/Cart";
import { Item } from "../models/Item";

export class CartService {
  /**
   * Create a new cart
   * @param cartData Data to create cart
   * @returns Created cart
   */
  static async createCart(cartData: CartCreationAttribute): Promise<Cart> {
    try {
      const cart = await Cart.create(cartData);
      return cart;
    } catch (error) {
      throw new Error(`Error creating cart: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get all carts
   * @returns Array of all carts
   */
  static async getAllCarts(): Promise<Cart[]> {
    try {
      const carts = await Cart.findAll({
        include: [{
          model: Item,
          as: 'items'
        }]
      });
      return carts;
    } catch (error) {
      throw new Error(`Error getting all carts: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get cart by ID
   * @param id Cart ID
   * @returns Cart with items if found, null otherwise
   */
  static async getCartById(id: number): Promise<Cart | null> {
    try {
      const cart = await Cart.findByPk(id, {
        include: [{
          model: Item,
          as: 'items'
        }]
      });
      return cart;
    } catch (error) {
      throw new Error(`Error getting cart by ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get cart by fan ID
   * @param fanId Fan ID
   * @returns Cart with items if found, null otherwise
   */
  static async getCartByFanId(fanId: number): Promise<Cart | null> {
    try {
      const cart = await Cart.findOne({
        where: { fanId },
        include: [{
          model: Item,
          as: 'items'
        }]
      });
      return cart;
    } catch (error) {
      throw new Error(`Error getting cart by fan ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Update cart by ID
   * @param id Cart ID
   * @param updateData Data to update
   * @returns Updated cart
   */
  static async updateCart(
    updateData: CartAttributes
  ): Promise<Cart | null> {
    try {
      const cart = await Cart.findByPk(updateData.id);
      if (!cart) {
        return null;
      }

      await cart.update(updateData);
      return cart;
    } catch (error) {
      throw new Error(`Error updating cart: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Add item to cart
   * @param cartId Cart ID
   * @param itemId Item ID
   * @returns Updated cart with items
   */
  static async addItemToCart(cartId: number, itemId: number): Promise<Cart | null> {
    try {
      const cart = await Cart.findByPk(cartId);
      if (!cart) {
        return null;
      }

      const item = await Item.findByPk(itemId);
      if (!item) {
        throw new Error('Item not found');
      }

      // Assuming you have an association set up between Cart and Item
      await (cart as any).addItem(item);
      
      // Return the updated cart with items
      return await Cart.findByPk(cartId, {
        include: [{
          model: Item,
          as: 'items'
        }]
      });
    } catch (error) {
      throw new Error(`Error adding item to cart: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Note: No delete method as per requirements
}